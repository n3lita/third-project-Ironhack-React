import "./Message.css"
import { format } from "timeago.js";

function Message({ own, text, messageSender, createdAt, sender }){
    console.log('sender',sender)
    return(
        <div className={own? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://res.cloudinary.com/nela/image/upload/v1631365871/girlzfriends/otoexz5swirfwkflm3no.webp" alt=""/>
                <p className="messageText">{text}</p>
            </div>
            <div className="messageBottom">{format(createdAt)}</div>
        </div>
    )
}

export default Message