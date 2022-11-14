import React, { useEffect, useState } from 'react';
import "./navbar2.css";
import { NavLink } from 'react-router-dom';
import { } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {countries} from 'country-data';

const lookup = require("coordinate_to_country");



const Navbar2=()=>{

    const [country,SetCountry]=useState("Canada"); 
    function getLocation() {
    
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, positionError);
        } else {
        }
    }
    
    const showPosition=(position)=>{
        
        SetCountry(countries[lookup(position.coords.latitude, position.coords.longitude)].name);
    }
    
    const positionError=(error)=>{
        if (error.PERMISSION_DENIED) {
            window.alert("Error: permission denied");
        } else {
            window.alert("Error Please reload WebSite");
        }
    }

    useEffect(()=>{
        getLocation();
    },[])

   


    return (
        <div className='navbar2'>
            <NavLink to="/news/trending" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Trending</NavLink>
            <NavLink to ={`/news/${country}`} className={({ isActive }) => (isActive ? 'active' : 'inactive')} >{country}</NavLink>
            <NavLink to={`/news/${country} weather`} className={({ isActive }) => (isActive ? 'active' : 'inactive')} >weather</NavLink>
            <NavLink to="/news/sports" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Sports</NavLink>
            <NavLink to="/news/sience" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Science</NavLink>
            <NavLink to="/news/technology" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Technology</NavLink>
            <NavLink to="/news/politics" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Politics</NavLink>
            <NavLink to="/news/education" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >Education</NavLink>

        </div>
    )
}






export default Navbar2;
