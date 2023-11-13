"use client";
import MovieDetails from "./page.client";
import { QueryClient, QueryClientProvider } from "react-query";
import { MovieProvider } from "../../../context/MovieContext";
import { MovieContextProps } from "@/types";

const queryClient = new QueryClient();

const MovieDetailsContext: React.FC<MovieContextProps> = ({ props }) => {

  return (
    <MovieProvider>
      <QueryClientProvider client={queryClient}>
        <MovieDetails id={props} />
      </QueryClientProvider>
    </MovieProvider>
  );
};

export default MovieDetailsContext;
