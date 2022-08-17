import axios from 'axios';
import { useState } from 'react';
import UserProfileStyles from './UserProfileComponent.module.css';

function UserProfileComponent({ authToken, userInfo, setUserInfo }) {
  // eslint-disable-next-line no-unused-vars
  const [imageFile, setImageFile] = useState();

  // eslint-disable-next-line no-unused-vars
  const uploadImage = async (formData) => {
    try {
      const response = await axios.post(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/images/`,
        formData,
        {
          headers: {
            Authorization: authToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data.urls[0];
    } catch (error) {
      console.log(error);
    }
  };

  const changeProfileImage = async (imgUrl) => {
    try {
      await axios.patch(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/users/me`,
        {
          profile_image_url: imgUrl,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setUserInfo({ ...userInfo, userProfileImage: imgUrl });
    } catch (error) {
      console.log(error);
    }
  };

  const onClickProfileUpload = async () => {
    const formData = new FormData();
    formData.append('images', imageFile);
    const imgUrl = await uploadImage(formData);
    await changeProfileImage(imgUrl);
  };

  const onChangeImageSelect = async (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div>
      <div>
        <span className={UserProfileStyles.profileSpan}>
          <img src={userInfo.userProfileImage} className={UserProfileStyles.profileImg} />
        </span>
        <a>{userInfo.userName}</a>
      </div>
      <input type="file" onChange={onChangeImageSelect} />
      {<button onClick={onClickProfileUpload}>업로드</button>}
    </div>
  );
}

export default UserProfileComponent;
