import * as React from "react"

import {useParams} from "react-router";

import DetailsHero from "../DetailsHero/DetailsHero";

import {Fade, Wrap} from "@chakra-ui/react";

import "./MovieDetails.scss";
import {TMDB_BASE_POSTER_URL} from "../../constants/GenericConstants";
import {useLocation} from "react-router-dom";
import {Divider} from "@chakra-ui/layout";

function MovieDetails(props) {
  const {id} = useParams();
  const location = useLocation()
  const movie = location.state.movie;

  return (
    <Fade in>
      <DetailsHero {...props} />
      <div className="movie-details__hero-separator"></div>
      <div className="movie-details__body">
        <div className="movie-details__content">
          <div className="movie-details__poster-video-content">
            <div className="movie-details__poster">
              <img src={TMDB_BASE_POSTER_URL + movie.posterPath} alt="poster"/>
            </div>
            <div className="movie-details__video">
              <div className="movie-details__trailer-text">
                Trailer
              </div>
              <iframe width="600" height="450"
                      src="https://www.youtube.com/embed/5xH0HfJHsaY">
              </iframe>
            </div>
          </div>
          <div className="movie-details__overview-basic-info">
            <div className="movie-details__overview movie-details__info-card">
              <h4 className="movie-details__overview-title movie-details__info-title">Overview</h4>
              <span className="movie-details__overview-text">{movie.overview}</span>
            </div>
            <div className="movie-details__basic-info movie-details__info-card">
              <h4 className="movie-details__basic-info-title movie-details__info-title">Information</h4>
              <Wrap className="movie-details__basic-info-items">
                <div className="movie-details__basic-info-text">
                  <span className="movie-details__basic-info-key">Director</span>
                  <span className="movie-details__basic-info-value">Bong Joon Ho</span>
                </div>
                <div className="movie-details__basic-info-divider"/>
                <div className="movie-details__basic-info-text">
                  <span className="movie-details__basic-info-key">Writer</span>
                  <span className="movie-details__basic-info-value">Bong Joon Ho (story by), Bong Joon Ho (screenplay by), Han Jin-won (screenplay by)</span>
                </div>
                <div className="movie-details__basic-info-divider"/>
                <div className="movie-details__basic-info-text">
                  <span className="movie-details__basic-info-key">Director</span>
                  <span className="movie-details__basic-info-value">Bong Joon Ho</span>
                </div>
              </Wrap>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  )
}

export default MovieDetails;
