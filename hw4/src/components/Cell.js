import "./css/Cell.css"
import React from "react";

export default function Cell({ rowIdx, colIdx, detail, updateFlag, revealCell, touchMode }) {
    const cellStyle = {
        background: detail.revealed ?
            detail.value === '💣' ? '#880000' : mineCheckPattern(detail.x, detail.y) : checkPattern(detail.x, detail.y),
        color: numColorCode(detail.value),
        border: detail.revealed ? "2px inset darkgrey" : "2px outset white",
    }
    const ID = rowIdx.toString() + '-' + colIdx.toString()
    const handleLeftClickAction = (e, x, y) => {
        switch (touchMode) {
            case 2: updateFlag(e, x, y); break
            default: revealCell(x, y);
        }
    }
    return (
        <div
            id={ID}
            className='cell'
            style={cellStyle}
            onClick={(e) => handleLeftClickAction(e, detail.x, detail.y)}
            onContextMenu={(e) => updateFlag(e, detail.x, detail.y)}
        >
            {!detail.revealed && detail.flagged ? "🚩" : detail.revealed && detail.value !== 0 ? (detail.value === '💣' ? '💣' : detail.value) : ''}
        </div>
    );
}



const mineCheckPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) return '#c0c0c0';
    else if (x % 2 === 0 && y % 2 !== 0) return '#bbbbbb';
    else if (x % 2 !== 0 && y % 2 === 0) return '#bbbbbb';
    else return '#c0c0c0';
}

const checkPattern = (x, y) => {
    if (x % 2 === 0 && y % 2 === 0) return '#dddddd';
    else if (x % 2 === 0 && y % 2 !== 0) return '#d0d0d0';
    else if (x % 2 !== 0 && y % 2 === 0) return '#d0d0d0';
    else return '#dddddd';
}

const numColorCode = (num) => {
    if (num === 1) return '#0307de';
    else if (num === 2) return '#15760f';
    else if (num === 3) return '#dc1410';
    else if (num === 4) return '#02087e';
    else if (num === 5) return '#630501';
    else if (num === 6) return '#ec596c';
    else if (num === 7) return '#edf451';
    else if (num === 8) return '#56dddc';
}
