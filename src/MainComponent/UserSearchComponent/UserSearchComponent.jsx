import axios from 'axios';
import { useState } from 'react';

function UserSearchComponent({ authToken }) {
  const [searchUserResults, SetSearchUserResults] = useState([]);
  const searchArguments = { pageSize: 15, pageNumber: 0 };
  const [searchUserName, setSearchUserName] = useState('');

  const onSubmitSearchUserName = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/users/username/?pageNumber=${searchArguments.pageNumber}&pageSize=${searchArguments.pageSize}&username=${searchUserName}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      response.data.content.forEach((user) => {
        console.log(user.username);
        console.log(user.profile_image_url);
      });
      SetSearchUserResults(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeSearchUserName = (e) => {
    setSearchUserName(e.target.value);
  };

  return (
    <div>
      <form onSubmit={onSubmitSearchUserName}>
        <input
          value={searchUserName}
          type="text"
          placeholder="ID 검색"
          onChange={onChangeSearchUserName}
        />
        <button type="submit">검색</button>
      </form>
      <div>
        {searchUserResults.map((user) => (
          <div key={user.username}>
            <span>
              <img src={user.profile_image_url} />
            </span>
            <a>{user.username}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSearchComponent;
