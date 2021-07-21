import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserToken } from '../redux'


function Demo() {
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    return (
        <div>
            <h2>Token: {token}</h2>
            <button onClick={() => dispatch(fetchUserToken())}>Get Token</button>
        </div>
    );
}

export default Demo;