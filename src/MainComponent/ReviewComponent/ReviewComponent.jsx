import { faHeart, faStar, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReviewStyles from './ReviewComponent.module.css';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useState } from 'react';
import getReview from './getReview';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import CommentComponent from './CommentComponent/CommentComponent';

function ReviewComponent({ reviewObj, commentObj, setReviews, authToken, showingComment }) {
  const [liked, setLiked] = useState(reviewObj.is_hearted);
  const [likeCnt, setLikeCnt] = useState(reviewObj.number_of_hearts);

  const putLike = async () => {
    try {
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
      setLikeCnt(response.data.number_of_hearts);
    } catch (error) {
      console.log(error);
    }
  };

  const delLike = async () => {
    try {
      const response = await axios.delete(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/me/hearts/${reviewObj.id}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setLiked((prev) => !prev);
      setLikeCnt(response.data.number_of_hearts);
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
        getReview({ authToken, setReviews, placeId: reviewObj.location, apiFlag: 'placeId' }); // 추후 수정 필요
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <div className={ReviewStyles.card}>
        <div>
          <Link
            to={`/profile/${reviewObj.user.username}`}
            state={{ authToken: authToken, userName: reviewObj.user.username }}
            className={ReviewStyles.link}
          >
            <img
              src={
                reviewObj.user.profile_image_url == null
                  ? 'https://matzip-s3-bucket.s3.ap-northeast-2.amazonaws.com/admin-202208171228120260.jpeg'
                  : reviewObj.user.profile_image_url
              }
              className={ReviewStyles.profileImg}
            />
            <h3 className={ReviewStyles.userName}>{reviewObj.user.username}</h3>
          </Link>
        </div>
        <br />
        <div>
          {[1, 2, 3, 4, 5].map((el) => (
            <FontAwesomeIcon
              icon={faStar}
              className={`${
                (reviewObj.rating >= el) | (reviewObj.rating >= el)
                  ? ReviewStyles.yellowStar
                  : ReviewStyles.grayStar
              }`}
              key={el} //1,2,3,4,5
            />
          ))}
        </div>
        <h4>{reviewObj.content}</h4>
        <img src={reviewObj.image_urls} className={ReviewStyles.reviewImg} />
        <br />
        <button onClick={liked ? delLike : putLike}>
          Like&nbsp;
          {likeCnt}&nbsp;
          <FontAwesomeIcon icon={liked ? faHeart : faHeartRegular} />
        </button>
        &nbsp;
        <Link
          to={`/review/${reviewObj.id}`}
          state={{
            authToken: authToken,
            reviewObj: reviewObj,
          }}
        >
          댓글
        </Link>
        {reviewObj.is_deletable ? (
          <button className={ReviewStyles.delete} onClick={onDeleteClick}>
            Delete&nbsp;
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        ) : null}
        {showingComment && (
          <CommentComponent
            authToken={authToken}
            setReviews={setReviews}
            reviewId={reviewObj.id}
            commentObj={commentObj}
            placeId={reviewObj.location}
          />
        )}
      </div>
    </>
  );
}

export default ReviewComponent;
