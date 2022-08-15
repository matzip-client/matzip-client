function MatMapInfoWindow({ placeInfo }) {
  return (
    <div>
      <h2>{placeInfo.name}</h2>
      <div>{placeInfo.category}</div>
      <div>{placeInfo.road_address}</div>
      <div>{placeInfo.phone}</div>
    </div>
  );
}

export default MatMapInfoWindow;
