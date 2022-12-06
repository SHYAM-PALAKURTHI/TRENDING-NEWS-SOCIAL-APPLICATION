import React from 'react';
import "./news.css";
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import NewsContainer from "./NewsContainer";


function News()
{
    return(
        <div>
            <Navbar1/>
            <Navbar2/>
            <NewsContainer/>
           
        </div>
    )

}


export default News;
