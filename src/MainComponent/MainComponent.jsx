import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from '../HeaderComponent/HeaderComponent.jsx';
import MatMapComponent from '../MatMapComponent/MatMapComponent.jsx';
import MatStoryComponent from '../MatStoryComponent/MatStoryComponent.jsx';

function MainComponent({ isAuthorized, userInfo }) {
  const [pageNum, setPageNum] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthorized == null || userInfo == null) {
      navigate('/login');
    }
  }, [isAuthorized, userInfo]);
  return (
    <div>
      {isAuthorized == null || userInfo == null ? (
        <h1>로그인 페이지로 이동합니다.</h1>
      ) : (
        <div>
          <HeaderComponent setPageNum={setPageNum} />
          {pageNum == 0 && <MatMapComponent userInfo={userInfo} />}
          {pageNum == 1 && <MatStoryComponent userInfo={userInfo} />}
        </div>
      )}
    </div>
  );
}

export default MainComponent;
