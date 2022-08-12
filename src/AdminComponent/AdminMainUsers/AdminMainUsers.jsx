import axios from 'axios';
import { useState } from 'react';
import UsersStyles from './AdminMainUsers.module.css';

function AdminMainUsers() {
  const [userDatas, serUserDatas] = useState([]);
  const [checkedUserId, setCheckedUserId] = useState([]);
  /**
   * axios.get : users api를 요청하기 위한 파라미터 [pageSize, pageNumber, withAdmin]
   */
  const usersArguments = { pageSize: 15, pageNumber: 0, withAdmin: true };

  const onClickReloadData = async () => {
    const authToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/admin/users/?pageSize=${usersArguments.pageSize}&pageNumber=${usersArguments.pageNumber}&withAdmin=${usersArguments.withAdmin}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      serUserDatas(response.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickUserCheck = (e) => {
    if (e.target.checked) {
      setCheckedUserId([...checkedUserId, e.target.value]);
    } else if (!e.target.checked) {
      setCheckedUserId(checkedUserId.filter((elem) => elem !== e.target.value));
    }
  };

  const onClickUserDelete = async (e) => {
    console.log(e);
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
        <button onClick={onClickUserDelete}>유저 삭제</button>
      </div>

      <div className={UsersStyles.usersInfoWrapper}>
        <table>
          <thead>
            <tr>
              <th>선택</th>
              <th>계정 번호</th>
              <th>생성 일자</th>
              <th>닉네임</th>
              <th>상태</th>
            </tr>
          </thead>
          <tbody>
            {userDatas.map((user) => (
              <tr key={user.id}>
                <td>
                  <input type="checkbox" onClick={onClickUserCheck} value={user.id}></input>
                </td>
                <td>{user.id}</td>
                <td>{user.created_at.slice(0, 10)}</td>
                <td>{user.username}</td>
                <td>{user.is_active ? 'T' : 'F'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminMainUsers;
