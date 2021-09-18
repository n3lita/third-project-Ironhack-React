import "./Message.css"
import { format } from "timeago.js";

function Message({ own, text, createdAt, sender }){
    return(
        <div className={own? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src={sender.profilePicture} alt=""/>
                <p className="messageText">{text}</p>
            </div>
            <div className="messageBottom">{format(createdAt)}</div>
        </div>
    )
}

export default Message