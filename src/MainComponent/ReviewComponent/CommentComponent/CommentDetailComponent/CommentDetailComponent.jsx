import CommentDetailStyles from './CommentDetailComponent.module.css';

function CommentDetailComponent({ commentObj }) {
  return (
    <>
      <div className={CommentDetailStyles.commentBox}>
        <img
          src={
            commentObj.user.profile_image_url == null
              ? 'https://matzip-s3-bucket.s3.ap-northeast-2.amazonaws.com/admin-202208171228120260.jpeg'
              : commentObj.user.profile_image_url
          }
          className={CommentDetailStyles.profileImg}
        />
        <h4 className={CommentDetailStyles.userName}>{commentObj.user.username}</h4>
        <p className={CommentDetailStyles.content}>{commentObj.content}</p>
      </div>
    </>
  );
}

export default CommentDetailComponent;
