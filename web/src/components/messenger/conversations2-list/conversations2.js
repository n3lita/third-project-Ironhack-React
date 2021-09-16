import "./conversations2.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext"
import conversationsService from "../../../services/conversations-service";
import { Link } from "react-router-dom";


function Conversations2() {
    console.log()

    const { member } = useContext(AuthContext)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        conversationsService.list()
            .then(conversations => {
                console.log(conversations)
                conversations = conversations.map(conversation => {
                    const friend = conversation.participants.find(participant => participant.id !== member.id)
                    return {
                        id: conversation.id,
                        friend,
                        lastMessage: conversation.messages[conversation.messages.length - 1]
                    }
                })
                setConversations(conversations)
            })
            .catch(error => console.log(error))
    }, [member])



    return (
        <div className="conversation">
            {conversations.map(conversation => (
                <Link to={`/conversations/${conversation.id}`}>
                    <div className="conversation_row" key={conversation.id}>
                        <img className="conversation_img" src={conversation.friend.profilePicture} alt="profile" />
                        <div className="conversation_details">
                            <span className="conversation_name">{conversation.friend.name}</span>
                            <p className="conversation_message">{conversation?.lastMessage?.text}</p>
                        </div>
                    </div>
                </Link>
            )
            )}
        </div>
    )
}
export default Conversations2
