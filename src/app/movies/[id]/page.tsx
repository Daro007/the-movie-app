"use client";
import { MovieDetailsProps } from "@/types";
import { useMovieDetails } from "../../../services/movieAPI";
import Spinner from "../../../components/Spinner";
import Rating from "../../../components/Rating";
import RateMovieForm from "@/components/RateMovieForm";
import Image from "next/image";

const MovieDetails: React.FC<MovieDetailsProps> = ({ params }) => {
  // console.log("params: " + JSON.stringify(params))
  const movieId = params!.id;

  const { data: movie, isLoading, isError } = useMovieDetails(movieId);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error fetching movie details</div>;
  }

  // console.log("MOVIE: ", movie);

  return (
    <main>
      <section className="m-4 md:m-10  xl:w-9/12 min-h-[600px] md:w-9/12 md:min-h-[600px]">
        {movie && (
          <>
            <Rating
              voteAverage={movie.vote_average}
              voteCount={movie.vote_count}
            />
            <h1 className="text-4xl font-extrabold">{movie.title} </h1>
            <br />
            <p className="font-normal">{movie.overview}</p>
            <br />
            <div className="card md:card-side bg-base-100 shadow-x">
              <figure className="h-80 w-full relative md:w-1/2 lg:w-1/3 lg:h-[400px]">
                <Image
                  layout="fill"
                  objectFit="cover"
                  src={`http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                  alt={movie.title}
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {movie.original_title} (original)
                </h2>
                <p className="font-normal text-gray-500">{movie.tagline}</p>
                <p>Release date: {movie.release_date}</p>
                <div className="flex justify-start w-full">
                  <span className=""> Status: &nbsp; &nbsp;</span>
                  <div className="badge badge-neutral ">{movie.status}</div>
                </div>
                <h4>Languages: </h4>
                <div className="">
                  {movie.spoken_languages.map((language) => (
                    <div className="badge m-1" key={language.iso_639_1}>
                      {language.english_name}
                    </div>
                  ))}
                </div>
                <h4>Genres: </h4>
                <div className="">
                  {movie.genres.map((genre) => (
                    <div className="badge m-1" key={genre.id}>
                      {genre.name}
                    </div>
                  ))}
                </div>
                <h4>Production Companies: </h4>
                <div className=" truncate whitespace-nowrap">
                  {movie.production_companies.map((company) => (
                    <div
                      className="badge badge-xs m-0.5 whitespace-nowrap"
                      key={company.id}
                    >
                      {company.name}
                    </div>
                  ))}
                </div>
                {movie.adult ? (
                  <div className="badge bg-red-600 text-white badge-md">
                    {" "}
                    Adult Content
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        )}
      </section>
      <section className="m-8 md:m-10  xl:w-9/12 min-h-[300px] md:w-9/12 md:min-h-[200px]">
        {movie ? <RateMovieForm movie={movie} /> : ""}
      </section>
    </main>
  );
};

export default MovieDetails;
