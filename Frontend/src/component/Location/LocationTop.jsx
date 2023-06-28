import React, { memo } from 'react'

const LocationTop = ({ name, image }) => {
  return (
    <div className='col-md-2 ms-2 text-center'>
      <img
        className='location_img'
        style={{ borderRadius: '0px', width: '190px', height: '50%', margin: '10px', border: '10px' }}
        src={image}
        alt={name}
      />
      <span>{name}</span>
    </div>
  )
}

export default memo(LocationTop)