import "./MemberItem.css"

function MemberItem({ name, age, description, interests, profilePicture, location }) {
    return (
        <div className="item">
            <div className="item_header">
                <img className="item_image" src={profilePicture} alt={name} />
                <div className="item_header_text">
                    <h3 className="item_name">{name}, {age}</h3>
                    <div className="item_header_text">
                        <div className="item_interests">{interests}</div>
                    </div>
                    <div className="item_header_text">
                        <div className="item_location">{location.coordinates}</div>
                    </div>
                </div>
            </div>
            <div className="item_description_field">
                <h4>Description</h4>
                <p>{description}</p>
            </div>
        </div >
    )
}

export default MemberItem