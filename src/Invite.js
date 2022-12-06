import React, { useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import './Invite.css';
import axios from 'axios';
import ip from './ipaddress';
import { useNavigate } from 'react-router-dom';

const Invite = () => {
  const [email, setEmail] = useState('');
  const senderEmail = localStorage.getItem('email');
  const navigate = useNavigate();
  const sendInvite = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter email');
      return;
    }
    axios
      .post(`http://${ip}:8000/send_invite`, {
        receiverMail: email,
        senderEmail,
      })
      .then((response) => {
        console.log(response);
        alert('Email send successfully');
        navigate('/news/trending');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="InviteContainer">
        <div className="formContainer">
          <div className="formDiv">
            <h3>
              <label htmlFor="">Enter e-mail for invitation</label>
            </h3>
            <form onSubmit={sendInvite}>
              <input
                className="emailInput"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="abc@xyz.com"
              />
              <div className="btnDiv">
                <button className="btn btn-primary" type="submit">
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invite;
