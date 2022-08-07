import { useState } from 'react';

import BaseStyles from '../Base.module.css';
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

  const onClickRedirectSignIn = () => {
    navigate('/signin');
  };

  return (
    <div className={BaseStyles.loginPage}>
      <div className={BaseStyles.form}>
        <form className={BaseStyles.loginForm} onSubmit={LoginAttempt} method="POST">
          <input
            name="id"
            value={account.id}
            className={BaseStyles.input}
            type="text"
            placeholder="아이디를 입력해주세요"
            onChange={onChangeAccount}
          />
          <input
            name="password"
            value={account.password}
            className={BaseStyles.input}
            type="password"
            placeholder="비밀번호를 입력해주세요"
            onChange={onChangeAccount}
          />
          <button className={BaseStyles.loginButton} type="submit">
            로그인
          </button>
          <button className={BaseStyles.loginButton} type="button" onClick={onClickRedirectSignIn}>
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
