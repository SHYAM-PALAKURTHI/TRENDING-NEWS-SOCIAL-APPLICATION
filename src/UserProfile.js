import React, { useEffect } from 'react';
import Navbar1 from './navbar1';
import Navbar2 from './navbar2';
import profile_default from './Image/profile_default.png';
import './UserProfile.css';
import { useNavigate, useParams } from 'react-router-dom';
import ip from './ipaddress';
import axios from 'axios';
import { useState } from 'react';

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const [alreadyConnect, setAlreadyConnect] = useState(false);
  const [noOfFollowers, setFollowers] = useState(0);
  const [noOfFriends, setNoOfFriends] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [currentUserData, setCurrentUserData] = useState({
    FirstName: 'Username',
  });
  const [isAlreadyFriend, setIsAlreadyFriend] = useState(false);
  const [isBothUserHaveSameLocation, setIsBothUserHaveSameLocation] =
    useState(false);
  const [profileUser, setProfileUserDetails] = useState(null);
  const userId = localStorage.getItem('UserId');

  const followPost = () => {
    if (alreadyFollowed) return;
    if (!id) {
      window.alert('No id present to follow!');
    }
    let payload = {
      followerId: localStorage.getItem('UserId'),
      UserId: id,
    };
    axios
      .post(`http://${ip}:8000/follow`, payload)
      .then((response) => {
        if (response.status === 200) {
          window.alert('Successfully followed.');
          getFollowers();
          checkIsFollower();
        }
      })
      .catch((err) => window.alert(err));
  };

  const connect = () => {
    if (alreadyConnect) return;
    if (!id) {
      window.alert('No id present to follow!');
    }
    let payload = {
      connectionId: localStorage.getItem('UserId'),
      UserId: id,
    };
    axios
      .post(`http://${ip}:8000/connect`, payload)
      .then((response) => {
        if (response.status === 200) {
          window.alert('Successfully connect.');
          checkRequestSent();
        }
      })
      .catch((err) => window.alert(err));
  };

  const getFollowers = () => {
    axios
      .get(`http://${ip}:8000/followers`, { params: { UserId: id } })
      .then((response) => {
        if (response.status === 200 && response.data.msg) {
          const data = response.data.msg.filter((el) => el !== null);
          setFollowers([...data]);
        }
      })
      .catch((err) => window.alert(err));
  };
  const getFriends = () => {
    axios
      .get(`http://${ip}:8000/friends`, {
        params: { UserId: userId },
      })
      .then((response) => {
        console.log('is friend', response);
        if (response.status === 200 && response.data.msg) {
          let data = [];
          response?.data?.msg?.forEach((el) => {
            if (Array.isArray(el) && el.length > 0) {
              data.push(...el);
            }
          });
          const isFriendFlag = data.some((el) => el.UserId === id);
          setAlreadyConnect(isFriendFlag);
          setNoOfFriends([...data]);
        }
      })
      .catch((err) => window.alert(err));
  };

  const checkIsFollower = () => {
    axios
      .get(`http://${ip}:8000/is-follower`, {
        params: { followerId: localStorage.getItem('UserId'), UserId: id },
      })
      .then((response) => {
        if (response.status === 200 && response.data.msg === 1) {
          setAlreadyFollowed(true);
        }
      })
      .catch((err) => window.alert(err));
  };
  const checkRequestSent = () => {
    axios
      .get(`http://${ip}:8000/is-pending`, {
        params: { connectionId: localStorage.getItem('UserId'), UserId: id },
      })
      .then((response) => {
        if (response.status === 200 && response.data.msg === 1) {
          setAlreadyConnect(true);
        }
      })
      .catch((err) => window.alert(err));
  };
  const getUserDetails = () => {
    axios
      .get(`http://${ip}:8000/userDetails`, {
        params: { UserId: id },
      })
      .then((response) => {
        console.log('current user data', response);
        if (response && response.data) {
          setCurrentUserData(response.data?.msg);
        }
      })
      .catch((err) => window.alert(err));
  };

  const getProfileUserDetails = () => {
    axios
      .get(`http://${ip}:8000/userDetails`, {
        params: { UserId: userId },
      })
      .then((response) => {
        console.log('profile user data', response);
        if (response && response.data) {
          setProfileUserDetails(response.data?.msg);
        }
      });
  };

  const isFriend = () => {
    axios
      .get(`http://${ip}:8000/is-friend`, {
        params: { connectionId: userId, UserId: id },
      })
      .then((response) => {
        console.log('is friend response', response);
        setIsAlreadyFriend(response.data.msg === 1);
      })
      .catch((error) => {
        console.log('error while is friend', error);
      });
  };

  const blockUser = () => {
    axios
      .post(`http://${ip}:8000/block`, {
        connectionId: localStorage.getItem('UserId'),
        UserId: id,
      })
      .then((response) => {
        if (
          response &&
          (response.status === 200) & (response.data.msg === 'blocked')
        ) {
          window.alert('User is blocked');
          setBlocked(true);
        }
      })
      .catch((err) => window.alert(err));
  };

  useEffect(() => {
    if (id) {
      checkIsFollower();
      getUserDetails();
      getFollowers();
      getFriends();
      checkRequestSent();
      isFriend();
      getProfileUserDetails();
      console.log('#########', currentUserData, profileUser);
    }
  }, [id]);
  const shareOnWhatsapp  = () => {
    let url = ` https://web.whatsapp.com/send?phone=+91${currentUserData.number}`;

    // Appending the message to the URL by encoding it
    url += `&text=Hi,&app_absent=0`;

    // Open our newly created URL in a new tab to send the message
    window.open(url);
  };

  const showUserInterest = () => {
    if (!blocked && noOfFollowers.length)  {
      return true;
    } else if (
      currentUserData &&
      profileUser &&
      currentUserData.location ===  profileUser.location
    ) {
      return true;
    }
    return false;
    
  };

  return (
    <>
      <Navbar1 />
      <Navbar2 />
      <div className="profileContainer" id="userProfileCard">
        <div className="card text-center user-profile-card">
          <img
            src={profile_default}
            className="card-img-top w-50 mx-auto mt-3 img-thumbnail card-user-image"
            alt="User Profile"
          />
          <div className="card-body">
            <h5 className="card-title text-light">
              {currentUserData.FirstName}
            </h5>
          </div>
          <div className="d-flex flex-column ">
            <div className="d-flex justify-content-around m-2">
              {alreadyFollowed || userId === id ? (
                ''
              ) : (
                <button
                  type="button"
                  className="btn btn-light w-25"
                  onClick={followPost}
                >
                  Follow
                </button>
              )}
              {alreadyConnect || userId === id ? (
                ''
              ) : (
                <button
                  type="button"
                  className="btn btn-light w-25"
                  onClick={connect}
                >
                  Connect
                </button>
              )}
            </div>
            <div className=" d-flex justify-content-around m-2">
              <button
                type="button"
                className="btn btn-light w-26"
                onClick={() => navigate(`/followers/${id}`)}
              >
                Followers &nbsp;
                {noOfFollowers.length}
              </button>
              <button
                type="button"
                className="btn btn-light w-25"
                onClick={() => navigate(`/friends/${id}`)}
              >
                Friends &nbsp;{noOfFriends.length}
              </button>
              {!blocked && userId !== id && isAlreadyFriend && (
                <button
                  onClick={() => blockUser()}
                  type="button"
                  className="btn btn-light w-25"
                >
                  Block
                </button>
              )}
            </div>

            {showUserInterest() ? (
              <div className="d-flex justify-content-around m-2">
                <button
                  type="button"
                  className="btn btn-link text-light w-25"
                  onClick={() => navigate(`/ratings/${id}`)}
                >
                  {`${currentUserData.FirstName}  rated news`}
                </button>
                <button
                  type="button"
                  className="btn btn-link text-light w-25"
                  onClick={() => navigate(`/watch-later/${id}`)}
                >
                  {`${currentUserData.FirstName} watch later news`}
                </button>
                <button
                  type="button"
                  className="btn btn-link text-light w-25"
                  onClick={() => navigate(`/friends/${id}`)}
                >
                  {`${currentUserData.FirstName} friends`}
                  friends
                </button>
              </div>
            ) : (
              ''
            )}
            {alreadyConnect && !blocked && (
              <div className="d-flex justify-content-around m-2">
                <svg
                  style={{ cursor: 'pointer' }}
                  className="mt-2"
                  onClick={shareOnWhatsapp}
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="currentColor"
                  class="bi bi-whatsapp"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
