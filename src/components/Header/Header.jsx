import * as React from "react"
import {useState} from "react"
import {NavLink, useLocation} from "react-router-dom";

import AuthenticatedHeader from "../AuthenticatedHeader/AuthenticatedHeader";

import {Fade} from "@chakra-ui/transition";

import "./Header.scss";

function Header(props) {
  const [yOffset, setYOffset] = useState(0);
  const location = useLocation();

  window.addEventListener("scroll", handleScroll);

  function handleScroll(event) {
    event.preventDefault();
    setYOffset(window.pageYOffset);
  }

  return (
    <div className={(location.pathname === "/" || location.pathname.startsWith("/movie/")) && yOffset < 60
      ? "header header--transparent"
      : "header header--solid"
    }>
      <NavLink to="/">
        <h1 className="header__logo">35mm</h1>
      </NavLink>
      {props.authenticated && <Fade in><AuthenticatedHeader {...props} /></Fade>}
    </div>
  )
}

export default Header
