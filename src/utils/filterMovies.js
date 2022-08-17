export const filterMovies = (filter, movies, isShort) => {
  const filteredMovies = movies.filter(
    (movie) =>
      movie.nameRU.toLowerCase().includes(filter.toLowerCase().trim()) &&
      (isShort ? movie.duration <= 40 : true),
  );
  return filteredMovies;
};

export const filterShortMovies = (movies) => {
  return movies.filter((movie) => movie.duration <= 40);
};
