import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { getLoggedIn } from "../../actions/login";
import { authSelector } from "../../selectors/auth";

const Login = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getLoggedIn({ email, password }));
    };
    const {isAuthenticated} = useSelector((state) => authSelector(state));
    
    useEffect(()=>{
        if(isAuthenticated){
            history.push("/")
        }else{
            history.push("/login")
        }
    },[isAuthenticated,history])

    return (
        <div className="authentication-bg pb-0">
            <div className="auth-fluid">
                <div className="auth-fluid-form-box">
                    <div className="align-items-center d-flex h-100">
                        <div className="card-body">
                            <h3 className="mt-0">Sign In</h3>
                            <p className="text-muted mb-4">
                                Enter your email address and password to access{" "}
                                <br />
                                LMS dashboard
                            </p>
                            <form
                                onSubmit={(e) => {
                                    handleSubmit(e);
                                }}
                            >
                                <input
                                    autoComplete="false"
                                    name="hidden"
                                    type="text"
                                    style={{ display: "none" }}
                                />
                                <div className="mb-3">
                                    <label
                                        htmlFor="emailaddress"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        className="form-control"
                                        type="email"
                                        id="emailaddress"
                                        required=""
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        autoCapitalize="off"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label
                                        htmlFor="password"
                                        className="form-label"
                                    >
                                        Password
                                    </label>
                                    <input
                                        className="form-control"
                                        type="password"
                                        required=""
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        autoCapitalize="off"
                                    />
                                </div>
                                <div className="d-grid mb-0 text-center">
                                    <button
                                        className="btn"
                                        type="submit"
                                        style={{ backgroundColor: "#373750" }}
                                    >
                                        <span style={{ color: "#FFF" }}>
                                            Log In
                                        </span>
                                    </button>
                                </div>
                            </form>
                            <footer className="footer footer-alt">
                                <p className="text-muted">
                                    Don't have an account?{" "}
                                    <b>Please contact admin.</b>
                                </p>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
