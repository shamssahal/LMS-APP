import { SET_USER, SET_USERS } from "../../actions/users"

const initState = []
export const usersReducer = (state=initState,action) =>{
    switch(action.type){
        case SET_USERS:
            return {...state,users:action.payload}
        case SET_USER:
            return {...state,user:action.payload}
        default: return state
    }
}
