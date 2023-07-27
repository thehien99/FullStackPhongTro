import React, { useEffect, useState } from "react";
import List from "../../../component/ListProduct/List";
import ItemSideBar from "../../ItemSideBar/ItemSideBar";
import { useSelector } from "react-redux";
import NewPost from "../../NewPost/NewPost";
import { useLocation } from "react-router-dom";
import { formatVietnameseToString } from "../../../utils/formatVietnameseToString";


const Rental = () => {
  const dataPrice = useSelector((state) => state.price.dataPrice.data)

  const dataAcrea = useSelector((state) => state.acrea.data.data)

  const cateData = useSelector((state) => state.category.categoryData.response)

  const location = useLocation()
  const [categoryCode, setCategoryCode] = useState('')
  const [categoryCurrent, setCategoryCurrent] = useState({})

  useEffect(() => {
    const dataCategory = cateData?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
    setCategoryCurrent(dataCategory)
    if (dataCategory) setCategoryCode(dataCategory.code)
  }, [location])
  return (
    <div className="container">
      <h2 className="mt-5">{categoryCurrent?.header}</h2>
      <span>{categoryCurrent?.subheader}</span>
      <div className="container">
        <div className="row">
          <div className="list_product col-8">
            <List categoryCode={categoryCode} />
          </div>
          <div className="sidebar col-4" style={{ borderStyle: "dotted" }}>
            <ItemSideBar
              tilte='Xem theo giá'
              content={dataPrice}
              isDouble={true}
              type='priceCode' />
            <ItemSideBar
              tilte='Xem theo diện tích'
              content={dataAcrea}
              isDouble={true}
              type='areaCode' />
            <NewPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rental;
