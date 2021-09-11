import React from "react"
import "./ConversationRow.css"
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'

function ConversationRow({ id, name, message, profilePicture, createdAt }) {
    return (
        <Link to={`/conversations/${id}`}>
            <div className="chat">
                <Avatar className="chat_image" alt={name} src={profilePicture} />
                <div className="chat_details">
                    <h2>{name}</h2>
                    <p>{message}</p>
                </div>
                <p className="chat_timestamp">{createdAt}</p>
            </div>
        </Link>
    )
}

export default ConversationRow