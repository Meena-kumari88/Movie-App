import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import './NavBar.css';

const NavBar = ({ sortBy, onSortChange, genres, selectedGenre, onGenreChange, searchQuery, onSearchChange, onSearchSubmit }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle resize to toggle mobile view
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">FilmHaven</h1>
        
        {/* Display dropdowns on desktop */}
        {!isMobile && (
          <div className="dropdowns">
            <select value={sortBy} onChange={onSortChange} className="dropdown">
              <option value="popularity.desc">Popularity Desc</option>
              <option value="popularity.asc">Popularity Asc</option>
              <option value="vote_average.desc">Rating Desc</option>
              <option value="vote_average.asc">Rating Asc</option>
              <option value="release_date.desc">Release Date Desc</option>
              <option value="release_date.asc">Release Date Asc</option>
            </select>
            <select value={selectedGenre} onChange={onGenreChange} className="dropdown">
              <option value="">All Genres</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Search bar on the right for larger devices */}
      <div className="navbar-right">
    <div className="search-bar">
        <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={onSearchChange}
            className="search-input"
        />
        <button onClick={onSearchSubmit} className="search-button">
            <AiOutlineSearch />
        </button>
    </div>
</div>
      
      {/* Display dropdowns below search bar on mobile */}
      {isMobile && (
        <div className="dropdowns">
          <select value={sortBy} onChange={onSortChange} className="dropdown">
            <option value="popularity.desc">Popularity Desc</option>
            <option value="popularity.asc">Popularity Asc</option>
            <option value="vote_average.desc">Rating Desc</option>
            <option value="vote_average.asc">Rating Asc</option>
            <option value="release_date.desc">Release Date Desc</option>
            <option value="release_date.asc">Release Date Asc</option>
          </select>
          <select value={selectedGenre} onChange={onGenreChange} className="dropdown">
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
