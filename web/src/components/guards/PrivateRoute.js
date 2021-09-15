import { useContext } from "react";
import { Redirect, Route } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

function PrivateRoute({ component: Component, ...routeProps}) {
    const { member } = useContext(AuthContext)
    return (
        <Route {...routeProps} component = {( componentProps) => {
            if (member) {
                return <Component {...componentProps} />
            }else {
                return <Redirect to="login" />
            }
        }} />
    )
}

export default PrivateRoute;