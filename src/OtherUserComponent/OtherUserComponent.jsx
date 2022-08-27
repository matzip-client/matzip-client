import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileDisplayComponent from '../MainComponent/ProfileDisplayComponent/ProfileDisplayComponent';
import ProfileDetailsComponent from '../MainComponent/UserProfileComponent/ProfileDetailsComponent/ProfileDetailsComponent';
function OtherUserComponent() {
  const state = useLocation().state;
  const authToken = state.authToken;
  const searchUserName = state.userName;
  const [pageUserInfo, setPageUserInfo] = useState({
    userName: null,
    userProfileUrl: null,
    userStatusMessage: null,
    userLevel: null,
    userFollowers: null,
    userFollowings: null,
  });
  const [getUserInfoFlag, setGetUserInfoFlag] = useState(true);

  useEffect(() => {
    const getPageUserDate = async () => {
      try {
        const response = await axios.get(
          `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/users/username/${searchUserName}`,
          {
            headers: { Authorization: authToken },
          }
        );
        setPageUserInfo({
          userName: response.data.username,
          userProfileUrl: response.data.profile_image_url,
          userStatusMessage: response.data.profile_string,
          userLevel: response.data.matzip_level,
          userFollowers: response.data.number_of_followers,
          userFollowings: response.data.number_of_followings,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPageUserDate();
  }, [getUserInfoFlag]);

  const onClickFollowPut = async () => {
    try {
      await axios.put(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/me/follows/${searchUserName}`,
        {},
        {
          headers: { Authorization: authToken },
        }
      );
      setGetUserInfoFlag((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickFollowDelete = async () => {
    try {
      await axios.delete(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/me/follows/${searchUserName}`,
        {
          headers: { Authorization: authToken },
        }
      );
      setGetUserInfoFlag((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProfileDisplayComponent
        userName={pageUserInfo.userName}
        userProfileUrl={pageUserInfo.userProfileUrl}
      />
      <ProfileDetailsComponent userInfo={pageUserInfo} />
      <button onClick={onClickFollowPut}>팔로우</button>
      <button onClick={onClickFollowDelete}>팔로우 취소</button>
    </div>
  );
}

export default OtherUserComponent;
