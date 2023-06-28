import React from "react";
import Navigation from "../Layout/Navigation/Navigation"
const Header = () => {
  return (
    <div className="w-full flex flex-none h-14">
      <div className="flex justify-center items-center font-bold bg-primary text-white w-[256px] flex-none">
        Phòng Trọ 123.com
      </div>
      <div className="flex-auto h-[40px]">
        <Navigation isAdmin={true} />
      </div>
    </div>
  )
};

export default Header;
