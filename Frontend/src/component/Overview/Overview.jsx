import React from "react";
import Select from "../SelectManage/Select";
import { useSelector } from "react-redux";
import InputOverView from "../InputManage/InputOverView";
import { InPutAddress } from "../InputManage/InputAddress";

const Overview = ({ payload, setPayload, invalids, setInValids }) => {
  const cateData = useSelector((state) => state.category.categoryData.response)
  const currentUser = useSelector(state => state.user.data.response)
  const gender = [
    { code: "Tất cả", value: "Tất cả" },
    { code: "Nam", value: "Nam" },
    { code: "Nữ", value: "Nữ" },
  ]
  return (
    <div>
      <h4>Thông tin mô tả</h4>
      <div className="w-[50%]">
        <Select
          invalids={invalids}
          setInValids={setInValids}
          name="categoryCode"
          value={payload.categoryCode}
          setValue={setPayload}
          label='Loại chuyên mục'
          options={cateData} />
      </div>
      <div className="mt-10 w-[90%]">
        <InputOverView
          invalids={invalids}
          setInValids={setInValids}
          name='title'
          value={payload.title}
          setValue={setPayload}
          label='Tiêu đề'
        />
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
          onFocus={() => setInValids([])}
        >
        </textarea>
      </div>
      <div className="text-red-600">
        <small>{invalids?.find(item => item?.name === "description")?.msg}</small>
      </div>
      <div className="mt-4 w-[50%]">
        <InPutAddress value={currentUser?.name} label='Thông tin liên hệ' />
        <InPutAddress value={currentUser?.phone} label='Điện thoại' />
        <InputOverView
          name='priceNumber'
          value={payload.priceNumber}
          setValue={setPayload}
          unit='đồng'
          label='Giá cho thuê'
          invalids={invalids}
          setInValids={setInValids}
        />
        <InputOverView
          name='areaNumber'
          value={payload.areaNumber}
          setValue={setPayload}
          unit='m2'
          label='Diện tích'
          invalids={invalids}
          setInValids={setInValids}
        />
        <Select
          name='target'
          value={payload.target}
          setValue={setPayload}
          options={gender}
          label="Đối tượng cho thuê"
          invalids={invalids}
          setInValids={setInValids}
        />
      </div>


    </div >
  )
};

export default Overview;
