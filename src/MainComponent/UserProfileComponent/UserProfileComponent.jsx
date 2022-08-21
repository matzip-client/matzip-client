import axios from 'axios';
import { useState } from 'react';
import ProfileDisplayComponent from '../ProfileDisplayComponent/ProfileDisplayComponent';

function UserProfileComponent({ authToken, userInfo, setUserInfo }) {
  const [imageFile, setImageFile] = useState();

  const uploadImage = async (formData) => {
    try {
      const response = await axios.patch(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/me`,
        formData,
        {
          headers: {
            Authorization: authToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      setUserInfo({ ...userInfo, userProfileImage: response.data.profile_image_url });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickProfileUpload = async () => {
    const formData = new FormData();
    formData.append('profileImage', imageFile);
    await uploadImage(formData);
  };

  const onChangeImageSelect = async (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div>
      <ProfileDisplayComponent
        userName={userInfo.userName}
        userProfileUrl={userInfo.userProfileImage}
      />
      <input type="file" onChange={onChangeImageSelect} />
      <button onClick={onClickProfileUpload}>업로드</button>
    </div>
  );
}

export default UserProfileComponent;
