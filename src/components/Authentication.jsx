import { Login } from "./Login";
import { Signup } from "./Signup";
import React from "react"

export const Authentication = (props) => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    return (
        <div className="container">
            <div className="tabContainer">
                <div className="tabs">
                    <div className={(selectedTab === 0) ? "tab tabActive" : "tab"} id="loginTab" onClick={(e)=> setSelectedTab(0)}>Log In</div>
                    <div className={(selectedTab === 1) ? "tab tabActive" : "tab"} id="signupTab" onClick={(e)=> setSelectedTab(1)}>Sign Up</div>
                </div>
                <div className="box">
                    {selectedTab === 0 ? <Login /> : <Signup />}
                </div>
            </div>
        </div>
    )
};