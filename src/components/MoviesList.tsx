import axios, { AxiosResponse } from "axios";
import { useState } from 'react';
import { API_KEY, BASE_URL, IMG_URL, original_language } from '../services/api';

import imgButton from '../assets/shuffle.svg';
import notFoundImg from '../assets/notfound.png';

// import { api } from '../services/api';

import '../styles/movies.css';
import '../styles/content.css';

type Movie = {
  adult: boolean;
  title: string;
  poster_path: string;
  overview: string;
}

export function MoviesList() {
  const [movie, setMovie] = useState<Movie>();
  const [isTheMovieGenerated, setIsTheMovieGenerated] =
    useState<boolean>(false);
  const [notFoundStatusCode, setNotFoundStatusCode] = useState<boolean>(false);

  const getRandomId = () => {
  return Math.floor(Math.random() * 964423) + 1;
  };

  const generateMovie = async () => {
    try {
      const response: AxiosResponse<Movie> = await axios.get(
        `${BASE_URL}/${getRandomId()}?${
          API_KEY
        }&${original_language}&include_adult=false`
      );

      if (response.data.adult) {
        generateMovie();
        console.log(generateMovie())
      } else {
        setMovie(response.data);
        setIsTheMovieGenerated(true);
        setNotFoundStatusCode(false);
      }
    } catch (error: any) {
      if (error.response && error.response.status == 404) {
        setNotFoundStatusCode(true);
      }
    }
  };

  return (
    <div className="container">
      <div className="content">    
        {movie && (
          <div 
            className="poster" 
            >
            <img
              className="img-poster"
              src={
                movie.poster_path != null
                  ? IMG_URL + "/" + movie.poster_path
                  : "http://www.ronaldoazambuja.com.br/wp-content/themes/trend/assets/img/empty/424x500.png"
              }
              alt={movie.title}
            />
            <div className="movie-details">
              <strong>{movie.title}</strong>
              <p className="description">{movie.overview}</p>
            </div>
          </div>
        )}
        {notFoundStatusCode && (
          <div className="notfound">
            <img src={notFoundImg} alt="Not Found" />
            <strong className="notfound-description">
              Ops, hoje não é dia de assistir filme. Bora codar! 🚀
            </strong>
          </div>
        )}
      </div>

        <button className="button" onClick={() => generateMovie()}>
          <img src={imgButton} alt="shuffle" className="shuffle" />
          <h6>Encontrar filme</h6>
        </button>
        <p>Clique em "Encontrar filme" que traremos informações
          de algum filme para você assistir hoje.
        </p>
      
    </div>
  );
}