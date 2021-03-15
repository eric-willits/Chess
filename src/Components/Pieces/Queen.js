import queen from "../../images/queen.png";
import React from 'react'
import "./Positions.css";

export default function Queen(props) {
    return (
        <img src={queen} alt="queen piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}