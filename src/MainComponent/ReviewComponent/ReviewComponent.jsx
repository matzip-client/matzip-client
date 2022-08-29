import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReviewStyles from './ReviewComponent.module.css';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useState } from 'react';
import getReview from './getReview';
import { Link } from 'react-router-dom';
import CommentComponent from './CommentComponent/CommentComponent';
function ReviewComponent({ reviewObj, setReviews, authToken }) {
  const [liked, setLiked] = useState(reviewObj.is_hearted);
  const [likeCnt, setLikeCnt] = useState(0);

  const [showingComment, setShowingComment] = useState(false);
  const toggleShowingComment = () => setShowingComment((prev) => !prev);

  const putLike = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.put(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/me/hearts/${reviewObj.id}`,
        {},
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setLiked((prev) => !prev);
      setLikeCnt(1);
    } catch (error) {
      console.log(error);
    }
  };

  const delLike = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.delete(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/me/hearts/${reviewObj.id}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setLiked((prev) => !prev);
      setLikeCnt(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteClick = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.delete(
          `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/reviews/${reviewObj.id}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        getReview({ authToken, setReviews, placeId: reviewObj.location });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className={ReviewStyles.card}>
        <h3>
          <Link
            to={`/profile/${reviewObj.user.username}`}
            state={{ authToken: authToken, userName: reviewObj.user.username }}
            className={ReviewStyles.link}
          >
            {reviewObj.user.username}
          </Link>
        </h3>
        <h4>{reviewObj.rating}점</h4>
        <h4>{reviewObj.content}</h4>
        <img src={reviewObj.image_urls} style={{ width: '200px' }} />
        <br />
        <button onClick={liked ? delLike : putLike}>
          Like&nbsp;
          {reviewObj.number_of_hearts + likeCnt}&nbsp;
          <FontAwesomeIcon icon={liked ? faHeart : faHeartRegular} />
        </button>
        &nbsp;
        <button onClick={toggleShowingComment}>댓글 보기</button>
        {reviewObj.is_deletable ? (
          <button className={ReviewStyles.delete} onClick={onDeleteClick}>
            Delete&nbsp;
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        ) : null}
        {showingComment && <CommentComponent authToken={authToken} reviewId={reviewObj.id} />}
      </div>
    </>
  );
}

export default ReviewComponent;
