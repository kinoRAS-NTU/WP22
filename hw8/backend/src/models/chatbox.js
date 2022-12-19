import mongoose from 'mongoose'
const Schema = mongoose.Schema

mongoose.set('strictQuery', false);

const ChatBoxSchema = new Schema({
    name: { type: String },
    messages: { type: Array },
})

const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema)

export default ChatBoxModel