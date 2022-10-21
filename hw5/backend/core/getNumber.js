let number = 0

export function getNumber () {
    return number
}

export function genNumber () {
    number = Math.floor(Math.random() * 100) + 1
    return 0
}