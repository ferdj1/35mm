import * as React from "react"
import {NavLink} from "react-router-dom";

import MovieCard from "../MovieCard/MovieCard";

import {Wrap, WrapItem} from "@chakra-ui/react";

import "./MovieList.scss";

function MovieList(props) {
  return (
    <div className="movie-list">
      <h3 className="movie-list__title">
        Popular Movies
      </h3>
      <Wrap className="movie-list__cards" spacing="30px" justify="center">
        {props.movies.map((movie, i) =>
          <WrapItem>
            <NavLink to={{
              pathname: `/movie/${movie.id}`,
              state: {movie: movie}
            }}><MovieCard key={i} movie={movie}/>
            </NavLink>
          </WrapItem>)}
      </Wrap>
    </div>
  )
}

export default MovieList;
