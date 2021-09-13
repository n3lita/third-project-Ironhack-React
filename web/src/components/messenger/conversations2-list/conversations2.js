import "./conversations2.css"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext"
import conversationsService from "../../../services/conversations-service";
import memberService from "../../../services/member-service"


function Conversations2() {

    const auth = useContext(AuthContext)
    //console.log(auth.member.id)

    const [conversations, setConversations] = useState([])
    //  const [user, setUser] = useState(null)
    const [member, setMember] = useState(friendId)

    useEffect(() => {
        conversationsService.list()
            .then(conversations => {
                setConversations(conversations)
                //        console.log(conversations[2].participants)
            })
            .catch(error => console.log(error))
    }, [])

    function friendId() {
        conversations.map(conversation => conversation.participants.find(participant => {
            if (participant !== auth.member.id) {
                console.log(participant)
                memberService.details(participant)
                    .then(member => setMember(member))
                console.log(member)
                    .catch(error => console.error(error))
                return member
            }
        }
    ))}

    return (
        <div className="conversation">
            {conversations.map(conversation => (
                <div className="conversationRow">
                    <img className="conversationImg" src="https://res.cloudinary.com/nela/image/upload/v1631365984/girlzfriends/c4b19mzhx40yrjqtny8h.webp" alt="profile" />
                    <span className="conversationName">John Doe</span>
                </div>
            )

            )}
        </div>
    )
}
export default Conversations2
