import { useState } from 'react';
import AdminStyles from './AdminComponent.module.css';
import LeftSideComponent from './LeftSideComponent/LeftSideComponent.jsx';
import AdminMainHome from './AdminMainHome/AdminMainHome.jsx';
import AdminMainUsers from './AdminMainUsers/AdminMainUsers.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminComponent({ authToken, setAuthToken }) {
  const [renderComponentName, setRenderComponentName] = useState('Home');
  const navigate = useNavigate();

  const isValidateAdminToken = (authToken) => {
    /**
     * autoToken이 Admin's Token인지 검사하는 API가 필요합니다.
     * 현재는 모든 유저가 admin42 페이지에 접속이 가능한 상태입니다.
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
      if (!isValidateAdminToken(authToken)) navigate('/login');
    }
  }, [authToken]);

  return (
    <div>
      {authToken == false ? (
        <div>
          <h1>로그인 페이지로 돌아갑니다.</h1>
        </div>
      ) : (
        <div className={AdminStyles.container}>
          <LeftSideComponent setRenderComponentName={setRenderComponentName} />
          <div className={AdminStyles.main}>
            {/* Version, Statistics, Issus, Events Component는 아직 미구현 상태입니다.*/}
            {renderComponentName == 'Home' && <AdminMainHome />}
            {renderComponentName == 'Version' && <AdminMainHome />}
            {renderComponentName == 'Users' && <AdminMainUsers />}
            {renderComponentName == 'Statistics' && <AdminMainHome />}
            {renderComponentName == 'Issue' && <AdminMainHome />}
            {renderComponentName == 'Events' && <AdminMainHome />}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminComponent;
