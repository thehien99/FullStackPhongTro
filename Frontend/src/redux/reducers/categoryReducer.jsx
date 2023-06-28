import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryData: []
}
const categoryReducer = createSlice({
  name: 'category',
  initialState,
  reducers: {
    categorySuccess: (state, action) => {
      state.categoryData = action.payload
    }
  }
})

export const { categorySuccess } = categoryReducer.actions
export default categoryReducer.reducer