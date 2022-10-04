import './css/HomePage.scss';
import React, { useState, useEffect } from 'react';

const HomePage = ({ startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize, boardSizeConfig, mineNumConfig }) => {
    const [showPanel, setShowPanel] = useState(false);
    const [error, setError] = useState(false);
    
    const showAdjustBox = () => {
        document.getElementsByClassName('controlWrapper')[0].classList.add('hidden')
        setTimeout(() => { setShowPanel(!showPanel) }, 250)
    }

    const hideAdjustBox = () => {
        setShowPanel(!showPanel)
        setTimeout(() => { document.getElementsByClassName('controlWrapper')[0].classList.remove('hidden') }, 0)
    }

    const handleChangeMineNum = (e) => { mineNumOnChange(parseInt(e.target.value)) }
    const handleChangeBoardSize = (e) => { boardSizeOnChange(parseInt(e.target.value)) }
    const handleChangeAdjustVisibility = () => { ( showPanel ) ? showAdjustBox() : hideAdjustBox() }
    const handleClickStart = () => { startGameOnClick(); showPanel && hideAdjustBox() }

    useEffect(() => { setError(mineNum > boardSize * boardSize) }, [mineNum, boardSize]);

    return (
        <div className='HomeWrapper'>
            <p className='title'>MineSweeper</p>
            <button className="btn" onClick={handleClickStart} disabled={error}>Start Game</button>
            <div className="controlContainer">
                <button className="btn" onClick={handleChangeAdjustVisibility}>Difficulty Adjustment</button>
                { showPanel && 
                <div className="controlWrapper hidden">
                    <div className={`error ${error && 'has-error'}`}>ERROR: Mines number and board size are invalid!</div>
                    <div className="controlPanel">
                        <div className="controlCol">
                            <p className="contrilTitle">Mines Number</p>
                            <input type="range" step="1" min={mineNumConfig[0]}   max={mineNumConfig[1]}   value={mineNum} onChange={handleChangeMineNum}/>
                            <p className={`controlNum ${error && 'has-error'}`}>{mineNum}</p>
                        </div>
                        <div className="controlCol">
                            <p className="contrilTitle">Board Size (n×n)</p>
                            <input type="range" step="1" min={boardSizeConfig[0]} max={boardSizeConfig[1]} value={boardSize}   onChange={handleChangeBoardSize}/>
                            <p className={`controlNum ${error && 'has-error'}`}>{boardSize}</p>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
    );

}
export default HomePage;   