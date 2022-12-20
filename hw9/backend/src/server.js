import http from 'http'
import express from 'express'
import WebSocket from 'ws'
import mongo from './mongo'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'
import wsConnect from './wsConnect'

mongo.connect()

const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection

db.once('open', () => {
    wss.on('connection', (ws) => {
        ws.id = uuidv4()
        ws.box = '';
        ws.onmessage = wsConnect.onMessage(wss, ws)
    })
});

// define server
const port = process.env.PORT || 4000
server.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

