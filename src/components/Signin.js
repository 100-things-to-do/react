import React, { Component, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserToken } from "../redux";
import { Redirect } from "react-router";



export default function Signin() {

    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const userData = {}
        for (let key of data.keys()) {
            console.log(key, data.get(key))
            if(key === 'username'){
                userData.username = data.get(key)
            }else if (key === 'password'){
                userData.password = data.get(key)
            }
        }
        dispatch(fetchUserToken(userData))
    }

    if(token === ''){
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <form onSubmit={handleSubmit}>
                
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input name="username" type="text" className="form-control" placeholder="Enter username" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </div>
            </div>
        );
    }
    if(token !== ''){
        return (<Redirect to='/' />)
    }
}
