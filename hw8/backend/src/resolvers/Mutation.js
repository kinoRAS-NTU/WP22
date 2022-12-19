import ChatBoxModel from './../models/chatbox'
import { v4 as uuidv4 } from 'uuid'

const makeName = (name, to) => { return [name, to].sort().join('_') }

const checkOutChatBox = async (name1, name2) => {
    let name = makeName(name1, name2)
    let box = await ChatBoxModel.findOne({ name })
    if (!box)
        box = await new ChatBoxModel({ name }).save()
    return box
}

const Mutation = {
    createChatBox: async (parent, { name1, name2 }) => {
        const chatBox = await checkOutChatBox(name1, name2)
        return chatBox
    },
    createMessage: async (parent, { name, to, body }, { PubSub }) => {
        const chatBox = await checkOutChatBox(name, to)
        const newMsg = { sender: name, body }
        chatBox.messages.push(newMsg)
        await chatBox.save()
        const chatBoxName = makeName(name, to)
        PubSub.publish(`chatBox ${chatBoxName}`, {
            message: newMsg,
        })
        return newMsg
    },
}

export default Mutation
