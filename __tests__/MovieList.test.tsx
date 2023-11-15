import { render, screen } from "@testing-library/react";
import { MovieListProps } from "@/types";
import MovieList from "@/components/MovieList";

const mockMovies: MovieListProps["movies"] = [
  {
    id: 1234,
    title: "Test Movie 1",
    release_date: "2024-01-01",
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
  },
  {
    id: 1234665,
    title: "Test Movie 2",
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
    ],
    genres: [{ id: 123, name: "string" }],
    production_companies: [
      { id: 1, name: "company 1" },
      { id: 2, name: "company 2" },
    ],
    overview: "string",
    vote_average: 9.3,
    vote_count: 200,
    adult: true,
  },
];

test("renders MovieList component with movies", () => {
  render(<MovieList movies={mockMovies} />);

  mockMovies.forEach((movie) => {
    expect(screen.getByText(movie.title)).toBeInTheDocument();
    expect(screen.getByText(movie.release_date)).toBeInTheDocument();

    const movieCard = screen.getByTestId(`movie-card-${movie.id}`);
    expect(movieCard).toBeTruthy();
  });

  const movieCardComponents = screen.getAllByTestId(/movie-card-\d+/);
  expect(movieCardComponents).toHaveLength(mockMovies.length);
});
