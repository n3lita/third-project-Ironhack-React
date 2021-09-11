import React, { useEffect, useState } from "react"
import MemberItem from "../member-item/MemberItem"
import "./MembersList.css"

import memberService from "../../../services/member-service"
import MemberFilter from "../member-filter/MemberFilter"

function MembersList() {
    const [members, setMembers] = useState([])
    const [interests, setInterests] = useState([])
   
    useEffect(() => {
        memberService.list(interests)
            .then(members => {
                setMembers(members)
            })
            .catch(error => {
                console.log(error)
            })
    }, [interests])

 
    const handleFilterChange = (interests) => {
        setInterests(interests)
    }

    return (
        members &&
        <>
            <MemberFilter onFilterChange={handleFilterChange}/>
            <div className="membercards">
                <ul className="memberContainer">
                    {members.map(member =>
                        <li key={ member.id }className="memberBlock" >
                            <MemberItem {...member} />
                        </li>
                    )}
                </ul>
            </div>
        </>
    )
}

export default MembersList