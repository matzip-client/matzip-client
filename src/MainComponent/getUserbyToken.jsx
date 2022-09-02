import axios from 'axios';

const isValidateToken = async (authToken) => {
  /**
   * autoToken이 Validate Token인지 검사하는 API가 필요합니다.
   */
  if (authToken != null) return true;
};

const getUserInfo = async ({ authToken, userInfo, setUserInfo }) => {
  try {
    let response = await axios.get(`https://${process.env.REACT_APP_SERVER_HOST}/api/v1/me`, {
      headers: {
        Authorization: authToken,
      },
    });
    setUserInfo({
      ...userInfo,
      userName: response.data.username,
      userProfileImage: response.data.profile_image_url,
      userStatusMessage: response.data.profile_string,
      userLevel: response.data.matzip_level,
      userFollowers: response.data.number_of_followers,
      userFollowings: response.data.number_of_followings,
    });
  } catch (error) {
    console.log(error);
  }
};
export { isValidateToken, getUserInfo };
