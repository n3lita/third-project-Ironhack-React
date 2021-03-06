import { useContext, useEffect, useState } from "react"
import Message from "../message/Message"
import { useParams } from 'react-router';
import conversationsService from "../../../services/conversations-service";
import "./ConversationScreen.css"
import { AuthContext } from "../../contexts/AuthContext";
import Header from "../../misc/header/Header";

function ConversationScreen() {
    const { conversationId } = useParams()
    const [conversation, setConversation] = useState(null)
    const [currentMessage, setCurrentMessage] = useState("")
    const [needReload, setNeedReload] = useState(false)
    const { member } = useContext(AuthContext)

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            const interval = setInterval(() => {
                conversationsService.getConversation(conversationId)
                    .then((conversation) => {
                        setConversation(conversation)
                    })
            }, 1000)
            return () => clearInterval(interval)
        }
        return () => isMounted = false
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
            <Header backButton="/conversations" />
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    <div className="chatBoxTop">
                        {
                            conversation?.messages.map(message => {
                                return (<Message  {...message} own={message.sender.id === member.id} key={message.id} />)
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
export default ConversationScreen
