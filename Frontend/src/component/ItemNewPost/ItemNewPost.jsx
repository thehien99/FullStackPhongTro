import React, { memo } from "react";
import moment from "moment";
import "moment/locale/vi";

const ItemNewPost = ({ title, time, price, image }) => {
  const formatTime = (time) => {
    return moment(time).fromNow()
  }
  return (
    <div className=" w-full flex items-center gap-2 py-2 border-b border-gray-300">
      <img
        className="w-[65px] h-[65px] object-cover flex-none rounded-md"
        src={image[0]}
        alt="anh"
      />
      <div className="w-full flex-auto flex flex-col justify-between gap-1">
        <span className=" text-blue-600 text-[14px]">{`${title?.slice(0, 40)}...`}</span>
        <div className=" flex items-center justify-between w-full">
          <span className="text-sm font-medium text-green-500">{price}</span>
          <span className="text-sm text-gray-300">{formatTime(time)}</span>
        </div>
      </div>
    </div >
  )
};

export default memo(ItemNewPost);
