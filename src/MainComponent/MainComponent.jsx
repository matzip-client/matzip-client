import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent/HeaderComponent.jsx';
import MatMapComponent from './MatMapComponent/MatMapComponent.jsx';
import MatStoryComponent from './MatStoryComponent/MatStoryComponent.jsx';
import UserSearchComponent from './UserSearchComponent/UserSearchComponent.jsx';
import UserProfileComponent from './UserProfileComponent/UserProfileComponent.jsx';
import { getUserInfo, isValidateToken } from './getUserbyToken.jsx';

function MainComponent({ authToken, setAuthToken, userInfo, setUserInfo }) {
  const [pageNum, setPageNum] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const authTokenInit = async () => {
      const tmpToken = sessionStorage.getItem('authToken');
      if (tmpToken != null) {
        setAuthToken(tmpToken);
      } else {
        navigate('/login');
      }
    };
    authTokenInit();
  }, []);

  useEffect(() => {
    const userInfoInit = async () => {
      if (await isValidateToken(authToken)) {
        await getUserInfo({ authToken, userInfo, setUserInfo });
      } else {
        /**
         * authToken != null : 유효하지 않은 토큰 (만료, 조작 등)
         * authToken == null : 아직 값을 읽지 못한 상태
         */
        if (authToken != null) {
          navigate('/login');
        }
      }
    };
    userInfoInit();
  }, [authToken]);

  return (
    <div>
      {authToken == null ? (
        <h1>로그인 페이지로 이동합니다.</h1>
      ) : (
        <div>
          <HeaderComponent setPageNum={setPageNum} />
          {pageNum == 0 && <MatMapComponent userInfo={userInfo} />}
          {pageNum == 1 && <MatStoryComponent userInfo={userInfo} />}
          {pageNum == 2 && <UserSearchComponent authToken={authToken} userInfo={userInfo} />}
          {pageNum == 3 && (
            <UserProfileComponent
              authToken={authToken}
              userInfo={userInfo}
              setUserInfo={setUserInfo}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default MainComponent;
