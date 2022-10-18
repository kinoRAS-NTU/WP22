/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx }) => {
    const wordboxList = [0, 1, 2, 3, 4];
    let hasGuess = (guess !== undefined);
    return (
        <div className='Row-container'>
            <div className='Row-wrapper'>
            {wordboxList && wordboxList.map((index) => (
                <div id={rowIdx+'-'+index} key={rowIdx+'-'+index}
                     className={'Row-wordbox ' + (hasGuess ? guess[index].color : '')}>
                    {hasGuess ? guess[index].char : ''}
                </div>
            ))}      
            </div>
        </div>
    )
}

export default Row;