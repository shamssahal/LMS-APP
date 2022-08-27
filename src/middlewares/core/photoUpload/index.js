import { apiRequest,API_SUCCESS,API_ERROR } from "../../../actions/api"
import {ROOT_URL} from '../../../config'
import Alert from "sweetalert2";
import { BOOK_COVER_PRESIGNED_URL, BOOK_COVER_PRESIGNED_URL_GET, setBookCoverPresignedUrl } from "../../../actions/books";
import { setUserIdPresignedUrl, USER_ID_PRESIGNED_URL, USER_ID_PRESIGNED_URL_GET } from "../../../actions/users";


export const photoUploadMiddleware = ({dispatch}) => next => (action) => {
    next(action)
    switch(action.type){
        case BOOK_COVER_PRESIGNED_URL_GET:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/preSignedUrl`,
                method:'get',
                feature:BOOK_COVER_PRESIGNED_URL            
            }))
            break;
        case `${BOOK_COVER_PRESIGNED_URL} ${API_SUCCESS}`:
            if(action.message==='Presigned Upload Url'){
                dispatch(setBookCoverPresignedUrl(action.payload))
            }
            break;
        case `${BOOK_COVER_PRESIGNED_URL} ${API_ERROR}`:
            if(action.message==='Presigned Url could not be generated'){
                Alert.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: action.message,
                    showConfirmButton: false,
                    timer: 1500
                    })
            }
            break;
        case USER_ID_PRESIGNED_URL_GET:
            dispatch(apiRequest({
                body:action.payload,
                config:{},
                url:`${ROOT_URL}/preSignedUrl`,
                method:'get',
                feature:USER_ID_PRESIGNED_URL          
            }))
            break;
        case `${USER_ID_PRESIGNED_URL} ${API_SUCCESS}`:
            if(action.message==='Presigned Upload Url'){
                dispatch(setUserIdPresignedUrl(action.payload))
            }
            break;
        case `${USER_ID_PRESIGNED_URL} ${API_ERROR}`:
            if(action.message==='Presigned Url could not be generated'){
                Alert.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: action.message,
                    showConfirmButton: false,
                    timer: 1500
                    })
            }
            break;
            default: break;
    }
}
