import React, { useEffect, useState } from "react"
import MemberItem from "../member-item/MemberItem"
import "./MembersList.css"

import memberService from "../../../services/member-service"

function MembersList() {
    const [members, setMembers] = useState([])

    useEffect(() => {
        fetchMembers()
    }, [])

    function fetchMembers() {
        memberService.list()
            .then(members => {
                setMembers(members)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        members &&
        <>
            <div className="membercards">
                <ul className="cards_container">
                    {members.map(member =>
                        <li key={ member.id }className="card" >
                            <MemberItem {...member} />
                        </li>
                    )}

                </ul>
            </div>
        </>
    )
}

export default MembersList