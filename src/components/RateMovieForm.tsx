import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler, SubmitErrorHandler } from "react-hook-form";
import { useRateMovie, useGuestSession } from "../services/movieAPI";
import { RatingFormData } from "@/types";


const RateMovieForm: React.FC<{ movieId: number }> = ({ movieId }) => {
  const { register, handleSubmit, setValue, getValues } =
    useForm<RatingFormData>();
//   const [isRatingLoading, setIsRatingLoading] = useState<boolean>(false);
  const { data: guestSessionId, isLoading: isGuestSessionLoading } = useGuestSession();
  
  const { mutateAsync: rateMovie } = useRateMovie();
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    if (!isGuestSessionLoading && guestSessionId) {
      console.log("guestSessionId", guestSessionId);
      console.log("isGuestSessionLoading", isGuestSessionLoading);
    }
  }, [isGuestSessionLoading, guestSessionId]);


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
