import * as React from "react"
import {useLocation} from "react-router-dom";

import {TMDB_BASE_BACKDROP_URL} from "../../constants/GenericConstants";

import {Box, HStack} from "@chakra-ui/layout";

import "./DetailsHero.scss";

function DetailsHero(props) {
  const location = useLocation()
  const backdropUrl = TMDB_BASE_BACKDROP_URL + location.state.movie.backdropPath;
  const movie = location.state.movie;
  const genres = ['Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Documentary'];

  return (
    <Box className="details-hero" bgImage={`linear-gradient(90deg, rgba(55,38,59,0.8690826672465861) 26%, rgba(59,18,52,0.6533963927367823) 62%, rgba(164,79,168,0.4405112386751575) 100%), url(${backdropUrl})`}>
      <h1 className="details-hero__title">{movie.title}</h1>
      <HStack className="details-hero__genres" spacing="10px">
      {genres.map((genre, i) => (
        <div className="details-hero__genre">{genre}</div>
      ))}
      </HStack>
      <h3 className="details-hero__year">{movie.releaseDate.substring(0, 4)}</h3>

      <div className="details-hero__ratings">
        <div className="details-hero__rating">
          <div className="details-hero__rating-icon">IMDb</div>
          <div className="details-hero__rating-text"><span className="details-hero__rating-value">6.9</span><span className="details-hero__rating-max"> / 10</span></div>
        </div>
        <div className="details-hero__rating-separator"></div>
        <div className="details-hero__rating">
          <div className="details-hero__rating-icon">RottenTomatoes</div>
          <div className="details-hero__rating-text"><span className="details-hero__rating-value">75</span><span className="details-hero__rating-max"> / 100</span></div>
        </div>
        <div className="details-hero__rating-separator"></div>
        <div className="details-hero__rating">
          <div className="details-hero__rating-icon">Metacritic</div>
          <div className="details-hero__rating-text"><span className="details-hero__rating-value">85</span><span className="details-hero__rating-max"> / 100</span></div>
        </div>
      </div>
    </Box>
  )
}

export default DetailsHero
