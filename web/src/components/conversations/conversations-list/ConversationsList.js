import "./ConversationsList.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext"
import conversationsService from "../../../services/conversations-service";
import { Link } from "react-router-dom";
import Header from "../../misc/header/Header";
import Footer from "../../misc/footer/Footer";


function Conversations() {

    const { member } = useContext(AuthContext)
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        let isMounted = true;
        conversationsService.list()
            .then(conversations => {
                conversations = conversations.map(conversation => {
                    const friend = conversation.participants.find(participant => participant.id !== member.id)
                    return {
                        id: conversation.id,
                        friend,
                        lastMessage: conversation.messages[conversation.messages.length - 1]
                    }
                })
                if (isMounted) {
                    setConversations(conversations)
                }
            })
            .catch(error => console.log(error));
            return () => isMounted = false
    }, [member])



    return (
        <>
            <Header backButton="/" />
            <div className="conversation">
                {conversations.map(conversation => (
                    <Link to={`/conversations/${conversation.id}`} key={conversation.id}>
                        <div className="conversation_row">
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
            <Footer/>

        </>
    )
}
export default Conversations;
