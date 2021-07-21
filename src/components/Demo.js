import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserToken, checkToken} from '../redux'


function Demo() {
    const token = useSelector(state => state.user.token)

    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])

    useEffect(() => {
        if(token !== ''){
            console.log("checking token...")
            dispatch(checkToken(token))
        }
    }, [])

    const dispatch = useDispatch()
    

    
    return (
        <div>
            <h2>Token: </h2>
            <button onClick={() => dispatch(fetchUserToken())}>Get Token</button>
        </div>
    );


}



export default Demo;