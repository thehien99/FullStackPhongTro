import appAxios from "../../utils/api";

//allpost
export const getAllPost = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await appAxios({
        method: "get",
        url: "/getpost",
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

//pagination and get post limit
export const apiGetPostLimit = (query) => new Promise(async (resolve, reject) => {
  try {
    const res = await appAxios({
      method: 'get',
      url: `/limit`,
      params: query

    })
    resolve(res)
  } catch (error) {
    reject(error)
  }
})

//navigation
export const getCategory = () =>
  new Promise(async (resolve, reject) => {
    try {
      const res = await appAxios({
        method: "get",
        url: "/getall",
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });

//newpost sidebar
export const getNewPost = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await appAxios({
        method: "get",
        url: "/getnewpost"
      })
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

//newprovince
export const getProvince = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await appAxios({
        method: 'get',
        url: '/province'
      })
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

//Createpost
export const createPost = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await appAxios({
        method: "post",
        url: '/createpost',
        data: payload
      })
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

//postadmin
export const getPostADmin = (query) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await appAxios({
        method: 'get',
        url: '/limit-admin',
        data: query,
      })
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

//updatepost
export const updatePost = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await appAxios({
        method: 'put',
        url: '/updatepost',
        data: payload
      })
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}

//deletepost 
export const deletePost = (postId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await appAxios({
        method: 'delete',
        url: `/delete`,
        params: { postId }
      })
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}