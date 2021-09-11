import { useEffect, useState } from "react"
import ConversationRow from "../conversation-row/ConversationRow"

import conversationsService from "../../../services/conversations-service"

function ConversationsList() {
    const [conversations, setConversations] = useState([])

    useEffect(() => {
        fetchConversations()
    }, [])

    function fetchConversations() {
        conversationsService.list()
            .then((conversations) => {
                setConversations(conversations)
                console.log(conversations)
            })
            .catch(error => {
                console.error(error)
            })
    }

    return (
        <div>
            <div className="chats">
                {conversations.map(conversation => 
                                <ConversationRow
                                key={conversation.participant[0]}
                                name={conversation.participant[0].name}
                                message={conversation.findOne({}, response => {conversation.messages.text.pop()})}
                                timestamp="40 sec ago"
                            />            
                )}
            </div>
        </div>
    )
}

export default ConversationsList