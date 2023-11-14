import { render, screen } from "@testing-library/react";
import { Movie } from "@/types";
import MovieCard from "@/components/MovieCard";

const mockMovie: Movie = {
  id: 1234,
  title: "Test Movie",
  release_date: "2022-01-01",
  backdrop_path: "/test-image.jpg",
  original_title: "",
  tagline: "",
  status: "",
  spoken_languages: [
    {
      english_name: "English",
      iso_639_1: "string",
      name: "string",
    },
    {
      english_name: "Italian",
      iso_639_1: "string",
      name: "string",
    },
  ],
  genres: [
    { id: 123, name: "string" },
    { id: 333, name: "string" },
  ],
  production_companies: [
    { id: 1, name: "company 1" },
    { id: 2, name: "company 2" },
  ],
  overview: "string",
  vote_average: 9.3,
  vote_count: 200,
  adult: true,
};

test("renders MovieCard component", () => {
  render(<MovieCard movie={mockMovie} />);

  expect(screen.getByText(mockMovie.title)).toBeInTheDocument();

  expect(screen.getByText(mockMovie.release_date)).toBeInTheDocument();

  const imageElement = screen.getByAltText(mockMovie.title);
  expect(imageElement).toBeInTheDocument();
});
