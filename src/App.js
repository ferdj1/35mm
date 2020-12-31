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

import {ChakraProvider} from "@chakra-ui/react";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCurrentlyLoggedInUser();
  }, []);

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
            <Route exact path="/" render={(props) => <Homepage authenticated={authenticated} {...props} />}/>
            <PrivateRoute path="/profile" authenticated={authenticated} currentUser={currentUser}
                          component={Profile}/>
            <Route path="/login"
                   render={(props) => <Login authenticated={authenticated} {...props} />}/>
            <Route path="/signup"
                   render={(props) => <Signup authenticated={authenticated} {...props} />}/>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}/>
            <Route path="/movie/:id" render={props => <MovieDetails {...props}/>}/>
            <Route component={NotFound}/>
          </Switch>
        </ScrollToTop>
      </UserContext.Provider>
    </ChakraProvider>
  )
}

export default App
