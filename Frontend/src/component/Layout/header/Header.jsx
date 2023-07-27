import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import ButtonFrom from "../../InputForm/ButtonFrom";
import configRouter from "../../../configRouter";
import { logOut } from "../../../redux/actions/authActions";
import CurrentUser from "./CurrentUser";
import menuManage from "../../../utils/menuManage";
import icons from "../../../utils/icons";

const { AiOutlineLogout, BsChevronDown, AiOutlinePlusCircle } = icons
const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isLogin = useSelector(state => state.auth.isLogin)
  const goLogin = useCallback((flag) => {
    navigate(configRouter.login, { state: { flag } })
  }, [])

  return (
    <div className="container h-16 ">
      <div className="flex justify-around align-items-center h-14">
        <Link to={"/"}>
          <img src="logo" alt="logo" />
        </Link>
        <div className=" flex items-center gap-2 ">
          {!isLogin && (
            <div className="flex items-centers gap-2">
              <small>Phongtro123.com xin chào !</small>
              <ButtonFrom
                text={'Đăng nhập'}
                textColor="text-white"
                bgColor="bg-blue-700"
                px='px-2'
                onClick={() => goLogin(false)}
              />
              <ButtonFrom
                text={'Đăng ký'}
                bgColor="bg-red-600"
                textColor="text-white"
                px='px-2'
                onClick={() => goLogin(true)}
              />
            </div>
          )}
          {isLogin && (<div className="flex items-center gap-3 relative">
            <CurrentUser />
            <ButtonFrom
              text={"Quản lý tài khoản"}
              textColor="text-white"
              bgColor="bg-blue-700"
              IcAfter={BsChevronDown}
              px="px-2"
              onClick={() => setIsShowMenu(prev => !prev)}
            />
            {isShowMenu && (
              <div className=" absolute top-full bg-slate-100 shadow-md rounded-md p-2 right-0 flex flex-col ">
                {menuManage?.map((item) => {
                  return (
                    <Link
                      className="no-underline hover:text-orange-500 flex items-center gap-2 text-blue-400 border-b border-gray-200 py-2"
                      key={item.id}
                      to={item.path}
                    >
                      {item.icon}
                      {item.text}
                    </Link>
                  )
                })}
                <span
                  className="cursor-pointer hover:text-orange-500 text-blue-400 py-2 flex items-center gap-2"
                  onClick={() => {
                    setIsShowMenu(false)
                    dispatch(logOut)
                  }}>
                  <AiOutlineLogout />
                  Đăng Xuất
                </span>
              </div>
            )}
          </div>
          )}
          <ButtonFrom
            text={"Đăng tin mới"}
            textColor="text-white"
            bgColor="bg-red-600"
            px='px-3'
            IcAfter={AiOutlinePlusCircle}
            onClick={() => navigate('/he-thong/tao-moi-bai-dang')}
          />

        </div>
      </div>
    </div>
  )
};

export default Header;
