import { useHistory } from "react-router"
import service from "../../../services/member-service"
import { Link } from "react-router-dom"
import "./Register.css"
import { useForm } from "react-hook-form"

function Register() {
    const history = useHistory()
    const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: "all" });

    const onRegisterFormSubmit = member => {
        service.register(member)
            .then(() => history.push("/login"))
            .catch(error => {
                const { message, errors } = error.response?.data || error;
                if (errors) {
                    Object.keys(errors).forEach(input => {
                        setError(input, { type: "manual", message: errors[input] });
                    })
                } else {
                    setError("email", { type: "manual", message: message });
                }
            })
    }

    return (
        <div className="registerView">
            <div className="container register_container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <form onSubmit={handleSubmit(onRegisterFormSubmit)} className="box">
                                <h1>Register</h1>

                                <div><input type="text" {...register("name", { required: "Name is required" })} name="name" placeholder="Name"
                                    className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                </div>

                                <div><input type="email" {...register("email", { required: "Email is required" })}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} name="email" placeholder="user@example.com" />
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </div>

                                <div><input type="password" {...register("password", { required: 'Password is required' })} name="password" placeholder="Password"
                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                                </div>

                                <div>
                                    <label for="file-upload" className="custom-file-upload">
                                        <i class="fa fa-cloud-upload"></i> Select an image
                                    </label>
                                    <input id="file-upload" type="file" {...register("profilePicture")}
                                        className={`form-control ${errors.profilePicture ? 'is-invalid' : ''}`} name="ProfilePicture" placeholder="Upload a Picture" />
                                    {errors.profilePicture && <div className="invalid-feedback">{errors.profilePicture.message}</div>}
                                </div>

                                <input type="submit" name="Register" disabled={Object.keys(errors).length !== 0} />


                                <div className="col-md-12">
                                    <div>
                                        <a href={`${process.env.REACT_APP_API_BASE_URL}/authenticate/google`} className="btn btn-danger" role="button"><i className="fa fa-google" /> Login with Google</a>
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