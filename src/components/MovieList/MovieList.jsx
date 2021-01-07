import * as React from "react"
import {NavLink} from "react-router-dom";

import MovieCard from "../MovieCard/MovieCard";

import {Wrap, WrapItem} from "@chakra-ui/react";

import "./MovieList.scss";

function MovieList(props) {
  return (
    <div className="movie-list">
      <h3 className="movie-list__title">
        {props.title}
      </h3>
      { props.movies.length === 0 ?
        <div className="movie-list__empty-message"><span>{props.emptyText}</span></div>
        :
        <Wrap className="movie-list__cards" spacing="30px" justify="center">
          {props.movies.map((movie, i) =>
            <WrapItem>
              <MovieCard authenticated={props.authenticated} key={i} movie={movie} setDisplayRefreshRecommendations={props.setDisplayRefreshRecommendations}/>
            </WrapItem>)}
        </Wrap>
      }
    </div>
  )
}

export default MovieList;
