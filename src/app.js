import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch,
} from "react-router-dom";


import { authSelector } from "./selectors/auth";
import { loginCheck } from "./actions/login";

import Home from "./components/Home";
import Login from "./components/Login";
import PendingLoader from "./components/utils/PendingLoader";
import CreateNewBook from "./components/Books/CreateBook";
import ListBooks from "./components/Books/ListBooks";
import BookDetails from "./components/Books/BookDetails";
import ListUsers from "./components/Users/ListUsers";
import CreateNewUser from "./components/Users/CreateUser";
import UserDetails from "./components/Users/UserDetails";


const App = () => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/assets/js/app.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <Router>
            <div id="wrapper">
                <Switch>
                    <Route 
                        path="/login" 
                        component={Login} 
                    />
                    <ProtectedRoute 
                        path="/" 
                        exact 
                        component={ListBooks}
                    />
                    <ProtectedRoute 
                        path="/createNewBook" 
                        exact 
                        component={CreateNewBook} 
                    />
                    <ProtectedRoute
                        path="/createNewBook/:bookId"
                        exact
                        component={CreateNewBook}
                    />
                    <ProtectedRoute
                        path="/books"
                        exact
                        component={ListBooks}
                    />
                    <ProtectedRoute 
                        path="/createNewUser" 
                        exact 
                        component={CreateNewUser} 
                    />
                    <ProtectedRoute
                        path="/createNewUser/:userId"
                        exact
                        component={CreateNewUser}
                    />
                    <ProtectedRoute
                        path="/users"
                        exact
                        component={ListUsers}
                    />

                    
                </Switch>
            </div>
        </Router>
    );
};

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loginCheck());
    }, [dispatch]);
    const {isAuthenticated} = useSelector((state) => authSelector(state));
    return (
        <Route
            {...rest}
            render={(props) =>
                isAuthenticated === "pending"?<PendingLoader/>:isAuthenticated === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};



export default App;