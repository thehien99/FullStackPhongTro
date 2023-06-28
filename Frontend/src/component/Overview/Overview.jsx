import React from "react";
import Select from "../SelectManage/Select";
import { useSelector } from "react-redux";
import InputOverView from "../InputManage/InputOverView";
import { InPutAddress } from "../InputManage/InputAddress";

const Overview = ({ payload, setPayload }) => {
  const cateData = useSelector((state) => state.category.categoryData.response)
  const currentUser = useSelector(state => state.user.data.response)
  const gender = [
    { code: 1, value: "Nam" },
    { code: 2, value: "Nữ" }
  ]
  return (
    <div>
      <h4>Thông tin mô tả</h4>
      <div className="w-[50%]">
        <Select
          name="categoryCode"
          value={payload.categoryCode}
          setValue={setPayload}
          label='Loại chuyên mục'
          options={cateData} />
      </div>
      <div className="mt-10 w-[90%]">
        <InputOverView name='title' value={payload.title} setValue={setPayload} label='Tiêu đề' />
      </div>
      <div className="mt-4 font-bold">
        <label htmlFor="desc">Nội dung mô tả</label>
        <textarea
          id="desc"
          cols="30"
          rows="10"
          className="w-[90%] p-2 border outline-none border-gray-400"
          value={payload.description}
          onChange={(e) =>
            setPayload((prev) =>
              ({ ...prev, description: e.target.value }))}
        >
        </textarea>
      </div>
      <div className="mt-4 w-[50%]">
        <InPutAddress value={currentUser.name} label='Thông tin liên hệ' />
        <InPutAddress value={currentUser.phone} label='Điện thoại' />
        <InputOverView name='priceNumber' value={payload.priceNumber} setValue={setPayload} unit='đồng' label='Giá cho thuê' />
        <InputOverView name='areaNumber' value={payload.areaNumber} setValue={setPayload} unit='m2' label='Diện tích' />
        <Select name='target' value={payload.target} setValue={setPayload} options={gender} label="Đối tượng cho thuê" />
      </div>


    </div >
  )
};

export default Overview;
