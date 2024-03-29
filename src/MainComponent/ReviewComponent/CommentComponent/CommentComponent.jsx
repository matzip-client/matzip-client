import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import getReview from '../getReview';
import CommentStyles from './CommentComponent.module.css';
import CommentDetailComponent from './CommentDetailComponent/CommentDetailComponent';

function CommentComponent({ authToken, setReviews, reviewId, commentObj, placeId }) {
  const [commentText, setCommentText] = useState('');

  const onCommentChange = ({ target: { value } }) => {
    setCommentText(value);
  };
  const postComment = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/comments`,
        {
          review_id: reviewId,
          content: commentText,
        },
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      getReview({ authToken, setReviews, placeId, apiFlag: 'reviewId', reviewId });
    } catch (error) {
      console.log(error);
    }
  };

  const onCommentSubmit = async (event) => {
    event.preventDefault();
    await postComment();
    setCommentText('');
  };

  useEffect(() => {
    getReview({ authToken, setReviews, placeId, apiFlag: 'reviewId', reviewId });
  }, []);

  return (
    <>
      <div className={CommentStyles.box}>
        <form onSubmit={onCommentSubmit}>
          <input
            type="text"
            placeholder="댓글을 작성해 주세요 :D"
            value={commentText}
            onChange={onCommentChange}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
        <div>
          {commentObj &&
            commentObj.map((comment) => (
              <CommentDetailComponent
                key={comment.id}
                authToken={authToken}
                setReviews={setReviews}
                commentObj={comment}
                placeId={placeId}
                reviewId={reviewId}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default CommentComponent;
