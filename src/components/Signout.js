import React, { useEffect } from 'react';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { userSignedOut } from '../redux';

function Signout() {
    useEffect(() => {
        console.log("signedout")
        dispatch(userSignedOut())
    }, [])

    const dispatch = useDispatch()
    return (
        <Redirect to="/" />
    );
}

export default Signout;