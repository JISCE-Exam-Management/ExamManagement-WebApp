import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CgProfile, CgLogOut } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';

export const Header = ({ menu }) => {
    const navigate = useNavigate();
    const ME = JSON.parse(sessionStorage.getItem("ME"));
    const [expand, setExpand] = React.useState(false);
    const logout = () => {
        sessionStorage.removeItem("ME");
        localStorage.removeItem("auth");
        navigate('/authentication', { replace: true });
    }
    return (
        <header className='header'>
            <Link to='/'><h1>JISCE Exams</h1></Link>
            <nav className="topNav">
                {menu ? menu : ""}
                <div className="profileIconContainer optionsContainer">
                    <CgProfile className="profileIcon" onClick={(e) => setExpand(!expand)} />
                    <span className={expand ? "background" : ""} onClick={(e) => setExpand(!expand)}></span>
                    <nav className={expand ? "profileOptions options expand" : "profileOptions options"}>
                        <div className="profileDetails">
                            <p className="name">{ME.name}</p>
                            <p className="email">{ME.email}</p>
                        </div>
                        <hr />
                        <ul className="profileMenu">
                            <li onClick={(e) => setExpand(!expand)}><CgProfile/> Profile</li>
                            <li onClick={(e) => setExpand(!expand)}><FiSettings/> Settings</li>
                            <li onClick={(e) => {setExpand(!expand); logout();}}><CgLogOut /> Log Out</li>
                        </ul>
                    </nav>
                </div>
            </nav>
        </header>
    )
}