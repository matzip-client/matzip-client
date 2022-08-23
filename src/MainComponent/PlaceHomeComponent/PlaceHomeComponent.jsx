import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewFormComponent from '../ReviewFormComponent/ReviewFormComponent';

function PlaceHome({ authToken }) {
  const [writing, setWriting] = useState(false);
  const [placeName, setPlaceName] = useState('');
  const [placePhone, setPlacePhone] = useState('');
  const [placeRoadAddress, setPlaceRoadAddress] = useState('');

  const placeInfo = useLocation().state;

  const toggleWriting = () => setWriting((prev) => !prev);
  const navigate = useNavigate();

  useEffect(() => {
    setPlaceName(placeInfo.data.name);
    setPlacePhone(placeInfo.data.phone);
    setPlaceRoadAddress(placeInfo.data.road_address);
  }, []);

  return (
    <div>
      <button onClick={() => navigate('/', { replace: true })}>돌아가기</button>
      <h1>{placeName}</h1>
      <h3>{placePhone}</h3>
      <h3>{placeRoadAddress}</h3>
      <div>
        <button onClick={toggleWriting}>리뷰 작성하기</button>
      </div>
      {writing && <ReviewFormComponent authToken={authToken} />}
    </div>
  );
}

export default PlaceHome;
