import React from 'react';
import { useEffect } from 'react';

// eslint-disable-next-line no-unused-vars
function MatMapComponent({ userInfo }) {
  const { kakao } = window;
  const createMap = () => {
    var container = document.getElementById('matMap');
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    // eslint-disable-next-line no-unused-vars
    var map = new kakao.maps.Map(container, options);
  };

  useEffect(() => {
    createMap();
  }, []);

  return (
    <div>
      <h1>MatMapComponent</h1>
      <div id="matMap" style={{ width: '50vw', height: '50vh' }}></div>
    </div>
  );
}

export default MatMapComponent;
