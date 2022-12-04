import React, { useEffect, useRef, useState, UseState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { faUser, faLock, faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";
import GoogleLogin from "react-google-login";
import { gapi } from 'gapi-script'

const clientId = '123297078619-gr155gdnb6a47gi4lutmbjan1pkanfp7.apps.googleusercontent.com'
function LoginPage() {

    const navigate = useNavigate();
    const [WrongPassword, SetWrongPassword] = useState(false);
    const [Seen, SetSeen] = useState(false);
    const IdRef = useRef();
    const PasswordRef = useRef();

    useEffect(()=>{
        if(localStorage.getItem("token"))
        {
            navigate("/news/trending");
        }
    })


    const StyleForWrongPassword = () => {
        if (WrongPassword) {
            return { display: "block", }
        }
        else {
            return { display: "none", }
        }
    }


    const onSuccess = (res) => {
        axios.get('http://128.199.18.44:8000/check_google_login', { params: res.profileObj }).then(ress => {
                localStorage.setItem("UserId",ress.data.UserId);
                localStorage.setItem("token",ress.data.token);
                navigate(`/news/trending`);
            

        },err=>{
            SetWrongPassword(true);
    
        });

    };

    const onFailure = (err) => {
        SetWrongPassword(true);
    };

    useEffect(() => {

        gapi.load("client:auth2", () => {
            gapi.auth2.init({ clientId: clientId })
        })
        
    }, [])

    useEffect(()=>{

        if (Seen) {
            document.getElementById("LoginDivShowPasswordIcon").style.display = "none";
            document.getElementById("LoginDivClosePasswordIcon").style.display = "block";
            document.getElementById("LoginDivInputPassword").type = "text";

        }

        else {
            document.getElementById("LoginDivShowPasswordIcon").style.display = "block";
            document.getElementById("LoginDivClosePasswordIcon").style.display = "none";
            document.getElementById("LoginDivInputPassword").type = "password";
        }
    })

    return (
        <div className="ContaintContainer">

            <div className="LoginHeading" >Login <FontAwesomeIcon icon={faUser} /> </div>
            <div className="LoginContainer">
                <div className="input-group flex-nowrap LoginDivInsideDiv">
                    <span className="input-group-text" id="addon-wrapping">
                        @
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        ref={IdRef}
                    />
                </div>
                <div className="input-group flex-nowrap LoginDivInsideDiv">
                    <span className="input-group-text" id="addon-wrapping">
                        <FontAwesomeIcon icon={faLock} />
                    </span>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        aria-label="Username"
                        aria-describedby="addon-wrapping"
                        id="LoginDivInputPassword"
                        ref={PasswordRef}

                    />
                    <span
                        className="input-group-text"
                        id="LoginDivShowPassword"
                        onClick={() => { SetSeen(!Seen) }}
                    >
                        <FontAwesomeIcon icon={faEyeSlash} id="LoginDivShowPasswordIcon" />
                        <FontAwesomeIcon icon={faEye} id="LoginDivClosePasswordIcon" />
                    </span>
                </div>

                <p className="WrongPasword" style={StyleForWrongPassword()}>Your Username or Password is Wrong. Please try again</p>

                <div>
                    <div className='CreateAccountButton' onClick={(e) => { CheckLogin(IdRef.current.value, PasswordRef.current.value, SetWrongPassword, navigate) }}>Login</div>
                    <div className='CreateAccountButton' onClick={clickongoogleapi}> <FontAwesomeIcon icon={faGoogle} className="GoogleIcon" /> Login With Google</div>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Login With Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        className="GoogleAPIButton"
                    />
                    <div className='CreateAccountButton' onClick={() => { navigate("/sign_up") }}>Create Account</div>
                </div>


            </div>

        </div>
    )

}


function clickongoogleapi() {
    document.getElementsByClassName("GoogleAPIButton")[0].click();
}

function CheckLogin(id, password, SetWrongPassword, navigate) {


    const login_details = {
        id: id,
        password: password
    }

    axios.get('http://128.199.18.44:8000/check_login', { params: login_details }).then(res => {

 
            localStorage.setItem("UserId",res.data.UserId);
            localStorage.setItem("token",res.data.token);
            navigate(`/news/trending`);
        

    },err=>{
        SetWrongPassword(true);

    });



}
export default LoginPage



    
   
              
