import { createSlice } from "@reduxjs/toolkit";


const postReducer = createSlice({
  name: "post",
  initialState: {
    data: [],
    newpost: {
      dataNewPost: []
    },
    province: []
  },
  reducers: {
    postSuccess: (state, action) => {
      state.data = action.payload;
    },
    getNewPostSuccess: (state, action) => {
      state.newpost.dataNewPost = action.payload
    },
    getProvinceSuccess: (state, action) => {
      state.province = action.payload
    }
  },
});


export const { postSuccess, getNewPostSuccess, getProvinceSuccess } = postReducer.actions;

export default postReducer.reducer;
