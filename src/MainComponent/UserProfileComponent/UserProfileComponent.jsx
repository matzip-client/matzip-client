import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

function UserProfileComponent({ authToken }) {
  // eslint-disable-next-line no-unused-vars
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await axios.get(
          `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/users/me/`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        setUserName(response.data.username);
      } catch (error) {
        console.log(error);
      }
    };
    getUserInfo();
  }, []);

  return (
    <div>
      <h2>{userName}</h2>
    </div>
  );
}

export default UserProfileComponent;
