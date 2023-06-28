import React, { memo } from "react";

const SelectAddress = ({ label, options, value, setValue, type, resret, name }) => {
  return (
    <div className="flex flex-col  gap-2 mt-3">
      <label htmlFor="address" className="font-bold " >{label}</label>
      <select
        value={resret ? "" : value}
        onChange={(e) =>
          !name
            ? setValue(e.target.value)
            : setValue((prev) => ({ ...prev, [name]: e.target.value }))}
        className="border rounded-md border-gray-800 p-1 outline-none"
        id="address">
        <option>{`---Chọn ${label}---`}</option>
        {options?.map((item) => {
          return (
            <option
              key={type === "province"
                ? item?.province_id
                : type === "district"
                  ? item?.district_id
                  : type === 'ward'
                    ? item?.ward_id
                    : item?.code
              }
              value={type === "province"
                ? item?.province_id
                : type === "district"
                  ? item?.district_id
                  : type === 'ward'
                    ? item?.ward_id
                    : item?.value
              }
            >
              {type === "province"
                ? item.province_name
                : type === "district"
                  ? item?.district_name
                  : type === "ward"
                    ? item?.ward_name
                    : item?.value
              }
            </option>
          )
        })}
      </select>
    </div >
  )
};

export default memo(SelectAddress);
