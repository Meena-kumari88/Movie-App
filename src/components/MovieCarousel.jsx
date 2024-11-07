import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './MovieCarousel.css';

const API_KEY = 'b25fdae0ba84314ec60e9af455609072';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '5',
    autoplay: true,           
    autoplaySpeed: 3000,      
  };

  return (
    <div className="movie-carousel">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-slide">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="movie-info">
              <h3>{movie.title}</h3>
              <p>{new Date(movie.release_date).getFullYear()}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieCarousel;
