import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, TOKEN_IS_VALID, TOKEN_IS_NOT_VALID } from "./userTypes"

const initialState = {
    loading: false,
    token: localStorage.getItem('token') || '',
    error: '',
    isValid: false,
    user: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST: return{
                ...state,
                loading: true
            }
        case FETCH_USER_SUCCESS: return {
            ...state,
            loading: false,
            token: action.payload,
            isValid: true
        }
        case FETCH_USER_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload
        }
        case TOKEN_IS_VALID: return {
            ...state,
            isValid: true,
            user: action.payload

        }
        case TOKEN_IS_NOT_VALID: return {
            ...state,
            isValid: false,
            token: ''
        }
        
        default: return state
    }
}

export default userReducer