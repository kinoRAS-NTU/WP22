import './css/Modal.scss'
import React, { useEffect, useState } from "react";

export default function Modal({ restartGame, backToHome, gameOver, win }) {
    const [render, setRender] = useState(false);

    const handleRestartGame = () => {
        handleModalAniOut()
        setTimeout(() => {
            restartGame()
            setRender(false)
        }, 400)
    }

    const handleBackToHome = () => {
        handleModalAniOut()
        setTimeout(() => {
            setRender(false)
            backToHome()
        }, 400)
    }

    const handleModalAniIn = () => {
        setTimeout(() => {document.getElementsByClassName('modal')[0].classList.remove('hidden')}, 50)
    }

    const handleModalAniOut = () => {
        document.getElementsByClassName('modal')[0].classList.add('hidden')
    }

    useEffect(() => {
        (gameOver || win) &&
        setTimeout(() => {
            setRender(true)
            handleModalAniIn()
        }, 2000);
    }, [gameOver, win]);

    return (
        render && 
        <div className="modal hidden">
            <div className="modalWrapper"/>
            <div className="modalContent">
                <div className="modalResult">{gameOver ? 'Game Over' : 'WIN'}</div>
                <div className="modalBtnWrapper">
                    <div className="modalBtn" onClick={handleRestartGame}>{gameOver ? 'Try Again' : 'New Game'}</div>
                    <div className="modalBtn" onClick={handleBackToHome}>Back to Home</div>
                </div>
            </div>
            <div className="modalWrapper" />
        </div>
    );
}