import React, { useEffect, useState } from 'react';
import './navbar2.css';
import { NavLink, Link } from 'react-router-dom';
import {} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { countries } from 'country-data';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ip from './ipaddress';

const lookup = require('coordinate_to_country');

const Navbar2 = () => {
  const [country, SetCountry] = useState('Canada');
  const navigate = useNavigate();
  const userId = localStorage.getItem('UserId');

  const systemGeneratedCategories = [
    'Trending',
    'Weather',
    'Sports',
    'Science',
    'Technology',
    'Politics',
    'Education',
  ];
  const [userSelectedCategories, setUserSelectedCategories] = useState([
    'apps',
    'cricket',
    'football',
  ]);
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, positionError);
    } else {
    }
  }

  const showPosition = (position) => {
    SetCountry(
      countries[lookup(position.coords.latitude, position.coords.longitude)]
        .name
    );
  };

  const positionError = (error) => {
    if (error.PERMISSION_DENIED) {
      // window.alert('Error: permission denied');
    } else {
      // window.alert('Error Please reload WebSite');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const data = { UserId: userId };
    axios
      .get(`http://${ip}:8000/user-category`, { params: data })
      .then((response) => {
        console.log('categories get successfully', response);
        setUserSelectedCategories(response.data.msg);
      })
      .catch((error) => {
        console.log('error while getting categories is ', error);
      });
  }, [userId]);

  return (
    <div className="navbar2">
      {systemGeneratedCategories.map((el, i) => {
        const link = `/news/${el}`;
        return (
          <NavLink
            key={i}
            to={link}
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            {el}
          </NavLink>
        );
      })}
      <NavLink
        to={'/select-categories'}
        className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      >
        Add more categories
      </NavLink>
      <NavLink
        to={'/live-matches'}
        className={({ isActive }) => (isActive ? 'active' : 'inactive')}
      >
        Live Matches
      </NavLink>
      {userSelectedCategories.length && (
        <select
          name="cars"
          id="cars"
          onChange={(e) => navigate(`/news/${e.target.value}`)}
        >
          {userSelectedCategories.map((el, index) => {
            return (
              <option value={el} key={index}>
                {el}
              </option>
            );
          })}
        </select>
      )}
      <select
        name="matched"
        onChange={(e) => {
          if (e.target.value === 'cricket') {
            return window.open('https://cricbuzz.com');
          } else {
            return window.open(
              'https://www.flashscore.in/football/world/world-cup/#/2/8/823QwKIu/draw'
            );
          }
        }}
        value=""
      >
        <option value="">Select sport</option>
        <option value="cricket">Cricket Score</option>
        <option value="football">Football Score</option>
      </select>
    </div>
  );
};

export default Navbar2;
