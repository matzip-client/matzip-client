import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import getReview from '../ReviewComponent/getReview';
import ReviewComponent from '../ReviewComponent/ReviewComponent';
import ReviewFormComponent from '../ReviewFormComponent/ReviewFormComponent';

function PlaceHome({ authToken }) {
  const placeInfo = useLocation().state;
  const [writing, setWriting] = useState(false);
  const placeId = placeInfo.data.id;
  const placeName = placeInfo.data.name;
  const placePhone = placeInfo.data.phone;
  const placeRoadAddress = placeInfo.data.road_address;
  const [reviews, setReviews] = useState([]);

  const toggleWriting = () => setWriting((prev) => !prev);
  const navigate = useNavigate();

  useEffect(() => {
    getReview({ authToken, setReviews, placeId });
  }, []);

  return (
    <>
      <div>
        <button onClick={() => navigate('/', { replace: true })}>돌아가기</button>
        <h1>{placeName}</h1>
        <h3>{placePhone}</h3>
        <h3>{placeRoadAddress}</h3>
        <div>
          <button onClick={toggleWriting}>리뷰 작성하기</button>
        </div>
        {writing && (
          <ReviewFormComponent authToken={authToken} setReviews={setReviews} placeId={placeId} />
        )}
      </div>
      <div>
        {reviews &&
          reviews.map((review) => (
            <ReviewComponent
              key={review.id}
              reviewObj={review}
              setReviews={setReviews}
              authToken={authToken}
            />
          ))}
      </div>
    </>
  );
}

export default PlaceHome;
