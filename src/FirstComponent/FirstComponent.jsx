import { useState } from 'react';
import FirstStyles from './FirstComponent.module.css';
import LoginComponent from '../LoginComponent/LoginComponent.jsx';
import SignInComponent from '../SignInComponent/SignInComponent.jsx';

function FirstComponent() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  function SignUpButtonClick() {
    setShowLoginForm(!showLoginForm);
    console.log(1);
  }
  return (
    <div className={FirstStyles.loginPage}>
      <div className={FirstStyles.form}>
        {showLoginForm ? (
          <LoginComponent SignUpButtonClick={() => SignUpButtonClick()} />
        ) : (
          <SignInComponent SignUpButtonClick={() => SignUpButtonClick()} />
        )}
      </div>
    </div>
  );
}

export default FirstComponent;
