import { BOOK_COVER_PRESIGNED_URL_SET } from "../../actions/books"
import { USER_ID_PRESIGNED_URL_SET } from "../../actions/users"

const initState = []
export const presignedUrlsReducer = (state=initState,action) =>{
    switch(action.type){
        case BOOK_COVER_PRESIGNED_URL_SET:
            return {...state,bookCoverPresignedUrl:action.payload}
        case USER_ID_PRESIGNED_URL_SET:
            return {...state,userIdPresignedUrl:action.payload}
        default: return state
    }
}
