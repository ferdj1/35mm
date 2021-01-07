import * as React from "react"
import {useEffect, useState} from "react"

import {TMDB_BASE_POSTER_URL} from "../../constants/GenericConstants";

import {AiFillStar} from "react-icons/ai";

import "./MovieCard.scss";
import {RiHeartFill, RiHeartLine} from "react-icons/all";
import {useToast} from "@chakra-ui/react";
import {checkLikedMovieById, dislikeMovieById, likeMovieById} from "../../apiClient/MovieService";
import {NavLink} from "react-router-dom";

function MovieCard(props) {
  const toast = useToast();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (props.authenticated) {
      checkLikedMovieById(props.movie.id).then(res => {
        setLiked(res);
      }).catch(error => {
        toast({
          title: "Error",
          description: (error && error.error) || 'Oops! Something went wrong. Please try again!',
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      });
    }
  }, []);

  function likeMovie() {
    if (props.authenticated) {
      likeMovieById(props.movie.id).then(r => {
        if (r === true) {
          toast({
            title: props.movie.title + " liked",
            status: "success",
            duration: 2000,
          })
          setLiked(true);

          props.setDisplayRefreshRecommendations(true);
        }
      });
    }
  }

  function dislikeMovie() {
    if (props.authenticated) {
      dislikeMovieById(props.movie.id).then(r => {
        if (r === true) {
          toast({
            title: props.movie.title + " disliked",
            status: "info",
            duration: 2000,
          })
          setLiked(false);

          props.setDisplayRefreshRecommendations(true);
        }
      });
    }
  }

  return (
    <div className="movie-card">
      <div className="movie-card__image-cnt">
        <NavLink to={{
          pathname: `/movie/${props.movie.id}`,
          state: {movie: props.movie}
        }}>
          <div className="movie-card__image">
            <img src={TMDB_BASE_POSTER_URL + props.movie.posterPath} alt="poster"/>
          </div>
        </NavLink>
        {!liked ?
          <div className="movie-card__like" onClick={likeMovie}>
            <RiHeartLine className="movie-card__like-icon" size={"20px"}/>
          </div>
          :
          <div className="movie-card__like-selected" onClick={dislikeMovie}>
            <RiHeartFill className="movie-card__like-icon-selected" size={"20px"}/>
          </div>
        }
      </div>

      <div className="movie-card__info">
        <NavLink to={{
          pathname: `/movie/${props.movie.id}`,
          state: {movie: props.movie}
        }}>
          <span className="movie-card__title">
            {props.movie.title}
          </span>
        </NavLink>
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
