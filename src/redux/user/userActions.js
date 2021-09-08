import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE, TOKEN_IS_VALID, TOKEN_IS_NOT_VALID, USER_SIGNED_OUT, RESET_ERROR_MSG, SET_ERROR_MSG } from "./userTypes"
import axios from 'axios'

const setErrorMsg = (error) => {
    return {
        type: SET_ERROR_MSG,
        payload: error
    }
}

const resetErrorMsg = () => {
    return {
        type: RESET_ERROR_MSG
    }
}
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
            const users = response.data
            dispatch(fetchUserSuccess(users))
            console.log(users)
        })
        .catch(error => {
            console.log(error.response.data)
            dispatch(fetchUserFailure(error.response.data))
        })
    }
}


const checkToken = (token) => {
    return (dispatch) => {
        axios.get('http://localhost:5000/users/whoami', { headers: {"Authorization" : `Bearer ${token}`} })
        .then(response => {
            dispatch(tokenIsValid(response.data))
        })
        .catch(error => {
            console.log(error.response.data)
            dispatch(tokenIsNotValid())
        })
    }
}

const signUp = (data) => {
    return (dispatch) => {
        axios.post('http://localhost:5000/users/signup', data)
        .then(response => {
            dispatch(fetchUserToken(data))
        })
        .catch(error => {
            console.log(error.response.data)
            dispatch(setErrorMsg(error.response.data))
        })        
    }
}

export {fetchUserToken, checkToken, userSignedOut, signUp, resetErrorMsg, setErrorMsg}