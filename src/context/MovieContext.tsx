import React, { useReducer, useContext, createContext, Dispatch, ReactNode, useEffect } from 'react';
import { Movie, MovieState, ACTIONS, Action } from '../types'; 

const MovieContext = createContext<{ state: MovieState; dispatch: Dispatch<Action> }>({
  state: {
    popularMovies: [],
    searchedMovies: [],
    guestSession: '',
    ratedMovies: [], 
  },
  dispatch: () => null,
});

const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, {
    popularMovies: [],
    searchedMovies: [],
    guestSession: '',
    ratedMovies: [] 
  });

  useEffect(() => {
    const existingRatedMovies = localStorage.getItem('ratedMovies');

    let initialRatedMovies: Movie[] = [];
    if (existingRatedMovies) {
      try {
        const parsedRatedMovies = JSON.parse(existingRatedMovies);
        if (Array.isArray(parsedRatedMovies)) {
          initialRatedMovies = parsedRatedMovies;
        }
      } catch (error) {
        console.error('Error parsing existing ratedMovies:', error);
      }
    }
    localStorage.setItem("ratedMovies", JSON.stringify(initialRatedMovies));
    dispatch({ type: ACTIONS.INIT_RATED_MOVIES, payload: initialRatedMovies });
  }, []);


  return <MovieContext.Provider value={{ state, dispatch }}>{children}</MovieContext.Provider>;
};

const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

const movieReducer = (state: MovieState, action: Action): MovieState => {
  switch (action.type) {
    case ACTIONS.SET_POPULAR_MOVIES:
      return { ...state, popularMovies: action.payload };
    case ACTIONS.SET_SEARCHED_MOVIES:
      return { ...state, searchedMovies: action.payload };
    case ACTIONS.SET_GUEST_SESSION:
      return { ...state, guestSession: action.payload };
    case ACTIONS.INIT_RATED_MOVIES:
      return { ...state, ratedMovies: action.payload };  
    default:
      return state;
  }
};

export { MovieProvider, useMovieContext, ACTIONS as MovieActions, movieReducer };
