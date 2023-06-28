import province from "../services/province";

const getProvince = async (req, res) => {
  try {
    const response = await province.getAllProvince();
    return res.status(200).json({
      msg: "ok",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProvince: getProvince,
};
