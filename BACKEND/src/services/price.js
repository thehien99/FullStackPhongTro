import db from "../models";

const getAllPrice = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Price.findAll({
        raw: true,
        attributes: ["code", "value", "order"],
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllPrice: getAllPrice,
};
