import { render, screen, fireEvent, act } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MovieProvider } from "../src/context/MovieContext";
import RateMovieForm from "../src/components/RateMovieForm";
import { Movie } from "@/types";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

const queryClient = new QueryClient();

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

test("renders RateMovieForm component", async () => {
  await act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MovieProvider>
          <RateMovieForm movie={mockMovie} />
        </MovieProvider>
      </QueryClientProvider>
    );
  });
});

test("renders RateMovieForm component", async () => {
  await act(async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MovieProvider>
          <RateMovieForm movie={mockMovie} />
        </MovieProvider>
      </QueryClientProvider>
    );
  });

  const formElement = screen.getByTestId("rate-movie-form");
  expect(formElement).toBeInTheDocument();
});

test("user can select a rating", () => {
  render(
    <MovieProvider>
      <QueryClientProvider client={queryClient}>
        <RateMovieForm movie={mockMovie} />
      </QueryClientProvider>
    </MovieProvider>
  );

  const ratingRadioButtons = screen.getAllByRole("radio");
  expect(ratingRadioButtons).toHaveLength(5);

  // Simulate user selecting a rating
  fireEvent.click(ratingRadioButtons[2]);

  // Check if the selected rating is reflected in the form
  expect(ratingRadioButtons[2]).toBeChecked();
});

test("user can submit a rating", async () => {
  fetchMock.mockResponseOnce(JSON.stringify({ success: true }));
  render(
    <MovieProvider>
      <QueryClientProvider client={queryClient}>
        <RateMovieForm movie={mockMovie} />
      </QueryClientProvider>
    </MovieProvider>
  );

  // Simulating user selecting a rating
  const ratingRadioButtons = screen.getAllByRole("radio");
  fireEvent.click(ratingRadioButtons[3]);

  // Simulating form submission
  fireEvent.submit(screen.getByTestId("rate-movie-form"));

  // Waiting for feedback message -> Happy path
  const feedbackMessage = await screen.findByText(/Thanks for your review/i);
  expect(feedbackMessage).toBeInTheDocument();
});

test("user receives an error message when submitting a rating fails", async () => {
  // Mock the response to be an error response
  fetchMock.mockRejectOnce(new Error("Failed to submit rating"));

  render(
    <MovieProvider>
      <QueryClientProvider client={queryClient}>
        <RateMovieForm movie={mockMovie} />
      </QueryClientProvider>
    </MovieProvider>
  );

  // Simulating user selecting a rating
  const ratingRadioButtons = screen.getAllByRole("radio");
  fireEvent.click(ratingRadioButtons[3]);

  // Simulating form submission
  fireEvent.submit(screen.getByTestId("rate-movie-form"));

  // Waiting for error message
  const errorMessage = await screen.findByText(
    /The was an error when submitting your rating!/i
  );
  expect(errorMessage).toBeInTheDocument();
});
