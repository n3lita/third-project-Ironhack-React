import React from "react"
import MemberItem from "../member-item/MemberItem"
import "./MembersList.css"


function MembersList(){
    return(
        <div>
            <div className="membercards">
                <section className="cards_container">
                    <article className="card">
                    <MemberItem/>
                    </article>

                    <article className="card">
                    <p> card 2</p>
                    </article>

                    <article className="card">
                    <p> card 3</p>
                    </article>


                </section>
            </div>
        </div>
    )
}

export default MembersList