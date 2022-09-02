import axios from 'axios';

const getReview = async ({ authToken, setReviews, placeId, apiFlag, reviewId }) => {
  const searchArguments = {
    pageNumber: 0,
    pageSize: 15,
    sortedBy: 'createdAt',
    ascending: false,
    searchType: 'location',
    keyword: placeId,
  };
  if (apiFlag == 'placeId') {
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
  } else if (apiFlag == 'hot') {
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/reviews/hot`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setReviews(response.data.monthly_hot_reviews);
    } catch (error) {
      console.log(error);
    }
  } else if (apiFlag == 'reviewId') {
    try {
      const response = await axios.get(
        `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/reviews/${reviewId}`,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );
      setReviews(response.data);
    } catch (error) {
      console.log(error);
    }
  }
};

export default getReview;
