import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MovieCardProps } from "../types";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {

  const maxTitleLength = 30;
  const truncatedTitle =
    movie.title.length > maxTitleLength
      ? `${movie.title.substring(0, maxTitleLength)}...`
      : movie.title;

  return (
    <Link
      aria-label="Browse Movies"
      href={`/movies/${movie.id}`}
      data-testid={`movie-card-${movie.id}`}
    >
      <div className="carousel-item card w-96 bg-base-100 shadow-xl m-4">
        <div className="card-body">
          <h3 className="card-title">{truncatedTitle}</h3>
          <p>{movie.release_date}</p>
        </div>
        <figure>
          <Image
            width={400}
            height={400}
            src={`http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
            alt={movie.title}
          />
        </figure>
      </div>
    </Link>
  );
};

export default MovieCard;
