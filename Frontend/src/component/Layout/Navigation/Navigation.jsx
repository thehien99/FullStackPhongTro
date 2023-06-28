import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import configRouter from "../../../configRouter";
import { formatVietnameseToString } from "../../../utils/formatVietnameseToString";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../../../redux/actions/categoryAction";
const Navigation = ({ isAdmin }) => {
  const cateData = useSelector((state) => state.category.categoryData.response)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllCategory)
  }, []);
  return (
    <div className=" navigation text-center">
      <div className={`navigation-wrapper d-flex bg-primary ${isAdmin ? 'justify-start' : 'justify-center'}`}>
        <div className="p-3 ">
          <NavLink
            className="hover:bg-red-500 p-4 fw-bolder"
            style={{ textDecoration: "none", color: "white" }}
            to={configRouter.home}
          >
            Trang Chủ
          </NavLink>
        </div>
        {cateData?.length > 0 &&
          cateData.map((item) => {
            return (
              <div className="p-3" key={item.code}>
                <NavLink
                  to={`${formatVietnameseToString(item.value)}`}
                  className="hover:bg-red-500 p-4 fw-bolder"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {item.value}
                </NavLink>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Navigation;
