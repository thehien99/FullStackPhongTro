import appAxios from "../../utils/api"

export const getAcrea = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await appAxios.get('/acrea')
      resolve(res)
    } catch (error) {
      reject(error)
    }
  })
}