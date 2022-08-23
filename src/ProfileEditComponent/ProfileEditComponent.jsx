// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ProfileDisplayComponent from '../MainComponent/ProfileDisplayComponent/ProfileDisplayComponent';

function ProfileEditComponent() {
  const { state } = useLocation();
  const [userInfo, setUserInfo] = useState(state);
  const [imageFile, setImageFile] = useState();
  const [userInputMessage, setUserInputMessage] = useState('');

  const onChangeImageSelect = async (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadImage = async (formData) => {
    try {
      const response = await axios.patch(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/me`,
        formData,
        {
          headers: {
            Authorization: userInfo.authToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const onClickProfileUpload = async () => {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    const response = await uploadImage(formData);
    setUserInfo({ ...userInfo, userProfileImage: response.data.profile_image_url });
  };

  const changeMessage = async (formData) => {
    try {
      const response = await axios.patch(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/me`,
        formData,
        {
          headers: {
            Authorization: userInfo.authToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const onClickMessageChange = async () => {
    const formData = new FormData();
    formData.append('profileString', userInputMessage);
    const response = await changeMessage(formData);
    setUserInfo({ ...userInfo, userStatusMessage: response.data.profile_string });
  };

  const onChangeUserInputMessage = async (e) => {
    setUserInputMessage(e.target.value);
  };

  return (
    <div>
      <ProfileDisplayComponent
        userName={userInfo.userName}
        userProfileUrl={userInfo.userProfileImage}
      />
      <p>{userInfo.userStatusMessage}</p>
      <input type="file" onChange={onChangeImageSelect} />
      <button onClick={onClickProfileUpload}>프로필 이미지 변경</button>
      <input
        name="id"
        value={userInputMessage}
        type="text"
        placeholder="변경할 프로필 메세지"
        onChange={onChangeUserInputMessage}
      />
      <button onClick={onClickMessageChange}>프로필 메세지 변경</button>
    </div>
  );
}

export default ProfileEditComponent;
