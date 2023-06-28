import price from "../services/price";

const getPrice = async (req, res) => {
  try {
    const response = await price.getAllPrice();
    return res.status(200).json({
      msg: "ok",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getPrice: getPrice,
};
