import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewFormStyles from './ReviewFormComponent.module.css';

function ReviewFormComponent({ authToken }) {
  const params = useParams();
  const [rateValue, setRateValue] = useState(3);
  const [imageUrl, setImageUrl] = useState('');
  const [reviewText, setReviewText] = useState('');

  const onImageChange = () => {
    setImageUrl(
      'https://matzip-s3-bucket.s3.ap-northeast-2.amazonaws.com/foo-202208170725010408.jpeg'
    );
  };
  const onTextChange = ({ target: { value } }) => {
    setReviewText(value);
  };

  const onReviewSubmit = (event) => {
    event.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const reviewObj = {
      authToken: authToken,
      placeId: params.id,
      reviewRate: rateValue,
      reveiwImage: imageUrl,
      reveiwText: reviewText,
    };
  };

  return (
    <div>
      <form onSubmit={onReviewSubmit}>
        <h1>review form</h1>
        <div className={ReviewFormStyles.starContainer}>
          {/* //별 아이콘 다섯개 만들기 */}
          {[1, 2, 3, 4, 5].map((el) => (
            <i
              //className에 조건문 넣기
              className={`fas fa-star ${
                //el만큼 클릭 하거나 || el만큼 호버를 하면 yellowStar 클래스를 실행
                (rateValue >= el) | (rateValue >= el) && ReviewFormStyles.yellowStar
              }`}
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
