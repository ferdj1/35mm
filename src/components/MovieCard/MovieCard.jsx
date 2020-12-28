import * as React from "react"

import {TMDB_BASE_POSTER_URL} from "../../constants/GenericConstants";

import {AiFillStar} from "react-icons/ai";

import "./MovieCard.scss";

function MovieCard(props) {
  return (
    <div className="movie-card">
      <div className="movie-card__image">
        <img src={TMDB_BASE_POSTER_URL + props.movie.posterPath} alt="poster"/>
      </div>
      <div className="movie-card__info">
        <span className="movie-card__title">
          {props.movie.title}
        </span>
        <div className="movie-card__additional-info">
          <span className="movie-card__year">
            {props.movie.releaseDate.substring(0, 4)}
          </span>
          <div className="movie-card__rating">
            <AiFillStar color="#F6E05E"/>
            <span className="movie-card__rating-value">
              {props.movie.voteAverage}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard;
