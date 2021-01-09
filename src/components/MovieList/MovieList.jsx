import * as React from "react"
import {NavLink} from "react-router-dom";

import MovieCard from "../MovieCard/MovieCard";

import {Wrap, WrapItem} from "@chakra-ui/react";

import "./MovieList.scss";

function MovieList(props) {
  const size = props.size || 20;
  const disableSeeAll = props.disableSeeAll || false;
  const movies = props.showAll ? props.movies : props.movies.slice(0, size);

  return (
    <div className="movie-list">
      <div className="movie-list__header">
        {!props.disableTitle &&
        <div className="movie-list__title">
          {props.title ? props.title : ""}
        </div>
        }
        {!(props.movies.length === 0 || disableSeeAll) &&
        <NavLink to={{
          pathname: props.linkTo,
          state: {
            title: props.title,
            movies: props.movies,
            authenticated: props.authenticated,
            emptyText: props.emptyText,
            isRecommendationList: props.isRecommendationList
          }
        }}>
          <div className="movie-list__see-all">
            See all
          </div>
        </NavLink>}
      </div>
      {props.movies.length === 0 ?
        <div className="movie-list__empty-message"><span>{props.emptyText}</span></div>
        :
        <Wrap className="movie-list__cards" spacing="30px" justify="center">
          {movies.map((movie, i) =>
            <WrapItem key={i}>
              <MovieCard authenticated={props.authenticated} movie={movie}
                         setDisplayRefreshRecommendations={props.setDisplayRefreshRecommendations}/>
            </WrapItem>)}
        </Wrap>
      }
    </div>
  )
}

export default MovieList;
