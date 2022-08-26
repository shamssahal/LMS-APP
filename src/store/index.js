import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { apiMiddleware } from "../middlewares/core/api/index";
import { loginMiddleware } from "../middlewares/feature/login";
import { booksMiddleware } from "../middlewares/feature/books";
import { usersMiddleware } from "../middlewares/feature/users";


import { authReducer } from "../reducers/login/";
import { booksReducer } from "../reducers/books";
import { usersReducer } from "../reducers/users";


const coreMiddleware = [apiMiddleware];
const featureMiddleware = [
    loginMiddleware,
    booksMiddleware,
    usersMiddleware,
    
];


let enhance;
if(process.env.NODE_ENV==='development'){
    enhance = compose(applyMiddleware(...featureMiddleware, ...coreMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}else{
    enhance = compose(applyMiddleware(...featureMiddleware, ...coreMiddleware))
}


const rootReducer = combineReducers({
    authReducer,
    booksReducer,
    usersReducer,
});

const store = createStore(rootReducer, enhance);

export default store;
