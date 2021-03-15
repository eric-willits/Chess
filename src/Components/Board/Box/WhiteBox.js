import React from 'react';
import "./Boxes.css";


export default function WhiteBox(props) {
    return (
        <div className="box__white-box" onClick={() => console.log(props.position)} onClick={props.onClick}>&nbsp;</div>
    )
}
