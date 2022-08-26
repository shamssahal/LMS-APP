export const LOGIN = `[LOGIN]`
export const LOGOUT = `[LOGOUT]`
export const AUTH = `[AUTH]`

//action types
export const LOGIN_AUTH = `${LOGIN} AUTH`
export const LOGOUT_AUTH = `${LOGOUT} AUTH`
export const LOGOUT_FORCE = `${LOGOUT} FORCED`
export const AUTH_SET = `${AUTH} SET`
export const LOGIN_CHECK = `${LOGIN} CHECK`

//action creator
export const getLoggedIn = (data) =>({
    type: LOGIN_AUTH,
    payload:data
})

export const loginCheck = () =>({
    type:LOGIN_CHECK,
    payload:{}
})

export const getLoggedOut = () =>({
    type:LOGOUT_AUTH,
    payload:{}
})

export const forceLogout = ()=>({
    type:LOGOUT_FORCE,
    payload:{}
})


export const setAuthentication = (data) =>({
    type: AUTH_SET,
    payload:data
})
