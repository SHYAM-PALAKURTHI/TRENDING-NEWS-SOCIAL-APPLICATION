import React, {useState} from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import "./CreateAccount.css";
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";




function CreateAccount() {

    const [WrongPassword, SetWrongPassword] = useState(false);
    const [resone, SetResone] = useState("");

    const navigate = useNavigate();

    const StyleForWrongPassword = () => {
        if (WrongPassword) {
            return { display: "block", }
        }
        else {
            return { display: "none", }
        }
    }


   
    return (

        <MDBCard className='m-5' style={{maxWidth: '600px',minWidth:"250px"}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Your Email'  id='form2' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password'  id='form3' type='password'/>
          <MDBInput wrapperClass='mb-4' label='Repeat your password' id='form4' type='password'/>

          <p className="WrongPasword" style={StyleForWrongPassword()}>{resone}</p>

          <div className='d-flex flex-row justify-content-center mb-4'>
          </div>
          <div className=' CreateAccountButton'   onClick={()=>Create(SetWrongPassword,navigate,SetResone)}>Register</div>
          <div className="HaveAccount">Have already an account <Link to="/login" >Login here</Link></div>
        </MDBCardBody>
      </MDBCard>
    )
}

function Create(SetWrongPassword,navigate,SetResone)
{
    const Password1=document.getElementById("form3").value;
    const Passsword2 = document.getElementById("form4").value;
    if(Password1!=Passsword2)
    {
        SetWrongPassword(true);
        SetResone("Password Not Match Try Again")
        return;
    }

    const data = {
        FirstName:document.getElementById("form1").value,
        MailId:document.getElementById("form2").value,
        Password:Password1
    }

    axios.get('http://128.199.18.44:8000/sign_up', { params: data }).then(res => {
        if(res.data.UserId=="Email Id Used")
        {
            SetWrongPassword(true);
            SetResone("This Email Id is Already Registered ")
        }
        else
        {
            localStorage.setItem("UserId",res.data.UserId);
            localStorage.setItem("token",res.data.token);
            navigate(`/news/trending`);
        }
            
     
           
        

    },err=>{
        SetWrongPassword(true);
        SetResone("Error Try Again Later")    });
}

export default CreateAccount;
