import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ip from './ipaddress';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';

const PendingRequests = () => {
  const acceptRequest = (id) => {
    axios
      .post(`http://${ip}:8000/accept-request`, {
        UserId: localStorage.getItem('UserId'),
        connectionId: id,
      })
      .then((res) => {
        fetchPendingRequest();
      })
      .catch((err) => window.alert(err));
  };

  const rejectRequest = (id) => {
    axios
      .post(`http://${ip}:8000/reject-request`, {
        UserId: localStorage.getItem('UserId'),
        connectionId: id,
      })
      .then((res) => {
        fetchPendingRequest();
      })
      .catch((err) => window.alert(err));
  };

  const [pendingResults, setPendingResults] = useState([
    { FirstName: 'User One' },
    { FirstName: 'User Two' },
  ]);

  const fetchPendingRequest = () => {
    // .get(`http://${ip}:8000/userDetails`
    axios
      .get(`http://${ip}:8000/connection-requests`, {
        params: { UserId: localStorage.getItem('UserId') },
      })
      .then((res) => {
        const data = [];
        res.data.msg.forEach((el) => {
          data.push(...el);
        });
        console.log('data is ', data);
        setPendingResults(data);
      })
      .catch((err) => window.alert(err));
  };

  useEffect(() => {
    fetchPendingRequest();
  }, []);

  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div style={{ marginTop: '10rem' }}>
        <ul class="w-50 mx-auto">
          {pendingResults && pendingResults.length > 0
            ? pendingResults.map((user) => {
                return (
                  <li
                    class="list-group-item border border-2 border-dark p-2 m-2
               rounded d-flex justify-content-between "
                  >
                    <span>{user.FirstName}</span>
                    <div>
                      <button
                        onClick={() => acceptRequest(user?.UserId)}
                        className="btn btn-primary mx-1"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => rejectRequest(user?.UserId)}
                        className="btn btn-danger mx-1 "
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                );
              })
            : "You don't have any pending requests"}
        </ul>
      </div>
    </>
  );
};

export default PendingRequests;
