import { Navigate } from "react-router-dom";
import API from "../API";

const PrivateRoute = ({view}) => {
    const ME = sessionStorage.getItem("ME");
    const localAuth = localStorage.getItem("auth");

    if (ME) {
        return view;
    } else {
        if (localAuth) {
            fetch(API.ADMIN_LOGIN, {
                method: "POST",
                body: localAuth
            }).then((res) => res.json()).then((admin) => {
                sessionStorage.setItem("ME", JSON.stringify(admin));
                return view;
            }).catch((err) => {
                console.error(err);
                return <Navigate to="/authentication" />
            });
        } else {
            return <Navigate to="/authentication" />
        }
    }
}

export default PrivateRoute;