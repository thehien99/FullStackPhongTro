import { useSearchParams } from "react-router-dom";
import Item from "../Item/Item";
import Pagination from "../Pagination/pagination";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { postLimit } from "../../redux/actions/postActions";

const List = ({ categoryCode }) => {
   const post = useSelector((state) => state.post.data.data?.response?.rows)
   const count = useSelector((state) => state.post.data.data?.response?.count)
   const [sort, setSort] = useState(0)
   const [searchParams] = useSearchParams();
   const dispatch = useDispatch()
   const listScrollRef = useRef()
   useEffect(() => {
      let params = []
      for (let entry of searchParams.entries()) {
         params.push(entry)
      }
      let searchParamsObject = {}
      params?.forEach(i => {
         if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
            searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
         } else {
            searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
         }
      })
      if (categoryCode) searchParamsObject.categoryCode = categoryCode
      if (sort === 1) searchParamsObject.order = ["createdAt", "DESC"]
      dispatch(postLimit(searchParamsObject))
      listScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
   }, [searchParams, categoryCode, sort]);
   return (
      <div ref={listScrollRef} className="border border-solid border-[#dedede] rounded-md w-full">
         <div div className="ms-3 mt-3 mb-4">
            <h4> Danh Sách Tin Đăng</h4>
         </div>
         <div className="ms-3">
            <span>Sắp xếp:</span>
            <span onClick={() => setSort(0)} className={`ms-2 font-normal border border-[#dedede] rounded-md p-1 cursor-pointer ${sort === 0 && "underline bg-red-600 text-white"} `}>
               Mặc Định
            </span>
            <span onClick={() => setSort(1)} className={` ms-1 font-normal border border-[#dedede] rounded-md p-1 cursor-pointer  ${sort === 1 && "underline bg-red-600 text-white"}`}> Mới Nhất</span>
         </div >
         <div className="w-full mt-4">
            {post?.length > 0 &&
               post.map((item) => {
                  return (
                     <Item
                        key={item.id}
                        title={item?.title}
                        star={+item?.star}
                        address={item?.address}
                        description={JSON.parse(item?.description)}
                        image={JSON.parse(item?.images?.image)}
                        attributes={item?.attributes}
                        sellers={item?.sellers}
                        id={item.id}
                     />
                  );
               })}
         </div>
         <div>
            <Pagination
               count={count}
               post={post}
            />
         </div>
      </div >
   );
};

export default List;
