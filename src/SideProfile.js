import React, { useEffect, useState } from 'react';
import "./SideProfile.css";
import { faCog, faSignOut, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profile_default from "./Image/profile_default.png";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";


function SideProfile(data) {

    const [p_details,SetP_details] = useState({FirstName:"",profile_url:""});
    const navigate = useNavigate();


    useEffect(() => {
        const user = { "UserId": localStorage.getItem("UserId") }
        axios.get('http://128.199.18.44:8000/user_name', {params: user , headers: { "authorization": localStorage.getItem("token") } }).then(res => {
             
             SetP_details(res.data);

        },err=>{
            navigator("/login");
        });
    }, [])

    const display = () => {
        if (data.profile)
            return "block";

        else
            return "none";
    }

    const img_src = (d)=>{

      
        if(d.profile_url==null || d.profile_url=="" || d.profile_url==undefined)
        {
            return profile_default;
        }  
        else
        {
            return d.profile_url;
        }
    }

    const LogOut = ()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("UserId");
        navigate("/login")
    };

    return (
        <div className='SideProfile' style={{ display: display() }}>
            <div className="SmallProfile">
                <img src={img_src(p_details)} className="ProfileImage" />
                <div className='ProfileName'>{p_details.FirstName}</div>
            </div>
            <div className='SettingButton' onClick={()=>{navigate("/setting")}}><FontAwesomeIcon icon={faCog} /> Settings</div>
            <div className='SettingButton' onClick={LogOut}><FontAwesomeIcon icon={faSignOut} /> Log Out</div>

            <div className='CloseButton' onClick={() => { data.SetProfile(false) }}><FontAwesomeIcon icon={faChevronUp} /></div>
        </div>
    )
}




export default SideProfile;