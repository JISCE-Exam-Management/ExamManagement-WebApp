import React from "react"
import API from "../API";
import { useNavigate } from 'react-router-dom';

export const Login = (props) => {
    const navigate = useNavigate();
    const initState = {
        email: "",
        password: ""
    };
    const [data, setData] = React.useState(initState);
    const [checked, setChecked] = React.useState(true);
    const login = (e) => {
        e.preventDefault();
        fetch(API.ADMIN_LOGIN, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(async (res) => {
            if (res.ok) return res.json();
            throw new Error(await res.text());
        }).then((admin) => {
            if (checked) {
                localStorage.setItem("auth", JSON.stringify(data))
            }
            sessionStorage.setItem("ME", JSON.stringify(admin));
            navigate('/', { replace: true });
        }).catch((e) => alert(e.message));
    }
    return (
        <form onSubmit={login}>
            <input className="textBox" type="email" name="email" placeholder="Enter Email" required value={data.email} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
            <input className="textBox" type="password" name="password" placeholder="Enter Password" required value={data.password} onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })} />
            <input id="keepLoggedIn" type="checkbox" checked={checked} onChange={(e) => setChecked(!checked)} />
            <label htmlFor="keepLoggedIn">Keep me logged in</label>
            <button type="submit" className="authenticateBtn positiveBtn">Log In</button>
        </form>
    )
}