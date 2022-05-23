import { useState } from 'react';
import LoginStyles from './LoginComponent.module.css';

function LoginComponent() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  function SignUpButtonClick() {
    setShowLoginForm(!showLoginForm);
  }
  return (
    <div className={LoginStyles.loginPage}>
      <div className={LoginStyles.form}>
        {showLoginForm ? (
          <form className={LoginStyles.loginForm}>
            <input type={LoginStyles.text} placeholder="username" />
            <input type={LoginStyles.password} placeholder="password" />
            <button>login</button>
            <p className={LoginStyles.message}>
              Not registered?{' '}
              <a href="#" onClick={SignUpButtonClick}>
                Create an account
              </a>
            </p>
          </form>
        ) : (
          <form className={LoginStyles.registerForm}>
            <input type={LoginStyles.text} placeholder="name" />
            <input type={LoginStyles.password} placeholder="password" />
            <input type={LoginStyles.text} placeholder="emailAddress" />
            <button>create</button>
            <p className={LoginStyles.message}>
              Already registered?{' '}
              <a href="#" onClick={SignUpButtonClick}>
                Sign In
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginComponent;
