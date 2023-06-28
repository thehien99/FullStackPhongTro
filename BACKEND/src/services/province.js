import db from "../models";

const getAllProvince = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Province.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllProvince: getAllProvince,
};
