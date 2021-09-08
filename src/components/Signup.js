import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp, resetErrorMsg } from "../redux";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
    const history = useHistory()
    const token = useSelector(state => state.user.token)
    const errorMsg = useSelector(state => state.user.error)
    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const userData = {}
        for (let key of data.keys()) {
            if (key === 'username') {
                userData.username = data.get(key)
            } else if (key === 'password') {
                userData.password = data.get(key)
            }
        }
        dispatch(signUp(userData))
    }

    const toastUsernameExists = () => {
        toast.error(errorMsg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

    useEffect(() => {
        if (token !== '') {
            history.push({
                pathname: `auctions`,
                state: { showToastLoggedIn: true },
            });
        }
    }, [token, history])

    useEffect(() => {
        if(errorMsg !== '') {
            toastUsernameExists()
            dispatch(resetErrorMsg())
        }
    }, [errorMsg])

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
                        Already registered <a href="/">sign in?</a>
                    </p>
                </form>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        </div>
    );

}