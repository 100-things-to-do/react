import { FETCH_USER_TOKEN } from "./userActions"

const initialState = {
    token: ""
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_USER_TOKEN: return{
                ...state,
                token: "bbb"
            }
        

        default: return {
            ...state
        }
    }
}

export default userReducer