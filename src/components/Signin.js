import { useDispatch, useSelector } from "react-redux";
import { fetchUserToken, resetErrorMsg } from "../redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signin() {
    const history = useHistory()
    var token = useSelector(state => state.user.token)
    var errorMsg = useSelector(state => state.user.error)
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
        dispatch(fetchUserToken(userData))
    }

    const toastUserNotFound = () => {
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
        if(errorMsg !== ''){
            toastUserNotFound()
            dispatch(resetErrorMsg())
            // Burada redux error messageini empty string yapabilirsin.
        }
    })

    useEffect(() => {
        if (token !== '') {
            history.push({
                pathname: `auctions`,
                state: { showToastLoggedIn: true },
            });
        }
    }, [token])


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
                        Forgot <a href="/">password?</a>
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
