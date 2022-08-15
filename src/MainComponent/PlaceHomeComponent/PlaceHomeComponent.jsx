import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
function PlaceHome({ authToken }) {
  const [placeName, setPlaceName] = useState('');
  const [placePhone, setPlacePhone] = useState('');
  const [placeRoadAddress, setPlaceRoadAddress] = useState('');

  const placeInfo = useLocation().state;

  useEffect(() => {
    setPlaceName(placeInfo.data.name);
    setPlacePhone(placeInfo.data.phone);
    setPlaceRoadAddress(placeInfo.data.road_address);
  }, []);

  return (
    <div>
      <h1>{placeName}</h1>
      <h3>{placePhone}</h3>
      <h3>{placeRoadAddress}</h3>
    </div>
  );
}

export default PlaceHome;
