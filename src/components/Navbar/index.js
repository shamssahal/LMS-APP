/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useEffect} from "react";
import { useDispatch } from "react-redux";
import { getLoggedOut, setAuthentication } from "../../actions/login";

import { useHistory } from "react-router";

// Navbar parent component
const Navbar = (props) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const openInNewTab = (url) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }

    // loading js script for bootstrap navbar
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/assets/js/advancedForm.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [dispatch]);

    // Event handler for logout
    const handleLogout = () => {
        dispatch(setAuthentication({isAuthenticated:"pending"}))
        dispatch(getLoggedOut());
        history.push("/login")
    };

    return (
        <div>
            <div className="leftside-menu">
                <a 
                    href="#" 
                    className="logo text-center"
                    onClick={()=>{history.push("/")}}
                >
                    <span className="logo-lg">
                        <img
                            src="/assets/images/library.png"
                            alt=""
                            height="120"
                        />
                    </span>
                    <span className="logo-sm">
                        <img
                            src="/assets/images/library.png"
                            alt=""
                            height="60"
                        />
                    </span>
                </a>

                <div
                    className="h-100"
                    id="leftside-menu-container"
                    data-simplebar
                >
                    <ul className="side-nav">

                        {/* Repository */}
                        <li className="side-nav-title side-nav-item">
                            Repository
                        </li>

                        {/* Users */}
                        <li className="side-nav-item nav-item-text">
                            <a
                                data-bs-toggle="collapse"
                                aria-expanded="false"
                                aria-controls="sidebarDashboards"
                                className={
                                    history.location.pathname==='/' || 
                                    history.location.pathname==='/books' || 
                                    history.location.pathname==='/createNewBook'?`side-nav-link text-white`:`side-nav-link`}
                                onClick={()=>{
                                    history.push('/books')
                                }}
                            >
                                <i className="uil-book"></i>
                                <span>Books</span>
                            </a>
                        </li>
                        <li className="side-nav-item nav-item-text">
                            <a
                                data-bs-toggle="collapse"
                                aria-expanded="false"
                                aria-controls="sidebarDashboards"
                                className={
                                    history.location.pathname==='/users' || 
                                    history.location.pathname==='/createNewUser' ?`side-nav-link text-white`:`side-nav-link`}
                                onClick={()=>{
                                    history.push('/users')
                                }}
                            >
                                <i className="uil-user"></i>
                                <span>Users</span>
                            </a>
                        </li>
                        <li className="side-nav-title side-nav-item">
                            Resources
                        </li>
                        <li className="side-nav-item nav-item-text">
                            <a
                                data-bs-toggle="collapse"
                                className="side-nav-link"
                                onClick={() => openInNewTab('https://drive.google.com/file/d/1YqQBxXBC4I72qf1yBo67CZiaDbWEGUeC/view?usp=sharing')}
                            >
                                <i className="uil-lightbulb-alt"></i>
                                <span>Ideation Process</span>
                            </a>
                        </li>
                        <li className="side-nav-item nav-item-text">
                            <a
                                data-bs-toggle="collapse"
                                aria-expanded="false"
                                aria-controls="sidebarDashboards"
                                className="side-nav-link"
                                onClick={() => openInNewTab('https://drive.google.com/file/d/1Os5oGYL6swTBtyj99clpddpy9uP1p1yM/view?usp=sharing')}
                            >
                                <i className="uil-server-network-alt"></i>
                                <span>HLD</span>
                            </a>
                        </li>
                        <li className="side-nav-item nav-item-text">
                            <a
                                data-bs-toggle="collapse"
                                aria-expanded="false"
                                aria-controls="sidebarDashboards"
                                className="side-nav-link"
                                onClick={() => openInNewTab('https://drive.google.com/file/d/1r5Qu3ycwwLZ3yLt2lroj0F7BSbYeSMc4/view?usp=sharing')}
                            >
                                <i className="uil-file-landscape-alt"></i>
                                <span>Problem Statement</span>
                            </a>
                        </li>
                        
                    </ul>
                    <div className="clearfix"></div>
                </div>
            </div>

            <div className="content-page">
                <div className="content">
                    <div className="navbar-custom pt-2">
                            <a
                                href="#"
                                onClick={handleLogout}
                                className="d-flex justify-content-end mt-2 text-secondary"
                            >
                                <i className="mdi mdi-logout me-1"></i>
                                <span>Logout</span>
                            </a>
                        
                    </div>

                    <div className="container-fluid">
                        <div className="page-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="page-title-box">
                                        <h4 className="page-title page-title-text">
                                            {props.title}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">{props.children}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-6">
                                <script>
                                    document.write(new Date().getFullYear());
                                </script>
                                © Library Management System
                            </div>
                            <div className="col-md-6">
                                <div className="text-md-end footer-links d-none d-md-block">
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href="#"
                                    >
                                        Privacy Policy
                                    </a>
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href=""
                                    >
                                        Terms & Conditions
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Navbar;
