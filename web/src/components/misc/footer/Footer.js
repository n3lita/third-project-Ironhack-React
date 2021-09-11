import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import "./Footer.css"
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import EventOutlinedIcon from '@material-ui/icons/EventOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';



function Footer() {
    return (
        <div className="footer">
            <IconButton className="footer_person" >
                <PersonOutlineOutlinedIcon fontSize="large" />
            </IconButton>

            <IconButton className="footer_event">
                <EventOutlinedIcon fontSize="large"  />
            </IconButton>

            <Link to="/conversations" >
                <IconButton className="footer_chat">
                    <SmsOutlinedIcon fontSize="large"  />
                </IconButton>
            </Link>
        </div>
    )
}

export default Footer