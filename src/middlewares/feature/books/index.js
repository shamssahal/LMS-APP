import { apiRequest,API_SUCCESS,API_ERROR } from "../../../actions/api"
import {ROOT_URL} from '../../../config/'

import Alert from "sweetalert2";
import { BOOK, BOOKS, BOOK_CREATE, BOOK_UPDATE, getAllBooks, GET_BOOK, GET_BOOKS, setAllBooks, setBook } from "../../../actions/books";

export const booksMiddleware = ({dispatch}) => next => (action) =>{
    next(action)
    switch(action.type){
        case GET_BOOKS:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/books`,
                method:'get',
                feature:BOOKS
            }))
            break;
        case GET_BOOK:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/book`,
                method:'get',
                feature:BOOK
            }))
            break;
        case BOOK_CREATE:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/book`,
                method:'post',
                feature:BOOK
            }))
            break;
            
        case BOOK_UPDATE:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/book`,
                method:'put',
                feature:BOOK
            }))
            break;

        case `${BOOKS} ${API_SUCCESS}`:
                dispatch(setAllBooks(action.payload))
                break;

        case `${BOOK} ${API_SUCCESS}`:
                if(action.message === 'Book Retrieved'){
                    dispatch(setBook(action.payload))
                }else{
                    dispatch(getAllBooks())
                }
                break;   
        case `${BOOKS} ${API_ERROR}`:
            Alert.fire({
                position: 'top-end',
                icon: 'error',
                title: action.message,
                showConfirmButton: false,
                timer: 1500
              })
            break;
        case `${BOOK} ${API_ERROR}`:
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

