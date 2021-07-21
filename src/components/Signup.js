import React, { Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { signUp } from "../redux";

export default function Signup(){
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
        dispatch(signUp(userData))
    }

    if(token === ''){
        return (
            <div className="auth-wrapper">
            <div className="auth-inner">
            <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
    
                <div className="form-group">
                    <label>Username</label>
                    <input name="username" type="text" className="form-control" placeholder="Enter username" />
                </div>
    
                <div className="form-group">
                    <label>Password</label>
                    <input name="password" type="password" className="form-control" placeholder="Enter password" />
                </div>
    
                <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">sign in?</a>
                </p>
            </form>
            </div>
            </div>
        );
    }

    if(token !== ''){
        return(<Redirect to="/" />)
    }

}