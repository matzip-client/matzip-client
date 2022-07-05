import FirstStyles from './FirstComponent.module.css';
import LoginComponent from '../LoginComponent/LoginComponent.jsx';
import SignInComponent from '../SignInComponent/SignInComponent.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function FirstComponent() {
  return (
    <BrowserRouter>
      <div className={FirstStyles.loginPage}>
        <div className={FirstStyles.form}>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/signin" element={<SignInComponent />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default FirstComponent;
