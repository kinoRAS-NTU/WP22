import React, { useEffect, useState, useRef } from 'react';
import "./css/Dashboard.css"

export default function Dashboard({ remainFlagNum, gameOver, win }) {
    let [time, setTime] = useState(0)
    let [sTime, setSTime] = useState(0)
    const intervalRef = useRef()

    useEffect(() => {
        const timeInterval = setInterval(() => { setTime(t => ++t) }, 1000)
        intervalRef.current = timeInterval
        return () => { clearInterval(intervalRef.current) }
    }, [])

    useEffect(() => {
            setSTime(time)
            setTime(0)
    }, [gameOver, win])

    return (
        <div className="dashBoard" >
            <div id='dashBoard_col1' >
                <div className='dashBoard_col'>
                    <p className='icon'>🚩</p>
                    {remainFlagNum}
                </div>
            </div>
            <div id='dashBoard_col2' >
                <div className='dashBoard_col'>
                    <p className='icon'>⏰</p>
                    {gameOver || win ? sTime : time}
                </div>
            </div>
        </div>
    );
}
