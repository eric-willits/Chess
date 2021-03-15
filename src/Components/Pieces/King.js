import king from "../../images/king.png";
import React from 'react'
import "./Positions.css";

export default function King(props) {
    return (
        <img src={king} alt="king piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}