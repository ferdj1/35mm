import * as React from "react"

import "./DetailsCard.scss";

function DetailsCard(props) {
  return (
    <div className="details-card">
      <h4 className="details-card__title">{props.title}</h4>
      <div className="details-card__content">
        {props.content}
      </div>
    </div>
  )
}

export default DetailsCard;
