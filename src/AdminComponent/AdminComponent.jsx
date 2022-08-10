import { useState } from 'react';
import AdminStyles from './AdminComponent.module.css';
import LeftSideComponent from './LeftSideComponent/LeftSideComponent.jsx';
import AdminMainHome from './AdminMainHome/AdminMainHome.jsx';
import AdminMainUsers from './AdminMainUsers/AdminMainUsers.jsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminComponent({ adminCheck }) {
  const [renderComponentName, setRenderComponentName] = useState('Home');
  const navigate = useNavigate();

  useEffect(() => {
    if (adminCheck == false) navigate('/login');
  }, [adminCheck]);
  return (
    <div>
      {adminCheck == false ? (
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
