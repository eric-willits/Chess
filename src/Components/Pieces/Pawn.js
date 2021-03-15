import pawn from "../../images/pawn.png";
import React from 'react'
import "./Positions.css";

export default function Pawn(props) {
    return (
        <img src={pawn} alt="pawn piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}