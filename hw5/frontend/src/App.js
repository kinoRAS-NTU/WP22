import React, { useState } from 'react'
import axios from 'axios'

import './App.scss'

function App() {
    const [hasStarted, setHasStarted] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [hasWon, setHasWon] = useState(false)
    const [number, setNumber] = useState('')
    const [status, setStatus] = useState('')

    const snAxios = axios.create({ baseURL: 'http://localhost:4000' })

    const handleStartGame = () => {
        snAxios.post('/start')
        .then(() => { setHasStarted(true) })
        .catch(err => { console.log(err) })
    }

    const handleGuessNumber = () => {
        if (number === '') return
        setStatus('')
        snAxios.get('/guess', { params: { number: number }})
        .then(res => {
            setHasError(false)
            setStatus('')
            switch(res.data.status) {
                case 'Equal':
                    setHasWon(true)
                    break
                default:
                    setStatus('Hint: ' + res.data.status)
            }
        })
        .catch(err => {
            console.log(err)
            setHasError(true)
            setStatus('Error: ' + (err.response.data.msg ? err.response.data.msg : 'Unknown Error'))
        })
    }

    const handleRestartGame = () => {
        snAxios.post('/restart')
        .then(() => {
            setHasWon(false)
            setHasError(false)
            setStatus('')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleGuessNumber()
        }
    }
    
    const startPage =
        <div className="start-page">
            <h1>Number Guessing</h1> 
            <p>Guess a number between 1 and 100.</p>
            <button className="large-btn" onClick={handleStartGame}>Start Game</button>
        </div>

    const gamePage =
        <div className="game-page" onKeyDown={handleKeyUp}>
            <h1>Guess a number <br/>between 1 and 100</h1>
            <div className="input-container">
                <input onChange={e => setNumber(e.target.value) } autoFocus/>
                <button onClick={handleGuessNumber} disabled={!number}>Guess!</button>
            </div>
            <p className={hasError ? 'error' : (status === '') ? 'hidden' : ''}>{status}</p>
        </div>

    const restartPage =
        <div className="restart-page">
            <h1>You won!</h1>
            <p>The number was {number}.</p>
            <button className="large-btn" onClick={handleRestartGame}>Restart!</button>
        </div>

    return (
        <div className="App">
            { !hasStarted ? startPage : !hasWon ? gamePage : restartPage }
        </div>
    )
}

export default App
