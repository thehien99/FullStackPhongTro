import React from "react";
import { ContactUntils } from "../ContactUntils/ContactUntils";
import { ContactInPut } from "../ContactUntils/ContactInPut";

const ContactManage = () => {
  return (
    <div className="mt-3 w-full h-full">
      <h4 className="mb-10">Liên Hệ Với Chúng Tôi</h4>
      <div className="flex justify-center items-center">
        <ContactUntils />
        <ContactInPut />
      </div>
    </div>
  )
};

export default ContactManage;
