import "./MemberItem.css"

function MemberItem() {
    return (
        <div className="item">
            <div className="item_header">
                <img className="item_image" src="/defProfilePicture.png" />
                <div className="item_header_text">
                    <h3 className="item_name">Manuela, 32</h3>
                    <h4 classname="item_age"></h4>
                </div>
            </div>
            <div className="item_description_field">
                <h4>Description</h4>
                <p>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum </p>
            </div>

        </div >
    )
}

export default MemberItem