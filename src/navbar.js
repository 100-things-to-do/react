import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import React, { useEffect } from 'react';
import {useSelector} from "react-redux";

const validUserNavItemsLeftAlign = [
    <li className="nav-item">
        <Link className="nav-link" to={"/Categories-selector"}>Categories Selector</Link>
    </li>

]

const validUserNavItemsRightAlign = [
    <li className="nav-item">
        <Link className="nav-link" to={"/sign-out"}>Sign out</Link>
    </li>

]

const nonValidUserNavItemsLeftAlign = [
    <li className="nav-item">
        <Link className="nav-link" to={"/Categories-selector"}>Categories Selector</Link>
    </li>

]

const nonValidUserNavItemsRightAlign = [
    <li className="nav-item">
        <Link className="nav-link" to={"/sign-in"}>Login</Link>
    </li>,
    <li className="nav-item">
        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
    </li>

]

export default function Navbar(){
    const isUserValid = useSelector(state => state.user.isUserValid)

    return (
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
                {isUserValid ? validUserNavItemsLeftAlign : nonValidUserNavItemsLeftAlign}
            </ul>
            <ul className="navbar-nav ms-auto">
                {isUserValid ? validUserNavItemsRightAlign : nonValidUserNavItemsRightAlign}
            </ul>
        </div>
    )
}