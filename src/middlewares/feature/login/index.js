import { apiRequest,API_SUCCESS,API_ERROR } from "../../../actions/api"
import Alert from "sweetalert2";
import { 
    forceLogout, 
    LOGIN, 
    LOGIN_AUTH, 
    LOGIN_CHECK, 
    LOGOUT, 
    LOGOUT_AUTH, 
    setAuthentication,  
} from "../../../actions/login"

import {ROOT_URL} from '../../../config/'

export const loginMiddleware = ({dispatch}) => next => (action) =>{
    next(action)
    switch(action.type){
        case LOGIN_AUTH:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/login`,
                method:'post',
                feature:LOGIN
            }))
            break;
        case LOGIN_CHECK:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/loginCheck`,
                method:'get',
                feature:LOGIN
            }))
            break;
        case LOGOUT_AUTH:
            dispatch(apiRequest({
                body:null,
                config:{},
                url:`${ROOT_URL}/logout`,
                method:'get',
                feature:LOGOUT
            }))
            break;

        case `${LOGIN} ${API_SUCCESS}`:
            dispatch(setAuthentication({isAuthenticated:true}))
            break;
        case `${LOGIN} ${API_ERROR}`:
            dispatch(setAuthentication({isAuthenticated:false}))
            break;
        case `${LOGOUT} ${API_SUCCESS}`:
            dispatch(setAuthentication({isAuthenticated:"pending"}))
            break;
        case `${LOGOUT} ${API_ERROR}`:
            dispatch(forceLogout())
            break;
        default: break;
    }
}
