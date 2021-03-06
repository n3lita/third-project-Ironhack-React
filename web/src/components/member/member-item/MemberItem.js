import getImageByName from "../../../assets/js/helperImg"
import "./MemberItem.css"
import { Link } from "react-router-dom"


function MemberItem({ id, name, age, interests, profilePicture, location }) {

    return (
        <div className="memberItem">
            <Link to={`/members/${id}`}>
                <div className="item1_header">
                    <img className="item1_image" src={profilePicture} alt={name} />
                    <div className="item1_header_text">
                        <h3 className="item1_name">{name}, {age}</h3>

{/*                         <div className="item1_header_text">
                            <div className="item1_location">{location.coordinates}</div>
                        </div>
 */}                    </div>
                </div>
                <div className="itemInterests">
                    {
                        interests.map(interest => {
                            return (<img src={getImageByName(interest)} key={interest} alt="interest" className="interestImg" />)
                        })
                    }
                </div>
           </Link>

        </div >
    )
}

export default MemberItem