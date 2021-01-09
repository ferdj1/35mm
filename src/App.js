import * as React from "react"
import {useEffect, useState} from "react"
import {Route, Switch} from 'react-router-dom';

import Header from "./components/Header/Header";
import Signup from "./components/Signup/Signup";
import Homepage from "./components/Homepage/Homepage";
import Profile from "./components/Profile/Profile";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler/OAuth2RedirectHandler";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import {ACCESS_TOKEN} from "./constants/AuthConstants";
import {getCurrentUser} from "./apiClient/UserService";
import UserContext from "./context/UserContext";

import {ChakraProvider, useToast} from "@chakra-ui/react";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import {getFavoriteGenres, getGenres, updateFavoriteGenres} from "./apiClient/GenreService";
import MovieListScreen from "./MovieListScreen/MovieListScreen";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [genres, setGenres] = useState([]);
  const [favoriteGenres, setFavoriteGenres] = useState([]);

  const toast = useToast();

  useEffect(() => {
    loadCurrentlyLoggedInUser();
    loadGenres();
    loadFavoriteGenres();
  }, []);

  useEffect(() => {
    triggerUpdateFavoriteGenres();
  }, [favoriteGenres]);

  function loadCurrentlyLoggedInUser() {
    setLoading(true);

    getCurrentUser()
      .then(response => {
        setCurrentUser(response);
        setAuthenticated(true);
        setLoading(false);
      }).catch(error => {
      setLoading(false);
    });
  }

  function handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    setCurrentUser(null);
  }

  function loadGenres() {
    getGenres().then(res => {
      setGenres(res);
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

  function loadFavoriteGenres() {
    getFavoriteGenres().then(res => {
      setFavoriteGenres(res);
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

  function triggerUpdateFavoriteGenres() {
    updateFavoriteGenres(favoriteGenres).then(res => {
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

  function handleGenreSelectClick(genre) {
    let favGenres = [...favoriteGenres];
    if (favGenres.includes(genre)) {
      favGenres = favGenres.filter(g => g !== genre);
    } else {
      favGenres.push(genre);
    }
    setFavoriteGenres(favGenres);
  }


  return (
    <ChakraProvider>
      <UserContext.Provider value={{
        authenticated: authenticated,
        currentUser: currentUser,
        loadCurrentlyLoggedInUser: loadCurrentlyLoggedInUser
      }}>
        <Header authenticated={authenticated} currentUser={currentUser} onLogout={handleLogout}/>
        <ScrollToTop>
          <Switch>
            <Route exact path="/" render={(props) => <Homepage authenticated={authenticated} favoriteGenres={favoriteGenres} {...props} />}/>
            <PrivateRoute path="/profile" authenticated={authenticated}
                          currentUser={currentUser} genres={genres}
                          favoriteGenres={favoriteGenres} setFavoriteGenres={setFavoriteGenres}
                          triggerUpdateFavoriteGenres={triggerUpdateFavoriteGenres}
                          handleGenreSelectClick={handleGenreSelectClick}
                          component={Profile}/>
            <Route path="/login"
                   render={(props) => <Login authenticated={authenticated} {...props} />}/>
            <Route path="/signup"
                   render={(props) => <Signup authenticated={authenticated} {...props} />}/>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
            <Route path="/movie/recommendations" render={props => <MovieListScreen {...props}/>}/>
            <Route path="/movie/genre-based" render={props => <MovieListScreen {...props}/>}/>
            <Route path="/movie/popular/daily" render={props => <MovieListScreen {...props}/>}/>
            <Route path="/movie/popular/weekly" render={props => <MovieListScreen {...props}/>}/>
            <Route path="/movie/popular/monthly" render={props => <MovieListScreen {...props}/>}/>
            <Route path="/movie/popular/all-time" render={props => <MovieListScreen {...props}/>}/>
            <Route path="/movie/top" render={props => <MovieListScreen {...props}/>}/>
            <Route path="/movie/:id" render={props => <MovieDetails {...props}/>}/>
            <Route component={NotFound}/>
          </Switch>
        </ScrollToTop>
      </UserContext.Provider>
    </ChakraProvider>
  )
}

export default App
