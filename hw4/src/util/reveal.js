export const revealed = (board, x, y, newNonMinesCount) => {

    console.log(x, y)
    const maxLen = board.length

    if (board[x][y].value === 0) {
        let localMap1 = Array.from(Array(maxLen), () => Array(maxLen).fill(0));
        let localMap2 = Array.from(Array(maxLen), () => Array(maxLen).fill(0));
            localMap1[x][y] = 1
            localMap2[x][y] = 1

        const dirList1 = [[1, 0], [0, 1], [0, -1], [-1, 0]]
        const dirList2 = [[0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1], [-1, -1], [-1, 0], [-1, 1]]

        const findEmpty = (xIdx, yIdx, xShift, yShift) => {
            if (xIdx + xShift < 0 || xIdx + xShift >= maxLen || yIdx + yShift < 0 || yIdx + yShift >= maxLen) return false
            return board[xIdx + xShift][yIdx + yShift].value === 0
        }

        const fullSearchByPoint = (xIdx, yIdx) => {
            dirList1.forEach(dir => {
                if (findEmpty(xIdx, yIdx, dir[0], dir[1]) && !localMap1[xIdx+dir[0]][yIdx+dir[1]]) {
                    localMap1[xIdx + dir[0]][yIdx + dir[1]] = 1
                    fullSearchByPoint(xIdx+dir[0], yIdx+dir[1])
                }
            });
        }

        fullSearchByPoint(x, y)


        localMap1.forEach((ce, ci) => {
            ce.forEach((re, ri) => {
                if (re === 1) {
                    dirList2.forEach(dir => {
                        if (ci + dir[0] >= 0 && ci + dir[0] < maxLen && ri + dir[1] >= 0 && ri + dir[1] < maxLen) {
                            if (!board[ci + dir[0]][ri + dir[1]].flagged) {
                                localMap2[ci + dir[0]][ri + dir[1]] = 1
                            }
                        }
                    })
                }
            })
        })

        localMap2.forEach((ce, ci) => {
            ce.forEach((re, ri) => {
                if (re === 1 && !board[ci][ri].revealed) {
                    board[ci][ri].revealed = true
                    newNonMinesCount--
                }
            })
        })

        // let boardString = ''
        // board.forEach(r => {
        //     r.forEach(c => {
        //         boardString += (c.value === '💣' ? 'X' : c.value) + ' '
        //     })
        //     boardString += '\n'
        // })
    
        // let mapString = ''
    
        // localMap2.forEach(r => {
        //     r.forEach(c => {
        //         mapString += c + ' '
        //     })
        //     mapString += '\n'
        // })
    
        // console.log(boardString)
        // console.log(mapString)
        
    } else {
        board[x][y].revealed = true
        newNonMinesCount--
    }

    return { board, newNonMinesCount };
};
