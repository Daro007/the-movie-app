import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useRateMovie, useGuestSession } from "../services/movieAPI";
import { Movie, RatingFormData } from "@/types";
import Link from "next/link";

const RateMovieForm: React.FC<{ movie: Movie }> = ({ movie }) => {
  const { register, handleSubmit, setValue, getValues } =
    useForm<RatingFormData>();
  //   const [isRatingLoading, setIsRatingLoading] = useState<boolean>(false);
  const { data: guestSessionId, isLoading: isGuestSessionLoading } =
    useGuestSession();

  const { mutateAsync: rateMovie } = useRateMovie();
  const [feedback, setFeedback] = useState<string>("");

  const movieId = movie.id;

  useEffect(() => {
    if (!isGuestSessionLoading && guestSessionId) {
      //   console.log("guestSessionId", guestSessionId);
      //   console.log("isGuestSessionLoading", isGuestSessionLoading);
    }
    // console.log("MOVIE:", movie)
  }, [isGuestSessionLoading, guestSessionId]);


  const addMovieToRatedMovies = (movie: Movie) => {

    const existingRatedMovies = localStorage.getItem("ratedMovies");

    let updatedRatedMovies: Movie[] = [];

    if (existingRatedMovies) {
      try {
        const parsedRatedMovies = JSON.parse(existingRatedMovies);

        if (Array.isArray(parsedRatedMovies)) {
          // Check if the movie with the same ID is already in the array
          const isMovieAlreadyRated = parsedRatedMovies.some(
            (ratedMovie) => ratedMovie.id === movie.id
          );

          if (!isMovieAlreadyRated) {
            // If not, add the movie to the array
            updatedRatedMovies = [...parsedRatedMovies, movie];
          } else {
            // console.log("Movie is already rated.");
            return;
          }
        }
      } catch (error) {
        console.error("Error parsing existing ratedMovies:", error);
      }
    }

    // If ratedMovies doesn't exist or encountered an error during parsing, initialize it as an array with the current movie
    if (updatedRatedMovies.length === 0) {
      updatedRatedMovies = [movie];
    }

    localStorage.setItem("ratedMovies", JSON.stringify(updatedRatedMovies));

    // console.log("Movie successfully added to ratedMovies.");
  };

  

  const onSubmit = async () => {
    const rating = getValues("rating");

    try {
      // setIsRatingLoading(true)
      const result = await rateMovie({
        movieId,
        rating,
        guestSessionId: guestSessionId || "",
      });

      if (result.success) {
        setFeedback("Thanks for your review!");
        addMovieToRatedMovies(movie);
      } else {
        setFeedback("Failed to submit rating!");
      }
    } catch (error) {
      setFeedback("The was an error when submitting your rating!");
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-2">Rate This Movie</h2>
      <Link aria-label="Browse Movies" href="/mylist">
        <small className="badge badge-outline badge-md ">
          See all your rated movies ↗️{" "}
        </small>
      </Link>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rating rating-lg">
          {[1, 2, 3, 4, 5].map((star) => (
            <input
              key={star}
              type="radio"
              name={`rating-${movieId}`}
              value={star}
              className={`mask mask-star-2 ${
                star <= getValues("rating") ? "bg-green-700" : "bg-gray-300"
              }`}
              onChange={() => setValue("rating", star)}
            />
          ))}
        </div>
        <br />
        <button
          type="submit"
          className="btn btn-neutral text-white px-4 py-2 mt-2"
        >
          Submit Your Rating
        </button>
        {/* {isRatingLoading ? "loading" : ""} */}
        <br />
        {feedback ? <div className="badge badge-info m-2">{feedback}</div> : ""}
      </form>
    </div>
  );
};

export default RateMovieForm;
