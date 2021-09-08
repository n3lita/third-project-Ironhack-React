import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import memberService from "../../../services/member-service"

function MemberDetail(props) {
    const [member, setMember] = useState({})

    useEffect(() => {
        const id = props.match?.params?.id;
        memberService.details(id)
            .then(member => setMember(member))
            .catch(error => console.error(error))
    }, [])

    return (
        <div className="container">
            <h1>{member.name}</h1>
            <p>{member.description}</p>
            <button>Chat</button>
        </div>
    )
}


export default MemberDetail;
