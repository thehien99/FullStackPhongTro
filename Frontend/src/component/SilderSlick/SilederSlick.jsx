import React, { memo } from "react";
import Slider from "react-slick";


const SilderSlick = ({ image }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <div className="w-full">
      <Slider {...settings}>
        {image?.length > 0 && image?.map((item, index) => {
          return (
            <div key={index} className="h-[320px] bg-black flex justify-center px-12">
              <img
                className="object-contain m-auto h-full"
                src={item}
                alt="slider"
              />
            </div>
          )
        })}
      </Slider>
    </div>
  );
}
export default memo(SilderSlick);
