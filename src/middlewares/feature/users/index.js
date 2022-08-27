import { apiRequest,API_SUCCESS,API_ERROR } from "../../../actions/api"
import {ROOT_URL} from '../../../config/'

import Alert from "sweetalert2";
import { getAllUsers, GET_USER, GET_USERS, setAllUsers, setUser, USER, USERS, USER_CREATE, USER_DELETE, USER_UPDATE } from "../../../actions/users";
import { getAllBooks, setAllBooks } from "../../../actions/books";

export const usersMiddleware = ({dispatch}) => next => (action) =>{
    next(action)
    switch(action.type){
        case GET_USERS:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/users`,
                method:'get',
                feature:USERS
            }))
            break;
        case GET_USER:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/user`,
                method:'get',
                feature:USER
            }))
            break;
        case USER_CREATE:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/signup`,
                method:'post',
                feature:USER
            }))
            break;
        
        case USER_UPDATE:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/user`,
                method:'put',
                feature:USER
            }))
            break;
        case USER_DELETE:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/user`,
                method:'delete',
                feature:USER
            }))
            break;

        case `${USERS} ${API_SUCCESS}`:
                dispatch(setAllUsers(action.payload))
                break;

        case `${USER} ${API_SUCCESS}`:
                if(action.message === 'User Retrieved'){
                    dispatch(setUser(action.payload))
                }else{
                    dispatch(getAllUsers())
                }
                break;

        case `${USERS} ${API_ERROR}`:
            Alert.fire({
                position: 'top-end',
                icon: 'error',
                title: action.message,
                showConfirmButton: false,
                timer: 1500
              })
            break;
        case `${USER} ${API_ERROR}`:
            Alert.fire({
                position: 'top-end',
                icon: 'error',
                title: action.message,
                showConfirmButton: false,
                timer: 1500
              })
            break;
        
            default: break;
    }
}


