import React, { useEffect } from "react";
import List from "../../../component/ListProduct/List";
import ItemSideBar from "../../ItemSideBar/ItemSideBar";
import { useSelector } from "react-redux";
import NewPost from "../../NewPost/NewPost";

const HomePage = () => {
  const dataHome = useSelector((state) => state.category.categoryData.response)
  const Price = useSelector((state) => state.price.dataPrice)
  const Acrea = useSelector((state) => state.acrea.data)
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="list_product col-8">
            <List />
          </div>
          <div className="sidebar col-4" style={{ borderStyle: "dotted" }}>
            <ItemSideBar content={dataHome} tilte='Danh sách cho thuê' />
            <ItemSideBar
              tilte='Xem theo giá'
              content={Price}
              isDouble={true}
              type='priceCode' />
            <ItemSideBar
              tilte='Xem theo diện tích'
              content={Acrea}
              isDouble={true}
              type='areaCode' />
            <NewPost />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
