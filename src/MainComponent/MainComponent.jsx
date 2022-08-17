import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent/HeaderComponent.jsx';
import MatMapComponent from './MatMapComponent/MatMapComponent.jsx';
import MatStoryComponent from './MatStoryComponent/MatStoryComponent.jsx';
import UserSearchComponent from './UserSearchComponent/UserSearchComponent.jsx';
import UserProfileComponent from './UserProfileComponent/UserProfileComponent.jsx';
import axios from 'axios';

function MainComponent({ authToken, setAuthToken }) {
  const [userInfo, setUserInfo] = useState({ userName: '', userProfileImage: '' });
  const [pageNum, setPageNum] = useState(0);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const isValidateToken = async (authToken) => {
    /**
     * autoToken이 Validate Token인지 검사하는 API가 필요합니다.
     */
    if (authToken != null) return true;
  };

  const getUserInfo = async () => {
    try {
      let response = await axios.get(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/users/me`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      /**
       * 추후 default img 를 서버에서 받아오는 작업으로 변경 (현재는 링크 하드코딩)
       */
      if (response.data.profile_image_url == null)
        response.data.profile_image_url =
          'https://matzip-s3-bucket.s3.ap-northeast-2.amazonaws.com/admin-202208171228120260.jpeg';
      setUserInfo({
        ...userInfo,
        userName: response.data.username,
        userProfileImage: response.data.profile_image_url,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
        await getUserInfo();
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
