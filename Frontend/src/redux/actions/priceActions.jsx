import { getPrice } from '../../service/Post/priceApi'
import { getPriceSuccess } from '../reducers/priceReducer'

export const getAllPrice = async (dispatch) => {
  try {
    const response = await getPrice()
    const data = response.data.sort((a, b) => { return +a.order - +b.order })
    dispatch(getPriceSuccess(data))
  } catch (error) {
    console.log(error)
  }
}