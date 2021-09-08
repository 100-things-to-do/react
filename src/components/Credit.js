import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkToken, addCredit } from "../redux";


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
        dispatch(addCredit(token, creditToAdd))
    }



    return (
        <div className="p-4 mt-5">
            Jokes on you!
            <br/>
            Credit: {user?.credit ? user?.credit : 'Loading...'}
            <button onClick={addCreditClicked} className="btn btn-primary btn-block">Add Credit</button>
        </div>
    )
}
