/****************************************************************************
  FileName      [ MineSweeper.js ]
  PackageName   [ src/containers ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ The control and main page of MineSweeper. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './MineSweeper.css';
import Board from '../components/Board'
import React, { useState } from 'react';
import HomePage from '../components/HomePage'

const MineSweeper = () => {
    // Config            from...to...default
    const mineNumConfig   = [1, 50, 10]
    const boardSizeConfig = [1, 20, 8]

    const [startGame, setStartGame] = useState(false)
    const [mineNum,   setMineNum]   = useState(mineNumConfig[2])
    const [boardSize, setBoardSize] = useState(boardSizeConfig[2])

    const startGameOnClick = () => { setStartGame(1) }

    const mineNumOnChange = (value) => { setMineNum(value) }
    const boardSizeOnChange = (value) => { setBoardSize(value) }

    const backToHomeOnClick = () => { setStartGame(0) }

    return (
        <div className='mineSweeper'>
            { !startGame ?
            <HomePage mineNum={mineNum}     mineNumConfig={mineNumConfig}     mineNumOnChange={mineNumOnChange}
                      boardSize={boardSize} boardSizeConfig={boardSizeConfig} boardSizeOnChange={boardSizeOnChange}
                      startGameOnClick={startGameOnClick} startGame={startGame}/>
            :
            <Board boardSize={boardSize} mineNum={mineNum} backToHome={backToHomeOnClick}/>
            }
        </div>
    );
}
export default MineSweeper;