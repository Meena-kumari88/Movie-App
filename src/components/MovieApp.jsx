import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import Pagination from './Pagination';
import MovieCarousel from './MovieCarousel'; 
import { fetchGenres, fetchMovies } from './api'; 
import './MovieApp.css';

const MovieRecommendations = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [expandedMovieId, setExpandedMovieId] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      const moviesData = await fetchMovies(sortBy, page, selectedGenre, searchQuery);
      setMovies(moviesData);
    };
    loadMovies();
  }, [searchQuery, sortBy, selectedGenre, page]);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleSortChange = (event) => setSortBy(event.target.value);
  const handleGenreChange = (event) => setSelectedGenre(event.target.value);
  const handleSearchSubmit = async () => {
    setPage(1);
    const moviesData = await fetchMovies(sortBy, 1, selectedGenre, searchQuery);
    setMovies(moviesData);
  };

  const toggleDescription = (movieId) => {
    setExpandedMovieId(expandedMovieId === movieId ? null : movieId);
  };

  // Function to render star ratings with numerical value
  const renderStarsWithNumber = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating); 
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= roundedRating ? '#e50914' : '#ccc' }}>
          ★
        </span>
      );
    }
    return (
      <div className="rating">
        {stars} <span style={{ marginLeft: '8px', color: '#000' }}>{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div>
      <NavBar
        sortBy={sortBy}
        onSortChange={handleSortChange}
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={handleGenreChange}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
      />
      <MovieCarousel /> 
      <div className="movie-wrapper">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h2>{movie.title}</h2>
            <h3>{new Date(movie.release_date).getFullYear()}</h3>
            {renderStarsWithNumber(movie.vote_average)} 
            {expandedMovieId === movie.id ? (
              <p>{movie.overview}</p>
            ) : (
              <p>{movie.overview.substring(0, 150)}...</p>
            )}
            <button
              onClick={() => toggleDescription(movie.id)}
              className="read-more"
            >
              {expandedMovieId === movie.id ? 'Show Less' : 'Read More'}
            </button>
          </div>
        ))}
      </div>
      <Pagination page={page} setPage={setPage} />
    </div>
  );
};

export default MovieRecommendations;
