import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import getReview from '../ReviewComponent/getReview';
import ReviewFormStyles from './ReviewFormComponent.module.css';

function ReviewFormComponent({ authToken, setReviews, placeId }) {
  const params = useParams();
  const [rateValue, setRateValue] = useState(3);
  const [imageUrl, setImageUrl] = useState('');
  const [reviewText, setReviewText] = useState('');

  const onImageChange = async (event) => {
    setImageUrl(event.target.files[0]);
  };
  const onTextChange = ({ target: { value } }) => {
    setReviewText(value);
  };

  const postReview = async () => {
    const formData = new FormData();
    formData.append('content', reviewText);
    formData.append('images', imageUrl);
    formData.append('rating', rateValue);
    formData.append('location', params.id);

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/reviews`,
        formData,
        {
          headers: {
            Authorization: authToken,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onReviewSubmit = async (event) => {
    event.preventDefault();
    await postReview();
    getReview({ authToken, setReviews, placeId, apiFlag: 'placeId' });
    setRateValue(3);
    setImageUrl('');
    setReviewText('');
  };

  return (
    <div>
      <form onSubmit={onReviewSubmit}>
        <h1>review form</h1>
        <div className={ReviewFormStyles.starContainer}>
          {/* //별 아이콘 다섯개 만들기 */}
          {[1, 2, 3, 4, 5].map((el) => (
            <FontAwesomeIcon
              icon={faStar}
              className={`${(rateValue >= el) | (rateValue >= el) && ReviewFormStyles.yellowStar}`}
              key={el} //1,2,3,4,5
              onClick={() => setRateValue(el)}
            />
          ))}
        </div>
        <br />
        <input type="file" accept="image/png, image/jpeg" onChange={onImageChange}></input>
        <br />
        <br />
        <textarea
          placeholder="리뷰를 작성해주세요 :D"
          rows="4"
          cols="50"
          value={reviewText}
          onChange={onTextChange}
        ></textarea>
        <button type="submit">리뷰 작성</button>
      </form>
    </div>
  );
}

export default ReviewFormComponent;
