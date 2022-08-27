/*global kakao*/
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import MatMapInfoWindow from './MatMapInfoWindow/MatMapInfoWindow';
import MatMapPlaceList from './MatMapPlaceList/MatMapPlaceList';

// eslint-disable-next-line no-unused-vars
function MatMapComponent({ userInfo }) {
  const [map, setMap] = useState();
  const [clickPosition, setClickPosition] = useState({ lat: null, lng: null });
  const [clickAddress, setClickAddress] = useState('');
  const [clickPlace, setClickPlace] = useState(null);
  const [placeInfo, setPlaceInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [curPos, setCurPos] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  const [state, setState] = useState({
    center: {
      lat: 37.4883382,
      lng: 127.0649712,
    },
    errMsg: null,
    isLoading: true,
  });

  const currentPosition = () => {
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setState((prev) => ({
            ...prev,
            center: {
              lat: position.coords.latitude, // 위도
              lng: position.coords.longitude, // 경도
            },
            isLoading: false,
          }));
        },
        (err) => {
          setState((prev) => ({
            ...prev,
            errMsg: err.message,
            isLoading: false,
          }));
        }
      );
    } else {
      // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
      setState((prev) => ({
        ...prev,
        errMsg: 'geolocation을 사용할수 없어요..',
        isLoading: false,
      }));
    }
  };
  const ps = new kakao.maps.services.Places();
  const searchPlace = () => {
    // eslint-disable-next-line no-unused-vars
    ps.keywordSearch(searchWord, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];
        for (var i = 0; i < data.length; i++) {
          markers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            id: data[i].id,
            name: data[i].place_name,
            category_group: data[i].category_group_name,
            category: data[i].category_name,
            road_address: data[i].road_address_name,
            address: data[i].address_name,
            phone: data[i].phone,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  };

  const onSearchChange = (event) => {
    setSearchWord(event.target.value);
  };

  const onSearchSubmit = (event) => {
    event.preventDefault();
    setCurPos(false);
    setClickPlace(null);
    searchPlace();
  };

  const geocoder = new kakao.maps.services.Geocoder();
  const onMouseClick = (_t, mouseEvent) => {
    setClickAddress('');
    setClickPlace(null);
    setClickPosition({
      lat: mouseEvent.latLng.getLat(),
      lng: mouseEvent.latLng.getLng(),
    });
  };

  useEffect(() => {
    if (clickPosition.lat != null && clickPosition.lng != null) {
      const coord = new kakao.maps.LatLng(clickPosition.lat, clickPosition.lng);
      const callback = function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const arr = { ...result };
          setClickAddress(arr[0].address.address_name);
        }
      };
      geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      // setClickPlace(null);
      setPlaceInfo(null);
    }
  }, [clickPosition]);

  useEffect(() => {
    if (clickAddress != '') {
      // eslint-disable-next-line no-unused-vars
      ps.keywordSearch(clickAddress, (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표를 추가합니다
          setClickPlace(data[0]);
        }
      });
    }
  }, [clickAddress]);

  useEffect(() => {
    currentPosition();
  }, [map]);

  return (
    <div>
      <br />
      <form onSubmit={onSearchSubmit}>
        <input
          type="text"
          placeholder="검색 키워드 입력"
          value={searchWord}
          onChange={onSearchChange}
        />
        <button type="submit">검색</button>
      </form>
      <Map // 지도를 표시할 Container
        center={state.center}
        style={{
          // 지도의 크기
          width: '100%',
          height: '450px',
        }}
        level={3} // 지도의 확대 레벨
        onCreate={setMap}
        onClick={clickPosition != null ? onMouseClick : null}
      >
        {curPos
          ? !state.isLoading && (
              <MapMarker position={state.center}>
                <div style={{ padding: '5px', color: '#000' }}>
                  {state.errMsg ? state.errMsg : '여기에 계신가요?! :D'}
                </div>
              </MapMarker>
            )
          : markers.map((marker) => (
              <MapMarker
                key={`marker-${marker.id}-${marker.position.lat},${marker.position.lng}`}
                position={marker.position}
                onClick={() => {
                  setClickPosition({
                    lat: null,
                    lng: null,
                  });
                  setPlaceInfo(marker);
                }}
              >
                {placeInfo && placeInfo.id === marker.id && (
                  <div style={{ color: '#000' }}>
                    <MatMapInfoWindow placeInfo={placeInfo} />
                  </div>
                )}
              </MapMarker>
            ))}
        {clickPosition && (
          <MapMarker position={clickPosition}>
            {clickPlace != null && <div style={{ color: '#000' }}>{clickPlace.place_name}</div>}
          </MapMarker>
        )}
      </Map>
      <MatMapPlaceList markers={markers} />
    </div>
  );
}

export default MatMapComponent;
