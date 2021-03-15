import React, { Component } from 'react';
import "./Board.css";
import Rook from '../Pieces/Rook';
import Knight from '../Pieces/Knight';
import Bishop from '../Pieces/Bishop';
import King from '../Pieces/King';
import Queen from '../Pieces/Queen';
import Pawn from '../Pieces/Pawn';

import WhiteRook from '../Pieces/WhiteRook';
import WhiteKnight from '../Pieces/WhiteKnight';
import WhiteBishop from '../Pieces/WhiteBishop';
import WhiteKing from '../Pieces/WhiteKing';
import WhiteQueen from '../Pieces/WhiteQueen';
import WhitePawn from '../Pieces/WhitePawn';

import BlackJail from './BlackJail/BlackJail';
import WhiteJail from './WhiteJail/WhiteJail';

import DarkBox from './Box/DarkBox';
import WhiteBox from './Box/WhiteBox';
import "./Box/Boxes.css";

import io from "socket.io-client";

const socket = io.connect("http://localhost:4000");

export default class Board extends Component {
    state = {
        data : ["rook1black", "pawn1black", null, null, null, null, "pawn1white", "rook1white",
                "knight1black", "pawn2black", null, null, null, null, "pawn2white", "knight1white",
                "bishop1black", "pawn3black", null, null, null, null, "pawn3white", "bishop1white",
                "king1black", "pawn4black", null, null, null, null, "pawn4white", "king1white",
                "queen1black", "pawn5black", null, null, null, null, "pawn5white", "queen1white",
                "bishop2black", "pawn6black", null, null, null, null, "pawn6white", "bishop2white",
                "knight2black", "pawn7black", null, null, null, null, "pawn7white", "knight2white",
                "rook2black", "pawn8black", null, null, null, null, "pawn8white", "rook2white"],
        blackjail : [],
        whitejail : [],
        rook1black : "a1",
        rook2black : "h1",
        knight1black : "b1",
        knight2black : "g1",
        bishop1black : "c1",
        bishop2black : "f1",
        king1black : "d1",
        queen1black : "e1",
        pawn1black : "a2",
        pawn2black : "b2",
        pawn3black : "c2",
        pawn4black : "d2",
        pawn5black : "e2",
        pawn6black : "f2",
        pawn7black : "g2",
        pawn8black : "h2",

        rook1white : "a8",
        rook2white : "h8",
        knight1white : "b8",
        knight2white : "g8",
        bishop1white : "c8",
        bishop2white : "f8",
        king1white : "d8",
        queen1white : "e8",
        pawn1white : "a7",
        pawn2white : "b7",
        pawn3white : "c7",
        pawn4white : "d7",
        pawn5white : "e7",
        pawn6white : "f7",
        pawn7white : "g7",
        pawn8white : "h7",
        activePiece : null,
        turn : "black"
    }

    componentDidUpdate(){
        socket.on("move", (state = this.state) => {
            this.setState(state)
        })
    }
    
    setActivePiecePosition = newPosition => {
        let activeProperty = null;
        for (const property in this.state){
            if(property === this.state.activePiece){
                activeProperty = property;
                break;
            }
        }
        let isValidMove = eval(`this.${this.trimPiece(this.state.activePiece)}('${this.state[activeProperty]}', '${newPosition}')`);
        if( isValidMove === true){
            let newData = [...this.state.data];
            //set new piece location
            newData[this.positionToIndex(newPosition)] = this.state.activePiece;
            //remove old piece location
            newData[this.positionToIndex(this.state[activeProperty])] = null;
            this.setState({ [activeProperty] : newPosition, data: newData});
            this.switchTurn();
        }
        this.setState({activePiece: null});
    }

    removePiece = piece => {
        let newData = [...this.state.data];
        let oldPiecePosition = this.state[piece];
        let oldTurn = this.state.turn;
        //set new piece location
        newData[this.positionToIndex(oldPiecePosition)] = this.state.activePiece;
        //remove old piece location
        newData[this.positionToIndex(this.state[piece])] = null;
        let activePiece = this.state.activePiece;
        this.setState({ [piece] : "dead", [activePiece] : oldPiecePosition , data: newData, activePiece : null});
        //add dead pieces to jail
        if(piece.endsWith("black")){
            let newBlackJail = [...this.state.blackjail];
            newBlackJail.push(piece);
            this.setState({ blackjail : newBlackJail});
        } else {
            let newWhiteJail = [...this.state.whitejail];
            newWhiteJail.push(piece);
            this.setState({ whitejail : newWhiteJail});
        }
        //if king dies, game over
        if(piece.startsWith("king")){
            setTimeout(() => alert(`GAME OVER - ${oldTurn} WINS!!`), 250);
        }
    }

    switchTurn = () => {
        if(this.state.turn === "black"){
            this.setState({ turn : "white"});
        } else {
            this.setState({ turn : "black"});
        }
    }

    trimPiece = piece => {
        return piece.slice(0, -6);
    }

    getColor = piece => {
        return piece.substr(piece.length-5);
    }

    rook = (currentPosition, newPosition) => {
        let letterCode = currentPosition.charCodeAt(0);
        let numberCode = currentPosition.charCodeAt(1);
        let isAvailable = null;
        //up direction
        for(let i = numberCode+1; i <= 56; i++){
            isAvailable = String.fromCharCode(letterCode, i);
            if(this.state.data[this.positionToIndex(isAvailable)]){
                if(!this.state.data[this.positionToIndex(isAvailable)].endsWith(this.getColor(this.state.activePiece)) && newPosition === isAvailable){
                    this.removePiece(this.state.data[this.positionToIndex(isAvailable)]);
                    return true;
                } else {
                    break;
                }
            } else {
                if(newPosition === isAvailable){
                    return true;
                }
            }
        }
        //right direction
        for(let j = letterCode+1; j <= 104; j++){
            isAvailable = String.fromCharCode(j, numberCode);
            if(this.state.data[this.positionToIndex(isAvailable)]){
                if(!this.state.data[this.positionToIndex(isAvailable)].endsWith(this.getColor(this.state.activePiece)) && newPosition === isAvailable){
                    this.removePiece(this.state.data[this.positionToIndex(isAvailable)]);
                    return true;
                } else {
                    break;
                }
            } else {
                if(newPosition === isAvailable){
                    return true;
                }
            }
        }
        //down direction
        for(let k = numberCode-1; k >= 49; k--){
            isAvailable = String.fromCharCode(letterCode, k);
            if(this.state.data[this.positionToIndex(isAvailable)]){
                if(!this.state.data[this.positionToIndex(isAvailable)].endsWith(this.getColor(this.state.activePiece)) && newPosition === isAvailable){
                    this.removePiece(this.state.data[this.positionToIndex(isAvailable)]);
                    return true;
                } else {
                    break;
                }
            } else {
                if(newPosition === isAvailable){
                    return true;
                }
            }
        }
        //left direction
        for(let l = letterCode-1; l >= 97; l--){
            isAvailable = String.fromCharCode(l, numberCode);
            if(this.state.data[this.positionToIndex(isAvailable)]){
                if(!this.state.data[this.positionToIndex(isAvailable)].endsWith(this.getColor(this.state.activePiece)) && newPosition === isAvailable){
                    this.removePiece(this.state.data[this.positionToIndex(isAvailable)]);
                    return true;
                } else {
                    break;
                }
            } else {
                if(newPosition === isAvailable){
                    return true;
                }
            }
        }

        if(this.state.activePiece.startsWith("rook")){
            alert("invalid move");
        }
        return false;
    }

    knight = (currentPosition, newPosition) => {
        let letterCode = currentPosition.charCodeAt(0);
        let numberCode = currentPosition.charCodeAt(1);
        if(newPosition === String.fromCharCode(letterCode-1, numberCode-2)){
            if(this.state.data[this.positionToIndex(newPosition)]  && !this.state.data[this.positionToIndex(newPosition)].endsWith(this.getColor(this.state.activePiece))){
                this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
            }
            return true;
        } else if (newPosition === String.fromCharCode(letterCode-1, numberCode+2)) {
            if(this.state.data[this.positionToIndex(newPosition)]  && !this.state.data[this.positionToIndex(newPosition)].endsWith(this.getColor(this.state.activePiece))){
                this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
            }
            return true;
        } else if(newPosition === String.fromCharCode(letterCode-2, numberCode-1)){
            if(this.state.data[this.positionToIndex(newPosition)]  && !this.state.data[this.positionToIndex(newPosition)].endsWith(this.getColor(this.state.activePiece))){
                this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
            }
            return true;
        } else if (newPosition === String.fromCharCode(letterCode-2, numberCode+1)){
            if(this.state.data[this.positionToIndex(newPosition)]  && !this.state.data[this.positionToIndex(newPosition)].endsWith(this.getColor(this.state.activePiece))){
                this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
            }
            return true;
        } else if(newPosition === String.fromCharCode(letterCode+2, numberCode-1)){
            if(this.state.data[this.positionToIndex(newPosition)]  && !this.state.data[this.positionToIndex(newPosition)].endsWith(this.getColor(this.state.activePiece))){
                this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
            }
            return true;
        } else if (newPosition === String.fromCharCode(letterCode+2, numberCode+1)){
            if(this.state.data[this.positionToIndex(newPosition)]  && !this.state.data[this.positionToIndex(newPosition)].endsWith(this.getColor(this.state.activePiece))){
                this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
            }
            return true;
        } else if(newPosition === String.fromCharCode(letterCode+1, numberCode+2)){
            if(this.state.data[this.positionToIndex(newPosition)]  && !this.state.data[this.positionToIndex(newPosition)].endsWith(this.getColor(this.state.activePiece))){
                this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
            }
            return true;
        } else if (newPosition === String.fromCharCode(letterCode+1, numberCode-2)){
            if(this.state.data[this.positionToIndex(newPosition)]  && !this.state.data[this.positionToIndex(newPosition)].endsWith(this.getColor(this.state.activePiece))){
                this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
            }
            return true;
        } else {
            alert("invalid move");
            return false;
        }
    }

    bishop = (currentPosition, newPosition) => {
        let letterCode = currentPosition.charCodeAt(0);
        let numberCode = currentPosition.charCodeAt(1);
        let isAvailable = null;

        //northwest direction
        for(let i = 1; i <= 104-letterCode; i++){
            isAvailable = String.fromCharCode(letterCode + i, numberCode + i);
            if(this.state.data[this.positionToIndex(isAvailable)]){
                if(!this.state.data[this.positionToIndex(isAvailable)].endsWith(this.getColor(this.state.activePiece)) && newPosition === isAvailable){
                    this.removePiece(this.state.data[this.positionToIndex(isAvailable)]);
                    return true;
                } else {
                    break;
                }
            } else {
                if(newPosition === isAvailable){
                    return true;
                }
            }
        }
        //southwest direction
        for(let j = 1; j <= 104-letterCode; j++){
            isAvailable = String.fromCharCode(letterCode + j, numberCode - j);
            if(this.state.data[this.positionToIndex(isAvailable)]){
                if(!this.state.data[this.positionToIndex(isAvailable)].endsWith(this.getColor(this.state.activePiece)) && newPosition === isAvailable){
                    this.removePiece(this.state.data[this.positionToIndex(isAvailable)]);
                    return true;
                } else {
                    break;
                }
            } else {
                if(newPosition === isAvailable){
                    return true;
                }
            }
        }
        //southeast direction
        for(let k = 1; k <= letterCode-97; k++){
            isAvailable = String.fromCharCode(letterCode - k, numberCode - k);
            if(this.state.data[this.positionToIndex(isAvailable)]){
                if(!this.state.data[this.positionToIndex(isAvailable)].endsWith(this.getColor(this.state.activePiece)) && newPosition === isAvailable){
                    this.removePiece(this.state.data[this.positionToIndex(isAvailable)]);
                    return true;
                } else {
                    break;
                }
            } else {
                if(newPosition === isAvailable){
                    return true;
                }
            }
        }
        //northeast direction
        for(let l = 1; l <= letterCode-97; l++){
            isAvailable = String.fromCharCode(letterCode - l, numberCode + l);
            if(this.state.data[this.positionToIndex(isAvailable)]){
                if(!this.state.data[this.positionToIndex(isAvailable)].endsWith(this.getColor(this.state.activePiece)) && newPosition === isAvailable){
                    this.removePiece(this.state.data[this.positionToIndex(isAvailable)]);
                    return true;
                } else {
                    break;
                }
            } else {
                if(newPosition === isAvailable){
                    return true;
                }
            }
        }
        if(this.state.activePiece.startsWith("bishop")){
            alert("invalid move");
        }
        return false;
    }

    king = (currentPosition, newPosition) => {
        let letterCode = currentPosition.charCodeAt(0);
        let numberCode = currentPosition.charCodeAt(1);
        for(let i = letterCode-1; i <= letterCode+1; i++){
            for(let j = numberCode-1; j <= numberCode+1; j++){
                if(newPosition === String.fromCharCode(i, j)){
                    if(this.state.data[this.positionToIndex(newPosition)]  && !this.state.data[this.positionToIndex(newPosition)].endsWith(this.getColor(this.state.activePiece))){
                        this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
                    }
                    return true;
                }
            }
        }
        alert("invalid move");
        return false;
    }

    queen = (currentPosition, newPosition) => {
        if(this.rook(currentPosition, newPosition) === true || this.bishop(currentPosition, newPosition) === true){
            return true;
        }
        alert("invalid move");
        return false;
    }

    pawn = (currentPosition, newPosition) => {
        let letterCode = currentPosition.charCodeAt(0);
        let numberCode = currentPosition.charCodeAt(1);

        let isAvailable = null;
        let possibleMoves = 1;
        if(currentPosition.charAt(1) === "2" || currentPosition.charAt(1) === "7"){
            possibleMoves = 2;
        }
        //check 1 or 2 spaces in front of pawn
        for(let i = 1; i <= possibleMoves; i++){
            //black pawns
            isAvailable = String.fromCharCode(letterCode, numberCode + i);
            //white pawns
            if(this.state.activePiece.endsWith("white")){
                isAvailable = String.fromCharCode(letterCode, numberCode - i);
            }
            if(this.state.data[this.positionToIndex(isAvailable)]){
                break;
            } else {
                if(newPosition === isAvailable){
                    return true;
                }
            }
        }
        //attack moves
        let colorInt = 1;
        if(this.getColor(this.state.activePiece) === "white"){
            colorInt = -1;
        }
        if(this.state.data[this.positionToIndex(newPosition)]  && !this.state.data[this.positionToIndex(newPosition)].endsWith(this.getColor(this.state.activePiece))){
            if(newPosition === String.fromCharCode(letterCode-1, numberCode+colorInt)){
                this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
                return true;
            } else if(newPosition === String.fromCharCode(letterCode+1, numberCode+colorInt)){
                this.removePiece(this.state.data[this.positionToIndex(newPosition)]);
                return true;
            }
        }
        alert("invalid move");
        return false;
    }

    setActivePiece = activePiece => {
        if(activePiece.endsWith(this.state.turn)){
            this.setState({ activePiece : activePiece})
        } else {
            alert("it's not your turn");
        }
    }

    calculateBoxKey = id => {
        if(id <= 8){
            return (`a${id}`);
        } else if( 9<=id && id<=16){
            return(`b${id-8}`);
        } else if ( 17<=id && id<=24 ){
            return(`c${id-16}`);
        } else if ( 25<=id && id<=32 ) {
            return(`d${id-24}`);
        } else if ( 33<=id && id<=40 ) {
            return(`e${id-32}`);
        } else if ( 41<=id && id<=48 ) {
            return(`f${id-40}`);
        } else if ( 49<=id && id<=56 ) {
            return(`g${id-48}`);
        } else if ( 57<=id && id<=64 ) {
            return(`h${id-56}`);
        }
    }

    positionToIndex = position => {
        if(position.charAt(0) === "a"){
            return parseInt(position.charAt(1))-1;
        } else if (position.charAt(0) === "b"){
            return 7 + parseInt(position.charAt(1));
        } else if (position.charAt(0) === "c"){
            return 15 + parseInt(position.charAt(1));
        } else if (position.charAt(0) === "d"){
            return 23 + parseInt(position.charAt(1));
        } else if (position.charAt(0) === "e"){
            return 31 + parseInt(position.charAt(1));
        } else if (position.charAt(0) === "f"){
            return 39 + parseInt(position.charAt(1));
        } else if (position.charAt(0) === "g"){
            return 47 + parseInt(position.charAt(1));
        } else {
            return 55 + parseInt(position.charAt(1));
        }
    }
    
    render() {
        const board = [];
        //construct chess board with alternating white and dark squares and lines
        for(let i = 1; i <= 64; i++){
            let boxKey = this.calculateBoxKey(i);
            if(i <= 8 || 17<=i && i<=24 || 33<=i && i<=40 || 49<=i && i<=56){
                if(i % 2 === 1){
                    board.push(<DarkBox key={boxKey} position={boxKey} onClick={() => {if(this.state.activePiece){this.setActivePiecePosition(boxKey)}}}/>);
                } else {
                    board.push(<WhiteBox key={boxKey} position={boxKey} onClick={() => {if(this.state.activePiece){this.setActivePiecePosition(boxKey)}}}/>);
                }    
            } else {
                if(i % 2 === 1){
                    board.push(<WhiteBox key={boxKey} position={boxKey} onClick={() => {if(this.state.activePiece){this.setActivePiecePosition(boxKey)}}}/>);
                } else {
                    board.push(<DarkBox key={boxKey} position={boxKey} onClick={() => {if(this.state.activePiece){this.setActivePiecePosition(boxKey)}}}/>);
                }
            }
        }

        return (
            <>
            <WhiteJail pieces={this.state.whitejail}/>
            <div className="board__board-container">
                <h1 className="board__turn">turn: {this.state.turn}</h1>
                {board}
                <Rook position={this.state.rook1black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("rook1black")}} removePiece={() => {this.setActivePiecePosition(this.state.rook1black)}}/>
                <Rook position={this.state.rook2black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("rook2black")}} removePiece={() => {this.setActivePiecePosition(this.state.rook2black)}}/>
                <Knight position={this.state.knight1black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("knight1black")}} removePiece={() => {this.setActivePiecePosition(this.state.knight1black)}}/>
                <Knight position={this.state.knight2black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("knight2black")}} removePiece={() => {this.setActivePiecePosition(this.state.knight2black)}}/>
                <Bishop position={this.state.bishop1black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("bishop1black")}} removePiece={() => {this.setActivePiecePosition(this.state.bishop1black)}}/>
                <Bishop position={this.state.bishop2black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("bishop2black")}} removePiece={() => {this.setActivePiecePosition(this.state.bishop2black)}}/>
                <King position={this.state.king1black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("king1black")}} removePiece={() => {this.setActivePiecePosition(this.state.king1black)}}/>
                <Queen position={this.state.queen1black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("queen1black")}} removePiece={() => {this.setActivePiecePosition(this.state.queen1black)}}/>
                <Pawn position={this.state.pawn1black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn1black")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn1black)}}/>
                <Pawn position={this.state.pawn2black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn2black")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn2black)}}/>
                <Pawn position={this.state.pawn3black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn3black")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn3black)}}/>
                <Pawn position={this.state.pawn4black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn4black")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn4black)}}/>
                <Pawn position={this.state.pawn5black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn5black")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn5black)}}/>
                <Pawn position={this.state.pawn6black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn6black")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn6black)}}/>
                <Pawn position={this.state.pawn7black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn7black")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn7black)}}/>
                <Pawn position={this.state.pawn8black} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn8black")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn8black)}}/>

                <WhiteRook position={this.state.rook1white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("rook1white")}} removePiece={() => {this.setActivePiecePosition(this.state.rook1white)}}/>
                <WhiteRook position={this.state.rook2white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("rook2white")}} removePiece={() => {this.setActivePiecePosition(this.state.rook2white)}}/>
                <WhiteKnight position={this.state.knight1white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("knight1white")}} removePiece={() => {this.setActivePiecePosition(this.state.knight1white)}}/>
                <WhiteKnight position={this.state.knight2white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("knight2white")}} removePiece={() => {this.setActivePiecePosition(this.state.knight2white)}}/>
                <WhiteBishop position={this.state.bishop1white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("bishop1white")}} removePiece={() => {this.setActivePiecePosition(this.state.bishop1white)}}/>
                <WhiteBishop position={this.state.bishop2white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("bishop2white")}} removePiece={() => {this.setActivePiecePosition(this.state.bishop2white)}}/>
                <WhiteKing position={this.state.king1white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("king1white")}} removePiece={() => {this.setActivePiecePosition(this.state.king1white)}}/>
                <WhiteQueen position={this.state.queen1white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("queen1white")}} removePiece={() => {this.setActivePiecePosition(this.state.queen1white)}}/>
                <WhitePawn position={this.state.pawn1white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn1white")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn1white)}}/>
                <WhitePawn position={this.state.pawn2white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn2white")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn2white)}}/>
                <WhitePawn position={this.state.pawn3white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn3white")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn3white)}}/>
                <WhitePawn position={this.state.pawn4white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn4white")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn4white)}}/>
                <WhitePawn position={this.state.pawn5white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn5white")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn5white)}}/>
                <WhitePawn position={this.state.pawn6white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn6white")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn6white)}}/>
                <WhitePawn position={this.state.pawn7white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn7white")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn7white)}}/>
                <WhitePawn position={this.state.pawn8white} isActivePiece={this.state.activePiece ? true : false} setActivePiece={() => {this.setActivePiece("pawn8white")}} removePiece={() => {this.setActivePiecePosition(this.state.pawn8white)}}/>
            </div>
            <BlackJail pieces={this.state.blackjail}/>
            </>
        )
    }
}
