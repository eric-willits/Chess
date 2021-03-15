import whiteQueen from "../../images/whiteQueen.png";
import React from 'react'
import "./Positions.css";

export default function WhiteQueen(props) {
    return (
        <img src={whiteQueen} alt="white queen piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}