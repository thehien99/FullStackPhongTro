import React, { useEffect, useState } from "react";
import icons from "../../utils/icons";
import { getNumbersPrice, getNumbersArea } from "../../utils/commonModalSeacrh";
import { memo } from "react";
const { GrLinkPrevious } = icons
const Modal = ({
  setIsShowModal,
  content,
  name,
  handleSubmitModal,
  queries,
  arrMinMax,
  defaultText
}) => {
  const [min, setMin] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[0]
      : name === "area" && arrMinMax?.areaArr
        ? arrMinMax?.areaArr[0]
        : 0)
  const [max, setMax] = useState(
    name === "price" && arrMinMax?.priceArr
      ? arrMinMax?.priceArr[1]
      : name === "area" && arrMinMax?.areaArr
        ? arrMinMax?.areaArr[1]
        : 100)

  const [activeEl, setActiveEL] = useState('')

  useEffect(() => {
    const thumb = document.getElementById('track-active')
    if (thumb) {
      if (max <= min) {
        thumb.style.left = `${max}%`
        thumb.style.right = `${100 - min}%`
      }
      else {
        thumb.style.left = `${min}%`
        thumb.style.right = `${100 - max}%`
      }
    }
  }, [min, max])


  const handleClickPosition = (e, value) => {
    const trackEle = document.getElementById('track')
    const trackPosition = trackEle.getBoundingClientRect()
    let persent = value ? value : Math.round((e.clientX - trackPosition.left) * 100 / trackPosition.width, 0)
    if (Math.abs(persent - min) <= (Math.abs(persent - max))) {
      setMin(persent)
    } else {
      setMax(persent)
    }
  }

  const convertMintoMax = (percent) => {
    return name === "price"
      ? (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10
      : name === "area"
        ? (Math.ceil(Math.round((percent * 0.9)) / 5) * 5)
        : 0
  }
  const convertto100 = (percent) => {
    let target = name === "price" ? 15 : name === "area" ? 90 : 1
    return Math.floor((percent / target) * 100)
  }

  const handleActive = (code, value) => {
    setActiveEL(code)
    let arrMaxMin = name === "price" ? getNumbersPrice(value) : getNumbersArea(value)
    if (arrMaxMin.length === 1) {
      if (arrMaxMin[0] === 1) {
        setMin(0)
        setMax(convertto100(1))
      }
      if (arrMaxMin[0] === 20) {
        setMin(0)
        setMax(convertto100(20))
      }
      if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
        setMin(100)
        setMax(100)
      }
    }
    if (arrMaxMin.length === 2) {
      setMin(convertto100(arrMaxMin[0]));
      setMax(convertto100(arrMaxMin[1]))
    }
  }

  const handleBeforeSubmit = (e) => {
    let percent1 = min <= max ? min : max;
    let percent2 = min <= max ? max : min;
    let arr = (min === max && min === 100) ? [convertMintoMax(percent1), 99999] : [convertMintoMax(percent1), convertMintoMax(percent2)]
    handleSubmitModal(e,
      {
        [`${name}Number`]: arr,
        [name]: `Từ ${convertMintoMax(percent1)}${(min === max && min === 100) ? "" : `-${convertMintoMax(percent2)}`} ${name === "price" ? 'Triệu' : 'm2'}${(min === max && min === 100) ? "Trở lên" : ""}`
      },
      {
        [`${name}Arr`]: [percent1, percent2]
      }
    )
  }
  return (
    <div onClick={(e) => { setIsShowModal(false) }}
      className="fixed z-20 bg-overlay-30 top-0 left-0 right-0 bottom-0 flex justify-center items-center "
    >
      <div onClick={(e) => {
        e.stopPropagation()
        setIsShowModal(true)
      }}
        className="w-2/3 bg-white rounded-md overflow-y-auto" >
        <div className="h-[45px] px-4 flex items-center border-b border-gray-200">
          <span className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation()
              setIsShowModal(false)
            }}>
            <GrLinkPrevious />
          </span>
          <hr />
        </div>
        {(name === "category" || name === "province") && (
          <div className="flex flex-col ps-2">
            <span className="p-2 cursor-pointer " style={{ borderBottom: "1px solid #ccc" }}>
              <input
                type="radio"
                name={name}
                id='default'
                value={defaultText || ''}
                checked={!queries[`${name}Code`] ? true : false}
                onChange={(e) => handleSubmitModal(e, { [name]: defaultText, [`${name}Code`]: null })} />
              <label htmlFor='default' className="ms-1">{defaultText}</label>
            </span>
            {content?.map(item => {
              return (
                <span className="p-2 cursor-pointer " style={{ borderBottom: "1px solid #ccc" }}>
                  <input
                    type="radio"
                    name={name}
                    id={item.code}
                    value={item.code}
                    checked={item.code === queries[`${name}Code`] ? true : false}
                    onChange={(e) => handleSubmitModal(e, { [name]: item.value, [`${name}Code`]: item.code })} />
                  <label htmlFor={item.code} className="ms-1">{item.value}</label>
                </span>
              )
            })}
          </div>
        )}
        {(name === "price" || name === "area") && (
          <div className=" flex flex-col">
            <div className="p-12 py-20 ">
              <div >
                <h2 className="text-center mb-5">
                  {(min === 100 && max === 100)
                    ? `Trên ${convertMintoMax(min)} ${name === "price" ? "Triệu" : "m2"}+`
                    : `Từ ${min <= max
                      ? convertMintoMax(min)
                      : convertMintoMax(max)
                    } - ${max >= min
                      ? convertMintoMax(max)
                      : convertMintoMax(min)
                    } ${name === "price"
                      ? "Triệu"
                      : "m2"
                    } `}
                </h2>
              </div>
              <div className="flex flex-col items-center justify-center relative">
                <div onClick={handleClickPosition} id="track" className="bg-gray-400 w-full p-1 h-[5px] absolute top-0 bottom-0 rounded-md cursor-pointer"></div>
                <div onClick={handleClickPosition} id="track-active" className="bg-orange-600 p-1 h-[5px] absolute top-0 bottom-0 right-0 rounded-md cursor-pointer"></div>
                <input
                  type="range"
                  step={.01}
                  min={0}
                  max={100}
                  value={min}
                  className="w-full absolute appearance-none pointer-events-none bottom-0 top-0 cursor-pointer  "
                  onChange={(e) => {
                    setMin(+e.target.value);
                    activeEl && setActiveEL('')
                  }}
                />
                <input
                  min={0}
                  max={100}
                  step={.01}
                  type="range"
                  value={max}
                  className="w-full absolute appearance-none pointer-events-none bottom-0 top-0 cursor-pointer  "
                  onChange={(e) => {
                    setMax(+e.target.value);
                    activeEl && setActiveEL('')
                  }}
                />
                <div className="absolute top-6 right-0 left-0 bottom-0 flex justify-between items-center">
                  <span
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleClickPosition(e, 0)
                    }}
                  >
                    0
                  </span>
                  <span className="cursor-pointer" onClick={(e) => {
                    e.stopPropagation()
                    handleClickPosition(e, 100)
                  }}>
                    {name === "price" ? ' 15 triệu +' : name === "area" ? 'Trên 90m2' : ''}
                  </span>
                </div>
              </div>
            </div>
            <h5 className="ms-4">Chọn Nhanh</h5>
            <div className="flex gap-4 items-center flex-wrap w-full ms-4 mt-4 ">
              {
                content?.map((item) => {
                  return (
                    <button
                      key={item.code}
                      onClick={() => handleActive(item.code, item.value)}
                      className={`text - black bg - gray - 300 p - 3 rounded - md cursor - pointer ${item.code === activeEl ? "bg-blue-400" : ""} `}>
                      {item.value}
                    </button>
                  )
                })
              }
            </div>
            {(name === "price" || name === "area") && <button
              onClick={handleBeforeSubmit}
              type="button"
              className="w-full bg-orange-400 mt-4 p-2 font-semibold"
            >
              Áp dụng
            </button>
            }
          </div>
        )}
      </div>
    </div >
  )
};

export default memo(Modal);
