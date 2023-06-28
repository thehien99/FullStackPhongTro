import React, { memo } from "react";
import { dataContact } from "../../utils/dataContact";
const Contact = () => {
  return (
    <div className="container mt-3 text-center bg-white shadow-2xl rounded-md" style={{ border: '7px dashed #e8eefc' }}>
      <div className="contact-img">
        <img src={dataContact.img} alt="" style={{ width: '30%', marginLeft: 'auto', marginRight: 'auto' }} />
      </div>
      <div className="call text-center mt-3">
        {dataContact.call}
      </div>
      <div className="contact mt-3  flex justify-content-center">
        {dataContact.contact.map((item, index) => {
          return (
            <div key={index} className="me-5 text-center">
              <h4>{item.support}</h4>
              <p>{item.phone}</p>
              <p>{item.zalo}</p>
            </div>
          )
        })}
      </div>
      <button className="bg-danger p-2 mt-3 text-white fw-bold">
        Gửi Liên Hệ
      </button>
      <div style={{ height: '50px' }}></div>
    </div>
  )
};

export default memo(Contact);
