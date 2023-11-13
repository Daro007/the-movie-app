import React, { useState, useEffect } from 'react';
import { useMovieContext, MovieActions } from '../context/MovieContext';
import MovieList from '../components/MovieList';
import Spinner from '../components/Spinner';
import { useSearchedMovies } from '../services/movieAPI';

export default function Search() {
  const { state, dispatch } = useMovieContext();
  const { searchedMovies } = state;
  const { data: movies, isLoading, isError } = useSearchedMovies(''); 

  useEffect(() => {
    if (!isLoading && !isError && movies) {
      dispatch({ type: MovieActions.SET_SEARCHED_MOVIES, payload: movies });
    }
  }, [movies, isLoading, isError, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching movies</div>;
  }

  return (
    <main className="">
      {searchedMovies.length > 0 ? (
        <MovieList movies={searchedMovies} />
      ) : (
        <div>No movies available</div>
      )}
    </main>
  );
}
  