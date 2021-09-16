import { useContext, useEffect, useState } from "react"
import Message from "../message2/Message"
import { useParams } from 'react-router';
import conversationsService from "../../../services/conversations-service";

import "./ChatBox.css"
import { AuthContext } from "../../contexts/AuthContext";

function ChatBox() {
    const { conversationId } = useParams()
    const [conversation, setConversation] = useState(null)
    const [currentMessage, setCurrentMessage] = useState("")
    const [needReload, setNeedReload] = useState(false)
    const { member } = useContext(AuthContext)

    useEffect(() => {
        conversationsService.getConversation(conversationId)
            .then((conversation) => {
                setConversation(conversation)
            })
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
                                return (<Message  {...message} own={message.sender === member.id} />)
                            })
                        }
                    </div>
                    <div className="chatBoxBottom">
                        <textarea
                            value={currentMessage}
                            className="chatMessageInput"
                            placeholder="Write something"
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
