/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useHistory } from 'react-router'

import Navbar from '../Navbar'

import moment from 'moment'

const Home = () =>{
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "/assets/js/dashboardAnalytics.js";
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, [dispatch]);



    // useEffect(()=>{
    //     if(isAuthenticated==='pending'){
    //         history.push("/login")
    //     }
    // },[isAuthenticated,history])

     
    return (
        <Navbar>
        
            {/* date picker row */}
            <div className='row'>
                <div className="col-8">
                    <h3 className="page-title page-title-text">
                        Home
                    </h3>
                </div>
            </div>
                            
        </Navbar>
        
    )
}


export default Home
