import React from "react"
import { Outlet } from 'react-router-dom';
import { Header } from "./Header";
import { HomeMenu } from "./HomeMenu";

export const Home = (props) => {
    return (
        <section className="withHeader" id="home">
            <Header menu={<HomeMenu />} />
            <Outlet />
        </section>
    )
};