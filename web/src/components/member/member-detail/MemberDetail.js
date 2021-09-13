import React, { useEffect, useState } from "react";
import memberService from "../../../services/member-service"
import Footer from "../../misc/footer/Footer";
import Header from "../../misc/header/Header";
import "./MemberDetail.css"

function MemberDetail(props) {
    const [member, setMember] = useState({})

    useEffect(() => {
        const id = props.match?.params?.id;
        memberService.details(id)
            .then(member => setMember(member))
            .catch(error => console.error(error))
    }, [props])

    function handleClick(event){
        event.preventDefault();
        

    }

    return (
        <>
            <Header />
            <div className="memberDetail">
                <div className="detailContainer">
                    <div><h1>{member.name}</h1>
                    {member.age}</div>
                    <div><p>"{member.description}"</p></div>
                    <div>{member.interests}</div>
                    <div><button onClick={handleClick}>Chat</button></div>
                </div>
            </div>
            <Footer />
        </>
    )
}


export default MemberDetail;
