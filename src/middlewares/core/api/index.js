import axios from 'axios'
import {apiSuccess,apiError,API_REQUEST} from '../../../actions/api'
import { BOOKS } from '../../../actions/books';
import { forceLogout, LOGIN, LOGOUT,setAuthentication} from '../../../actions/login';


export const apiMiddleware = ({dispatch}) => next => async(action) =>{
    next(action);
    if(action.type.includes(API_REQUEST)){
        let resp;
        try{
            switch(action.meta.feature){
                case LOGIN:
                case LOGOUT:
                case BOOKS:

                    if(action.meta.method==='get'){
                        resp = await axios.get(action.meta.url,{withCredentials:true,credentials:'include',
                            params:{queryVal:action.payload}}
                        )
                        dispatch(apiSuccess(resp.data.responseData,action.meta.feature,resp.data.responseStatus.message))                        
                        break;
                    }
                    if(action.meta.method==='post'){
                        resp = await axios.post(action.meta.url,action.payload,{withCredentials:true,credentials:'include'})    
                    }else if(action.meta.method==='put'){
                        resp = await axios.put(action.meta.url,action.payload,{withCredentials:true,credentials:'include'})
                    }else if(action.meta.method==='delete'){
                        resp = await axios.delete(action.meta.url,{withCredentials:true,credentials:'include',data:{...action.payload}})
                    }
                    dispatch(apiSuccess(resp.data.responseData,action.meta.feature,resp.data.responseStatus.message))                        

                    break;
                default:break; 
        }
    }catch(err){
        if(err.response){
            if(err.response.status===401 && action.meta.feature !== LOGIN){
                dispatch(forceLogout())  
                return;
            }else if(action.meta.feature === LOGIN){
                dispatch(setAuthentication({isAuthenticated:false}))
            }   
        }
        dispatch(apiError(err,action.meta.feature))
    }
}}