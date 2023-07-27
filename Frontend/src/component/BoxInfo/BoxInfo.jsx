import React from "react";
import avatar from "../../assets/img/userAvatar/user.jpg"
import icons from "../../utils/icons";
import { Link } from "react-router-dom";
const { BsDot, BsFillTelephoneFill, SiZalo } = icons

const BoxInfo = ({ userData: { name, phone, zalo } }) => {
  return (
    <div className="p-3 w-full h-[20rem] bg-[#febb02]  flex flex-col items-center border rounded-md">
      <img src={avatar} alt="" className="w-[6rem] rounded-full border object-contain" />
      <h4 className="mt-2">{name}</h4>
      <span className="flex items-center">
        <BsDot color="green" fontSize={25} />
        <span className="text-sm font-normal">Đang hoạt động</span>
      </span>
      <div className="w-full mt-2 bg-green-600 p-2 flex justify-center items-center gap-2 rounded-md">
        <BsFillTelephoneFill color="white" fontSize={25} />
        <a target="_blank" href={`tel:${phone}`} className="no-underline text-white text-xl font-bold cursor-pointer">{phone}</a>
      </div>
      <div className="w-full mt-2 bg-white p-2 flex justify-center items-center gap-2 rounded-md">
        <SiZalo color="white" fontSize={30} className="border bg-blue-400 rounded-full p-1 " />
        <a target="_blank" href={`https://zalo.me/${phone}`} className="no-underline text-black text-xl font-bold cursor-pointer">{phone}</a>
      </div>
    </div>
  )
};

export default BoxInfo;
