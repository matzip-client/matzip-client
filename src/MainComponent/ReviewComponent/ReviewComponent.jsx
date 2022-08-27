import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReviewStyles from './ReviewComponent.module.css';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { useState } from 'react';
function ReviewComponent({ reviewObj, authToken }) {
  const [liked, setLiked] = useState(reviewObj.is_hearted);
  const [likeCnt, setLikeCnt] = useState(0);

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

  const onDeleteClick = () => {
    confirm('정말로 삭제하시겠습니까?');
  };
  return (
    <>
      <div className={ReviewStyles.card}>
        <h3>{reviewObj.user.username}</h3>
        <h4>{reviewObj.rating}점</h4>
        <h4>{reviewObj.content}</h4>
        <img src={reviewObj.image_urls} style={{ width: '200px' }} />
        <br />
        <button onClick={liked ? delLike : putLike}>
          Like&nbsp;
          {reviewObj.number_of_hearts + likeCnt}&nbsp;
          <FontAwesomeIcon icon={liked ? faHeart : faHeartRegular} />
        </button>
        {reviewObj.is_deletable ? (
          <button className={ReviewStyles.delete} onClick={onDeleteClick}>
            Delete&nbsp;
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        ) : null}
      </div>
    </>
  );
}

export default ReviewComponent;
