import React from "react";

const menuContact = [
  { code: "0123456789", value: 'Điện thoại' },
  { code: "examp@gmail.com", value: 'Email' },
  { code: "0123456789", value: 'Zalo' },
  { code: "0123456789", value: 'Viber' },
  { code: "123 tphcm", value: 'Địa chỉ' }
]
export const ContactUntils = () => {
  return (
    <div className="bg-gradient-to-br from-blue-700 to-cyan-400 w-[400px] h-[300px] me-5 rounded-2xl text-white ">
      <div className="p-3 flex flex-col">
        <span className="font-bold">Thông tin liên hệ</span>
        <span className="pt-3">Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn bạn vì đã lựa chọn chúng tôi</span>
      </div>
      <div className="p-3 flex flex-col">
        {menuContact?.map((item) => {
          return (
            <div className="" key={item.code}>
              <small className="font-bold ">
                {item.value}:
              </small>
              <small className="ps-2">
                {item.code}
              </small>
            </div>
          )
        })}
      </div>
    </div>
  )
}
