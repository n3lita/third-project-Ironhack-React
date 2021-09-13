import "./Message.css"

function Message({own}){
    return(
        <div className={own? "message own" : "message"}>
            <div className="messageTop">
                <img className="messageImg" src="https://res.cloudinary.com/nela/image/upload/v1631365871/girlzfriends/otoexz5swirfwkflm3no.webp" alt=""/>
                <p className="messageText">Hellooo this is a message lorem Hellooo this is a message lorem Hellooo this is a message lorem Hellooo this is a message lorem Hellooo this is a message lorem</p>
            </div>
            <div className="messageBottom">1 hour ago</div>

        </div>
    )
}

export default Message