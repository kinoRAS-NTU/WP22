import './css/Board.scss'
import Cell from './Cell';
import Modal from './Modal';
import Dashboard from './Dashboard';
import { revealed } from '../util/reveal';
import createBoard from '../util/createBoard';
import React, { useEffect, useState } from 'react';


const Board = ({ boardSize, mineNum, backToHome }) => {
    const [board, setBoard] = useState([]);                     // An 2-dimentional array. It is used to store the board.
    const [nonMineCount, setNonMineCount] = useState(-1);       // An integer variable to store the number of cells whose value are not '💣'.
    const [mineLocations, setMineLocations] = useState([]);     // An array to store all the coordinate of '💣'.
    const [gameOver, setGameOver] = useState(false);            // A boolean variable. If true, means you lose the game (Game over).
    const [remainFlagNum, setRemainFlagNum] = useState(0);      // An integer variable to store the number of remain flags.
    const [win, setWin] = useState(false);                      // A boolean variable. If true, means that you win the game.

    useEffect(() => {
        setTimeout(() => {document.getElementsByClassName('boardContainer')[0].classList.remove('hidden')}, 0)
        freshBoard()
    }, [])
    useEffect(() => { !nonMineCount && setWin(true) }, [nonMineCount])

    // Creating a board
    const freshBoard = () => {
        const newBoard = createBoard(boardSize, mineNum)
        setRemainFlagNum(mineNum)
        setBoard(newBoard.board)
        setMineLocations(newBoard.mineLocations)
        setNonMineCount(boardSize * boardSize - mineNum)
    }

    const restartGame = () => {
        freshBoard();
        setWin(false);
        setGameOver(false);
    }
    const updateFlag = (e, x, y) => {
        e.preventDefault();
        if (board[x][y].revealed)                       { console.log('ERR/FLAG Revealed');   return}
        if (remainFlagNum <= 0 && !board[x][y].flagged) { console.log('ERR/FLAG FlagRanOut'); return}
        let newBoard = JSON.parse(JSON.stringify(board));
        let newFlagNum = remainFlagNum;
        newBoard[x][y].flagged = !newBoard[x][y].flagged
        newFlagNum = newFlagNum + (newBoard[x][y].flagged ? -1 : 1)
        setBoard(newBoard)
        setRemainFlagNum(newFlagNum)
    };

    const revealCell = (x, y) => {
        if (board[x][y].revealed) { console.log('ERR/REVL Revealed'); return }
        if (gameOver)             { console.log('ERR/REVL GameOver'); return }
        if (board[x][y].flagged)  { console.log('ERR/REVL Flagged');  return }
        const revealedResult = revealed(board, x, y, nonMineCount)
        setBoard(revealedResult.board)
        setNonMineCount(revealedResult.newNonMinesCount)
        if (mineLocations.filter(p => p[0] === x && p[1] === y).length) {
            setGameOver(true)
            mineLocations.filter(m => !board[m[0]][m[1]].flagged)
                         .forEach(m => board[m[0]][m[1]].revealed = true)
        }
    };

    const handleBackToHome = () => {
        setTimeout(() => {
            document.getElementsByClassName('boardContainer')[0].classList.add('hidden')
            setTimeout(() => { backToHome() }, 200)
        }, 200)
    }

    return (
        <div className='boardPage'>
            <div className='boardWrapper'>
                <div className="boardContainer hidden">
                    <Dashboard remainFlagNum={remainFlagNum} gameOver={gameOver} win={win}/>
                    {board !== [] && board.map((row, i) => 
                        <div id={'row' + i} key={'r' + i} className="boardRow"> {row.map((col, j) => 
                            <Cell key={'r' + i + 'c' + j} detail={board[i][j]} 
                                  rowIdx={i} colIdx={j} updateFlag={updateFlag} revealCell={revealCell}/> )}
                        </div>
                    )}
                </div>
            </div>
            <Modal restartGame={restartGame} backToHome={handleBackToHome} gameOver={gameOver} win={win}/>
        </div>
    );



}

export default Board