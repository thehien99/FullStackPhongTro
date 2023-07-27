import { createSlice } from "@reduxjs/toolkit";


const postReducer = createSlice({
  name: "post",
  initialState: {
    data: [],
    newpost: {
      dataNewPost: []
    },
    province: [],
    postAdmin: [],
    postEdit: null
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
    },
    getPostAdminSuccess: (state, action) => {
      state.postAdmin = action.payload || []
    },
    editPostSuccess: (state, action) => {
      state.postEdit = action.payload || null
    },
    clearEditPostSuccess: (state) => {
      state.postEdit = null
    }
  },
});


export const { postSuccess, getNewPostSuccess, getProvinceSuccess, getPostAdminSuccess, editPostSuccess, clearEditPostSuccess } = postReducer.actions;

export default postReducer.reducer;
