import { useState } from 'react';
import LoginStyles from './LoginComponent.module.css';
import { useNavigate } from 'react-router-dom';

function LoginComponent({ setUserInfo }) {
  const [account, setAccount] = useState({ id: '', password: '' });
  const navigate = useNavigate();
  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const LoginAttempt = () => {
    /**
     * 차후 수정 : db 연결해서 검증하는 것으로 치환
     */
    console.log(setUserInfo);
    if (account.id == 'hyujang' && account.password == 'test') {
      alert('로그인 성공 !');
      setUserInfo(account);
      sessionStorage.setItem('isAuthorized', true);
      navigate('/');
      return { account };
    } else {
      alert('로그인 실패 !');
      setAccount({ ...account, id: account.id, password: '' });
    }
  };

  return (
    <form className={LoginStyles.loginForm} onSubmit={LoginAttempt} method="POST">
      <input
        name="id"
        value={account.id}
        className={LoginStyles.text}
        type="text"
        placeholder="아이디를 입력해주세요"
        onChange={onChangeAccount}
      />
      <input
        name="password"
        value={account.password}
        className={LoginStyles.password}
        type="password"
        placeholder="비밀번호를 입력해주세요"
        onChange={onChangeAccount}
      />
      <button type="submit">login</button>
      <p className={LoginStyles.message}>
        <a href="/signin">회원가입</a>
      </p>
    </form>
  );
}

export default LoginComponent;
