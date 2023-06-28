import acrea from "../services/acrea";

const getAllAcrea = async (req, res) => {
  try {
    const response = await acrea.getAcrea();
    return res.status(200).json({
      msg: "ok",
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllAcrea: getAllAcrea,
};
