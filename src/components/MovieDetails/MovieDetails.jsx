import * as React from "react"
import {useEffect, useState} from "react"

import {useParams} from "react-router";

import DetailsHero from "../DetailsHero/DetailsHero";

import {Fade, Wrap} from "@chakra-ui/react";

import "./MovieDetails.scss";
import {TMDB_BASE_POSTER_URL} from "../../constants/GenericConstants";
import {useLocation} from "react-router-dom";
import MmSpinner from "../MmSpinner/MmSpinner";
import {getMovieById} from "../../apiClient/MovieService";
import DetailsCard from "../DetailsCard/DetailsCard";

function MovieDetails(props) {
  const {id} = useParams();
  const location = useLocation()
  const movieBasic = location.state.movie;

  const [movie, setMovie] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [actors, setActors] = useState("");

  useEffect(() => {
    getMovieById(id).then(r => {
      setMovie(r);
      setLoaded(true);
      setActors(r.actors.join(', '));
    });
  }, [id]);

  return (
    !loaded ? <MmSpinner/> :
      <Fade in>
        <DetailsHero {...props} movie={movie}/>
        <div className="movie-details__hero-separator"></div>
        <div className="movie-details__body">
          <div className="movie-details__content">
            <div className="movie-details__poster-video-content">
              <div className="movie-details__poster">
                <img src={TMDB_BASE_POSTER_URL + movieBasic.posterPath} alt="poster"/>
              </div>
              <div className="movie-details__video">
                <div className="movie-details__trailer-text">
                  Trailer
                </div>
                <iframe width="600" height="450"
                        src={"https://www.youtube.com/embed/" + movie.youtubeKey}>
                </iframe>
              </div>
            </div>
            <div className="movie-details__overview-basic-info">
              <DetailsCard title="Overview"
                           content={<span className="movie-details__overview-text">{movie.overview}</span>}/>
              <DetailsCard title="Information" content={
                <Wrap className="movie-details__basic-info-items">
                  <div className="movie-details__basic-info-text">
                    <span className="movie-details__basic-info-key">Director</span>
                    <span className="movie-details__basic-info-value">{movie.director}</span>
                  </div>
                  <div className="movie-details__basic-info-divider"/>
                  <div className="movie-details__basic-info-text">
                    <span className="movie-details__basic-info-key">Runtime</span>
                    <span className="movie-details__basic-info-value">{movie.runtime} minutes</span>
                  </div>
                  <div className="movie-details__basic-info-divider"/>
                  <div className="movie-details__basic-info-text">
                    <span className="movie-details__basic-info-key">Actors</span>
                    <div className="movie-details__basic-info-value">{actors}</div>
                  </div>
                </Wrap>
              }/>
            </div>
          </div>
        </div>
      </Fade>
  )
}

export default MovieDetails;
