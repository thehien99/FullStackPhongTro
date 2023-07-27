import React from "react";
import memuSidebar from "../../utils/menuSideBar";
import { useDispatch, useSelector } from "react-redux";
import avatarUser from "../../assets/img/userAvatar/user.jpg"
import { NavLink } from "react-router-dom";
import icons from "../../utils/icons";
import { logOut } from "../../redux/actions/authActions";

const isACtiveStyle = 'hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 mt-2 font-bold bg-gray-200 no-underline text-black '
const noActiveStyle = 'hover:bg-gray-200 flex rounded-md items-center gap-2 py-2 mt-2 cursor-pointer no-underline text-black'
const { AiOutlineLogout } = icons
const SideBar = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user.data.response)
  return (
    <div className="w-[256px] px-2 mt-3">
      <div className="flex ">
        <img className="w-12 me-3 rounded-full" src={currentUser?.avatar || avatarUser} alt="avatar" />
        <div className="flex flex-col">
          <small className="font-medium">{currentUser?.name}</small>
          <small>{currentUser?.phone}</small>
        </div>
      </div>
      <div className="flex flex-col py-2">
        <span className="font-medium">{`Mã thành viên: ${currentUser?.id.match(/\d/g).join('')?.slice(0, 6)}`}</span>
        <span></span>
      </div>
      <div className="mt-4" >
        {memuSidebar?.map((item) => {
          return (
            <NavLink className={({ isActive }) => isActive ? isACtiveStyle : noActiveStyle} key={item.id} to={item.path}>
              {item.icon}
              <span className="px-2 ">
                {item.text}
              </span>
            </NavLink>
          )
        })}
        <span className={noActiveStyle} onClick={() => dispatch(logOut)}>
          <AiOutlineLogout />
          <small className="px-2">Thoát</small>
        </span>
      </div>
    </div>
  )
};

export default SideBar;
