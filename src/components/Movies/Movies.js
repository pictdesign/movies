import {useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import './Movies.css';

const Movies = ({
  onSearch,
  movies,
  isLoading,
  error,
  onSave,
  onRemove,
  savedMovies,
  noResults,
  clearError,
}) => {
  const [screenWidth, setScreenWidth] = useState(window.screen.width);
  const [gridCols, setGridCols] = useState(null);
  const [shownMovies, setShownMovies] = useState([]);
  const [limitMovies, setLimitMovies] = useState(null);

  useEffect(() => {
    let rtime;
    let timeout = false;
    let delta = 200;

    const resizeEvent = () => {
      rtime = new Date();
      if (timeout === false) {
        timeout = true;
        setTimeout(resizeAction, delta);
      }
    };

    window.addEventListener('resize', resizeEvent);

    const resizeAction = () => {
      if (new Date() - rtime < delta) {
        setTimeout(resizeAction, delta);
      } else {
        timeout = false;
        setScreenWidth(window.screen.width);
      }
    };
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

  const initScreen = (screenWidth) => {
    if (screenWidth > 1100) {
      setGridCols(3);
      setLimitMovies(12);
    } else if (screenWidth >= 768 && screenWidth <= 1100) {
      setGridCols(2);
      setLimitMovies(8);
    } else {
      setGridCols(1);
      setLimitMovies(5);
    }
  };

  useEffect(() => {
    initScreen(screenWidth);
  }, [screenWidth]);

  useEffect(() => {
    setShownMovies(movies.slice(0, limitMovies));
  }, [limitMovies, movies]);

  const handleShowMoreMovies = () => {
    setLimitMovies((prevValue) => (prevValue += gridCols));
  };

  const handleSearch = (search, isShort) => {
    initScreen(screenWidth);
    onSearch(search, isShort);
  };

  const handleClearError = () => {
    clearError();
  };

  return (
    <div className="movies container">
      <SearchForm
        onSearch={handleSearch}
        cacheValue={localStorage.getItem('search')}
        shortCache={localStorage.getItem('isShort')}
      />
      {!isLoading && noResults && (
        <p className="movies__noresults">Ничего не найдено</p>
      )}
      {isLoading ? (
        <div className="movies__preloader">
          <Preloader />
        </div>
      ) : (
        <MoviesCardList
          movies={shownMovies}
          onSave={onSave}
          savedMovies={savedMovies}
          onRemove={onRemove}
        />
      )}
      
      {shownMovies.length < movies.length && (
        <button onClick={handleShowMoreMovies} className="movies__more">
          Еще
        </button>
      )}
      {error && (
        <div className="movies__error">
          Что-то пошло не так... {error}
          <span className="form__error-close" onClick={handleClearError}>
            <div></div>
            <div></div>
          </span>
        </div>
      )}
    </div>
  );
};

export default Movies;
