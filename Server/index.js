import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import FirstPage from './FirstPage';
import LoginPage from './LoginPage';
import CreateAccount from './CreateAccount';
import News from './news';
import {
  Setting,
  ProfileSetting,
  EditProfileSetting,
  EditPassword,
} from './Setting';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';
import Invite from './Invite';
import Ratings from './Ratings';
import WatchLater from './WatchLater';
import SelectCategories from './SelectCategories';
import UserProfile from './UserProfile';
import SearchUserCards from './SearchUserCards';
import PendingRequests from './PendingRequests';
import UserFriendsOrFollowers from './UserFriendsOrFollowers';
import LiveMatches from './LiveMatches';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />}>
          <Route index element={<Navigate to="login" />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="sign_up" element={<CreateAccount />} />
          <Route
            path="account_Create_succuss"
            element={<Navigate to="/login" />}
          />
        </Route>

        <Route path="/news/:id" element={<News />} />
        <Route path="/setting" element={<Setting />}>
          <Route index element={<Navigate to="profile" />} />
          <Route path="profile" element={<ProfileSetting />} />
          <Route path="edit_profile" element={<EditProfileSetting />} />
          <Route path="edit_password" element={<EditPassword />} />
        </Route>
        <Route path="invite" element={<Invite />} />
        <Route path="pending-requests" element={<PendingRequests />} />
        <Route path="live-matches" element={<LiveMatches />} />
        <Route path="search" element={<SearchUserCards />} />
        <Route path="user/:id" element={<UserProfile />} />
        <Route path="friends/:id" element={<UserFriendsOrFollowers />} />
        <Route path="followers/:id" element={<UserFriendsOrFollowers />} />
        <Route path="ratings/:id" element={<Ratings />} />
        <Route path="watch-later/:id" element={<WatchLater />} />
        <Route path="select-categories" element={<SelectCategories />} />
      </Routes>
    </Router>
  );
}
