import { getNewPost, apiGetPostLimit, getProvince, getPostADmin } from "../../service/Post/post";
import { clearEditPostSuccess, editPostSuccess, getNewPostSuccess, getPostAdminSuccess, getProvinceSuccess, postSuccess } from "../reducers/postReducer";

export const postLimit = (query) => async (dispatch) => {
  try {
    const res = await apiGetPostLimit(query);
    dispatch(postSuccess(res))
  } catch (error) {
    console.log(error)
  }
}

export const getAllNewPost = async (dispatch) => {
  try {
    const res = await getNewPost();
    dispatch(getNewPostSuccess(res.data.response))
  } catch (error) {
    console.log(error)
  }
}

export const getAllProvince = async (dispatch) => {
  try {
    const res = await getProvince()
    dispatch(getProvinceSuccess(res))
  } catch (error) {
    console.log(error)
  }
}

export const getPostAdminLimit = (query) => async (dispatch) => {
  try {
    const res = await getPostADmin(query)
    dispatch(getPostAdminSuccess(res))
  } catch (error) {
    console.log(error)
  }
}

export const editPost = (dataEdit) => (dispatch) => {
  dispatch(editPostSuccess(dataEdit))
}
export const clearEditPost = (dispatch) => {
  dispatch(clearEditPostSuccess())
}