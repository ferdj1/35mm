import * as React from "react"

import "./MmSpinner.scss";

function MmSpinner(props) {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default MmSpinner;
