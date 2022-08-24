import { useState } from 'react';
import ReviewStyles from './ReviewComponent.module.css';

function ReviewComponent({ reviewObj }) {
  const [liked, setLiked] = useState(false);
  const toggleLiked = () => setLiked((prev) => !prev);

  return (
    <>
      <div className={ReviewStyles.card}>
        <h3>작성자 : {reviewObj.user.username}</h3>
        <h4>{reviewObj.rating}점</h4>
        <h4>{reviewObj.content}</h4>
        <img src={reviewObj.image_urls} style={{ width: '200px', height: '200px' }} />
        <br />
        <i
          className={liked ? 'fas fa-solid fa-heart' : 'fas fa-regular fa-heart'}
          onClick={toggleLiked}
        />
      </div>
    </>
  );
}

export default ReviewComponent;
