import MovieDetails from "./page.context";
import { MovieDetailsProps } from "@/types";

const MovieDetailsPage: React.FC<MovieDetailsProps> = ({ params }) => {
  return <MovieDetails props={params.id} />;
};

export default MovieDetailsPage;
