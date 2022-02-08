import { FETCH_USER_SUCCESS, FETCH_USER_FAILURE, TOKEN_IS_VALID, TOKEN_IS_NOT_VALID, USER_SIGNED_OUT, RESET_ERROR_MSG, SET_TOAST_MSG } from "./userTypes"
import axios from 'axios'
import { expressUrl } from '../../common-util';

const setToastMsg = (toastMsg, toastMsgType) => {
    return {
        type: SET_TOAST_MSG,
        toastMsg: toastMsg,
        toastMsgType: toastMsgType
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

const userSignedOut = (toastMsg, toastMsgType) => {
    return {
        type: USER_SIGNED_OUT,
        toastMsg: toastMsg,
        toastMsgType: toastMsgType
    }
}



const fetchUserToken = (data) => {
    return (dispatch) => {
        axios.post(expressUrl + '/users/signin', data)
            .then(response => {
                const users = response.data
                dispatch(fetchUserSuccess(users))
                dispatch(setToastMsg('User logged in successfully!', 'success'))
            })
            .catch(error => {
                dispatch(fetchUserFailure(error.response.data))
                dispatch(setToastMsg(error.response.data, 'error'))
            })
    }
}


const checkToken = (token) => {
    return (dispatch) => {
        axios.get(expressUrl + '/users/whoami', { headers: { "Authorization": `Bearer ${token}` } })
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
        axios.post(expressUrl + '/users/signup', data)
            .then(response => {
                dispatch(fetchUserToken(data))
            })
            .catch(error => {
                console.log(error.response.data)
                dispatch(setToastMsg(error.response.data, 'error'))
            })
    }
}

const addCredit = (token, credit) => {
    return (dispatch) => {
        const data = { credit }
        axios.post(expressUrl + '/users/addCredit', data, { headers: { "Authorization": `Bearer ${token}` } })
            .then(response => {
                const toastMsg = response.data
                console.log(toastMsg)
                dispatch(checkToken(token))
                dispatch(setToastMsg(toastMsg, 'success'))
            })
            .catch(error => {
                dispatch(setToastMsg(error.response.data, 'error'))
            })
    }
}

export { fetchUserToken, checkToken, userSignedOut, signUp, setToastMsg, addCredit }