import category from "../services/category";

const getCategory = async (req, res) => {
  try {
    const response = await category.getAllCategory()
    return res.status(200).json(response)
  } catch (error) {
    return res.status(400).json({
      errCode: 1,
      message: 'Loi roi' + error
    })
  }
}

module.exports = {
  getCategory: getCategory
}