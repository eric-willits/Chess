import whiteRook from "../../images/whiteRook.png";
import React from 'react'
import "./Positions.css";

export default function WhiteRook(props) {
    return (
        <img src={whiteRook} alt="whiteRook piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}
