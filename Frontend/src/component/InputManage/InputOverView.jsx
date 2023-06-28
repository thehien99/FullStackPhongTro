import React, { memo } from "react";

const InputOverView = ({ label, unit, value, setValue, name }) => {
  return (
    <div className="mt-10">
      <label className="font-bold" htmlFor="input-overview">{label}</label>
      <div className="flex">
        <input
          className={` ${unit
            ? 'rounded-s-lg'
            : 'rounded-md'} border w-full p-1 mt-1" type="text" name="" id="input-overview`}
          value={value}
          onChange={(e) => setValue((prev) => ({ ...prev, [name]: e.target.value }))}
        />
        {unit && <span className="border p-[5.2px] rounded-r-lg">{unit}</span>}
      </div>
    </div>
  )
};

export default memo(InputOverView);
