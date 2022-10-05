import './css/Modal.css'
import React, { useEffect, useState } from "react";

export default function Modal({ restartGame, backToHome, gameOver, win }) {
    const [render, setRender] = useState(false);

    const handleRestartGame = () => {
        restartGame()
        setRender(false)
    }

    useEffect(() => {(gameOver || win) && setTimeout(() => { setRender(true); }, 2000); }, [gameOver, win]);

    return (
        render && 
        <div className="modal">
            <div className="modalWrapper" />
            <div className="modalContent">
                <div className="modalResult">{gameOver ? 'Game Over' : 'WIN'}</div>
                <div className="modalBtnWrapper">
                    <div className="modalBtn" onClick={handleRestartGame}>{gameOver ? 'Try Again' : 'New Game'}</div>
                    <div className="modalBtn" onClick={backToHome}>Back to Home</div>
                </div>
            </div>
            <div className="modalWrapper" />
        </div>
    );
}