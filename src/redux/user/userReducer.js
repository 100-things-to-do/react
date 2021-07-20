import { FETCH_USER_TOKEN } from "./userActions"

const initialState = {
    token: localStorage.getItem('token') || '',
    myUserId: localStorage.getItem('myUserId') || ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USER_TOKEN: return{
                ...state,
                token: "bbb",
                myUserId: "temp"
            }
        

        default: return {
            ...state
        }
    }
}

export default userReducer