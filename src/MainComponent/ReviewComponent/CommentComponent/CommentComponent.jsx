import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommentStyles from './CommentComponent.module.css';
function CommentComponent() {
  return (
    <>
      <div className={CommentStyles.box}>
        <form>
          <input type="text" placeholder="댓글을 작성해 주세요 :D" />
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </form>
        <h4>yewolee : 고양이당</h4>
        <h4>hyujang : 귀엽당</h4>
      </div>
    </>
  );
}

export default CommentComponent;
