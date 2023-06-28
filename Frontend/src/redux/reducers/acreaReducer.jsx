import { createSlice } from "@reduxjs/toolkit";

const acreaReducer = createSlice({
  name: "acrea",
  initialState: {
    data: []
  },
  reducers: {
    getAcreaSuccess: (state, action) => {
      state.data = action.payload
    }
  }
})

export const { getAcreaSuccess } = acreaReducer.actions
export default acreaReducer.reducer