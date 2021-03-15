import knight from "../../images/knight.png";
import React from 'react'
import "./Positions.css";

export default function Knight(props) {
    return (
        <img src={knight} alt="knight piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}