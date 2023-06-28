import appAxios from "../../utils/api"

const getCurrentUser = () => new Promise(async (resolve, reject) => {
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
export default getCurrentUser