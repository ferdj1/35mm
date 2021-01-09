import * as React from "react"

import "./MovieListScreenHero.scss";
import {Avatar} from "@chakra-ui/react";

function MovieListScreenHero(props) {
  return (
    <div className="movie-list-screen-hero">
      <div className="movie-list-screen-hero__title">{props.title}</div>
    </div>
  )
}

export default MovieListScreenHero;
