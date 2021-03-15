import whitePawn from "../../images/whitePawn.png";
import React from 'react'
import "./Positions.css";

export default function WhitePawn(props) {
    return (
        <img src={whitePawn} alt="white pawn piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}