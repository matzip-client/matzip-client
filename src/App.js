import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginComponent from './LoginComponent/LoginComponent.jsx';
import SignInComponent from './SignInComponent/SignInComponent.jsx';
import MainComponent from './MainComponent/MainComponent.jsx';
import AdminComponent from './AdminComponent/AdminComponent.jsx';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  const [adminCheck, setAdminCheck] = useState(false);
  let isAuthorized = sessionStorage.getItem('isAuthorized');

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginComponent
                setUserInfo={setUserInfo}
                isAuthorized={isAuthorized}
                setAdminCheck={setAdminCheck}
              />
            }
          />
          <Route path="/signin" element={<SignInComponent />} />
          <Route
            path="/"
            element={<MainComponent isAuthorized={isAuthorized} userInfo={userInfo} />}
          />
          <Route
            path="/matmap"
            element={<MainComponent isAuthorized={isAuthorized} userInfo={userInfo} />}
          />
          <Route
            path="/matstory"
            element={<MainComponent isAuthorized={isAuthorized} userInfo={userInfo} />}
          />
          <Route path="/admin42" element={<AdminComponent adminCheck={adminCheck} />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
