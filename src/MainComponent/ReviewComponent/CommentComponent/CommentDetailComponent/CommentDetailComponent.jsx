import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { Link } from 'react-router-dom';
import getReview from '../../getReview';
import CommentDetailStyles from './CommentDetailComponent.module.css';

function CommentDetailComponent({ authToken, setReviews, commentObj, placeId, reviewId }) {
  const onDeleteClick = async () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      try {
        // eslint-disable-next-line no-unused-vars
        const response = await axios.delete(
          `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/comments/${commentObj.id}`,
          {
            headers: {
              Authorization: authToken,
            },
          }
        );
        getReview({ authToken, setReviews, placeId, apiFlag: 'reviewId', reviewId: reviewId });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className={CommentDetailStyles.commentBox}>
        <Link
          to={`/profile/${commentObj.user.username}`}
          state={{ authToken: authToken, userName: commentObj.user.username }}
        >
          <img
            src={
              commentObj.user.profile_image_url == null
                ? 'https://matzip-s3-bucket.s3.ap-northeast-2.amazonaws.com/admin-202208171228120260.jpeg'
                : commentObj.user.profile_image_url
            }
            className={CommentDetailStyles.profileImg}
          />
        </Link>
        <div>
          <Link
            to={`/profile/${commentObj.user.username}`}
            state={{ authToken: authToken, userName: commentObj.user.username }}
            className={CommentDetailStyles.link}
          >
            <h4 className={CommentDetailStyles.userName}>{commentObj.user.username}</h4>
          </Link>
          <p className={CommentDetailStyles.content}>{commentObj.content}</p>
        </div>
        <div className={CommentDetailStyles.delete}>
          {commentObj.deletable ? (
            <button onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faXmark} />
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default CommentDetailComponent;
