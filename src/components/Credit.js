import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkToken, addCredit } from "../redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Credit() {
    //const [credit, setCredit] = useState(null)
    const user = useSelector(state => state.user.user)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(checkToken(token))
    }, [])


    const addCreditClicked = () => {
        const creditToAdd = 10
        addCredit(token, creditToAdd, addCreditCb)
        dispatch(checkToken(token))
    }

    const addCreditCb = (isTrue, responseMsg) => {
        console.log(responseMsg)
        toast.success(responseMsg, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }


    return (
        <div className="p-4 mt-5">
            Jokes on you!
            <br/>
            Credit: {user?.credit ? user?.credit : 'Loading...'}
            <button onClick={addCreditClicked} className="btn btn-primary btn-block">Add Credit</button>
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
    )
}
