import React, { useEffect, useState } from "react";
import memberService from "../../../services/member-service"
import Footer from "../../misc/footer/Footer";
import Header from "../../misc/header/Header";
import "./MemberDetail.css"
import getImageByName from "../../../assets/js/helperImg"
import { useHistory, useParams } from "react-router-dom"
import conversationsService from "../../../services/conversations-service";


function MemberDetail(props) {

    const { id } = useParams();
    const history = useHistory()
    const [member, setMember] = useState(null)

    useEffect(() => {
        const id = props.match?.params?.id;
        memberService.getUser(id)
            .then(member => setMember(member))
            .catch(error => console.error(error))
    }, [props])


    const handleConversationClick = () => {
        conversationsService.createConversation(id)
            .then((conversation) => {
                console.log('conversation',conversation)
                history.push(`/conversations/${conversation.id}`)
            })
    }
    return member && (
        <>
            <Header />
            <div className="memberDetail">
                <div className="detailContainer">
                    <div><h1>{member.name}</h1>
                        {member.age}</div>
                    <div><p>"{member.description}"</p></div>
                    <div className="interests">
                        { member && member.interests.map(interest => {
                                return (
                                    <div className="interest">
                                        <img src={getImageByName(interest)} key={interest} alt="interest" className="interestImg" />
                                        <div className="interest_text">{interest}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <button className="chatButton" onClick={handleConversationClick}>Chat</button>
            </div>
            <Footer />
        </>
    )
}


export default MemberDetail;
