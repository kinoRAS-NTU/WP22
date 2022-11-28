import React, { useState, useEffect, useRef } from 'react'
import { Input, Tabs } from "antd"
import styled from "styled-components"
import { useChat } from "./hooks/useChat"
import Title from "../components/Title.js"
import Message from '../components/Message'
import ChatModal from '../components/ChatModal'

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`

const ChatBoxWarpper = styled.div`
    height: calc(240px - 36px);
    display; flex;
    flex-direction: column;
    overflow: auto;
`

const FootRef = styled.div`
    height: 24px;
`

const ChatRoom = () => {
    const { me, messages, startChat, sendMessage, displayStatus } = useChat()

    const [chatBoxes, setChatBoxes] = useState([])
    const [activeKey, setActiveKey] = useState('')
    const [msg, setMsg] = useState('')
    const [msgSent, setMsgSent] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    const msgFooter = useRef(null)

    const displayChat = (chat) => (
        chat.length === 0 ? (
            <p style={{color: '#ccc' }}> No messages... </p>
        ) : (
            <ChatBoxWarpper>
                {chat.map(({ name, body }, i) => (
                    <Message isMe={name === me} message={body} key={i} />
                ))}
                <FootRef ref={msgFooter}/>
            </ChatBoxWarpper>
        )
    )

    const extractChat = (frd) => {
        return displayChat(messages.filter(({name, to, body}) => ((name === frd && to === me) || (name === me && to === frd))))
    }

    const createChatBox = (frd) => {
        if (chatBoxes.some(({key}) => key === frd)) {
            throw new Error(frd + "'s chat box has alread been opened.")
        }
        const chat = extractChat(frd)
        setChatBoxes([...chatBoxes,{
            label: frd,
            children: chat, 
            key: frd
        }])
        setMsgSent(true)
        return frd
    }

    const removeChatBox = (targetKey, activeKey) => {
        const index = chatBoxes.findIndex(({key}) => key === activeKey)
        const newChatBoxes = chatBoxes.filter(({key}) => key !== targetKey)
        setChatBoxes(newChatBoxes)
        return activeKey ?
            activeKey === targetKey ?
                index === 0 ?
                    ''
                    : chatBoxes[index - 1].key
                : activeKey
            : ''
    }

    const scrollToBottom = () => {
        if (msgFooter.current) msgFooter.current.scrollIntoView({ behavior: 'smooth', block: "start" })
    }

    useEffect(() => { scrollToBottom(); setMsg('') }, [msgSent])
    useEffect(() => { if (activeKey) startChat(me, activeKey) }, [activeKey])
    useEffect(() => {
        const chat = extractChat(activeKey)
        const index = chatBoxes.findIndex(({key}) => key === activeKey)
        if (index >= 0) {
            let newChatBoxes = chatBoxes;
            newChatBoxes[index].children = chat;
            setChatBoxes(newChatBoxes)
        }
        scrollToBottom()
        setMsg(' ')
        setTimeout(() => {setMsg('')}, 5);
    }, [messages])

    return (<>
        <Title name={me}/>
        <ChatBoxesWrapper 
            tabBarStyle={{ height: '36px' }}
            type="editable-card"
            activeKey={activeKey}
            onChange={(key) => {
                setActiveKey(key)
                extractChat(key)
            }}
            onEdit={(targetKey, action) => {
                if (action === 'add') setModalOpen(true)
                else if (action === 'remove') setActiveKey(removeChatBox(targetKey, activeKey))
            }}
            items={chatBoxes}
        />
        <ChatModal
            open={modalOpen}
            onCreate={({ name }) => {
                setActiveKey(createChatBox(name))
                extractChat(name)
                setModalOpen(false)
            }}
            onCancel={() => { setModalOpen(false) }}
        />
        <Input.Search
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            onSearch={(msg) => {
                if (!msg) {
                    displayStatus({ type: 'error', msg: 'Please enter a message body.' })
                    return
                }
                sendMessage(me, activeKey, msg)
                console.log(activeKey)
                setMsg('')
                setMsgSent(true)
            }}
            enterButton="Send"
            placeholder="Type a message here..."
            disabled={!activeKey}
        />
    </>)
}

export default ChatRoom
