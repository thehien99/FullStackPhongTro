import React, { useEffect, useState } from "react";
import Address from "../Address/Address";
import Overview from "../Overview/Overview";
import icons from "../../utils/icons";
import Loading from "../Loading/Loading"
import ApiImages from "../../service/ApiImages/ApiImages";
import ButtonFrom from "../InputForm/ButtonFrom"
import { getAreaSearchRange, getPriceSearchRange } from "../../utils/commonModalSeacrh";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2'
import validate from "../../utils/validatefield";
import { createPost, updatePost } from "../../service/Post/post";
import { clearEditPost } from "../../redux/actions/postActions";
import Map from "../Map/Map";

const { FcCamera, RiDeleteBin5Line } = icons

const CreatePost = ({ isEdit }) => {
  const dataEdit = useSelector(state => state.post.postEdit)
  const [payload, setPayload] = useState({
    categoryCode: dataEdit?.categoryCode || "",
    title: dataEdit?.title || "",
    priceNumber: dataEdit?.priceNumber * 1000000 || 0,
    areaNumber: dataEdit?.areaNumber || 0,
    images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : "",
    address: dataEdit?.address || "",
    priceCode: dataEdit?.priceCode || "",
    areaCode: dataEdit?.areaCode || "",
    description: dataEdit?.description ? JSON.parse(dataEdit?.description) : "",
    target: dataEdit?.overviews?.target || "",
    province: dataEdit?.province || "",
  })
  const [image, setViewImage] = useState([])
  const [invalids, setInValids] = useState([])
  const [isShowLoading, setIsShowLoading] = useState(false)
  const Price = useSelector((state) => state.price.dataPrice)
  const Acrea = useSelector((state) => state.acrea.data)
  const currentUser = useSelector(state => state.user.data.response)
  const cateData = useSelector((state) => state.category.categoryData.response)
  const dispatch = useDispatch()
  useEffect(() => {
    let image = dataEdit?.images?.image && JSON.parse(dataEdit?.images?.image)
    image && setViewImage(image)
  }, [dataEdit])

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
      images: prev?.images?.filter((item) => item !== img)
    }))
  }
  const handleSubmit = async () => {
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
      label: `${cateData?.find(item => item?.code === payload?.categoryCode)?.value} ${(payload?.address).split(",", 3).slice(1, 3).toString()}`,
      categoryValue: cateData?.find(item => item?.code === payload?.categoryCode)?.value
    }
    const result = validate(finalPayload, setInValids)
    if (result === 0) {
      if (dataEdit && isEdit) {
        finalPayload.postId = dataEdit?.id
        finalPayload.attributesId = dataEdit?.attributesId
        finalPayload.imagesId = dataEdit?.imagesId
        finalPayload.overviewId = dataEdit?.overviewId

        const response = await updatePost(finalPayload)
        if (response.err === 0) {
          Swal.fire({
            position: 'top-end', icon: 'success', title: 'Your update Success', showConfirmButton: false, timer: 1500
          }).then(() => {
            resetEdit()
            dispatch(clearEditPost)
          })
        } else {
          Swal.fire('Oops!', 'Có lỗi', 'error')
        }
      } else {
        const response = await createPost(finalPayload)
        if (response.err === 0) {
          Swal.fire({
            position: 'top-end', icon: 'success', title: 'Your create Success', showConfirmButton: false, timer: 1500
          }).then(() => {
            resetEdit()
          })
        } else {
          Swal.fire('Oops!', 'Có lỗi', 'error')
        }
      }
    }
  }

  const resetEdit = () => {
    setPayload({
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
  }
  return (
    <div className="ms-2 overflow-y-hidden">
      <h3>{isEdit ? "Chỉnh sửa tin đăng" : "Đăng tin mới"}</h3>
      <hr />
      <div className="flex gap-4">
        <div className="flex flex-auto flex-col gap-14">
          <Address invalids={invalids} setInValids={setInValids} payload={payload} setPayload={setPayload} />
          <Overview invalids={invalids} setInValids={setInValids} payload={payload} setPayload={setPayload} />
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
                    <span onFocus={() => setInValids([])}
                    >
                      <FcCamera size={80} />
                      Thêm Ảnh
                    </span>
                  )
                }
              </label>
              <div className="text-red-600">
                <span>
                  {invalids?.find(item => item.name === "images")?.msg}
                </span>
              </div>
              <span className="font-bold">Ảnh đã được thêm</span>
              <input
                onChange={handleFiles}
                type="file"
                id="file"
                multiple
                hidden
              />
              <div className="flex ">
                {
                  image?.map((item) => {
                    return (
                      <div key={item} className="w-1/3 mt-3 relative ms-2 ">
                        <img className="w-full h-full" value={payload.images} name="images" src={item} alt="" />
                        <span onClick={() => handleDeleteImg(item)} className="absolute font-bold border bg-red-600 cursor-pointer p-1 rounded-md top-0 right-0 hover:bg-gray-500">
                          <RiDeleteBin5Line color="white" />
                        </span>
                      </div>
                    )
                  })
                }</div>
            </div>
          </div>
          <ButtonFrom onClick={handleSubmit} text={isEdit ? 'Cập nhật tin' : 'Tạo tin mới'} textColor="text-white" bgColor="bg-green-600" />
        </div>
        <div className="w-[50%] flex-none">
          <Map address={payload?.address} />
        </div>
      </div>
    </div >
  )
};

export default CreatePost;
