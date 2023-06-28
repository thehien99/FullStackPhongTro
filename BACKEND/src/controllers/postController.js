import post from "../services/post";

const getPosts = async (req, res) => {
  try {
    const response = await post.getAllPost();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const postPagination = async (req, res) => {
  const {page, priceNumber, areaNumber, ...query} = req.query;
  try {
    const response = await post.getPostLimit(page, query, {priceNumber, areaNumber});
    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

const getAllNewPost = async (req, res) => {
  try {
    const response = await post.getNewPost();
    return res.status(200).json({
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getPosts: getPosts,
  postPagination: postPagination,
  getAllNewPost: getAllNewPost,
};
