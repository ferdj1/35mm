import * as React from "react"
import {useEffect, useState} from "react"

import "./LikeTimelineCard.scss";
import {NavLink} from "react-router-dom";
import {TMDB_BASE_POSTER_URL} from "../../constants/GenericConstants";
import {isLoggedIn} from "../../util/AuthUtil";
import {RiHeartFill, RiHeartLine} from "react-icons/all";
import {AiFillStar} from "react-icons/ai";
import {HStack, useToast} from "@chakra-ui/react";
import {checkLikedMovieById, dislikeMovieById, likeMovieById} from "../../apiClient/MovieService";
import moment from "moment";

function LikeTimelineCard(props) {
  const toast = useToast();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (isLoggedIn()) {
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
  }, [props.movie.id]);

  function likeMovie() {
    if (isLoggedIn()) {
      likeMovieById(props.movie.id).then(r => {
        if (r === true) {
          toast({
            title: props.movie.title + " liked",
            status: "success",
            duration: 2000,
          })
          setLiked(true);

          props.setDisplayRefreshLikedMovies && props.setDisplayRefreshLikedMovies(true);
        }
      });
    }
  }

  function dislikeMovie() {
    if (isLoggedIn()) {
      dislikeMovieById(props.movie.id).then(r => {
        if (r === true) {
          toast({
            title: props.movie.title + " disliked",
            status: "info",
            duration: 2000,
          })
          setLiked(false);

          props.setDisplayRefreshLikedMovies && props.setDisplayRefreshLikedMovies(true);
        }
      });
    }
  }

  return (
    <div className="like-timeline-card">
      <div className="like-timeline-card__box">
        <NavLink to={{
          pathname: `/movie/${props.movie.id}`,
          state: {movie: props.movie}
        }}>
          <div className="like-timeline-card__image">
            <img src={TMDB_BASE_POSTER_URL + props.movie.posterPath} width="200px" alt="poster"/>
          </div>
        </NavLink>

        <div className="like-timeline-card__info">
          {isLoggedIn() && <div className="like-timeline-card__time">Liked {moment(props.movie.likeTime).fromNow()}</div>}
          <div className="like-timeline-card__basic-info">
            <NavLink to={{
              pathname: `/movie/${props.movie.id}`,
              state: {movie: props.movie}
            }}>
              <span className="like-timeline-card__title">
                {props.movie.title}
              </span>
            </NavLink>
            <span className="like-timeline-card__year">
            {props.movie.releaseDate.substring(0, 4)}
          </span>
          </div>

          <HStack className="like-timeline-card__genres" spacing="10px">
            {props.movie.genres.map((genre, i) => (
              <div className="like-timeline-card__genre">{genre}</div>
            ))}
          </HStack>
          <div className="like-timeline-card__rating">
            <AiFillStar color="#F6E05E" size="30px"/>
            <span className="like-timeline-card__rating-value">
              {props.movie.voteAverage}
            </span>
          </div>
        </div>

        {isLoggedIn() && (!liked ?
            <div className="like-timeline-card__like" onClick={likeMovie}>
              <RiHeartLine className="like-timeline-card__like-icon" size={"30px"}/>
            </div>
            :
            <div className="like-timeline-card__like-selected" onClick={dislikeMovie}>
              <RiHeartFill className="like-timeline-card__like-icon-selected" size={"30px"}/>
            </div>
        )}
      </div>

    </div>
  )
}


export default LikeTimelineCard;
