import React, { useState } from "react";
import InputForm from "../InputForm/InputForm";
import ButtonFrom from "../InputForm/ButtonFrom";
import Swal from "sweetalert2"

export const ContactInPut = () => {
  const [payload, setPayload] = useState({
    name: '',
    phone: '',
    content: ''
  })
  const handleSend = () => {
    Swal.fire({
      position: 'top-end', icon: 'success', title: `Cám ơn ${payload.name} đã gửi liên hệ tới chúng tôi`, showConfirmButton: false, timer: 1500
    }).then(() => {
      setPayload({
        name: '',
        phone: '',
        content: ''
      })
    })
  }
  return (
    <div className="bg-white border rounded-2xl w-[400px] h-full">
      <div className="mt-3 ps-3">
        <span className="font-bold">Liên hện trực tuyến</span>
      </div>
      <div className="p-3">
        <InputForm
          label="Họ và tên của bạn"
          value={payload.name}
          setValue={setPayload}
          keyPayLoad="name"
        />
        <InputForm
          label="Số điện thoại"
          value={payload.phone}
          setValue={setPayload}
          keyPayLoad="phone"
        />
        <div>
          <label htmlFor="">Nội dung mô tả</label>
          <textarea
            value={payload.content}
            name="content"
            id="desc"
            cols="30"
            rows="4"
            className="outline-none bg-[#e8f0fe] w-full"
            onChange={(e) => setPayload(prev => ({ ...prev, content: e.target.value }))}
          >
          </textarea>
        </div>
        <ButtonFrom magrin="mt-3"
          fullWidth
          textColor="text-white"
          text="Gửi liên hệ"
          bgColor="bg-primary"
          onClick={handleSend}
        />
      </div>

    </div>
  )
};
