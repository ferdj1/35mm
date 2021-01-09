import * as React from "react"
import {useEffect, useState} from "react"

import Hero from "../Hero/Hero";
import MovieList from "../MovieList/MovieList";
import {
  getGenreBasedMovies,
  getRecommendedMovies,
  getTopRatedMovies,
  searchTopRatedMovies
} from "../../apiClient/MovieService";

import {Fade, Input, Tooltip, useToast} from "@chakra-ui/react";

import "./Homepage.scss";
import MmSpinner from "../MmSpinner/MmSpinner";
import {MdRefresh} from "react-icons/all";
import {ACCESS_TOKEN} from "../../constants/AuthConstants";

function Homepage(props) {
  const toast = useToast();
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [genreBasedMovies, setGenreBasedMovies] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [loadedTopRatedMovies, setLoadedTopRatedMovies] = useState(false);
  const [loadedRecommendedMovies, setLoadedRecommendedMovies] = useState(false);
  const [loadedGenreBasedMovies, setLoadedGenreBasedMovies] = useState(false);
  const [loadedSearchedMovies, setLoadedSearchedMovies] = useState(false);
  const [displayRefreshRecommendations, setDisplayRefreshRecommendations] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);


  useEffect(() => {
    loadGenreBasedMovies();
  }, [props.favoriteGenres]);

  function loadMovies() {
    getTopRatedMovies()
      .then(response => {
        setTopRatedMovies(response);
        setLoadedTopRatedMovies(true);
      }).catch(error => {
      toast({
        title: "Error",
        description: (error && error.error) || 'Oops! Something went wrong. Please try again!',
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    });

    if (props.authenticated || localStorage.getItem(ACCESS_TOKEN)) {
      getRecommendedMovies().then(response => {
        setRecommendedMovies(response);
        setLoadedRecommendedMovies(true);
      }).catch(error => {
        toast({
          title: "Error",
          description: (error && error.error) || 'Oops! Something went wrong. Please try again!',
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      });

    }
  }

  function loadGenreBasedMovies() {
    if (props.authenticated || localStorage.getItem(ACCESS_TOKEN)) {
      getGenreBasedMovies(props.favoriteGenres).then(response => {
        setGenreBasedMovies(response);
        setLoadedGenreBasedMovies(true);
      }).catch(error => {
        toast({
          title: "Error",
          description: (error && error.error) || 'Oops! Something went wrong. Please try again!',
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      });
    }
  }

  function refreshRecommendations() {
    if (props.authenticated) {
      getRecommendedMovies().then(response => {
        setRecommendedMovies(response);
        setLoadedRecommendedMovies(true);

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

  function handleSearchChange(search) {
    setSearchValue(search);
  }

  function handleSearchKeyDown(event) {
    if (event.key === 'Enter') {
      searchTopRatedMovies(searchValue).then(res => {
        setSearchedMovies(res);
        setLoadedSearchedMovies(true);
      });
    }
  }

  return (
    <div className="homepage">
      <Fade in>
        <Hero authenticated={props.authenticated} handleSearchKeyDown={handleSearchKeyDown}
              handleSearchChange={handleSearchChange}/>
        <div className="homepage__hero-separator">
          <Input className="hero__search" variant="flushed" mt={0} size="lg" placeholder="Search movies"
                 onKeyDown={(event) => handleSearchKeyDown(event)} onChange={(event) => {
            handleSearchChange(event.currentTarget.value)
          }}/>
        </div>
        <div className="homepage__body">
          {loadedSearchedMovies &&
          <MovieList authenticated={props.authenticated} title={`Search results ${searchedMovies.length}`}
                     movies={searchedMovies} disableSeeAll
                     setDisplayRefreshRecommendations={setDisplayRefreshRecommendations}
                     emptyText={`No movies found`} />
          }

          {props.authenticated && loadedRecommendedMovies ?
            <MovieList authenticated={props.authenticated} title="Recommended for You" movies={recommendedMovies} size={20}
                       setDisplayRefreshRecommendations={setDisplayRefreshRecommendations} linkTo="/movie/recommendations"
                       emptyText="You haven't liked any movies yet. Recommendations will show up when you like some movies!"
                       isRecommendationList/>
            : (!props.authenticated ? <></> : <MmSpinner/>)
          }
          {props.authenticated && loadedGenreBasedMovies ?
            <MovieList authenticated={props.authenticated} title="Based on genres You like" movies={genreBasedMovies} size={20}
                       setDisplayRefreshRecommendations={setDisplayRefreshRecommendations} linkTo="/movie/genre-based"
                       emptyText="You haven't chosen any genres yet. Recommendations will show up when you select some!"/>
            : (!props.authenticated ? <></> : <MmSpinner/>)
          }
          {!loadedTopRatedMovies ?
            <MmSpinner/> :
            <MovieList authenticated={props.authenticated} title="Top Rated Movies" movies={topRatedMovies} size={20}
                       setDisplayRefreshRecommendations={setDisplayRefreshRecommendations} linkTo="/movie/top"/>
          }
          {displayRefreshRecommendations &&
          <Tooltip label="Refresh recommendations" placement="left" offset={[0, 30]}>
            <div className="homepage__refresh-recommendations" onClick={refreshRecommendations}>
              <MdRefresh className="homepage__refresh-recommendations-icon" size="25px"/>
            </div>
          </Tooltip>
          }
        </div>
      </Fade>
    </div>
  )
}

export default Homepage;
