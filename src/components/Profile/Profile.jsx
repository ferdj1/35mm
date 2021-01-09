import * as React from "react"

import "./Profile.scss";
import ProfileHero from "../ProfileHero/ProfileHero";
import SelectButton from "../SelectButton/SelectButton";
import {Fade, Tooltip, useToast} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getLikedMovies, getRecommendedMovies} from "../../apiClient/MovieService";
import {isLoggedIn} from "../../util/AuthUtil";
import MmSpinner from "../MmSpinner/MmSpinner";
import LikeTimelineCard from "../LikeTimelineCard/LikeTimelineCard";
import {MdRefresh} from "react-icons/all";

function Profile(props) {

  const [likedMovies, setLikedMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [displayRefreshLikedMovies, setDisplayRefreshLikedMovies] = useState(false);

  const toast = useToast();

  useEffect(() => {
    loadLikedMovies();
  }, []);

  function loadLikedMovies() {
    if (isLoggedIn()) {
      setLoaded(false);
      getLikedMovies().then(response => {
        setLikedMovies(response);
        setLoaded(true);
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

  function refreshLikedMovies() {
    if (isLoggedIn()) {
      setLoaded(false);
      getLikedMovies().then(response => {
        setLikedMovies(response);
        setLoaded(true);

        setDisplayRefreshLikedMovies(false);
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
      <div className="profile">
        <ProfileHero {...props} />
        <div className="profile__genre-select-cnt">
          <h2 className="profile__genre-select-title">Pick your favorite genres</h2>
          <div className="profile__genre-select">
            {
              props.genres.map((genre, i) =>
                <SelectButton text={genre.name} key={i} selected={props.favoriteGenres.includes(genre.name)}
                              handleGenreSelectClick={props.handleGenreSelectClick}/>
              )
            }
          </div>
        </div>
        {loaded ?
          <div className="profile__like-timeline">
            <h2 className="profile__like-timeline-title">Your liked movies</h2>
            {likedMovies.map((movie, i) => <LikeTimelineCard movie={movie} key={i} setDisplayRefreshLikedMovies={setDisplayRefreshLikedMovies}/>)}
          </div> : <MmSpinner />
        }
      </div>
      {displayRefreshLikedMovies &&
      <Tooltip label="Refresh recommendations" placement="left" offset={[0, 30]}>
        <div className="homepage__refresh-recommendations" onClick={refreshLikedMovies}>
          <MdRefresh className="homepage__refresh-recommendations-icon" size="25px"/>
        </div>
      </Tooltip>
      }
    </Fade>
  )
}

export default Profile;
