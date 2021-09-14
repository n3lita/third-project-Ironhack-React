import Message from "../message2/Message"

import "./ChatBox.css"

function ChatBox({ }){
    return(
        <>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                </div>
                <div className="chatBoxBottom">
                    <textarea className="chatMessageInput" placeholder="Write something"></textarea>
                    <button className="chatSubmitButton">Send</button>
                </div>
            </div>
        </div>
        </>
    )
}
export default ChatBox
