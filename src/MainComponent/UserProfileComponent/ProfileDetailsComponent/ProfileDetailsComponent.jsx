function ProfileDetailsComponent({ userInfo }) {
  return (
    <div>
      <p>{userInfo.userStatusMessage}</p>
      <p>레벨 : {userInfo.userLevel}</p>
      <p>팔로워 : {userInfo.userFollowers}</p>
      <p>팔로우 : {userInfo.userFollowings}</p>
    </div>
  );
}

export default ProfileDetailsComponent;
