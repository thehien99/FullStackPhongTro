import React, { memo } from "react";

const InputOverView = ({ label, unit, value, setValue, name, invalids, setInValids, flex }) => {
  const handleValids = () => {
    let valid = invalids?.find(item => item.name === name)
    let validatefield = invalids?.find(item => item.name === "title")
    return `${validatefield ? validatefield.msg : ""}` || `${valid ? valid.msg : ''}`
  }
  return (
    <div className={`${flex ? flex : ""} mt-2`}>
      <label className="font-bold w-48" htmlFor="input-overview">{label}</label>
      <div className="flex-auto">
        <div className="flex">
          <input
            className={` ${unit
              ? 'rounded-s-lg'
              : 'rounded-md'} border w-full p-1 mt-1" type="text" name="" id="input-overview`
            }
            value={value}
            onChange={(e) => setValue((prev) => ({ ...prev, [name]: e.target.value }))}
            onFocus={() => setInValids && setInValids([])}
          />
          {unit && <span className="border p-[5.2px] rounded-r-lg">{unit}</span>}
        </div>
        {invalids && <small className="text-red-600">{handleValids()}</small>}
      </div>
    </div>
  )
};

export default memo(InputOverView);
