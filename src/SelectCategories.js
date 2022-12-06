import React, { useState } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import axios from 'axios';
import ip from './ipaddress';
import Multiselect from 'multiselect-react-dropdown';
import { useNavigate } from 'react-router-dom';
import './NewContainer.css';
export default function SelectCategories() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('UserId');
  const [data, setData] = useState([]);
  const itSubCategories = [
    { id: new Date().getTime(), categoryName: 'IT', name: 'apps' },
    { id: new Date().getTime(), categoryName: 'IT', name: 'smartphones' },
    { id: new Date().getTime(), categoryName: 'IT', name: 'drones' },
    { id: new Date().getTime(), categoryName: 'IT', name: 'web' },
    { id: new Date().getTime(), categoryName: 'IT', name: 'software' },
  ];
  const educationSubCategories = [
    {
      id: new Date().getTime(),
      categoryName: 'Education',
      name: 'formal-education',
    },
    {
      id: new Date().getTime(),
      categoryName: 'Education',
      name: 'informal-education',
    },
    {
      id: new Date().getTime(),
      categoryName: 'Education',
      name: 'nonFormal-education',
    },
  ];
  const agricultureSubCategories = [
    {
      id: new Date().getTime(),
      categoryName: 'Agriculture',
      name: 'subsistence-farming',
    },
    {
      id: new Date().getTime(),
      categoryName: 'Agriculture',
      name: 'arable-farming',
    },
    {
      id: new Date().getTime(),
      categoryName: 'Agriculture',
      name: 'shifting-cultivation',
    },
  ];
  const fashionSubCategories = [
    { id: new Date().getTime(), categoryName: 'Fashion', name: 'jeans' },
    { id: new Date().getTime(), categoryName: 'Fashion', name: 'coats' },
    { id: new Date().getTime(), categoryName: 'Fashion', name: 'shorts' },
  ];
  const artSubCategories = [
    { id: new Date().getTime(), categoryName: 'Art', name: 'painting' },
    { id: new Date().getTime(), categoryName: 'Art', name: 'sculpture' },
    { id: new Date().getTime(), categoryName: 'Art', name: 'photography' },
  ];
  const submitCategroies = (event) => {
    event.preventDefault();
    if (data.length === 0) {
      alert('Choose atleast one category');
      return;
    }
    axios
      .post(`http://${ip}:8000/user-category`, {
        newsCategories: data,
        UserId: userId,
      })
      .then((response) => {
        console.log('after submit categories', response);
        navigate('/news/trending');
      })
      .catch((error) => {
        console.log('error while saving categories', error);
      });
    console.log(data);
  };
  return (
    <div>
      <Navbar1 />
      news
      <Navbar2 />
      <div className="NewContainter">
        <div className="mx-5 px-5">
          <form onSubmit={submitCategroies} className="mx-5 px-5">
            <div className="mb-3 mt-3">
              <label htmlFor="it" className="form-label">
                IT:
              </label>
              <Multiselect
                id="it"
                options={itSubCategories}
                onSelect={(a, b) => {
                  setData((prev) => [...prev, b.name]);
                }}
                displayValue="name"
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="education" className="form-label">
                Education:
              </label>
              <Multiselect
                id="education"
                options={educationSubCategories}
                selectedValues={[]}
                displayValue="name"
                onSelect={(a, b) => {
                  setData((prev) => [...prev, b.name]);
                }}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="agriculture" className="form-label">
                Agriculture:
              </label>
              <Multiselect
                id="agriculture"
                options={agricultureSubCategories}
                selectedValues={[]}
                displayValue="name"
                onSelect={(a, b) => {
                  setData((prev) => [...prev, b.name]);
                }}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="fashion" className="form-label">
                Fashion:
              </label>
              <Multiselect
                id="fashion"
                options={fashionSubCategories}
                selectedValues={[]}
                displayValue="name"
                onSelect={(a, b) => {
                  setData((prev) => [...prev, b.name]);
                }}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="art" className="form-label">
                Art:
              </label>
              <Multiselect
                id="art"
                options={artSubCategories}
                selectedValues={[]}
                displayValue="name"
                onSelect={(a, b) => {
                  setData((prev) => [...prev, b.name]);
                }}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit Categories
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
