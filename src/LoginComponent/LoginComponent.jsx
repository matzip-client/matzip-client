import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
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

  const validateLogin = async () => {
    try {
      const response = await axios.post(
        'https://matzip-server.shop/api/v1/users/login/',
        {
          username: account.id,
          password: account.password,
        },
        {
          headers: {
            Vary: 'Access-Control-Request-Headers',
          },
        }
      );
      return response.status == 200;
    } catch (error) {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
        // Node.js의 http.ClientRequest 인스턴스입니다.
        console.log(error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };

  const onSubmitLoginAttempt = async (e) => {
    e.preventDefault();
    if (await validateLogin()) {
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
        <form className={BaseStyles.loginForm} onSubmit={onSubmitLoginAttempt}>
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
