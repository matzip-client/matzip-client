import SignInStyles from './SignInComponent.module.css';
import BaseStyles from '../Base.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignInComponent() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    id: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState({
    id: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeAccount = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const validateInput = (e) => {
    const { name, value } = e.target;
    const specialRule = /[~!@#$%^&*()_+|<>?:{}]/;
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };

      switch (name) {
        case 'id':
          /**
           * 추가 예정 : 중복 아이디 검사
           */
          if (!value) {
            stateObj[name] = '필수 정보입니다.';
          }
          break;
        case 'password':
          if (!value) {
            stateObj[name] = '필수 정보입니다.';
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj['confirmPassword'] = '비밀번호가 일치하지 않습니다.';
          } else if (input.password.length < 8) {
            stateObj[name] = '비밀번호는 8자리 이상이여야 합니다.';
          } else if (
            !/[a-z]/.test(input.password) ||
            !/[A-Z]/.test(input.password) ||
            !/[0-9]/.test(input.password) ||
            !specialRule.test(input.password)
          ) {
            stateObj[name] = '대문자, 소문자, 숫자, 특수 문자를 모두 포함해야 합니다.';
          } else {
            stateObj['confirmPassword'] = input.confirmPassword ? '' : error.confirmPassword;
          }
          break;

        case 'confirmPassword':
          if (!value) {
            stateObj[name] = '필수 정보입니다.';
          } else if (input.password && value !== input.password) {
            stateObj[name] = '비밀번호가 일치하지 않습니다.';
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const onSubmitSignIn = (e) => {
    e.preventDefault();
    let validateInput = true;
    const specialRule = /[~!@#$%^&*()_+|<>?:{}]/;

    if (!input.id) {
      validateInput = false;
    }

    if (!input.password) {
      validateInput = false;
    } else if (input.confirmPassword && input.password !== input.confirmPassword) {
      validateInput = false;
    } else if (input.password.length < 8) {
      validateInput = false;
    } else if (
      !/[a-z]/.test(input.password) ||
      !/[A-Z]/.test(input.password) ||
      !/[0-9]/.test(input.password) ||
      !specialRule.test(input.password)
    ) {
      validateInput = false;
    }

    if (!input.confirmPassword) {
      validateInput = false;
    } else if (input.password && input.confirmPassword !== input.password) {
      validateInput = false;
    }
    /**
     * 변경 : 백엔드와 연결하여 회원 가입 요청 전송
     */
    if (validateInput) {
      const x = axios.post(
        'https://matzip-server.shop/api/v1/users/',
        {
          username: input.id,
          password: input.password,
        },
        {
          headers: {
            Vary: 'Access-Control-Request-Headers',
          },
        }
      );
      console.log(x);
    }
  };

  const onClickRedirectLogin = () => {
    navigate('/login');
  };

  return (
    <div className={BaseStyles.loginPage}>
      <div className={BaseStyles.form}>
        <form name="loginForm" className={SignInStyles.registerForm} onSubmit={onSubmitSignIn}>
          <div className={SignInStyles.inputBlockDiv}>
            <input
              name="id"
              value={input.id}
              className={SignInStyles.input}
              type="text"
              placeholder="로그인에 사용할 ID"
              onChange={onChangeAccount}
              onBlur={validateInput}
            />
            {error.id && <span className={SignInStyles.errorMessage}>{error.id}</span>}
          </div>
          <div className={SignInStyles.inputBlockDiv}>
            <input
              name="password"
              value={input.password}
              className={SignInStyles.input}
              type="password"
              placeholder="비밀번호"
              onChange={onChangeAccount}
              onBlur={validateInput}
            />
            {error.password && <span className={SignInStyles.errorMessage}>{error.password}</span>}
          </div>
          <div className={SignInStyles.inputBlockDiv}>
            <input
              name="confirmPassword"
              value={input.confirmPassword}
              className={SignInStyles.input}
              type="password"
              placeholder="비밀번호 재확인"
              onChange={onChangeAccount}
              onBlur={validateInput}
            />
            {error.confirmPassword && (
              <span className={SignInStyles.errorMessage}>{error.confirmPassword}</span>
            )}
          </div>
          <button className={BaseStyles.loginButton} type="submit">
            가입하기
          </button>
          <button className={BaseStyles.loginButton} type="button" onClick={onClickRedirectLogin}>
            로그인 화면
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignInComponent;
