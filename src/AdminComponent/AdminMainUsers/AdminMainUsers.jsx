import axios from 'axios';
import UsersStyles from './AdminMainUsers.module.css';

function AdminMainUsers() {
  // eslint-disable-next-line no-unused-vars
  const UsersDatas = [
    {
      id: 2,
      created_at: '2022-08-09T11:17:52.625359',
      modified_at: '2022-08-09T11:17:52.625366',
      username: 'foo',
      is_active: true,
    },
    {
      id: 3,
      created_at: '2022-08-09T13:28:14.61057',
      modified_at: '2022-08-09T13:28:14.610577',
      username: 'hyujang',
      is_active: true,
    },
  ];

  const onClickReloadData = async () => {
    const loginToken = 1;
    try {
      const response = await axios.get(
        'https://matzip-server.shop//api/v1/admin/users/?pageSize=15&pageNumber=0&withAdmin=true',
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>어드민 메인 유저 입니다.</p>
      <div>
        <select>
          <option>계정 번호</option>
          <option>생성 일자</option>
          <option>닉네임</option>
          <option>상태</option>
        </select>
        <input type="text" placeholder="검색 할 유저 정보" />
        <button>검색</button>
        <button onClick={onClickReloadData}>데이터 가져오기</button>
      </div>

      <div className={UsersStyles.usersInfoWrapper}>
        <table>
          <thead>
            <tr>
              <th>계정 번호</th>
              <th>생성 일자</th>
              <th>닉네임</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {UsersDatas.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <th>{user.created_at.slice(0, 10)}</th>
                <th>{user.username}</th>
                <th>{user.is_active ? 'T' : 'F'}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminMainUsers;
