import axios from 'axios';

const searchArguments = {
  pageNumber: 0,
  pageSize: 15,
  sortedBy: 'createdAt',
  ascending: false,
  searchType: 'location',
};

const getReview = async ({ authToken, setReviews }) => {
  try {
    const response = await axios.get(
      `https://${process.env.REACT_APP_SERVER_HOST}/api/v1/reviews?pageNumber=${searchArguments.pageNumber}&pageSize=${searchArguments.pageSize}&sortedBy=${searchArguments.sortedBy}&ascending=${searchArguments.ascending}&searchType=${searchArguments.searchType}&keyword=22013501`,
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
