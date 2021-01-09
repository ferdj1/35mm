import * as React from "react"

import "./SelectButton.scss";
import {useState} from "react";
import {FaCheckCircle, FaRegCircle, FiCircle} from "react-icons/all";

function SelectButton(props) {

  return (
    <div className={`select-button ${props.selected ? 'select-button--selected': ''}`} onClick={() => props.handleGenreSelectClick(props.text)}>
      {!props.selected ? <FaRegCircle /> :
        <FaCheckCircle />
      }
      <div className="select-button__text">
        {props.text}
      </div>
    </div>
  )
}

export default SelectButton;
