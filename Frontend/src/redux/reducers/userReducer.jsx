import { createSlice } from "@reduxjs/toolkit";
const getUserReducer = createSlice({
  name: 'currentUser',
  initialState: {
    data: {}
  },
  reducers: {
    getUserSuccess: (state, action) => {
      state.data = action.payload
    },
    logOutGetUser: (state, action) => {
      state.data = {}
    }
  }
})
export const { getUserSuccess, logOutGetUser } = getUserReducer.actions
export default getUserReducer.reducer