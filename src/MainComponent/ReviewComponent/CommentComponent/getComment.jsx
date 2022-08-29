import axios from 'axios';

// eslint-disable-next-line no-unused-vars
const getComment = async ({ authToken, setComments, reviewId }) => {
  const searchArguments = {
    pageNumber: 0,
    pageSize: 15,
    sortedBy: 'createdAt',
    ascending: false,
    keyword: '댓글',
  };
  try {
    const response = await axios.get(
      `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/comments?pageNumber=${searchArguments.pageNumber}&pageSize=${searchArguments.pageSize}&sortedBy=${searchArguments.sortedBy}&ascending=${searchArguments.ascending}&keyword=${searchArguments.keyword}`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    setComments(response.data.content);
  } catch (error) {
    console.log(error);
  }
};

export default getComment;
