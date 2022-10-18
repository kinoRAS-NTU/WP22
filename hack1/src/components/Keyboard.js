/****************************************************************************
  FileName      [ Keyboard.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Keyboard. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import './css/Keyboard.css';
import config from '../data/config.json';
import React, { useEffect, useState } from 'react';
import { IoBackspaceOutline } from 'react-icons/io5';

const Keyboard = ({ usedChars }) => {
    const [firstRowLetters, setFirstRowLetters] = useState(null);       // firstRowLetters must be a 10-character array.
    const [secondRowLetters, setSecondRowLetters] = useState(null);     // secondRowLetters must be a 9-character array.
    const [thirdRowLetters, setThirdRowLetters] = useState(null);
    const [keyboardRows, setKeyboardRows] = useState(null);

    useEffect(() => {
        setFirstRowLetters(config.letters.slice(0, 9));
        setSecondRowLetters(config.letters.slice(10, 18));
        setThirdRowLetters(config.letters.slice(19, 29));
    }, []);

    useEffect(() => {
        setKeyboardRows([firstRowLetters, secondRowLetters, thirdRowLetters]);
    }, [firstRowLetters, secondRowLetters, thirdRowLetters]);
    
    return (
        <div className='Keyboard-container'>
            {/* TODO 5: add color to each `Keyboard-char`. */}
        {keyboardRows && keyboardRows.map((row, index) => (
            <div id={'KBrow_'+index} key={'KBrow_'+index} className='Keyboard-row'>
                {row && row.map((letter) => {
                    const color = usedChars[letter.char]
                    return (
                        letter.char === 'Enter' ?
                            <div key={'char_' + letter.char} className='Keyboard-char-enter' >{letter.char}</div>
                            :
                            letter.char === 'Backspace' ?
                                <div  key={'char_' + letter.char} className='Keyboard-char-backspace'><IoBackspaceOutline /></div>
                                :
                                <div id = {'char_' + letter.char} key={'char_' + letter.char} className={'Keyboard-char ' + color}>{letter.char}</div>
                    )
                })}
            </div>
        ))}

            {/* <div id='KBrow_3' key='KBrow_3' className='Keyboard-row'>
                {thirdRowLetters && thirdRowLetters.map((letter) => {
                    const color = usedChars[letter.char]
                    return (
                        letter.char === 'Enter' ?
                            <div key={'char_' + letter.char} className='Keyboard-char-enter' >{letter.char}</div>
                            :
                            letter.char === 'Backspace' ?
                                <div  key={'char_' + letter.char} className='Keyboard-char-backspace'><IoBackspaceOutline /></div>
                                :
                                <div id = {'char_' + letter.char} key={'char_' + letter.char} className={'Keyboard-char ' + color}>{letter.char}</div>
                    )
                })}
            </div> */}
        </div>
    )
}

export default Keyboard;