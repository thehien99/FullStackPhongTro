import appAxios from "../../utils/api";

//allpost
export const getAllPost = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios({
        method: "get",
        url: "/getpost",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};

//pagination and get post limit
export const apiGetPostLimit = (query) => new Promise(async (resolve, reject) => {
  try {
    const response = await appAxios({
      method: 'get',
      url: `/limit`,
      params: query

    })
    resolve(response)
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