import { useState } from "react"
import { useHistory } from "react-router"
import service from "../../../services/member-service"


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
        <div>
  {/*           <form onSubmit={handleSubmit}>
                <div>
                    Email
                    <input type="email" name="email"></input>
                    <small style={{ color: 'red' }}>
                        {error?.email}
                    </small>
                </div>

                <div>
                    Name
                    <input type="text" name="name"></input>
                    <small style={{ color: 'red' }}>
                        {error?.name}
                    </small>
                </div>

                <div>
                    Password
                    <input type="password" name="password"></input>
                    <small style={{ color: 'red' }}>
                        {error?.password}
                    </small>
                </div>

                <div>
                    Profile Picture
                    <input type="file" name="profilePicture"></input>
                    <small style={{ color: 'red' }}>
                        {error?.profilePicture}
                    </small>
                </div>
                <button type="submit">Create</button>
            </form> */}

            <div className="container">
    <div className="row">
        <div className="col-md-6">
            <div className="card">
                <form onSubmit={handleSubmit} className="box">
                    <h1>Register</h1>
                    <div><input type="text" name="name" placeholder="Name"/>
                    <small style={{ color: 'red' }}>{error?.name}</small>
                    </div>
                    <div><input type="text" name="email" placeholder="Email"/>
                    <small style={{ color: 'red' }}>{error?.email}</small>
                    </div> 
                    <div><input type="password" name="password" placeholder="Password"/>
                    <small style={{ color: 'red' }}>{error?.password}</small>
                    </div>
                    <div><input type="file" name="ProfilePicture" placeholder="Upload a Picture"/>
                    <small style={{ color: 'red' }}>{error?.profilePicture}</small>
                    </div>
                    <input type="submit" name="Register"/>
                    <div className="col-md-12">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

        </div>
    )
}

export default Register