import { useState } from "react"
import { useHistory } from "react-router"
import service from "../../../services/member-service"
import { Link } from "react-router-dom"
import "./Register.css"

function Register() {
    const history = useHistory()
    const [error, setError] = useState()

    function handleSubmit(event) {
        event.preventDefault()

        service.register({
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            profilePicture: event.target.profilePicture.files[0]
        })
            .then(() => {
                history.push("/login")
            })
            .catch(error => {
                setError(error.response.data.errors)
            })
    }

    return (
        <div className="registerView">
            <div className="container register_container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <form onSubmit={handleSubmit} className="box">
                                <h1>Register</h1>
                                <div><input type="text" name="name" placeholder="Name" />
                                    <small style={{ color: 'red' }}>{error?.name}</small>
                                </div>
                                <div><input type="text" name="email" placeholder="Email" />
                                    <small style={{ color: 'red' }}>{error?.email}</small>
                                </div>
                                <div><input type="password" name="password" placeholder="Password" />
                                    <small style={{ color: 'red' }}>{error?.password}</small>
                                </div>
                                <div> 
                                    <label for="file-upload" className="custom-file-upload">
                                    <i class="fa fa-cloud-upload"></i> Select an image
                                    </label>

                                    <input id="file-upload" type="file" name="ProfilePicture" placeholder="Upload a Picture" />
                                    <small style={{ color: 'red' }}>{error?.profilePicture}</small>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                </div>
                                <input type="submit" name="Register" />
                                <div className="col-md-12">
                                    <div>
                                        <a href="http://localhost:3001/api/authenticate/google" className="btn btn-danger" role="button"><i className="fa fa-google" /> Login with Google</a>
                                        <Link to="/login" className="btn btn-secondary" role="button">Login</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <img className="registerImage" src="https://res.cloudinary.com/nela/image/upload/v1631621955/girlzfriends/assets/undraw_happy_feeling_slmw_pxix9x.svg" alt="girls" />
            </div>
    )
}

export default Register