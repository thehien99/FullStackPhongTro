import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import configRouter from "../../configRouter";
import Header from "./Header";
import SideBar from "./SideBar";

const System = () => {
  const isLogin = useSelector(state => state.auth.isLogin)
  if (!isLogin) return <Navigate to={`/${configRouter.login}`} replace={true} />
  return (
    <div className="'w-full h-screen flex flex-col items-center">
      <Header />
      <div className="flex w-full flex-auto">
        <SideBar />
        <div className="flex-auto bg-white shadow-md h-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
};

export default System;
