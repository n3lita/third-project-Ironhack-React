import { useContext, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import service from "../../../services/member-service"
import { AuthContext } from "../../contexts/AuthContext"

import "./Login.css"

function Login() {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState()

    function handleChange(event) {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()
       // console.log(data)
        service.login(data.email, data.password)
            .then((member) => {
                auth.login(member)
                history.push("/")
            })
            .catch(() => {
                setError("incorrect Login")
            })
    }
    return (

        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="card">
                        <form onSubmit={handleSubmit} className="box">
                            <h1>Login</h1>
                            <p className="text-muted"> </p>
                            <input type="text" name="email" placeholder="user@example.com" onChange={handleChange} value={data.email} />
                            <input type="password" name="password" placeholder="Password" onChange={handleChange} value={data.password} />
                            <input type="submit" name="submit" value="Login" />
                            <div>
                                <a href={`${process.env.REACT_APP_API_BASE_URL}/authenticate/google`} className="btn btn-danger" role="button"><i className="fa fa-google" /> Login with Google</a>
                                <Link to="/register" className="btn btn-secondary" role="button">Register</Link>
                            </div>

                            <div className="col-md-12">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <img src="https://res.cloudinary.com/nela/image/upload/v1631618933/girlzfriends/assets/undraw_girl_just_wanna_have_fun_9d5u_vfw8ub.svg" alt="girls" />
        </div>
    )
}

export default Login