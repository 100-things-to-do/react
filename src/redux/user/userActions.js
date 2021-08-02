import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE, TOKEN_IS_VALID, TOKEN_IS_NOT_VALID, USER_SIGNED_OUT } from "./userTypes"
import axios from 'axios'


const fetchUserSuccess = (token) => {
    return {
        type: FETCH_USER_SUCCESS,
        payload: token
    }
}

const fetchUserFailure = (error) => {
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

const tokenIsValid = (user) => {
    return {
        type: TOKEN_IS_VALID,
        payload: user
    }
}

const tokenIsNotValid = (error) => {
    return {
        type: TOKEN_IS_NOT_VALID,
        payload: error
    }
}

const userSignedOut = () => {
    return {
        type: USER_SIGNED_OUT
    }
}



const fetchUserToken = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/users/signin', data)
        .then(response => {
            console.log(response)
            const users = response.data
            dispatch(fetchUserSuccess(users))
        })
        .catch(error => {
            const errMsg = error.message
            dispatch(fetchUserFailure(errMsg))
        })
    }
}


const checkToken = (token) => {
    return (dispatch) => {
        axios.get('http://localhost:5000/users/whoami', { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            dispatch(tokenIsValid())
        })
        .catch(error => {
            console.log(error.message)
            dispatch(tokenIsNotValid())
        })
    }
}

const signUp = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/users/signup', data)
        .then(response => {
            console.log(response)
            const user = response.data
            fetchUserToken(user)
        })
        .catch(error => {
        })        
    }
}

export {fetchUserToken, checkToken, userSignedOut, signUp}