import "./conversations2.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext"
import conversationsService from "../../../services/conversations-service";
import memberService from "../../../services/member-service"


function Conversations2() {
    console.log()

    const { member } = useContext(AuthContext)
    //console.log(auth.member.id)

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
    },[member])



    return (
        <div className="conversation">
            {conversations.map(conversation => (
                <div className="conversationRow" key={conversation.id}>
                    <img className="conversationImg" src={conversation.friend.profilePicture} alt="profile" />
                    <span className="conversationName">{conversation.friend.name}</span>
                    <span className="conversationMessage">{conversation.lastMessage.text}</span>

                </div>
            )
            )}
        </div>
    )
}
export default Conversations2
