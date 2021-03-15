import bishop from "../../images/bishop.png";
import React from 'react'
import "./Positions.css";

export default function Bishop(props) {
    return (
        <img src={bishop} alt="bishop piece" height="40" width="40" onClick={props.isActivePiece ? props.removePiece : props.setActivePiece} className={`positions__${props.position}`}/>
    )
}