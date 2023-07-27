import { getCurrentUser } from "../../service/Auth/users"
import { getUserSuccess } from "../reducers/userReducer"

export const getCurrent = async (dispatch) => {
  try {
    const res = await getCurrentUser()
    dispatch(getUserSuccess(res))
  } catch (error) {
    console.log(error)
  }
}