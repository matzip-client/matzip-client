import SignInStyles from './SignInComponent.module.css';

function SignInComponent(props) {
  return (
    <form className={SignInStyles.registerForm}>
      <input type={SignInStyles.text} placeholder="name" />
      <input type={SignInStyles.password} placeholder="password" />
      <input type={SignInStyles.text} placeholder="emailAddress" />
      <button>create</button>
      <p className={SignInStyles.message}>
        Already registered?{' '}
        <a href="#" onClick={props.SignUpButtonClick}>
          Sign In
        </a>
      </p>
    </form>
  );
}

export default SignInComponent;
