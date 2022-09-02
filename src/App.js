import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './LoginComponent/LoginComponent.jsx';
import SignInComponent from './SignInComponent/SignInComponent.jsx';
import MainComponent from './MainComponent/MainComponent.jsx';
import AdminComponent from './AdminComponent/AdminComponent.jsx';
import PlaceHomeComponent from './MainComponent/PlaceHomeComponent/PlaceHomeComponent.jsx';
import ProfileEditComponent from './ProfileEditComponent/ProfileEditComponent.jsx';
import OtherUserComponent from './OtherUserComponent/OtherUserComponent.jsx';

function App() {
  const [authToken, setAuthToken] = useState(null);
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userProfileImage: '',
    userStatusMessage: '',
    userLevel: 0,
    userFollower: 0,
    userFollowings: 0,
  });

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={<LoginComponent authToken={authToken} setAuthToken={setAuthToken} />}
          />
          <Route path="/signin" element={<SignInComponent />} />
          <Route
            path="/"
            element={
              <MainComponent
                userInfo={userInfo}
                setUserInfo={setUserInfo}
                authToken={authToken}
                setAuthToken={setAuthToken}
              />
            }
          />
          <Route path="/matmap" element={<MainComponent authToken={authToken} />} />
          <Route path="/matstory" element={<MainComponent authToken={authToken} />} />
          <Route
            path="/admin42"
            element={<AdminComponent authToken={authToken} setAuthToken={setAuthToken} />}
          />
          <Route
            path="/place/:id"
            element={
              <PlaceHomeComponent
                authToken={authToken}
                setAuthToken={setAuthToken}
                userInfo={userInfo}
                setUserInfo={setUserInfo}
              />
            }
          />
          <Route path="/edit/:userName" element={<ProfileEditComponent authToken={authToken} />} />
          <Route path="/profile/:userName" element={<OtherUserComponent authToken={authToken} />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
