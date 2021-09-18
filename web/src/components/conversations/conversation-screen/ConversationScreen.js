import { useContext, useEffect, useState } from "react"
import Message from "../message/Message"
import { useParams } from 'react-router';
import conversationsService from "../../../services/conversations-service";
import "./ConversationScreen.css"
import { AuthContext } from "../../contexts/AuthContext";

function ChatBox() {
    const { conversationId } = useParams()
    const [conversation, setConversation] = useState(null)
    const [currentMessage, setCurrentMessage] = useState("")
    const [needReload, setNeedReload] = useState(false)
    const { member } = useContext(AuthContext)

    useEffect(() => {
        const interval = setInterval(() => {
            conversationsService.getConversation(conversationId)
                .then((conversation) => {
                    setConversation(conversation)
                })
        },2000)
        return() => clearInterval(interval)
    }, [conversationId, needReload])

    const handleSendMessage = (e) => {
        e.preventDefault()

        conversationsService.createMessage(conversationId, currentMessage)
        .then(() => {
            setNeedReload(!needReload)
            setCurrentMessage("")
        }) 
    }

    return (
        <>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        {
                            conversation?.messages.map(message => {
                                return (<Message  {...message} own={message.sender === member.id} key={message.id} messageSender={message.sender}/>)
                            })
                        }
                    </div>
                    <div className="chatBoxBottom">
                        <textarea
                            value={currentMessage}
                            className="chatMessageInput"
                            placeholder="Write something..."
                            onChange={(e) => setCurrentMessage(e.target.value)}
                        ></textarea>
                        <button onClick={handleSendMessage} className="chatSubmitButton">Send</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChatBox
