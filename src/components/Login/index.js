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
                <div className="auth-fluid-form-box" style={{backgroundColor:'#404040'}}>
                    <div className="align-items-center d-flex h-100" >
                        <div className="card-body" >
                            <h3 className="mt-0 text-white">Sign In</h3>
                            <p className="mb-4 text-white">
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
                                        className="form-label text-white"
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
                                        className="form-label text-white"
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
                                        className="btn btn-success"
                                        type="submit"
                                        // style={{ backgroundColor: "#FFF" }}
                                    >
                                        <span style={{ color: "#FFF" }}>
                                            Log In
                                        </span>
                                    </button>
                                </div>
                            </form>
                            <footer className="footer footer-alt">
                                <p className="text-white">
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
