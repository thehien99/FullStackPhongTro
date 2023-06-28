import appAxios from "../../utils/api"

export const getPrice = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await appAxios.get('/price')
      resolve(response)
    } catch (error) {
      reject(error)
    }
  })
}