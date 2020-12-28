import React from "react";

import {FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL} from "../../constants/AuthConstants";

import {Button} from "@chakra-ui/react";
import {FaFacebook, FaGoogle} from "react-icons/fa";

import "./SocialLogin.scss";

function SocialLogin() {
  return (
    <div className="social-login">
      <a href={FACEBOOK_AUTH_URL}>
        <Button colorScheme="facebook" leftIcon={<FaFacebook/>} _hover={{
          bg: "#6381b8",
          color: "#000000"
        }}>
          Log in with Facebook
        </Button>
      </a>

      <a href={GOOGLE_AUTH_URL}>
        <Button className="hero__button-google" bg="#DE5246" leftIcon={<FaGoogle/>} _hover={{
          bg: "#e29890",
          color: "#000000"
        }}>
          Log in with Google
        </Button>
      </a>
    </div>
  );
}

export default SocialLogin;
