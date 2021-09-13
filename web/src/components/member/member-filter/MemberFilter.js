import { useState, useEffect } from "react"
import interestsData from './../../../assets/data/interests.json'

import "./MemberFilter.css"

function MemberFilter(props) {
    const [currentInterests, setCurrentInterests] = useState([])

    useEffect(() => {
        props.onFilterChange(currentInterests)
    }, [currentInterests, props])

    const handleInterest = (interest) => {

        if (currentInterests.includes(interest)) {
            setCurrentInterests(currentInterests.filter(e => e !== interest))
        } else {
            setCurrentInterests([...currentInterests, interest])
        }
    }

    return (
        <div className="dropdown">
            <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                Interests
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {
                    interestsData.map(interest => {
                        return (
                            <li className="dropdown-item" key={interest}>
                                <input
                                    onClick={() => handleInterest(interest)}
                                    className="form-check-input me-1"
                                    type="checkbox"
                                    value=""
                                    aria-label="..."
                                />
                                {interest}
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default MemberFilter