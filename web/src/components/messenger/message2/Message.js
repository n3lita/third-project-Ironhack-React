import "./Message.css"

function Message({own, text, createdAt}){
    return(
        <div className={own? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://res.cloudinary.com/nela/image/upload/v1631365871/girlzfriends/otoexz5swirfwkflm3no.webp" alt=""/>
                <p className="messageText">{text}</p>
            </div>
            <div className="messageBottom">{createdAt}</div>

        </div>
    )
}

export default Message