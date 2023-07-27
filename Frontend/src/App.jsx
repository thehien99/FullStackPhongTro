import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import configRouter from "./configRouter";
import Home from "./component/page/Home/home";
import HomePage from "./component/page/HomePage/HomePage";
import Login from "./component/page/Login/Login";
import ProductDetail from "./component/page/Product/ProductDetail";
import { useDispatch, useSelector } from "react-redux";
import { getAllPrice } from "./redux/actions/priceActions";
import { getAllAcrea } from "./redux/actions/acreaActions";
import UserManage from "./component/page/userManage/userManager";
import Rental from "./component/page/Content/Rental";
import { getAllProvince } from "./redux/actions/postActions";
import SearchDetails from "./component/SearchDetails/SearchDetails";
import { getCurrent } from "./redux/actions/userActions";
import { CreatePost, EditAccount, Management, System } from "./component/SystemManage";
import ContactManage from "./component/SystemManage/ContactManage";





function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin)
  useEffect(() => {
    setTimeout(() => {
      isLogin && dispatch(getCurrent)
    }, 1000);
  }, [isLogin])
  useEffect(() => {
    dispatch(getAllPrice)
    dispatch(getAllAcrea)
    dispatch(getAllProvince)
  }, [])


  return (
    <Routes>
      <Route path={configRouter.home} element={<Home />}>
        <Route path='*' element={<HomePage />} />
        <Route path={configRouter.login} element={<Login />} />
        <Route path={configRouter.userManager} element={<UserManage />} />
        <Route path={configRouter.chothuecanho} element={<Rental />} />
        <Route path={configRouter.chothuematbang} element={<Rental />} />
        <Route path={configRouter.chothuephongtro} element={<Rental />} />
        <Route path={configRouter.nhachothue} element={<Rental />} />
        <Route path={configRouter.seacrh} element={<SearchDetails />} />
        <Route path={configRouter.product_detail} element={<ProductDetail />} />
        <Route path={configRouter.contact} element={<ContactManage />} />
      </Route>
      <Route path={configRouter.system} element={<System />}>
        <Route path={configRouter.createPost} element={<CreatePost />} />
        <Route path={configRouter.Management} element={<Management />} />
        <Route path={configRouter.editAccount} element={<EditAccount />} />
      </Route>

    </Routes>
  );
}

export default App;
