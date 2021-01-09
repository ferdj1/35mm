import * as React from "react"
import {useState} from "react"
import {NavLink, useLocation} from "react-router-dom";

import AuthenticatedHeader from "../AuthenticatedHeader/AuthenticatedHeader";

import {Fade} from "@chakra-ui/transition";

import "./Header.scss";
import {Button} from "@chakra-ui/react";
import {AiOutlineLogin, AiOutlineUser} from "react-icons/ai";

function Header(props) {
  const [yOffset, setYOffset] = useState(0);
  const location = useLocation();

  window.addEventListener("scroll", handleScroll);

  function handleScroll(event) {
    event.preventDefault();
    setYOffset(window.pageYOffset);
  }

  return (
    <div className={(location.pathname === "/" || location.pathname.startsWith("/movie/")
      || location.pathname.startsWith("/profile")) && yOffset < 60
      ? "header header--transparent"
      : "header header--solid"
    }>
      <NavLink to="/">
        <h1 className="header__logo">35mm</h1>
      </NavLink>
      {props.authenticated ? <Fade in><AuthenticatedHeader {...props} /></Fade> :
        (location.pathname !== ("/") &&
          <Fade in>
            <div className="header__auth-buttons">
              <NavLink to="/login">
                <Button bg="#553C9A" color="#fff" size="md" leftIcon={<AiOutlineLogin/>} _hover={{
                  bg: "#9F7AEA",
                  color: "#000000"
                }}>
                  Login
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button bg="#D69E2E" size="md" leftIcon={<AiOutlineUser/>} _hover={{
                  bg: "#d4b76d",
                  color: "#000000"
                }} className="header__auth-buttons__signup">
                  Create an account
                </Button>
              </NavLink>
            </div>
          </Fade>)}
    </div>
  )
}

export default Header
