import { SET_BOOK,SET_BOOKS } from "../../actions/books"

const initState = []
export const booksReducer = (state=initState,action) =>{
    switch(action.type){
        case SET_BOOKS:
            return {...state,books:action.payload}
        case SET_BOOK:
            return {...state,book:action.payload}
        default: return state
    }
}
