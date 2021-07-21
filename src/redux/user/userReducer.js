import { FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE, TOKEN_IS_VALID, TOKEN_IS_NOT_VALID, USER_SIGNED_OUT, USER_SIGNED_UP } from "./userTypes"

const initialState = {
    loading: false,
    token: '',
    error: '',
    isUserValid: false,
    user: null
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USER_REQUEST: return{
                ...state,
                loading: true,
                isUserValid: false
            }
        case FETCH_USER_SUCCESS: return {
            ...state,
            loading: false,
            token: action.payload,
            isUserValid: true
        }
        case FETCH_USER_FAILURE: return {
            ...state,
            loading: false,
            error: action.payload,
            isUserValid: false
        }
        case TOKEN_IS_VALID: return {
            ...state,
            isUserValid: true,
            user: action.payload

        }
        case TOKEN_IS_NOT_VALID: return {
            ...state,
            isUserValid: false,
            token: ''
        }
        case USER_SIGNED_OUT: return {
            loading: false,
            token: '',
            error: '',
            isUserValid: false,
            user: null

        }
        
        default: return state
    }
}

export default userReducer