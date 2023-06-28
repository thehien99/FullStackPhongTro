import appAxios from "../../utils/api"

export const apiRegister = (payload) => new Promise(async (resolve, reject) => {
  try {
    const response = await appAxios({
      method: 'post',
      url: '/api/register',
      data: payload
    })
    resolve(response)
  } catch (error) {
    reject(error)
  }
})