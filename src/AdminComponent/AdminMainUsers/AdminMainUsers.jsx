import axios from 'axios';
import { useState } from 'react';
import UsersStyles from './AdminMainUsers.module.css';

function AdminMainUsers() {
  const [userDatas, setUserDatas] = useState([]);
  const [checkedUserId, setCheckedUserId] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  /**
   * axios.get : users api를 요청하기 위한 파라미터 [pageSize, pageNumber, withAdmin]
   */
  const usersArguments = {
    pageSize: 15,
    pageNumber: 0,
    withAdmin: true,
    isNonLocked: false,
    sortedBy: 'createdAt',
    ascending: true,
  };

  const onClickReloadData = async () => {
    const authToken = sessionStorage.getItem('authToken');
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/admin/users/?withAdmin=${usersArguments.withAdmin}&pageNumber=${usersArguments.pageNumber}&pageSize=${usersArguments.pageSize}&sortedBy=${usersArguments.sortedBy}&ascending=${usersArguments.ascending}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setUserDatas(response.data.content);
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

  const onClickUserLock = async () => {
    const authToken = sessionStorage.getItem('authToken');
    checkedUserId.forEach(async (elem) => {
      try {
        await axios.post(
          `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/admin/users/${elem}/lock`,
          {},
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        onClickReloadData();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onClickUserUnlock = async () => {
    const authToken = sessionStorage.getItem('authToken');
    checkedUserId.forEach(async (elem) => {
      try {
        await axios.delete(
          `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/admin/users/${elem}/lock`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        onClickReloadData();
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onClickUserDelete = async () => {
    const authToken = sessionStorage.getItem('authToken');
    checkedUserId.forEach(async (elem) => {
      try {
        const response = await axios.get(
          `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/admin/users/${elem}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        if (
          confirm(
            `userNumber : ${elem}\nuserName : ${response.data.username}\n정말 삭제하시겠습니까 ?`
          )
        ) {
          await axios.delete(
            `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/admin/users/${elem}`,
            {
              headers: {
                Authorization: authToken,
              },
            }
          );
          setCheckedUserId((prev) => prev.filter((item) => item !== elem));
          onClickReloadData();
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const onChangeSetSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickAdminUserSearch = async () => {
    const authToken = sessionStorage.getItem('authToken');
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/admin/users/username/?pageSize=${usersArguments.pageSize}&pageNumber=${usersArguments.pageNumber}&username=${searchValue}&isNonLocked=${usersArguments.isNonLocked}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setUserDatas(response.data.content);
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
        <input
          onChange={onChangeSetSearchValue}
          type="text"
          placeholder="검색 할 유저 정보"
          value={searchValue}
        />
        <button onClick={onClickAdminUserSearch}>검색</button>
        <button onClick={onClickReloadData}>데이터 가져오기</button>
        <button onClick={onClickUserLock}>유저 Lock</button>
        <button onClick={onClickUserUnlock}>유저 Unlock</button>
        <button onClick={onClickUserDelete}>유저 Delete</button>
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
                <td>{user.is_non_locked ? 'T' : 'F'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminMainUsers;
