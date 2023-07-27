
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ItemSideBar from "../ItemSideBar/ItemSideBar";
import NewPost from "../NewPost/NewPost";
import List from "../ListProduct/List";



const SearchDetails = () => {
  const dataPrice = useSelector((state) => state.price.dataPrice)
  const dataAcrea = useSelector((state) => state.acrea.data)

  const location = useLocation()
  return (
    <div className="container">
      <h2 className="mt-5">{location.state?.titleTextSearch}</h2>
      <span>{`${location.state?.titleTextSearch},phòng mới xây, chính chủ gần chợ, trường học, siêu thị, cửa hàng tiện lợi, khu an ninh.`}</span>
      <div className="row mt-4">
        <div className="list_product col-8">
          <List />
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
  );
};

export default SearchDetails;
