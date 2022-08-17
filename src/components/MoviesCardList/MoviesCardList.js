import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './MoviesCardList.css';
import { useContext } from 'react';

const MoviesCardList = ({ movies = [], onSave, savedMovies, onRemove }) => {
  const { pathname } = useLocation();
  const { _id } = useContext(CurrentUserContext);
  const savedMoviesView = pathname === '/saved-movies';
  let content = movies.map((movie) => (
    <MoviesCard
      onRemove={onRemove}
      savedMovies={savedMovies}
      userId={_id}
      onSave={onSave}
      key={savedMoviesView ? movie.movieId + _id : movie.id + _id}
      movie={movie}
      savedMoviesView={savedMoviesView}
      saved={savedMovies.some(i => i.movieId === movie.id && i.owner === _id ? true : false)}
    />
  ));
  return (
    <section className="movies-list">
      <ul className="movies-list__list">{content}</ul>
    </section>
  );
};

export default MoviesCardList;
