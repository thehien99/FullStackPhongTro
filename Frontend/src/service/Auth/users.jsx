import appAxios from "../../utils/api"

export const getCurrentUser = () => new Promise(async (resolve, reject) => {
  try {
    const response = await appAxios({
      method: 'get',
      url: '/getuser',
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})


export const updateUser = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios({
        method: "put",
        url: "/updateuser",
        data: payload
      })
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}