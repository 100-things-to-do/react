import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE } from "./userTypes"
import axios from 'axios'

const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST
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

const fetchUserToken = () => {
    return (dispatch) => {
        dispatch(fetchUserRequest)
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            const users = response.data
            dispatch(fetchUserSuccess(users))
        })
        .catch(error => {
            const errMsg = error.message
            dispatch(fetchUserFailure(errMsg))
        })
    }
}

export {fetchUserToken}