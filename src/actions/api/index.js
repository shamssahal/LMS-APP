//action types
export const API_REQUEST = `API_REQUEST`;
export const API_SUCCESS = `API_SUCCESS`;
export const API_ERROR = `API_ERROR`;

//action creator
export const apiRequest = ({body,url, feature,method}) =>({
    type:`${feature} ${API_REQUEST}`,
    payload:body,
    meta:{url, feature,method}
})


export const apiSuccess = (response,feature,message)=>({
    type:`${feature} ${API_SUCCESS}`,
    payload:response,
    message:message,
    meta:{feature}
})


export const apiError = (error,feature)=>({
    type:`${feature} ${API_ERROR}`,
    payload:error,
    meta:{feature}
})
