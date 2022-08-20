import React from 'react'
import { NavLink } from 'react-router-dom';

export const HomeMenu = () => {
    return (
        <ul className="mainMenu">
            <NavLink className={({ isActive }) => isActive ? "mainMenuItem active" : "mainMenuItem"} end to="/exams">Exams</NavLink>
            <NavLink className={({ isActive }) => isActive ? "mainMenuItem active" : "mainMenuItem"} end to="/students">Students</NavLink>
            <NavLink className={({ isActive }) => isActive ? "mainMenuItem active" : "mainMenuItem"} end to="/users">Users</NavLink>
        </ul>
    )
}
