import React, {useEffect} from 'react';
import {Link, Redirect, useHistory, useLocation} from 'react-router-dom'

import LoginForm from "../LoginForm/LoginForm";
import SocialLogin from "../SocialLogin/SocialLogin";

import {Fade, useToast} from "@chakra-ui/react";

import './Login.scss';

function Login(props) {
  const location = useLocation();
  const history = useHistory();
  const toast = useToast();

  useEffect(() => {
    // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    // Here we display the error and then remove the error query parameter from the location.
    if (location.state && location.state.error) {
      setTimeout(() => {
        toast({
          title: "Error",
          description: location.state.error,
          status: "error",
          duration: 5000,
          isClosable: true,
        })

        history.replace({
          pathname: location.pathname,
          state: {}
        });
      }, 100);
    }
  }, []);


  if (props.authenticated) {
    return <Redirect
      to={{
        pathname: "/",
        state: {from: location}
      }}/>;
  }

  return (
    <div className="login-container">
      <Fade in>
        <div className="login-content">
          <div className="login-content__image">
            <img src="/images/login_image.png"/>
          </div>
          <div className="login-content__form">
            <h1 className="login-content__form__title">Log in</h1>
            <SocialLogin/>
            <div className="login-content__form__or-separator">
              <span className="login-content__form__or-text">OR</span>
            </div>
            <LoginForm {...props} />
            <div className="login-content__form__signup-link-container">
              <span className="login-content__form__signup-link">New user? <Link to="/signup"
                                                                                 className="login-content__form__signup-link-button">Sign up</Link></span>
            </div>
          </div>
        </div>
      </Fade>
    </div>
  );
}

export default Login;
