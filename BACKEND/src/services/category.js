import db from "../models";

//getall
const getAllCategory = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Category.findAll({
        raw: true,
      })
      resolve({
        errCode: response ? 0 : 1,
        message: response ? 'Ok' : 'Fail',
        response
      })
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  getAllCategory: getAllCategory
}