import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react'
import { MdLocationOn } from "react-icons/md"
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = ({ address }) => {
  const [coor, setCoor] = useState(null)

  useEffect(() => {
    const getCoodr = async () => {
      const results = await geocodeByAddress(address)
      const latLng = await getLatLng(results[0])
      setCoor(latLng)
    }
    if (address) {
      getCoodr()
    }
    else {
      navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
        setCoor({ lat: latitude, lng: longitude })
      })
    }
  }, [address])
  return (
    <div className="w-full h-[300px] pe-3 relative">
      {address && <div className="bg-white shadow-md p-4 max-w-[300px] text-sm absolute z-10 top-5 left-5 ">
        {address}
      </div>}
      <GoogleMapReact
        bootstrapURLKeys={{ key: import.meta.env.VITE_MAP }}
        defaultCenter={coor}
        defaultZoom={11}
        center={coor}
      >
        <AnyReactComponent
          lat={coor?.lat}
          lng={coor?.lng}
          text={<MdLocationOn color="red" fontSize={40} />}
        />
      </GoogleMapReact>
    </div>
  )
};

export default Map;
