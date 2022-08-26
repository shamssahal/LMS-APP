//features
export const USER = `USER`;
export const USERS = `USERS`;

//action types
export const GET_USERS = `${USERS}_GET`;
export const SET_USERS = `${USERS}_SET`;
export const GET_USER = `${USER}_GET`;
export const SET_USER = `${USER}_SET`;

//action creators
export const getAllUsers = () =>({
    type:GET_USERS,
    payload:{}
})

export const setAllUsers = (data) =>({
    type:SET_USERS,
    payload:data
})

export const getUser = (data) =>({
    type:GET_USER,
    payload:data
})

export const setUser = (data) =>({
    type:SET_USER,
    payload:data
})
