import { query } from "express";
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
  const { page, priceNumber, areaNumber, ...query } = req.query;
  try {
    const response = await post.getPostLimit(page, query, {
      priceNumber,
      areaNumber,
    });
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

const createPost = async (req, res) => {
  try {
    const { address, province, userID, title, label, images, priceCode, categoryCode } = req.body;
    if (
      !address ||
      !province ||
      !title ||
      !label ||
      images.length < 0 ||
      !priceCode ||
      !categoryCode ||
      !userID
    ) {
      return res.status(401).json('falid');
    }
    const response = await post.createNewPost(req.body);
    return res.status(200).json({
      err: 0,
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

const getPostAdmin = async (req, res) => {
  const { page, ...query } = req.query
  const { id } = req.user
  try {
    if (!id) return res.status(400).json({ err: 1, msg: "Missing" })
    const response = await post.postAdminService(page, id, query)
    return res.status(200).json({
      err: 0,
      response
    })
  } catch (error) {
    console.log(error)
  }
}

const updatePost = async (req, res) => {
  const { postId, attributesId, imagesId, overviewId, ...payload } = req.body
  const id = req.user
  try {
    if (!postId || !id || !attributesId || !imagesId || !overviewId) return res.status(400).json({ err: 1, msg: 'update faild' })
    const response = await post.updatePostService(req.body)
    return res.status(200).json({ err: 0, response })
  } catch (error) {
    console.log(error)
  }
}

const deletePost = async (req, res) => {
  const { postId } = req.query
  const { id } = req.user
  try {
    if (!postId || !id) return res.status(400).json({ err: 1, msg: "Delete Faild" })
    const response = await post.deletePostService(postId)
    return res.status(200).json(response)
  } catch (error) {
    console.log(error)
  }
}

const getPostForArea = async (req, res) => {
  const labelCode = req.query
  try {
    const response = await post.getPostArea(labelCode)
    return res.status(200).json(response)
  } catch (error) {
    console.log(err)
  }
}
module.exports = {
  getPosts: getPosts,
  postPagination: postPagination,
  getAllNewPost: getAllNewPost,
  createPost: createPost,
  getPostAdmin: getPostAdmin,
  updatePost: updatePost,
  deletePost: deletePost,
  getPostForArea: getPostForArea
};
