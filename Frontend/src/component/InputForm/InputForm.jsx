import React, { memo } from "react";

const InputForm = ({ keyPayLoad, label, value, type, setValue, setInValids, invalids }) => {
  return (
    <div>
      <label htmlFor={keyPayLoad}>
        {label}
      </label>
      <input
        id={keyPayLoad}
        type={type || 'text'}
        className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
        value={value}
        onChange={(e) => setValue((prev) => ({ ...prev, [keyPayLoad]: e.target.value }))}
        onFocus={() => setInValids && setInValids([])}
      />
      {
        invalids?.some((i) => i.name === keyPayLoad) && (
          <small className="text-red-500 italic">
            {invalids.find((i) => i.name === keyPayLoad)?.msg}
          </small>
        )}
    </div>
  )
};

export default memo(InputForm);
