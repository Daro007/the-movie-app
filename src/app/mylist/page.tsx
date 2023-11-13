"use client";
import React from "react";
import styles from "./page.module.css";
import MovieList from "../../components/MovieList";
import { Movie } from "../../types";
import Link from "next/link";

const MyList: React.FC = () => {
  const ratedMoviesString = localStorage.getItem("ratedMovies");
  let ratedMovies: Movie[] = [];

  if (ratedMoviesString) {
    try {
      ratedMovies = JSON.parse(ratedMoviesString);
    } catch (error) {
      console.error("Error parsing ratedMovies from localStorage:", error);
    }
  }

  return (
    <section className={styles.main}>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Rated Movies
      </h1>
      {ratedMovies.length > 0 ? (
        <small className="badge">Scroll {"->"} </small>
      ) : (
        ""
      )}
      {ratedMovies.length > 0 ? (
        <MovieList movies={ratedMovies} />
      ) : (
        <div>
          <p>No rated movies in your list yet.</p>
          <br />
          <Link aria-label="Browse Movies" href="/search">
            <button className="btn btn-primary">Browse here</button>
          </Link>
        </div>
      )}
    </section>
  );
};

export default MyList;
