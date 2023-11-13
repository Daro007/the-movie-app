"use client";
import Search from "./page.client";
import { QueryClient, QueryClientProvider } from "react-query";
import { MovieProvider } from "../../context/MovieContext";

const queryClient = new QueryClient();

const SearchContext: React.FC = () => {
  return (
    <MovieProvider>
      <QueryClientProvider client={queryClient}>
        <Search />
      </QueryClientProvider>
    </MovieProvider>
  );
};

export default SearchContext;
