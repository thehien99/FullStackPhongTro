import React, { useState } from "react";
import { InPutAddress } from "../InputManage/InputAddress";
import InputOverView from "../InputManage/InputOverView";
import avatar from "../../assets/img/userAvatar/user.jpg"
import ButtonFrom from "../InputForm/ButtonFrom";
import { useDispatch, useSelector } from "react-redux";
import ApiImages from "../../service/ApiImages/ApiImages";
import { updateUser } from "../../service/Auth/users";
import { getCurrent } from "../../redux/actions/userActions";

const EditAccount = () => {
  const currentUser = useSelector(state => state.user.data.response)
  const dispatch = useDispatch()
  const [payload, setPayload] = useState({
    name: currentUser?.name || "",
    zalo: currentUser?.zalo || '',
    fbUrl: currentUser?.fbUrl || '',
    avatar: currentUser?.avatar || ''
  })
  const resetUpdateUser = () => {
    setPayload({
      name: '',
      zalo: '',
      fbUrl: '',
      avatar: ''
    })
  }
  const handleUpdate = async () => {
    const response = await updateUser(payload)
    if (response.err === 0) {
      dispatch(getCurrent)
    }
  }
  const handleUpLoad = async (e) => {
    const image = e.target.files[0]
    const formData = new FormData()
    formData.append('file', image)
    formData.append('upload_preset', import.meta.env.VITE_UPLOAD_ASSETS_NAME)
    const response = await ApiImages(formData)
    if (response?.status === 200) {
      setPayload(prev => ({
        ...prev,
        avatar: response.data?.secure_url
      }))
    }
  }
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-start w-full">Cập nhật thông tin cá nhân</h3>
      <div className="border border-black w-full h-full">
      </div>
      <div className="w-[60%] flex flex-col gap-4">
        <InPutAddress
          value={currentUser?.id?.slice(0, 20)} label="Mã thành viên"
          direction="flex-row" />
        <InPutAddress
          value={currentUser?.phone}
          label="Số điện thoại"
          direction="flex-row"
          editPhone
        />
        <InputOverView
          name='name'
          setValue={setPayload}
          value={payload.name}
          flex='flex flex-row'
          label="Tên hiển thị" />
        <InputOverView
          name='zalo'
          setValue={setPayload}
          value={payload.zalo}
          flex='flex flex-row'
          label="Zalo" />
        <InputOverView
          name="fbUrl"
          setValue={setPayload}
          value={payload.fbUrl}
          flex='flex flex-row'
          label="Facebook" />
        <div>
          <label htmlFor="password" className="w-48 flex-none">Mật khẩu</label>
          <small className="text-blue-600">Đổi mật khẩu</small>
        </div>
        <div className="w-full flex gap-4">
          <label className="w-48 flex-none" htmlFor="avatar">Ảnh đại diện</label>
          <div>
            <img className="w-20 h-20 rounded-full object-cover" src={payload.avatar || avatar} alt="Ảnh đại diện" />
            <input type="file" className="my-2" id="avtar" onChange={handleUpLoad} />
          </div>
        </div>
        <ButtonFrom
          text="Cập nhật"
          bgColor="bg-primary"
          textColor="text-white"
          onClick={handleUpdate}
        />
      </div>
    </div>
  )
};

export default EditAccount;
