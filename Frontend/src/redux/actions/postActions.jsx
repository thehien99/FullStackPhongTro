import { getNewPost, apiGetPostLimit, getProvince } from "../../service/Post/post";
import { getNewPostSuccess, getProvinceSuccess, postSuccess } from "../reducers/postReducer";

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