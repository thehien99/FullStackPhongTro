import { getCategory } from "../../service/Post/post"
import { categorySuccess } from "../reducers/categoryReducer"

export const getAllCategory = async (dispatch) => {
  try {
    const res = await getCategory()
      dispatch(categorySuccess(res))
  } catch (error) {
    console.log(error)
  }
}