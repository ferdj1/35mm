import * as React from "react"
import {NavLink} from "react-router-dom";

import {Button} from "@chakra-ui/react";
import {AiOutlineLogin, AiOutlineUser} from "react-icons/ai";
import {Fade} from "@chakra-ui/transition";

import "./Hero.scss";

function Hero(props) {
  return (
    <div className="hero">
      <h1 className="hero__title">35mm</h1>
      <h3 className="hero__subtitle">Find movies and TV shows based on your taste</h3>
      {!props.authenticated && <Fade in>
        <div className="hero__button-container">
          <NavLink to="/login">
            <Button bg="#553C9A" color="#fff" size="lg" leftIcon={<AiOutlineLogin/>} _hover={{
              bg: "#9F7AEA",
              color: "#000000"
            }}>
              Login
            </Button>
          </NavLink>
          <NavLink to="/signup">
            <Button bg="#D69E2E" size="lg" leftIcon={<AiOutlineUser/>} _hover={{
              bg: "#d4b76d",
              color: "#000000"
            }}>
              Create an account
            </Button>
          </NavLink>
        </div>
      </Fade>}
    </div>
  )
}

export default Hero
