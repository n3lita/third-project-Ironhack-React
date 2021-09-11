import { useState } from "react"
import { useHistory } from "react-router"
import service from "../../../services/member-service"


function Register() {
    const history = useHistory()
    const [error, setError] = useState()

    function handleSubmit(event) {
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
            <form onSubmit={handleSubmit}>
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
            </form>
        </div>
    )
}

export default Register