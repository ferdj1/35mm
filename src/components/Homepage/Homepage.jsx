import * as React from "react"
import {useEffect, useState} from "react"

import Hero from "../Hero/Hero";
import MovieList from "../MovieList/MovieList";
import {
  getAllTimePopular,
  getDailyPopular,
  getGenreBasedMovies, getMonthlyPopular,
  getRecommendedMovies,
  getTopRatedMovies, getWeeklyPopular,
  searchTopRatedMovies
} from "../../apiClient/MovieService";

import {Fade, Input, Tooltip, Select, useToast} from "@chakra-ui/react";

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
  const [dailyPopularMovies, setDailyPopularMovies] = useState([]);
  const [weeklyPopularMovies, setWeeklyPopularMovies] = useState([]);
  const [monthlyPopularMovies, setMonthlyPopularMovies] = useState([]);
  const [allTimePopularMovies, setAllTimePopularMovies] = useState([]);
  const [loadedTopRatedMovies, setLoadedTopRatedMovies] = useState(false);
  const [loadedRecommendedMovies, setLoadedRecommendedMovies] = useState(false);
  const [loadedDailyPopularMovies, setLoadedDailyPopularMovies] = useState(false);
  const [loadedWeeklyPopularMovies, setLoadedWeeklyPopularMovies] = useState(false);
  const [loadedMonthlyPopularMovies, setLoadedMonthlyPopularMovies] = useState(false);
  const [loadedAllTimePopularMovies, setLoadedAllTimePopularMovies] = useState(false);
  const [loadedGenreBasedMovies, setLoadedGenreBasedMovies] = useState(false);
  const [loadedSearchedMovies, setLoadedSearchedMovies] = useState(false);
  const [displayRefreshRecommendations, setDisplayRefreshRecommendations] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [popularValue, setPopularValue] = useState("POPULAR_DAILY");
  const [currentPopularMovies, setCurrentPopularMovies] = useState([]);
  const [currentPopularLink, setCurrentPopularLink] = useState("/movie/popular/daily");

  const popularSelector = (<Select _focus={{bg: "#ffffff"}} variant="filled" placeholder="Select option" defaultValue="POPULAR_DAILY" onChange={(e) => handlePopularChange(e.target.value)}>
    <option value="POPULAR_DAILY">Daily</option>
    <option value="POPULAR_WEEKLY">Weekly</option>
    <option value="POPULAR_MONTHLY">Monthly</option>
    <option value="POPULAR_ALL_TIME">All time</option>
  </Select>);

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

    getDailyPopular()
      .then(response => {
        setDailyPopularMovies(response);
        setLoadedDailyPopularMovies(true);
        setCurrentPopularMovies(response);
      }).catch(error => {
      toast({
        title: "Error",
        description: (error && error.error) || 'Oops! Something went wrong. Please try again!',
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    });


    getWeeklyPopular()
      .then(response => {
        setWeeklyPopularMovies(response);
        setLoadedWeeklyPopularMovies(true);
      }).catch(error => {
      toast({
        title: "Error",
        description: (error && error.error) || 'Oops! Something went wrong. Please try again!',
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    });


    getMonthlyPopular()
      .then(response => {
        setMonthlyPopularMovies(response);
        setLoadedMonthlyPopularMovies(true);
      }).catch(error => {
      toast({
        title: "Error",
        description: (error && error.error) || 'Oops! Something went wrong. Please try again!',
        status: "error",
        duration: 5000,
        isClosable: true,
      })
    });


    getAllTimePopular()
      .then(response => {
        setAllTimePopularMovies(response);
        setLoadedAllTimePopularMovies(true);
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

  function handlePopularChange(value) {
    console.log(value)
    setPopularValue(value);

    switch (value) {
      case "POPULAR_DAILY":
        setCurrentPopularMovies(dailyPopularMovies);
        setCurrentPopularLink("/movie/popular/daily");
        break;

      case "POPULAR_WEEKLY":
        setCurrentPopularMovies(weeklyPopularMovies);
        setCurrentPopularLink("/movie/popular/weekly");
        break;

      case "POPULAR_MONTHLY":
        setCurrentPopularMovies(monthlyPopularMovies);
        setCurrentPopularLink("/movie/popular/monthly");
        break;

      case "POPULAR_ALL_TIME":
        setCurrentPopularMovies(allTimePopularMovies);
        setCurrentPopularLink("/movie/popular/all-time");
        break;

      default:
        setCurrentPopularMovies(dailyPopularMovies);
        setCurrentPopularLink("/movie/popular/daily");
        break;
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
          <MovieList authenticated={props.authenticated} title={`Search results  (${searchedMovies.length})`}
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

          {loadedDailyPopularMovies && loadedWeeklyPopularMovies && loadedMonthlyPopularMovies && loadedAllTimePopularMovies ?
            <MovieList authenticated={props.authenticated} title="Popular movies" selector={popularSelector} movies={currentPopularMovies} size={20}
                       setDisplayRefreshRecommendations={setDisplayRefreshRecommendations} linkTo={currentPopularLink}/>
                       : <MmSpinner />
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
