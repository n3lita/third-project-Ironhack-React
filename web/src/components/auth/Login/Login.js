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
        console.log(data)
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
        <div>
            {/*             {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit} className="formInputs">
                <div >
                    Email
                    <input
                        name="email"
                        type="text"
                        onChange={handleChange}
                        value={data.email}
                    />
                </div>
                <div>
                    Password
                    <input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={data.password}
                    />
                </div>
                <button type="submit">Login</button>
                <div>
                    <a href="http://localhost:3001/api/authenticate/google">Google login</a>
                </div>
                <Link to="/login">Login</Link>
            </form> */}

            {/* ----------------------------- */}
            <div class="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit} className="box">
                                <h1>Login</h1>
                                <p className="text-muted"> </p>
                                <input type="text" name="email" placeholder="email" onChange={handleChange} value={data.email} />
                                <input type="password" name="password" placeholder="Password" onChange={handleChange} value={data.password} />
                                <input type="submit" name="submit" value="Login" />
                                <div className="col-md-12">
                                </div>
                                <Link to="/login">Login</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login