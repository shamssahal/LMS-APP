export const authSelector = state=>state.authReducer.authStatus?state.authReducer.authStatus:{isAuthenticated:'pending'}
