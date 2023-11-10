import React from "react";
import { RatingProps } from "@/types";

const RatingComponent: React.FC<RatingProps> = ({ voteAverage, voteCount }) => {
  const maxRating = 5;
  const fullStars = Math.round((voteAverage / 10) * maxRating);

  const starInputs = Array.from({ length: maxRating }, (_, index) => (
    <input
      key={index}
      type="radio"
      name="rating-5"
      className={`mask mask-star-2 ${index < fullStars ? "bg-green-700" : ""}`}
      checked={index === fullStars - 1}
      disabled
    />
  ));

  return (
    <>
      <div className="rating rating-lg">{starInputs}</div>
      {voteCount ? <p> Votes: {voteCount}</p> : ""}
    </>
  );
};

export default RatingComponent;
