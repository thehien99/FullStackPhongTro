import express from "express";
import insertController from "../controllers/insertController";
import categoryCotroller from "../controllers/categoryCotroller";
import postController from "../controllers/postController";
import priceController from "../controllers/priceController";
import acreaController from "../controllers/acreaController";
import provinceController from "../controllers/provinceController";
import userController from "../controllers/userController";
import verifyToken from "../middleware/checkAuth";
let router = express.Router();

let initWebRoutes = (app) => {
  //InsertData
  router.post("/insert", insertController.insertData);

  //CATEGORY
  router.get("/getall", categoryCotroller.getCategory);

  //GET POSTS
  router.get("/getpost", postController.getPosts);
  router.get("/getnewpost", postController.getAllNewPost);
  router.get("/getpostarea", postController.getPostForArea)

  //CREATEPOST
  router.post("/createpost", verifyToken, postController.createPost)

  //UPDATE 
  router.put("/updatepost", verifyToken, postController.updatePost)

  //Delete
  router.delete('/delete', verifyToken, postController.deletePost)

  //Post management
  router.get("/limit-admin", verifyToken, postController.getPostAdmin)


  //Pagination
  router.get("/limit", postController.postPagination);

  //Get Price
  router.get("/price", priceController.getPrice);

  //Get acre
  router.get("/acrea", acreaController.getAllAcrea);

  //province
  router.get("/province", provinceController.getProvince);

  //USER
  router.post("/login", userController.login);
  router.post("/api/register", userController.register);
  router.use(verifyToken);
  router.get("/getuser", userController.getOneUser);
  router.put("/updateuser", userController.updateUser)


  return app.use("/", router);
};

module.exports = initWebRoutes;
