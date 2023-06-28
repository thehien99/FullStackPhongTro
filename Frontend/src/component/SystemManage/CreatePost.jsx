import React, { useState } from "react";
import Address from "../Address/Address";
import Overview from "../Overview/Overview";
import icons from "../../utils/icons";
import Loading from "../Loading/Loading"
import ApiImages from "../../service/ApiImages/ApiImages";
import ButtonFrom from "../InputForm/ButtonFrom"
import { getAreaSearchRange, getPriceSearchRange } from "../../utils/commonModalSeacrh";
import { useSelector } from "react-redux";

const { FcCamera, RiDeleteBin5Line } = icons
const CreatePost = () => {
  const [payload, setPayload] = useState({
    categoryCode: "",
    title: "",
    priceNumber: 0,
    areaNumber: 0,
    images: "",
    address: "",
    priceCode: "",
    areaCode: "",
    description: "",
    target: "",
    province: "",
  })
  const [image, setViewImage] = useState([])
  const [isShowLoading, setIsShowLoading] = useState(false)
  const Price = useSelector((state) => state.price.dataPrice)
  const Acrea = useSelector((state) => state.acrea.data)
  const currentUser = useSelector(state => state.user.data.response)

  const handleFiles = async (e) => {
    e.stopPropagation()
    setIsShowLoading(true)
    let images = []
    const files = e.target.files;
    const formData = new FormData();
    for (let i of files) {
      formData.append('file', i)
      formData.append('upload_preset', import.meta.env.VITE_UPLOAD_ASSETS_NAME)
      const res = await ApiImages(formData)
      if (res.status === 200) images = [...images, res.data?.secure_url]
    }
    setIsShowLoading(false)
    setViewImage(prev => [...prev, ...images])
    setPayload(prev => ({ ...prev, images: [...prev.images, ...images] }))
  }
  const handleDeleteImg = (img) => {
    setViewImage((prev) => prev?.filter((item) => item !== img))
    setPayload(prev => ({
      ...prev,
      images: prev.images?.filter((item) => item !== img)
    }))
  }
  const handleSubmit = () => {
    let price = getPriceSearchRange(+payload.priceNumber / Math.pow(10, 6), Price, 1, 15)
    let priceCode = price[price.length - 1]?.code
    let acrae = getAreaSearchRange(+payload.areaNumber, Acrea, 0, 90)
    let areaCode = acrae[acrae.length - 1]?.code
    const finalPayload = {
      ...payload,
      priceCode,
      areaCode,
      userID: currentUser.id,
      priceNumber: +payload.priceNumber / Math.pow(10, 6),
      target: payload.target || 'Tất cả',
      label: `${payload?.categoryCode} tại${payload?.address.split(',', 2)}`
    }
    console.log(finalPayload)
  }
  return (
    <div>
      <h3>Đăng tin mới</h3>
      <hr />
      <div className="flex gap-4">
        <div className="flex flex-auto flex-col gap-14">
          <Address payload={payload} setPayload={setPayload} />
          <Overview payload={payload} setPayload={setPayload} />
          <div>
            <h4>Hình Ảnh</h4>
            <small className="font-medium">Cập nhật hình ảnh sẽ cho thuê nhanh hơn</small>
            <div className="w-full  ">
              <label className=" cursor-pointer flex justify-center items-center w-full h-[200px] border-dashed border-2 border-sky-500"
                htmlFor="file">
                {
                  isShowLoading ? (
                    <Loading />
                  ) : (
                    <span  >
                      <FcCamera size={80} />
                      Thêm Ảnh
                    </span>
                  )
                }
              </label>
              <input
                onChange={handleFiles}
                type="file"
                id="file"
                multiple
                hidden />
              <div className="flex ">
                {
                  image?.map((item) => {
                    return (
                      <div key={item} className="w-1/3 relative ms-2 ">
                        <img className="w-full h-full" src={item} alt="" />
                        <span onClick={() => handleDeleteImg(item)} className="absolute font-bold border bg-red-600 cursor-pointer p-1 rounded-md top-0 right-0 hover:bg-gray-500">
                          <RiDeleteBin5Line color="white" />
                        </span>
                      </div>
                    )
                  })
                }</div>
            </div>
          </div>
          <ButtonFrom onClick={handleSubmit} text="Tạo Tin Mới" textColor="text-white" bgColor="bg-green-600" />
        </div>
        <div className="w-[30%] flex-none">
          maps
        </div>
      </div>
    </div >
  )
};

export default CreatePost;
