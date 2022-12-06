import axios from 'axios';
import React, { useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import './SelectUserCards.css';
import ip from './ipaddress';
import { useNavigate } from 'react-router-dom';

const SearchUserCards = () => {
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState({
    nameResults: '',
    titleResults: '',
    locationResults: '',
  });
  const getUsers = (e) => {
    axios
      .get(`http://${ip}:8000/users/name`, {
        params: { UserName: e.target.value },
      })
      .then((response) => {
        console.log('user is', response);
        setSearchResults({  nameResults: response.data.msg });
      });
  };
  const getTitle = (e) => {
    axios
      .get(`http://${ip}:8000/users/news`, {
        params: { title: e.target.value },
      })
      .then((response) => {
        console.log('user is', response);
        const data = [];
        response.data.msg.forEach(el=>{
          if( el && Array.isArray(el) && el.length>0){
            data.push(...el);
          }
        })
        setSearchResults({ titleResults:data});
      });
  };
  const getLocation = (e) => {
    axios
      .get(`http://${ip}:8000/users/location`, {
        params: { location: e.target.value },
      })
      .then((response) => {
        console.log('user is', response);
        setSearchResults({
          
          locationResults: response.data.msg,
        });
      });
  };

  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="container-fluid" style={{ marginTop: '10rem' }}>
        <div class="w-50 mx-auto">
          Search by user : <input type="input" onChange={getUsers} />
        </div>
        <ul class="w-50 mx-auto">
          {searchResults.nameResults?.length > 0 &&
            searchResults.nameResults.map((user) => {
              return (
                <li
                  class="list-group-item border border-2 border-dark p-2 m-2
               rounded "
                  onClick={() => navigate(`/user/${user.UserId}`)}
                >
                  {user?.FirstName}
                </li>
              );
            })}
        </ul>
        <div class="w-50 mx-auto">
          Search by title : <input type="input" onChange={getTitle} />
        </div>
        <ul class="w-50 mx-auto">
          {searchResults.titleResults?.length > 0 &&
            searchResults.titleResults.map((user) => {
              return (
                <li
                  class="list-group-item border border-2 border-dark p-2 m-2
               rounded "
                  onClick={() => navigate(`/user/${user.UserId}`)}
                >
                  {user?.FirstName}
                </li>
              );
            })}
        </ul>
        <div class="w-50 mx-auto">
          Search by location : <input type="input" onChange={getLocation} />
        </div>
        <ul class="w-50 mx-auto">
          {searchResults.locationResults?.length > 0 &&
            searchResults.locationResults.map((user) => {
              return (
                <li
                  class="list-group-item border border-2 border-dark p-2 m-2
               rounded "
                  onClick={() => navigate(`/user/${user.UserId}`)}
                >
                  {user?.FirstName}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default SearchUserCards;

