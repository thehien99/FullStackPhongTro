export const InPutAddress = ({ label, value, direction, editPhone }) => {
  return (
    <div className={`flex ${direction ? direction : "flex-col gap-2"} font-bold mt-3`}>
      <label className="w-48 flex-none" htmlFor="address-Exactly">{label}</label>
      <div className="flex-auto">
        <input type="text"
          id="address-Exactly"
          readOnly
          className="border border-gray-400 w-full bg-gray-300 p-2 mt-2 rounded-md"
          value={value || ""}
        />
        {editPhone && <small className="font-normal text-blue-500 cursor-pointer">Đổi số điện thoại</small>}
      </div>
    </div>
  )
}