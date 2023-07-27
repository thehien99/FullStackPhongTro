import React, { memo } from "react";

const SearchItem = ({ iconAfter, iconbefore, text, defaultText }) => {
  return (
    <div
      className="m-2 bg-white border border-danger rounded d-flex justify-content-between align-items-center p-2 w-[95%] text-[#777] "
    >
      <div className="search_items d-flex justify-center align-items-center">
        {iconAfter}
        <span className={`${text ? 'text-black font-medium' : ''}`} >
          {text || defaultText}
        </span>
      </div>
      {iconbefore}
    </div >
  );
};

export default memo(SearchItem);
