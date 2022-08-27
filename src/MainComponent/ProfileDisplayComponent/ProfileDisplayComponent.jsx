import { Link } from 'react-router-dom';
import ProfileDisplayStyles from './ProfileDisplayComponent.module.css';

function ProfileDisplayComponent({ userName, userProfileUrl, authToken }) {
  return (
    <div>
      <span className={ProfileDisplayStyles.profileSpan}>
        <img
          src={
            userProfileUrl == null
              ? 'https://matzip-s3-bucket.s3.ap-northeast-2.amazonaws.com/admin-202208171228120260.jpeg'
              : userProfileUrl
          }
          className={ProfileDisplayStyles.profileImg}
        />
      </span>
      <Link to={`/profile/${userName}`} state={{ authToken: authToken, userName: userName }}>
        {userName}
      </Link>
    </div>
  );
}

export default ProfileDisplayComponent;
