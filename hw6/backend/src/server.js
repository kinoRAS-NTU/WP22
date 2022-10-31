import express from 'express'
import cors from 'cors'
import db from './db'
import routes from './routes';

const app = express()

// INIT
app.use(cors())
app.use(express.json())
db.connect();

// define routes
app.use('/', routes);

// define server
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

