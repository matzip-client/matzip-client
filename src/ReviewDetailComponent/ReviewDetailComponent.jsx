import { useLocation } from 'react-router-dom';
import ReviewComponent from '../MainComponent/ReviewComponent/ReviewComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import getReview from '../MainComponent/ReviewComponent/getReview';

function ReviewDetailComponent() {
  const { state } = useLocation();

  const [reviews, setReviews] = useState(false);

  useEffect(() => {
    getReview({
      authToken: state.authToken,
      setReviews,
      apiFlag: 'reviewId',
      reviewId: state.reviewObj.id,
    });
  }, []);

  return (
    <div>
      {reviews && (
        <ReviewComponent
          reviewObj={reviews}
          commentObj={reviews.comments}
          setReviews={setReviews}
          authToken={state.authToken}
          showingComment={true}
          apiFlag="reviewId"
        />
      )}
    </div>
  );
}

export default ReviewDetailComponent;
