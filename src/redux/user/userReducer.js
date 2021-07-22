import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, TOKEN_IS_VALID, TOKEN_IS_NOT_VALID, USER_SIGNED_OUT } from "./userTypes"

const initialState = {
    loading: localStorage.getItem('loading') || false,
    token: localStorage.getItem('token') || '',
    error: localStorage.getItem('error') || '',
    isUserValid: localStorage.getItem('isUserValid') || false,
    user: localStorage.getItem('user') || null
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST: {
            localStorage.setItem('loading', true)
            localStorage.setItem('isUserValid', false)
            return{
                ...state,
                loading: true,
                isUserValid: false
            }
        }
        case FETCH_USER_SUCCESS: {
            localStorage.setItem('loading', false)
            localStorage.setItem('token', action.payload)
            localStorage.setItem('isUserValid', true)
            return {
                ...state,
                loading: false,
                token: action.payload,
                isUserValid: true
            }
        }
        case FETCH_USER_FAILURE: {
            localStorage.setItem('loading', false)
            localStorage.setItem('error', action.payload)
            localStorage.setItem('isUserValid', false)
            return {
                ...state,
                loading: false,
                error: action.payload,
                isUserValid: false
            }
        }
        case TOKEN_IS_VALID: {
            localStorage.setItem('isUserValid', true)
            localStorage.setItem('user', action.payload)
            return {
                ...state,
                isUserValid: true,
                user: action.payload
            }
        }
        case TOKEN_IS_NOT_VALID: {
            localStorage.setItem('isUserValid', false)
            localStorage.setItem('token', '')
            return {
                ...state,
                isUserValid: false,
                token: ''
            }
        }
        case USER_SIGNED_OUT: {
            localStorage.setItem('loading', false)
            localStorage.setItem('token', '')
            localStorage.setItem('error', '')
            localStorage.setItem('isUserValid', false)
            localStorage.setItem('user', null)
            return {
                loading: false,
                token: '',
                error: '',
                isUserValid: false,
                user: null
            }
        }
        
        default: return state
    }
}

export default userReducer