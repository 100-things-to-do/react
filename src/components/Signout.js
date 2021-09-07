import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { userSignedOut } from '../redux';

function Signout() {
    const history = useHistory()
    useEffect(() => {
        console.log("signedout")
        dispatch(userSignedOut())
        history.push({
            pathname: `auctions`,
            state: {showToastLoggedOut:true},
            });
    }, [])

    const dispatch = useDispatch()
    return (
        <></>
    );
}

export default Signout;