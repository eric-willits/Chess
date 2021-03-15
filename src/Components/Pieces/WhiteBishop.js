import whiteBishop from "../../images/whiteBishop.png";
import React from 'react'
import "./Positions.css";

export default function WhiteBishop(props) {
    return (
        <img src={whiteBishop} alt="white bishop piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}