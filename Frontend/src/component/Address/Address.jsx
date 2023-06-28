import React, { memo, useEffect, useState } from "react";
import Select from "../SelectManage/Select";
import { apiDistrics, apiProvince, apiWard } from "../../service/ApiProvince/ApiProvince";
import { InPutAddress } from "../InputManage/InputAddress";

const Address = ({ setPayload }) => {
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])
  const [province, setProvince] = useState()
  const [district, setDistrict] = useState()
  const [ward, setWard] = useState()
  const [resret, setReset] = useState(false)
  useEffect(() => {
    const fecthProvice = async () => {
      const response = await apiProvince()
      if (response.status === 200) setProvinces(response.data.results)
    }
    fecthProvice()
  }, [])

  useEffect(() => {
    setDistrict(null)
    const fetchDistrict = async () => {
      const response = await apiDistrics(province)
      if (response?.status === 200) setDistricts(response?.data?.results)
    }
    province && fetchDistrict()
    !province ? setReset(true) : setReset(false)
    !province && setDistricts([])
  }, [province])

  useEffect(() => {
    setWard(null)
    const fetchWard = async () => {
      const response = await apiWard(district)
      if (response?.status === 200) setWards(response?.data?.results)
    }
    district && fetchWard()
    !district ? setReset(true) : setReset(false)
    !district && setWards([])
  }, [district])

  useEffect(() => {
    setPayload(prev => ({
      ...prev,
      address: ` ${ward ? `${wards.find(item => item.ward_id === ward)?.ward_name},` : ''} ${district
        ? `${districts.find(item => item.district_id === district)?.district_name},`
        : ""}${province
          ? `${provinces.find(item => item?.province_id === province)?.province_name}` :
          ""}`,
      province: `${provinces.find(item => item?.province_id === province)?.province_name}`
    }))
  }, [province, district, ward])
  return (
    <div>
      <h2>Địa Chỉ Cho Thuê</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 ">
          <Select type='province' value={province} setValue={setProvince} options={provinces} label={'Tỉnh/Thành phố'} />
          <Select resret={resret} type='district' value={district} setValue={setDistrict} options={districts} label={'Quận/Huyện'} />
          <Select resret={resret} type='ward' value={ward} setValue={setWard} options={wards} label={'Phường/Xã/Huyện'} />
        </div>
        <div className="w-[90%]">
          <InPutAddress
            label={'Địa Chỉ Chính Xác'}
            value={
              ` ${ward ? `${wards.find(item => item.ward_id === ward)?.ward_name},` : ''} ${district
                ? `${districts.find(item => item.district_id === district)?.district_name},`
                : ""}${province
                  ? `${provinces.find(item => item?.province_id === province)?.province_name}` :
                  ""}`
            }
          />
        </div>
      </div>

    </div>
  );
};

export default memo(Address);
