import { useNavigate } from 'react-router-dom';
import ProfileDisplayComponent from '../ProfileDisplayComponent/ProfileDisplayComponent';
import ProfileDetailsComponent from './ProfileDetailsComponent/ProfileDetailsComponent';

function UserProfileComponent({ authToken, userInfo }) {
  const navigate = useNavigate();

  const onClickRedirectEdit = () => {
    navigate(`/edit/${userInfo.userName}`, { state: { ...userInfo, authToken: authToken } });
  };

  return (
    <div>
      <ProfileDisplayComponent
        userName={userInfo.userName}
        userProfileUrl={userInfo.userProfileImage}
      />
      <ProfileDetailsComponent userInfo={userInfo} />
      <button onClick={onClickRedirectEdit}>수정하기</button>
    </div>
  );
}

export default UserProfileComponent;
