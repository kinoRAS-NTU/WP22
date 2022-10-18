/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    const wordboxList = [0, 1, 2, 3, 4];
    let letters = curGuess.split('');
    let fillLen = letters.length;

    return (
        <div className='Row-container'>
            <div className='Row-wrapper current'>
            {wordboxList && wordboxList.map((index) => (
                <div id={rowIdx+'-'+index} key={rowIdx+'-'+index}
                     className={(index < fillLen) ? 'Row-wordbox filled' : 'Row-wordbox'}>
                    {(index < fillLen) ? letters[index] : ''}
                </div>
            ))}      
            </div>
        </div>
    )
}

export default CurRow;
