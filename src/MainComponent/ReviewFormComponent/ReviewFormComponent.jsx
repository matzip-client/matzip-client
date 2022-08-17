import { useState } from 'react';
import ReviewFormStyles from './ReviewFormComponent.module.css';

// eslint-disable-next-line no-unused-vars
function ReviewFormComponent({ userInfo }) {
  const [clicked, setClicked] = useState(3);

  return (
    <div>
      <form>
        <h1>review form</h1>
        <div className={ReviewFormStyles.starContainer}>
          {/* //별 아이콘 다섯개 만들기 */}
          {[1, 2, 3, 4, 5].map((el) => (
            <i
              //className에 조건문 넣기
              className={`fas fa-star ${
                //el만큼 클릭 하거나 || el만큼 호버를 하면 yellowStar 클래스를 실행
                (clicked >= el) | (clicked >= el) && ReviewFormStyles.yellowStar
              }`}
              key={el} //1,2,3,4,5
              onClick={() => setClicked(el)}
            />
          ))}
        </div>
        <br />
        <input type="file" accept="image/png, image/jpeg"></input>
        <br />
        <br />
        <textarea placeholder="리뷰를 작성해주세요 :D" rows="4" cols="50"></textarea>
        <button type="submit">리뷰 작성</button>
      </form>
    </div>
  );
}

export default ReviewFormComponent;
