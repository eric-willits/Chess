import React from 'react';
import "./Boxes.css";

export default function DarkBox(props) {
    return (
        <div className="box__dark-box" onClick={() => console.log(props.position)} onClick={props.onClick}>&nbsp;</div>
    )
}
