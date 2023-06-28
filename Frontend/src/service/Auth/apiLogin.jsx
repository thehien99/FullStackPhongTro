import appAxios from "../../utils/api"

export const apiLogin = (payload) => new Promise(async (resolve, reject) => {
  try {
    const response = await appAxios({
      method: 'post',
      url: '/login',
      data: payload
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})