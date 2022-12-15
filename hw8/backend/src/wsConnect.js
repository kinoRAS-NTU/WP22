import MessageModel from './models/chatbox.js'

const makeName = (name, to) => { return [name, to].sort().join('_') }

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data))
}

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws)
}

export default {
    onMessage: (wss, ws) => (
        async (byteString) => {
            const { data } = byteString
            const { type, payload } = JSON.parse(data)
            switch (type) {
                case 'CHAT':
                    ws.box = makeName(payload.name, payload.to)
                    MessageModel
                        .find({ chatBox: ws.box })
                        .sort({ created_at: -1 })
                        .exec((err, res) => {
                            if (err) throw err
                            sendData(["init", res], ws)
                        })
                    sendStatus({ type: 'success', msg: 'Added chat box.'}, ws)
                    break
                case 'MESSAGE':
                    const boxName = ws.box
                    const { name, to, body } = payload
                    const message = new MessageModel({
                        chatBox: boxName,
                        name: name,
                        to: to,
                        body: body
                    })
                    try {
                        await message.save()
                    } catch (e) {
                        throw new Error("Message DB save error: " + e)
                    }
                    wss.clients.forEach((client) => {
                        if (client.box === ws.box) {
                            sendData(['output', [{
                                chatBox: boxName,
                                name: name,
                                to: to,
                                body: body
                            }]], client)
                            if (client.id === ws.id)
                                sendStatus({type: 'success', msg: 'Message sent.'}, client)
                            else
                                sendStatus({type: 'success', msg: 'Got new message.'}, client)
                        }
                    })
                    break
                default: break
            }
        }
    )
}