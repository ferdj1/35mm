import * as React from "react"

import "./MovieListScreen.scss";
import MovieListScreenHero from "../components/MovieListScreenHero/MovieListScreenHero";
import MovieList from "../components/MovieList/MovieList";
import {useLocation} from "react-router-dom";
import {Fade, Tooltip, useToast} from "@chakra-ui/react";
import {getRecommendedMovies} from "../apiClient/MovieService";
import {useState} from "react";
import {MdRefresh} from "react-icons/all";

function MovieListScreen(props) {
  const location = useLocation();
  const title = location.state.title;
  const authenticated = location.state.authenticated;
  const emptyText = location.state.emptyText;
  const isRecommendationList = location.state.isRecommendationList;

  const toast = useToast();

  const [movies, setMovies] = useState(location.state.movies);
  const [loaded, setLoaded] = useState(true);
  const [displayRefreshRecommendations, setDisplayRefreshRecommendations] = useState(false);

  function refreshRecommendations() {
    if (authenticated) {
      setLoaded(false);
      getRecommendedMovies().then(response => {
        setMovies(response);
        setLoaded(true);

        setDisplayRefreshRecommendations(false);
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
      }).catch(error => {
        toast({
          title: "Error",
          description: (error && error.error) || 'Oops! Something went wrong. Please try again!',
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      })
    }
  }

  return (
    <Fade in>
      <div className="movie-list-screen">
        <MovieListScreenHero title={title}/>
        <MovieList authenticated={authenticated}
                   movies={movies}
                   title={title}
                   disableSeeAll
                   disableTitle
                   showAll
                   setDisplayRefreshRecommendations={isRecommendationList && setDisplayRefreshRecommendations}
                   emptyText={emptyText}/>
      </div>
      {displayRefreshRecommendations &&
      <Tooltip label="Refresh recommendations" placement="left" offset={[0, 30]}>
        <div className="homepage__refresh-recommendations" onClick={refreshRecommendations}>
          <MdRefresh className="homepage__refresh-recommendations-icon" size="25px"/>
        </div>
      </Tooltip>
      }
    </Fade>
  )
}

export default MovieListScreen;
