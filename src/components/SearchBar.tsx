import React, { useState, useEffect } from 'react';
import { useMovieContext, MovieActions } from '../context/MovieContext';
import MovieList from '../components/MovieList';
import Spinner from '../components/Spinner';
import { searchMoviesAPI } from '../services/movieAPI';


const Search = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { state, dispatch } = useMovieContext();
    const { searchedMovies } = state;
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };
  
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      try {
        // Fetch the searched movies using the movieAPI method
        const movies = await searchMoviesAPI(searchQuery); // Replace with your actual method
  
        // Update the context state with the searched movies
        dispatch({ type: MovieActions.SET_SEARCHED_MOVIES, payload: movies });
      } catch (error) {
        // Handle errors, e.g., show an error message
      }
    };
  
    return (
      <div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
        {searchedMovies.length > 0 ? (
          <MovieList movies={searchedMovies} />
        ) : (
          <div>No matching movies found</div>
        )}
      </div>
    );
  };
  
  export default Search;
  