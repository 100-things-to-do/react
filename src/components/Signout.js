import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { userSignedOut } from '../redux';

function Signout() {
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(userSignedOut("User logged out successfully!", 'success'))
        history.push({
            pathname: `sign-in`,
            });
    }, [])


    return (
        <></>
    );
}

export default Signout;