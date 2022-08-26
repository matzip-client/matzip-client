import { faHeart, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ReviewStyles from './ReviewComponent.module.css';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
function ReviewComponent({ reviewObj }) {
  const [liked, setLiked] = useState(false);
  const toggleLiked = () => {
    setLiked((prev) => !prev);
  };
  const onDeleteClick = () => {
    confirm('정말로 삭제하시겠습니까?');
  };
  return (
    <>
      <div className={ReviewStyles.card}>
        <h3>작성자 : {reviewObj.user.username}</h3>
        <h4>{reviewObj.rating}점</h4>
        <h4>{reviewObj.content}</h4>
        <img src={reviewObj.image_urls} style={{ width: '200px', height: '200px' }} />
        <br />
        <button onClick={toggleLiked}>
          Like&nbsp;
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
