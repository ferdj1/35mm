import * as React from "react"

import "./ProfileHero.scss";
import {Avatar} from "@chakra-ui/react";

function ProfileHero(props) {
  return (
    <div className="profile-hero">
      <div className="profile-hero__user-info">
        <div className="profile-hero__user-image">
          <Avatar className="profile-hero__avatar" name={props.currentUser.name} src={props.currentUser.imageUrl}/>
        </div>
        <div className="profile-hero__user-data">
          <div className="profile-hero__user-name">{props.currentUser.name}</div>
          <div className="profile-hero__user-email">{props.currentUser.email}</div>
        </div>
      </div>
    </div>
  )
}

export default ProfileHero;
