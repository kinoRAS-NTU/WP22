import { Router } from 'express';
import ScoreCard from './../models/ScoreCard.js'

const router = Router();

router.delete('/cards', (_, res)=>{
    ScoreCard
    .deleteMany({})
    .then(r => { res.json({ message: (r.acknowledged) ? 'Database cleared' : 'Database deletion failed' }) })
    .catch(e => { throw new Error(`Database deletion failed: ${e}`) })
})

router.post('/card', (req, res)=>{
    const {name, subject, score} = req.body
    ScoreCard
    .find({ name, subject })
    .then(r => {
        if (r.length) {
            ScoreCard
            .updateOne({ name: name }, { $set: { score: score } })
            .then(() => { res.json({ message: `Updating (${name}, ${subject}, ${score})`, card: true })})
            .catch(e => { throw new Error(`Update failed: ${e}`) })
        } else {
            ScoreCard
            .create({ name: name, subject: subject, score: score })
            .then(() => { res.json({ message: `Adding (${name}, ${subject}, ${score})`, card: true })})
            .catch(e => { throw new Error(`Add failed: ${e}`) })
        }
    })
    .catch(e => { throw new Error(`Find failed: ${e}`) })
})

router.get('/cards', (req, res)=>{
    const { type, queryString } = req.query
    const findObj = (type === 'name') ? { name: queryString } : { subject: queryString }
    console.log("FIND")
    ScoreCard
    .find(findObj)
    .then(r => {
        if (r.length) {
            res.json({ messages: r.map(e => `Found card with ${type}: (${e.name}, ${e.subject}, ${e.score})`) })
        } else {
            res.json({ message: `${capitalizeFirstLetter(type)} (${queryString}) not found!` })
        }
    })
    .catch(e => { throw new Error(`Find failed: ${e}`) })
})

const capitalizeFirstLetter = (string) => { return string.charAt(0).toUpperCase() + string.slice(1) }

export default router;