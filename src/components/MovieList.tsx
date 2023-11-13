import React from "react";
import MovieCard from "./MovieCard";
import { MovieListProps } from "../types";

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="carousel w-full carousel-end rounded-box">
      {movies.map((movie) => {
        // console.log("movie:", movie);
        return <MovieCard key={movie.id} movie={movie} />;
      })}
    </div>
  );
};

export default MovieList;
