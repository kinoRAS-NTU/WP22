/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess }) => {
    const rowList = [0, 1, 2, 3, 4, 5];

    return (
        <div className="Board-container">
        {rowList && rowList.map((index) => (
            (index !== turn) ?
                <Row id={'row_'+index} key={'row_'+index} rowIdx={index} guess={guesses[index]}></Row> :
                <CurRow id={'row_'+index} key={'row_'+index} rowIdx={index} curGuess={curGuess}></CurRow>
        ))}            
        </div>
    )
};
export default Board;
