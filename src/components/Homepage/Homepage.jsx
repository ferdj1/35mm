import * as React from "react"
import {useEffect, useState} from "react"

import Hero from "../Hero/Hero";
import MovieList from "../MovieList/MovieList";
import {getMovies} from "../../apiClient/MovieService";

import {Fade, useToast} from "@chakra-ui/react";

import "./Homepage.scss";

function Homepage(props) {
  const toast = useToast();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  function loadMovies() {
    getMovies()
      .then(response => {
        setMovies(response);
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

  return (
    <div className="homepage">
      <Fade in>
        <Hero authenticated={props.authenticated}/>
        <MovieList movies={movies}/>
      </Fade>
    </div>
  )
}

export default Homepage;
