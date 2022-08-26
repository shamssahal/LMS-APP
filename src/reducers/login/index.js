import { AUTH_SET, LOGOUT_FORCE } from "../../actions/login/"

const initState = []
export const authReducer = (state=initState,action) =>{
    switch(action.type){
        case AUTH_SET:
            return {...state,authStatus:action.payload}
        case LOGOUT_FORCE:
            return{...state,authStatus:{isAuthenticated:false}}
        default: return state
    }
}
