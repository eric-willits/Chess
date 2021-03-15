import rook from "../../images/rook.png";
import React from 'react'
import "./Positions.css";

export default function Rook(props) {
    return (
        <img src={rook} alt="rook piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}
