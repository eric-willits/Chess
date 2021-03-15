import React from 'react'
import WhitePawn from '../../Pieces/WhitePawn';
import WhiteRook from '../../Pieces/WhiteRook';
import WhiteKnight from '../../Pieces/WhiteKnight';
import WhiteBishop from '../../Pieces/WhiteBishop';
import WhiteQueen from '../../Pieces/WhiteQueen';
import WhiteKing from '../../Pieces/WhiteKing';

import "./WhiteJail.css";

export default function WhiteJail(props) {
    let pieces = props.pieces.map(piece => {
        if(piece.startsWith("pawn")){
            return <WhitePawn position="jail"/>
        } else if (piece.startsWith("rook")){
            return <WhiteRook position="jail"/>
        } else if (piece.startsWith("knight")){
            return <WhiteKnight position="jail"/>
        } else if (piece.startsWith("bishop")){
            return <WhiteBishop position="jail"/>
        } else if (piece.startsWith("queen")){
            return <WhiteQueen position="jail"/>
        } else {
            return <WhiteKing position="jail"/>
        }
    })
    
    return (
        <div className="whitejail__container">
            {pieces}
        </div>
    )
}