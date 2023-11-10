import React from "react";
import MovieCard from "./MovieCard";
import { MovieListProps } from "../types"

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <section>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">All movies</h1>
      <small className="badge">Scroll {'->'} </small>
      <div className="carousel w-full carousel-end rounded-box">
        {movies.map((movie) => {
          // console.log("movie:", movie);
          return (
            <MovieCard key={movie.id} movie={movie} />
          );
        })}
      </div>
    </section>
  );
};

export default MovieList;
