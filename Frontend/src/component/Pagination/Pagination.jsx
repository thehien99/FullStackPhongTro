import React, { useEffect, useState } from "react";
import Pagenumber from "../PageNumber/pagenumber";
import icons from "../../utils/icons";
import { useSearchParams } from "react-router-dom";

const { AiOutlineDoubleRight, AiOutlineDoubleLeft } = icons;
const limit = 5
const Pagination = ({ count, post }) => {
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideStart, setIsHideStart] = useState(false);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [searchParams] = useSearchParams()
  useEffect(() => {
    let page = searchParams.get('page')
    page && +page !== currentPage && setCurrentPage(+page)
    !page && setCurrentPage(1)
  }, [searchParams])

  useEffect(() => {
    const maxPage = Math.ceil(count / limit);
    const end = (currentPage + 1) > maxPage ? maxPage : (currentPage + 1)

    const start = (currentPage - 1) <= 0 ? 1 : (currentPage - 1);
    const temp = []
    for (let i = start; i <= end; i++) temp.push(i)
    setArrPage(temp)

    currentPage >= (maxPage - 1) ? setIsHideEnd(true) : setIsHideEnd(false)
    currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false)

  }, [count, post, currentPage]);

  return (
    <div className="flex justify-content-center p-4 gap-1 ">
      {!isHideStart && <Pagenumber icon={<AiOutlineDoubleLeft />} setCurrentPage={setCurrentPage} text={1} />}
      {!isHideStart && <Pagenumber icon={"..."} />}
      {arrPage.length > 0 &&
        arrPage.map((item) => {
          return <Pagenumber
            key={item}
            text={item}
            setCurrentPage={setCurrentPage}
            currentNumber={currentPage}
          />;
        })}
      {!isHideEnd && <Pagenumber icon={"..."} />}
      {!isHideEnd && <Pagenumber icon={<AiOutlineDoubleRight />} setCurrentPage={setCurrentPage} text={Math.ceil(count / limit)} />}
    </div>
  );
};

export default Pagination;
