import { Navigate } from "react-router-dom";
import API from "../API";

const PrivateRoute = ({element}) => {
    const ME = sessionStorage.getItem("ME");
    const localAuth = localStorage.getItem("auth");

    if (ME) {
        return element;
    } else {
        if (localAuth) {
            fetch(API.ADMIN_LOGIN, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: localAuth
            }).then(async (res) => {
                if (res.ok) return res.json();
                throw new Error(await res.text());
            }).then((admin) => {
                sessionStorage.setItem("ME", JSON.stringify(admin));
                return element;
            }).catch((err) => {
                console.error(err);
                return <Navigate to="/authentication" replace />
            });
        } else {
            return <Navigate to="/authentication" replace />
        }
    }
}

export default PrivateRoute;