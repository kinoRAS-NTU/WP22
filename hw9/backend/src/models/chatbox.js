import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    chatBox: { type: String },
    name: { type: String },
    to: { type: String },
    body: { type: String, required: [true, 'Body field is required.'] }
})

const MessageModel = mongoose.model('Message', MessageSchema)

export default MessageModel