import { IconButton } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import "./Footer.css"
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { AuthContext } from '../../contexts/AuthContext';
import memberService from "../../../services/member-service"



function Footer() {
    const history = useHistory()
    const auth = useContext(AuthContext)

    function handleLogout(event) {
        event.preventDefault()
        memberService.logout()
        .then(() => {
            auth.logout()
            history.push("/login")
        })
    }

    return (
        <div className="footer">
            <Link to="/">
                <IconButton className="footer_person" >
                    <GroupOutlinedIcon fontSize="large" />
                </IconButton>
            </Link>

            <IconButton className="footer_event">
                <EventOutlinedIcon fontSize="large" />
            </IconButton>

            <Link to="/conversations" >
                <IconButton className="footer_chat">
                    <SmsOutlinedIcon fontSize="large" />
                </IconButton>
            </Link>

            <Link to="/logout" onClick={handleLogout}>
                <IconButton className="footer_chat">
                    <ExitToAppOutlinedIcon fontSize="large" />
                </IconButton>
            </Link>


        </div>
    )
}

export default Footer