import React from 'react';
import { Outlet} from "react-router-dom";
import "./FirstPage.css";

function FirstPage()
{
    return(
    <div className="FirstPageComponent">
        <div>
            <div className="WelcomeHeading">Welcome to Trending News Social Application!</div>
        </div>
        
        <Outlet/>
    </div>
    )

}

export default FirstPage;
