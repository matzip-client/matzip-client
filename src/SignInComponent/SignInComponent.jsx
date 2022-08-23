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

  // eslint-disable-next-line no-unused-vars
  const existNameCheck = async (value) => {
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/users/exists?username=${value}`
      );
      console.log(response.data.exists);
      return response.data.exists;
    } catch (error) {
      console.log(error);
    }
  };

  const validateInput = async (e) => {
    const { name, value } = e.target;
    const specialRule = /[~!@#$%^&*()_+|<>?:{}]/;
    let duplicateIdCheckFlag = false;
    if (name == 'id' && value) duplicateIdCheckFlag = await existNameCheck(value);
    setError((prev) => {
      const stateObj = { ...prev, [name]: '' };
      switch (name) {
        case 'id':
          if (!value) {
            stateObj[name] = '필수 정보입니다.';
          } else if (value) {
            if (duplicateIdCheckFlag) stateObj[name] = '중복 ID 입니다.';
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

  const onSubmitSignIn = async (e) => {
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
    if (validateInput) {
      try {
        const x = await axios.post(
          `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/users`,
          {
            username: input.id,
            password: input.password,
          },
          {
            headers: {},
          }
        );
        x.status == 200 ? navigate('/login') : alert('잠시 후 시도해주세요.');
      } catch (error) {
        console.log(error);
      }
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
