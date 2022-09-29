import React from 'react';
import { NavLink } from 'react-router-dom';
const Errorpage=()=>{
    return(
        <div id="notfound">
            <div className="notfound">
                <div className="notfound-404">
                    <h1>404</h1>
                </div>
                <h2>We are Sorry!!, Page not found !</h2>
                <p className="mb-5">The page you are looking for is temporarily not available. Please try again later or check the URL. <br/> Thankyou!!</p>
                <NavLink to="/">Back To Home</NavLink>
            </div>
        </div>
    )
}
export default Errorpage