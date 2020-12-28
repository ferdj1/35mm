import * as React from "react"

import MovieCard from "../MovieCard/MovieCard";

import "./MovieList.scss";

function MovieList(props) {
  return (
    <div className="movie-list">
      <h3 className="movie-list__title">
        Popular Movies
      </h3>
      <div className="movie-list__cards">
        {props.movies.map((movie, i) => <MovieCard key={i} movie={movie}/>)}
      </div>
    </div>
  )
}

export default MovieList;
