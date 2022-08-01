import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IndexStyles from './FirstComponent/FirstComponent.module.css';
import LoginComponent from './LoginComponent/LoginComponent.jsx';
import SignInComponent from './SignInComponent/SignInComponent.jsx';
import MainComponent from './MainComponent/MainComponent.jsx';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  let isAuthorized = sessionStorage.getItem('isAuthorized');

  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className={IndexStyles.loginPage}>
          <div className={IndexStyles.form}>
            <Routes>
              <Route
                path="/"
                element={<LoginComponent setUserInfo={setUserInfo} isAuthorized={isAuthorized} />}
              />
              <Route path="/signin" element={<SignInComponent />} />
              <Route
                path="/main"
                element={<MainComponent isAuthorized={isAuthorized} userInfo={userInfo} />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  );
}

export default App;
