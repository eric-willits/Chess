import whiteKing from "../../images/whiteKing.png";
import React from 'react'
import "./Positions.css";

export default function WhiteKing(props) {
    return (
        <img src={whiteKing} alt="white king piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}