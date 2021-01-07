import * as React from "react"
import {useLocation} from "react-router-dom";

import {TMDB_BASE_BACKDROP_URL} from "../../constants/GenericConstants";

import {AiFillLike, AiOutlineLike, RiHeartFill, RiHeartLine} from "react-icons/all";
import {IconButton, Box, HStack, useToast} from "@chakra-ui/react";

import "./DetailsHero.scss";
import {useEffect, useState} from "react";
import {checkLikedMovieById, dislikeMovieById, likeMovieById} from "../../apiClient/MovieService";

function DetailsHero(props) {
  const location = useLocation()
  const backdropUrl = TMDB_BASE_BACKDROP_URL + location.state.movie.backdropPath;
  const movieBasic = location.state.movie;
  const toast = useToast();

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    checkLikedMovieById(movieBasic.id).then(res => {
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
  }, []);


  function likeMovie() {
    likeMovieById(movieBasic.id).then(r => {
      toast({
        title: movieBasic.title + " liked",
        status: "success",
        duration: 2000,
      })
      setLiked(true);
    });
  }

  function dislikeMovie() {
    dislikeMovieById(movieBasic.id).then(r => {
      if (r === true) {
        toast({
          title: movieBasic.title + " disliked",
          status: "info",
          duration: 2000,
        })
        setLiked(false);
      }
    });
  }

  return (
    <Box className="details-hero" bgImage={`linear-gradient(90deg, rgba(55,38,59,0.8690826672465861) 26%, rgba(59,18,52,0.6533963927367823) 62%, rgba(164,79,168,0.4405112386751575) 100%), url(${backdropUrl})`}>
      <h1 className="details-hero__title">{movieBasic.title}</h1>
      <HStack className="details-hero__genres" spacing="10px">
      {props.movie.genres.map((genre, i) => (
        <div className="details-hero__genre">{genre}</div>
      ))}
      </HStack>
      <h3 className="details-hero__year">{movieBasic.releaseDate.substring(0, 4)}</h3>

      <div className="details-hero__ratings">
        <div className="details-hero__rating">
          <div className="details-hero__rating-icon">IMDb</div>
          <div className="details-hero__rating-text"><span className="details-hero__rating-value">{props.movie.ratings[0] ? props.movie.ratings[0].value.split("/")[0] : "?"}</span><span className="details-hero__rating-max"> / 10</span></div>
        </div>
        <div className="details-hero__rating-separator"></div>
        <div className="details-hero__rating">
          <div className="details-hero__rating-icon">RottenTomatoes</div>
          <div className="details-hero__rating-text"><span className="details-hero__rating-value">{props.movie.ratings[1] ? props.movie.ratings[1].value : "?"}</span></div>
        </div>
        <div className="details-hero__rating-separator"></div>
        <div className="details-hero__rating">
          <div className="details-hero__rating-icon">Metacritic</div>
          <div className="details-hero__rating-text"><span className="details-hero__rating-value">{props.movie.ratings[2] ? props.movie.ratings[2].value.split("/")[0] : "?"}</span><span className="details-hero__rating-max"> / 100</span></div>
        </div>
      </div>
      {!liked ?
        <div className=" details-hero__like" onClick={likeMovie}>
          <RiHeartLine className="details-hero__like-icon" size={"40px"}/>
        </div>
        :
        <div className=" details-hero__like-selected" onClick={dislikeMovie}>
          <RiHeartFill className="details-hero__like-icon-selected" size={"40px"}/>
        </div>
      }
    </Box>
  )
}

export default DetailsHero
