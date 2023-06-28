import {Op} from "sequelize";
import db from "../models";

const getAllPost = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          {model: db.Image, as: "images", attributes: ["image"]},
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.Seller,
            as: "sellers",
            attributes: ["name", "phone", "zalo", "avatar"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 1 : 0,
        msg: response ? "ok" : "fail",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getPostLimit = (params, query, {priceNumber, areaNumber}) => {
  return new Promise(async (resolve, reject) => {
    try {
      let page = !params || +params <= 1 ? 0 : +params - 1;
      let queries = {...query};
      if (priceNumber) {
        queries.priceNumber = {[Op.between]: priceNumber};
      }
      if (areaNumber) {
        queries.areaNumber = {[Op.between]: areaNumber};
      }
      const response = await db.Post.findAndCountAll({
        where: queries,
        raw: true,
        offset: page * +process.env.LIMIT || 0,
        limit: +process.env.LIMIT,
        nest: true,
        include: [
          {model: db.Image, as: "images", attributes: ["image"]},
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.Seller,
            as: "sellers",
            attributes: ["name", "phone", "zalo", "avatar"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 1 : 0,
        msg: response ? "ok" : "fail",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getNewPost = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        offset: 0,
        order: [["createdAt", "DESC"]],
        limit: +process.env.LIMIT,
        include: [
          {model: db.Image, as: "images", attributes: ["image"]},
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
        ],
        attributes: ["id", "title", "star", "createdAt"],
      });
      resolve({
        msg: "oke",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  getAllPost: getAllPost,
  getPostLimit: getPostLimit,
  getNewPost: getNewPost,
};
