import { Avatar } from '@material-ui/core';
import React, { useState } from 'react'
import "./ConversationScreen.css"


function ConversationScreen() {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            name: "Ellen",
            image: "https://imagenes.heraldo.es/files/image_990_v1/files/fp/uploads/imagenes/2019/05/17/grumpy-cat.r_d.461-430-12593.jpeg",
            message: "que tal"
        },
        {
            message: "cool"
        }
    ])

    const handleSend = e => {
        e.preventDefault();

        setMessages([...messages, { message: input }])
        setInput('');
    }

    return (
        <div className="chatScreen">
            <p className="chatScreen_timestamp">You matched with Ellen on 10/08/21</p>
            {messages.map(message => (
                message.name ? (
                    <div className="chatScreen_message">
                        <Avatar
                            className="chatScreen_image"
                            alt={message.name}
                            src={message.image}
                        />
                        <p className="chatScreen_text">{message.message}</p>
                    </div>
                ) : (
                    <div className="chatScreen_message">
                        <p className="chatScreen_textOwn">{message.message}</p>
                    </div>
                )
            ))}
            <div>
                <form className="chatScreen_input">
                    <input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        className="chatScreen_inputField"
                        placeholder="Type a message..."
                        type="text" />
                    <button onClick={handleSend} type="submit" className="chatScreen_inputButton">SEND</button>
                </form>
            </div>
        </div>
    )
}

export default ConversationScreen