export const InPutAddress = ({ label, value }) => {
  return (
    <div className="flex flex-col font-bold mt-3">
      <label htmlFor="address-Exactly">{label}</label>
      <input type="text"
        id="address-Exactly"
        readOnly
        className="border border-gray-400 w-full bg-gray-300 p-2 mt-2 rounded-md"
        value={value || ""} />
    </div>
  )
}