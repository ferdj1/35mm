import * as React from "react";
import {NavLink} from "react-router-dom";

import {Avatar} from "@chakra-ui/avatar";
import {Menu, MenuButton, MenuItem, MenuList} from "@chakra-ui/menu";
import {ChevronDownIcon} from "@chakra-ui/icons";

import "./AuthenticatedHeader.scss";

function AuthenticatedHeader(props) {
  return (
    <div className="header-info">
      <span className="header-info__text">Logged in as <span
        className="header-info__name">{props.currentUser.name}</span></span>
      <NavLink to="/profile" className="header-info__avatar-container">
        <Avatar className="header-info__avatar" name={props.currentUser.name} src={props.currentUser.imageUrl}/>
      </NavLink>
      <Menu>
        <MenuButton as={ChevronDownIcon} color="#ffffff" className="header-info__arrow">
        </MenuButton>
        <MenuList>
          <NavLink to="/profile">
            <MenuItem>Profile</MenuItem>
          </NavLink>
          <MenuItem onClick={props.onLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}

export default AuthenticatedHeader;
