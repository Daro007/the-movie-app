export interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  release_date: string;
  original_title: string;
  tagline: string;
  status: string;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  genres: Array<{
    id: number;
    name: string;
  }>;
  production_companies: Array<{
    id: number;
    name: string;
  }>;
  overview: string;
  vote_average: number;
  vote_count: number;
  adult: boolean;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface MovieListProps {
  movies: Movie[];
}

export interface MovieDetailsProps {
  params:  {
    id: string;
  }
}

export interface MovieClientDetailsProps {
  id: string;
}

export interface MovieContextProps {
  props: string;
}

export type MovieId = string;

export interface RatingPayload {
  movieId: number;
  rating: number;
  guestSessionId: string;
}

export interface MovieState {
  popularMovies: Movie[];
  searchedMovies: Movie[];
  guestSession: string;
  ratedMovies: Movie[];
}

export enum ACTIONS {
  SET_POPULAR_MOVIES = "SET_POPULAR_MOVIES",
  SET_SEARCHED_MOVIES = "SET_SEARCHED_MOVIES",
  SET_GUEST_SESSION = "SET_GUEST_SESSION",
  INIT_RATED_MOVIES = 'INIT_RATED_MOVIES'
}

export type Action =
  | { type: ACTIONS.SET_POPULAR_MOVIES; payload: Movie[] }
  | { type: ACTIONS.SET_SEARCHED_MOVIES; payload: Movie[] }
  | { type: ACTIONS.SET_GUEST_SESSION; payload: string }
  | { type: ACTIONS.INIT_RATED_MOVIES; payload: Movie[] };

export interface RatingProps {
  voteAverage: number;
  voteCount: number;
}

export interface RatingFormData {
  rating: number;
}