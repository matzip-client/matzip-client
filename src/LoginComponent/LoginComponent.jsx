import { useState } from 'react';
import LoginStyles from './LoginComponent.module.css';

function LoginComponent() {
  const [account, setAccount] = useState({ id: '', password: '' });

  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const LoginAttempt = () => {
    if (account.id == 'test' && account.password == 'test') {
      console.log('Happy hacking!!');
    }
  };

  return (
    <form className={LoginStyles.loginForm}>
      <input
        name="id"
        className={LoginStyles.text}
        type="text"
        placeholder="username"
        onChange={onChangeAccount}
      />
      <input
        name="password"
        className={LoginStyles.password}
        type="password"
        placeholder="password"
        onChange={onChangeAccount}
      />
      <button onClick={LoginAttempt}>login</button>
      <p className={LoginStyles.message}>
        Not registered? <a href="/signin">Create an account</a>
      </p>
    </form>
  );
}

export default LoginComponent;
