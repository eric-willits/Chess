import whiteKnight from "../../images/whiteKnight.png";
import React from 'react'
import "./Positions.css";

export default function WhiteKnight(props) {
    return (
        <img src={whiteKnight} alt="white knight piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}