import axios from 'axios';

const getReview = async ({ authToken, setReviews, placeId }) => {
  const searchArguments = {
    pageNumber: 0,
    pageSize: 15,
    sortedBy: 'createdAt',
    ascending: false,
    searchType: 'location',
    keyword: placeId,
  };
  try {
    const response = await axios.get(
      `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/reviews?pageNumber=${searchArguments.pageNumber}&pageSize=${searchArguments.pageSize}&sortedBy=${searchArguments.sortedBy}&ascending=${searchArguments.ascending}&searchType=${searchArguments.searchType}&keyword=${searchArguments.keyword}`,
      {
        headers: {
          Authorization: authToken,
        },
      }
    );
    setReviews(response.data.content);
  } catch (error) {
    console.log(error);
  }
};

export default getReview;
