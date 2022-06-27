import LoginStyles from './LoginComponent.module.css';

function LoginComponent(props) {
  return (
    <form className={LoginStyles.loginForm}>
      <input type={LoginStyles.text} placeholder="username" />
      <input type={LoginStyles.password} placeholder="password" />
      <button>login</button>
      <p className={LoginStyles.message}>
        Not registered?{' '}
        <a href="#" onClick={props.SignUpButtonClick}>
          Create an account
        </a>
      </p>
    </form>
  );
}

export default LoginComponent;
