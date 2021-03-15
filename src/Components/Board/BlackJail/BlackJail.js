import React from 'react'
import Pawn from '../../Pieces/Pawn';
import Rook from '../../Pieces/Rook';
import Knight from '../../Pieces/Knight';
import Bishop from '../../Pieces/Bishop';
import Queen from '../../Pieces/Queen';
import King from '../../Pieces/King';

import "./BlackJail.css";

export default function BlackJail(props) {
    let pieces = props.pieces.map(piece => {
        if(piece.startsWith("pawn")){
            return <Pawn position="jail"/>
        } else if (piece.startsWith("rook")){
            return <Rook position="jail"/>
        } else if (piece.startsWith("knight")){
            return <Knight position="jail"/>
        } else if (piece.startsWith("bishop")){
            return <Bishop position="jail"/>
        } else if (piece.startsWith("queen")){
            return <Queen position="jail"/>
        } else {
            return <King position="jail"/>
        }
    })
    
    return (
        <div className="blackjail__container">
            {pieces}
        </div>
    )
}
