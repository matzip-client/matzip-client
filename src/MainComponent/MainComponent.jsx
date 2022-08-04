import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainComponent({ isAuthorized, userInfo }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthorized == null) {
      navigate('/login');
    }
  }, [isAuthorized, navigate]);
  return (
    <div>
      <h1>Hi !</h1>
      {isAuthorized == null ? (
        <h1>로그인 페이지로 이동합니다.</h1>
      ) : (
        <div>
          <dd>{userInfo.id}</dd>
          <dd>isAuthorized</dd>
        </div>
      )}
    </div>
  );
}

export default MainComponent;
