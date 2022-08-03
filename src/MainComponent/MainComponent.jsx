function MainComponent({ isAuthorized, userInfo }) {
  return (
    <div>
      <h1>Hi !</h1>
      <dd>{userInfo.id}</dd>
      <dd>{userInfo.password}</dd>
      <dd>{isAuthorized}</dd>
    </div>
  );
}

export default MainComponent;
