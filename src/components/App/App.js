import { useState, useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { filterMovies } from '../../utils/filterMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import SavedMovies from '../SavedMovies/SavedMovies';
import { CurrentUserContext, user } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { moviesApi } from '../../utils/MoviesApi';
import './App.css';
import { mainApi } from '../../utils/MainApi';

function App() {
  const hideHeaderPaths = ['/notfound', '/signup', '/signin'];
  const hideFooterPaths = ['/notfound', '/profile', '/signup', '/signin'];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const history = useHistory();

  const clearError = () => {
    setError('');
  };

  const tokenCheck = async () => {
    try {
      const userData = await mainApi.getContent();
      setIsLoggedIn(true);
      setCurrentUser((user) => ({
        ...user,
        ...userData,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tokenCheck();
  }, []);

  //fetching movies

  const fetchMovies = async () => {
    try {
      const movies = await moviesApi.getMovies();
      return movies;
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleSearch = async (searchValue, isShort) => {
    try {
      clearError();
      setIsLoading(true);
      const movies = await fetchMovies();
      const filteredMovies = filterMovies(searchValue, movies, isShort);
      setMovies(filteredMovies);
      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
      localStorage.setItem('search', searchValue);
      localStorage.setItem('isShort', isShort)
      if (!filteredMovies.length) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    localStorage.getItem('filteredMovies') &&
      setMovies(JSON.parse(localStorage.getItem('filteredMovies')));
  }, []);

  useEffect(() => {
    const fetchSavedMovies = async () => {
      const response = await mainApi.fetchSavedMovies();
      setSavedMovies(response);
      localStorage.setItem('savedMovies', JSON.stringify(response));
    };
    if (isLoggedIn) {
      try {
        fetchSavedMovies();
      } catch (error) {
        console.log(error);
      }
    }
  }, [isLoggedIn]);

  //save, delete movie

  const handleSaveMovie = async (movie, userId) => {
    clearError()
    try {
      const response = await mainApi.saveMovie(movie, userId);
      const tmpSavedMovies = [...savedMovies, response];
      setSavedMovies(tmpSavedMovies);
      localStorage.setItem('savedMovies', JSON.stringify(tmpSavedMovies));
    } catch (error) {
      setError(error)
      console.log(error);
    }
  };

  const handleRemoveMovie = async (movieId) => {
    try {
      await mainApi.removeMovie(movieId);
      const filteredMovies = savedMovies.filter((item) => item._id !== movieId);
      setSavedMovies(filteredMovies);
      localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
    } catch (error) {
      console.log(error);
    }
  };

  //login, logout, register, update user

  const handleRegister = (values) => {
    mainApi
      .signup(values)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        history.push('/movies');
      })
      .catch((err) => setError(err));
  };

  const handleLogin = (values) => {
    mainApi
      .signin(values)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser(res);
        history.push('/movies');
      })
      .catch((err) => setError(err));
  };

  const handleLogout = () => {
    mainApi.signout();
    setIsLoggedIn(false);
    localStorage.clear()
    setMovies([])
  };

  const handleUpdateUser = async (values) => {
    try {
      const response = await mainApi.updateUser(values);
      setCurrentUser((user) => ({
        ...user,
        ...response,
      }));
      setSuccess(true)
    } catch (error) {
      console.log(error);
    }
  };

  const clearSuccess = () => {
    setSuccess(false)
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        {useRouteMatch(hideHeaderPaths) ? null : (
          <Header isLoggedIn={isLoggedIn} />
        )}
        <Switch>
          <Route path="/" exact>
            <Main />
          </Route>
          <ProtectedRoute
            path="/movies"
            component={Movies}
            isLoggedIn={isLoggedIn}
            onSearch={handleSearch}
            movies={movies}
            isLoading={isLoading}
            error={error}
            onSave={handleSaveMovie}
            onRemove={handleRemoveMovie}
            savedMovies={savedMovies}
            noResults={noResults}
            clearError={clearError}
          />

          <ProtectedRoute
            path="/saved-movies"
            component={SavedMovies}
            savedMovies={savedMovies}
            isLoggedIn={isLoggedIn}
            onRemove={handleRemoveMovie}
          />

          <ProtectedRoute
            path="/profile"
            component={Profile}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            onUpdate={handleUpdateUser}
            success={success}
            clearSuccess={clearSuccess}
          />
          <Route path="/signup">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Register
                onRegister={handleRegister}
                error={error}
                clearError={clearError}
              />
            )}
          </Route>
          <Route path="/signin">
            {isLoggedIn ? (
              <Redirect to="/movies" />
            ) : (
              <Login
                onLogin={handleLogin}
                error={error}
                clearError={clearError}
              />
            )}
          </Route>
          <Route path="/notfound">
            <NotFound />
          </Route>
          <Redirect to="/notfound" />
        </Switch>
        {useRouteMatch(hideFooterPaths) ? null : <Footer />}
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
