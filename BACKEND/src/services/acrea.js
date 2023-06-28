import db from "../models";

const getAcrea = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.Area.findAll({
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
  getAcrea: getAcrea,
};
