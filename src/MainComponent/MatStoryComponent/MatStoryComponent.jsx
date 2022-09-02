import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewComponent from '../ReviewComponent/ReviewComponent';

// eslint-disable-next-line no-unused-vars
function MatStoryComponent({ authToken, userInfo }) {
  const [reviews, setReviews] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    const getReview = async () => {
      const response = await axios.get(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/reviews/hot`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setReviews(response.data.monthly_hot_reviews);
    };
    getReview();
  }, []);

  return (
    <div>
      <div>
        {reviews &&
          reviews.map((review) => (
            <ReviewComponent
              key={review.id}
              reviewObj={review}
              commentObj={review.comments}
              setReviews={setReviews}
              authToken={authToken}
              apiFlag="hot"
            />
          ))}
      </div>
    </div>
  );
}

export default MatStoryComponent;
