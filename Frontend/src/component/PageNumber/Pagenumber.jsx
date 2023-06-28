import React, { memo } from "react";
import "../PageNumber/Pagenumber.css";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";


const Pagenumber = ({ text, currentNumber, icon, setCurrentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams()
  let entries = searchParams.entries()

  const append = (entries) => {
    let params = []
    searchParams.append('page', +text)
    for (let entry of entries) {
      params.push(entry)
    }
    let paramsObject = {}
    params?.forEach(i => {
      if (Object.keys(paramsObject)?.some(item => item === i[0] && item !== 'page')) {
        paramsObject[i[0]] = [...paramsObject[i[0]], i[1]]
      } else {
        paramsObject = { ...paramsObject, [i[0]]: [i[1]] }
      }
    })
    return paramsObject
  }
  const handleChangeNumber = () => {
    if (!(icon === '...')) {
      setCurrentPage(+text)
      navigate({
        pathname: location?.pathname,
        search: createSearchParams(append(entries)).toString(),
      });
    }
  };
  return (
    <div
      className={+text === +currentNumber ? ` ${"pageNumber"} ${icon === '...' ? 'cursor-text' : 'cursor-auto'}` : `${"notPage"} ${icon === '...' ? 'cursor-text' : 'cursor-pointer'}`}
      onClick={handleChangeNumber}
    >
      {icon || text}
    </div>
  );
};

export default memo(Pagenumber);
