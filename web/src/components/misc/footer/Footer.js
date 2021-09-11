import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import "./Footer.css"
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';




function Footer() {
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
        </div>
    )
}

export default Footer