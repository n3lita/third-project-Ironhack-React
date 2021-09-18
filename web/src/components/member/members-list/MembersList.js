import React, { useEffect, useState } from "react"
import MemberItem from "../member-item/MemberItem"
import "./MembersList.css"
import memberService from "../../../services/member-service"
import MemberFilter from "../member-filter/MemberFilter"
import Header from "../../misc/header/Header"
import Footer from "../../misc/footer/Footer"

function MembersList() {
    const [members, setMembers] = useState([])
    const [interests, setInterests] = useState([])

    useEffect(() => {
        let isMounted = true
        memberService.list(interests)
            .then(members => {
                if (isMounted) {
                    setMembers(members)
                }
            })
            .catch(error => {
                console.log(error)
            })
        return () => isMounted = false;
    }, [interests])

    const handleFilterChange = (interests) => {
        setInterests(interests)
    }

    return (
        members &&
        <>
            <Header />
            <div className="memberList">
                <MemberFilter onFilterChange={handleFilterChange} />
                <div className="membercards">
                    <ul className="memberContainer">
                        {members.map(member =>
                            <li key={member.id} className="memberBlock" >
                                <MemberItem {...member} />
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default MembersList