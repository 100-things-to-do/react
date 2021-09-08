import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkToken } from "../redux";


export default function Credit() {
    //const [credit, setCredit] = useState(null)
    const user = useSelector(state => state.user.user)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    
    useEffect(() => {
        console.log(token)
        dispatch(checkToken(token))
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <div className="p-4 mt-5">
            Jokes on you!
            <br/>
            Credit: {user?.credit ? user?.credit : 'Loading...'}
        </div>
    )
}
