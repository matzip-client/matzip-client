import UserProfileStyles from './UserProfileComponent.module.css';

function UserProfileComponent({ userInfo }) {
  return (
    <div>
      <span className={UserProfileStyles.profileSpan}>
        <img src={userInfo.userProfileImage} className={UserProfileStyles.profileImg} />
      </span>
      <a>{userInfo.userName}</a>
    </div>
  );
}

export default UserProfileComponent;
