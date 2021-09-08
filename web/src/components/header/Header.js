import React from "react";
import "./Header.css"
import { useHistory } from "react-router";
import { IconButton } from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Link } from "react-router-dom";


function Header ( {backButton} ) {
    const history = useHistory()
    return (
            <div className="header">
                {backButton ? (
                    <IconButton style={{ position: "absolute", left: "30px"}} onClick= {() => history.replace(backButton)}>
                        <ArrowBackIosIcon fontSize="large" className="header_icon"/>
                    </IconButton> 
                ) : 
                null} 
            <Link to="/" style={{ textDecoration: "none" }}>
                <p className="header_logo">
                    Girlz<i>Friends</i>
                </p>
            </Link>

            </div>
    )
}

export default Header