import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDisplayComponent from '../ProfileDisplayComponent/ProfileDisplayComponent';
import ProfileDetailsComponent from './ProfileDetailsComponent/ProfileDetailsComponent';

function UserProfileComponent({ authToken, userInfo, setUserInfo }) {
  const [imageFile, setImageFile] = useState();
  const navigate = useNavigate();

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

      setUserInfo({
        ...userInfo,
        userProfileImage: response.data.profile_image_url,
      });
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

  const onClickRedirectEdit = () => {
    navigate(`/edit/${userInfo.userName}`, { state: { ...userInfo, authToken: authToken } });
  };

  return (
    <div>
      <ProfileDisplayComponent
        userName={userInfo.userName}
        userProfileUrl={userInfo.userProfileImage}
      />
      <input type="file" onChange={onChangeImageSelect} />
      <button onClick={onClickProfileUpload}>업로드</button>
      <ProfileDetailsComponent userInfo={userInfo} />
      <button onClick={onClickRedirectEdit}>수정하기</button>
    </div>
  );
}

export default UserProfileComponent;
