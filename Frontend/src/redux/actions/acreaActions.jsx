import { getAcrea } from "../../service/Post/acreApi"
import { getAcreaSuccess } from "../reducers/acreaReducer"

export const getAllAcrea = async (dispatch) => {
  try {
    const res = await getAcrea()
    const data = res.data.sort((a, b) => { return +a.order - +b.order })
    dispatch(getAcreaSuccess(data))
  } catch (error) {
    console.log(error)
  }
}