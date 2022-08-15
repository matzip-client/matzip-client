import { useNavigate } from 'react-router-dom';

function AdminMainHome() {
  const navigate = useNavigate();
  const onClickRedirectionToUserMain = () => {
    navigate('/');
  };
  return (
    <div>
      <p>어드민 메인 홈 입니다.</p>
      <button onClick={onClickRedirectionToUserMain}>User Main Component 이동</button>
    </div>
  );
}

export default AdminMainHome;
