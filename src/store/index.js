import { createStore, applyMiddleware, compose, combineReducers } from "redux";

import { apiMiddleware } from "../middlewares/core/api/index";
import { loginMiddleware } from "../middlewares/feature/login";


import { authReducer } from "../reducers/login/";


const coreMiddleware = [apiMiddleware];
const featureMiddleware = [
    loginMiddleware,
    
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
});

const store = createStore(rootReducer, enhance);

export default store;
