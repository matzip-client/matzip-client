import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent/HeaderComponent.jsx';
import MatMapComponent from './MatMapComponent/MatMapComponent.jsx';
import MatStoryComponent from './MatStoryComponent/MatStoryComponent.jsx';
import UserSearchComponent from './UserSearchComponent/UserSearchComponent.jsx';

function MainComponent({ authToken, setAuthToken }) {
  const [pageNum, setPageNum] = useState(0);
  const navigate = useNavigate();

  const isValidateToken = (authToken) => {
    /**
     * autoToken이 Validate Token인지 검사하는 API가 필요합니다.
     */
    if (authToken != null) return true;
  };

  useEffect(() => {
    if (authToken == null) {
      const tmpToken = sessionStorage.getItem('authToken');
      if (tmpToken != null) {
        setAuthToken(tmpToken);
      } else {
        navigate('/login');
      }
    } else {
      if (!isValidateToken(authToken)) navigate('/login');
    }
  }, [authToken]);

  return (
    <div>
      {authToken == null ? (
        <h1>로그인 페이지로 이동합니다.</h1>
      ) : (
        <div>
          <HeaderComponent setPageNum={setPageNum} />
          {pageNum == 0 && <MatMapComponent />}
          {pageNum == 1 && <MatStoryComponent />}
          {pageNum == 2 && <UserSearchComponent authToken={authToken} />}
        </div>
      )}
    </div>
  );
}

export default MainComponent;
