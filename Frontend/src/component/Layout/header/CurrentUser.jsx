import React from "react";
import { useSelector } from "react-redux";
import userLogo from "../../../assets/img/userAvatar/user.jpg"

const CurrentUser = () => {
  const currentUser = useSelector(state => state.user.data.response)
  return (
    <div className="px-2 flex justify-center items-center">
      <div className="avatarUser px-3">
        <img className='w-10 object-cover rounded-full h-10 border-2 shadow-md border-white ' src={currentUser?.avatar || userLogo} alt="avatar" />
      </div>
      <div className="flex flex-col">
        <span className="text-zinc-950 font-bold">Xin Chào, {currentUser?.name}</span>
        <span className="font-medium">Mã Tài Khoản: {"      "}
          {`${currentUser?.id.slice(0, 4)}`}
        </span>
      </div>
    </div>
  )
};

export default CurrentUser;
