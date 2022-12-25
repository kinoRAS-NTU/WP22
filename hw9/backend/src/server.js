import express from 'express'
import cors from 'cors'
import db from './db'
import routes from './routes'

const app = express()

// INIT
if (process.env.NODE_ENV === "development") {
    app.use(cors())
}
app.use(express.json())
db.connect()

// define routes
app.use('/api', routes)

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, "../frontend", "build")))
    app.get("/*", function (req, res) {
        res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
    })
}

// define server
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

