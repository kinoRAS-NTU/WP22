import express from 'express'
import { getNumber, genNumber } from '../core/getNumber'

const router = express.Router()

router.post('/start', (_, res) => {
    genNumber()
    console.log("Started and generated number: " + getNumber())
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
    if (getNumber() == 0) genNumber()
    const inNum = parseInt(req.query.number)
    const crNum = getNumber()
    if (inNum.toString() !== req.query.number || inNum > 100 || inNum < 1) {
        res.status(406).send({ msg: '\'' + req.query.number + '\' is not a legal number.' })
    } else {
        const state = (inNum === crNum) ? 'Equal' : (inNum > crNum) ? 'Smaller' : 'Bigger'
        res.json({ status: state })
    }
})

router.post('/restart', (_, res) => {
    genNumber()
    console.log("Restarted and re-generated number: " + getNumber())
    res.json({ msg: 'The game has restarted.' })
})

export default router