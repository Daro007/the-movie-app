"use client";
import React, { useEffect, useState } from "react";
import MovieList from "../../components/MovieList";
import { usePopularMovies, useSearchedMovies } from "../../services/movieAPI";
import { useMovieContext, MovieActions } from "../../context/MovieContext";
import Spinner from "../../components/Spinner";
import styles from "./page.module.css";
import Link from "next/link";

export default function Search() {
  const { state, dispatch } = useMovieContext();
  const { popularMovies } = state;
  const [searchQuery, setSearchQuery] = useState("");

  const { data: movies, isLoading, isError } = usePopularMovies();
  const {
    data: searchedMoviesData,
    isLoading: searchedMoviesLoading,
    isError: searchedMoviesError,
  } = useSearchedMovies(searchQuery);

  useEffect(() => {
    if (!isLoading && !isError && movies) {
      dispatch({ type: MovieActions.SET_POPULAR_MOVIES, payload: movies });
    }
  }, [movies, isLoading, isError, dispatch]);

  useEffect(() => {
    if (!searchedMoviesLoading && !searchedMoviesError && searchedMoviesData) {
      dispatch({
        type: MovieActions.SET_SEARCHED_MOVIES,
        payload: searchedMoviesData,
      });
    }
  }, [
    searchedMoviesData,
    searchedMoviesLoading,
    searchedMoviesError,
    dispatch,
  ]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching movies</div>;
  }

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  return (
    <main className={styles.main}>
      <section>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">All movies</h1>
      <small className="badge">Scroll {'->'} </small>
        {popularMovies.length > 0 ? (
          <MovieList movies={popularMovies} />
        ) : (
          <div>No movies available</div>
        )}
      </section>
      <section>
        <h2 className="text-4xl font-extrabold"> Search: </h2>
        <br />
        <div>
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="w-full">
          <br />
          {searchedMoviesData && searchedMoviesData.length > 0 && (
            <div>
              {searchedMoviesData.map((movie) => (
                <>
                <Link href={`/movies/${movie.id}`} className="badge badge-outline badge-md p-4 m-1 truncate" key={movie.id}>{movie.title} ↗️ </Link>
                </>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
