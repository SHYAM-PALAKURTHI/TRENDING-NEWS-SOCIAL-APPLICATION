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

        <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' id='form1' type='text'/>
          <MDBInput wrapperClass='mb-4' label='Your Email'  id='form2' type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password'  id='form3' type='password'/>
          <MDBInput wrapperClass='mb-4' label='Repeat your password' id='form4' type='password'/>

          <p className="WrongPasword" style={StyleForWrongPassword()}>Passsword Not Match</p>

          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <div className=' CreateAccountButton'   onClick={()=>Create(SetWrongPassword,navigate)}>Register</div>
          <div className="HaveAccount">Have already an account <Link to="/login" >Login here</Link></div>
        </MDBCardBody>
      </MDBCard>
    )
}

function Create(SetWrongPassword,navigate)
{
    const Password1=document.getElementById("form3").value;
    const Passsword2 = document.getElementById("form4").value;
    if(Password1!=Passsword2)
    {
        SetWrongPassword(true);
        return;
    }

    const data = {
        FirstName:document.getElementById("form1").value,
        MailId:document.getElementById("form2").value,
        Password:Password1
    }

    axios.get('http://143.244.131.167:8000/sign_up', { params: data }).then(res => {
        if (res.data.status == 200) {
            navigate(`/account_Create_succuss`);
        }
        else {
            navigate(`/account_Create_error`);
        }

    });
}

export default CreateAccount;