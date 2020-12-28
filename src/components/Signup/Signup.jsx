import React from 'react';
import {Link, Redirect} from 'react-router-dom';

import SocialSignup from "../SocialSignup/SocialSignup";
import SignupForm from "../SignupForm/SignupForm";

import {Fade} from "@chakra-ui/react";

import './Signup.scss';

function Signup(props) {

  if (props.authenticated) {
    return <Redirect
      to={{
        pathname: "/",
        state: {from: props.location}
      }}/>;
  }

  return (
    <div className="signup-container">
      <Fade in>
        <div className="signup-content">
          <div className="signup-content__image">
            <img src="/images/signup_image.png"/>
          </div>
          <div className="signup-content__form">
            <h1 className="signup-content__form__title">Create account</h1>
            <SocialSignup/>
            <div className="signup-content__form__or-separator">
              <span className="signup-content__form__or-text">OR</span>
            </div>
            <SignupForm {...props} />
            <div className="signup-content__form__login-link-container">
              <span className="signup-content__form__login-link">Already have an account? <Link to="/login"
                                                                                                className="signup-content__form__login-link-button">Login</Link></span>
            </div>
          </div>
        </div>
      </Fade>
    </div>

  );
}

export default Signup
