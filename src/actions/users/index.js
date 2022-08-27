//features
export const USER = `USER`;
export const USERS = `USERS`;
export const USER_ID_PRESIGNED_URL = `USER_ID_PRESIGNED_URL`;

//action types
export const GET_USERS = `${USERS}_GET`;
export const SET_USERS = `${USERS}_SET`;

export const GET_USER = `${USER}_GET`;
export const SET_USER = `${USER}_SET`;

export const USER_CREATE = `${USER}_CREATE`;
export const USER_UPDATE = `${USER}_UPDATE`;
export const USER_DELETE = `${USER}_DELETE`;

export const USER_ID_PRESIGNED_URL_GET = `${USER_ID_PRESIGNED_URL}_GET`;
export const USER_ID_PRESIGNED_URL_SET = `${USER_ID_PRESIGNED_URL}_SET`;


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

export const createUser = (data) =>({
    type:USER_CREATE,
    payload:data
})

export const updateUser = (data) =>({
    type:USER_UPDATE,
    payload:data
})

export const deleteUser = (data) =>({
    type:USER_DELETE,
    payload:data
})

export const getUserIdPresignedUrl = (data) =>({
    type:USER_ID_PRESIGNED_URL_GET,
    payload:data
})

export const setUserIdPresignedUrl = (data) =>({
    type:USER_ID_PRESIGNED_URL_SET,
    payload:data
})

