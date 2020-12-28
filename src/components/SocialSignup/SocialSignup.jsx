import React from "react";

import {FACEBOOK_AUTH_URL, GOOGLE_AUTH_URL} from "../../constants/AuthConstants";

import {FaFacebook, FaGoogle} from "react-icons/fa";
import {Button} from "@chakra-ui/react";

import './SocialSignup.scss';

function SocialSignup() {
  return (
    <div className="social-signup">
      <a href={FACEBOOK_AUTH_URL}>
        <Button colorScheme="facebook" leftIcon={<FaFacebook/>} _hover={{
          bg: "#6381b8",
          color: "#000000"
        }}>
          Sign up with Facebook
        </Button>
      </a>

      <a href={GOOGLE_AUTH_URL}>
        <Button className="hero__button-google" bg="#DE5246" leftIcon={<FaGoogle/>} _hover={{
          bg: "#e29890",
          color: "#000000"
        }}>
          Sign up with Google
        </Button>
      </a>
    </div>
  );

}

export default SocialSignup;
