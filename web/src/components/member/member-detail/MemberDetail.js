import React, { useEffect, useState } from "react";
import memberService from "../../../services/member-service"
import Footer from "../../misc/footer/Footer";
import Header from "../../misc/header/Header";
import "./MemberDetail.css"
import getImageByName from "../../../assets/js/helperImg"
import { Link } from "react-router-dom"


function MemberDetail(props) {
    const [member, setMember] = useState({})

    useEffect(() => {
        const id = props.match?.params?.id;
        memberService.getUser(id)
            .then(member => setMember(member))
            .catch(error => console.error(error))
    }, [props])

    return (
        <>
            <Header />
            <div className="memberDetail">
                <div className="detailContainer">
                    <div><h1>{member.name}</h1>
                        {member.age}</div>
                    <div><p>"{member.description}"</p></div>
                    <div className="interests">
   {/*                      {
                            member.interests.map(interest => {
                                return (
                                <div className="interest">
                                <img src={getImageByName(interest)} key={interest} alt="interest" className="interestImg" />
                                <div className="interest_text">{interest}</div>
                                </div>
                                )
                            })
                        } */}
                    </div>
                </div>
                <Link to={`/conversation/${member.id}`}><button className="chatButton">Chat</button></Link>
            </div>
            <Footer />
        </>
    )
}


export default MemberDetail;
