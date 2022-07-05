import SignInStyles from './SignInComponent.module.css';

function SignInComponent() {
  return (
    <form className={SignInStyles.registerForm}>
      <input type={SignInStyles.text} placeholder="name" />
      <input type={SignInStyles.password} placeholder="password" />
      <input type={SignInStyles.text} placeholder="emailAddress" />
      <button>create</button>
      <p className={SignInStyles.message}>
        Already registered? <a href="/">Sign In</a>
      </p>
    </form>
  );
}

export default SignInComponent;
