import { createSlice } from "@reduxjs/toolkit";

const priceReducer = createSlice({
  name: 'price',
  initialState: {
    dataPrice: []
  },
  reducers: {
    getPriceSuccess: (state, action) => {
      state.dataPrice = action.payload
    }
  }
})

export const { getPriceSuccess } = priceReducer.actions
export default priceReducer.reducer