import { Link, useSearchParams } from "react-router-dom";
import "../ListProduct/List.css";
import Item from "../Item/Item";
import Pagination from "../Pagination/pagination";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux"
import { postLimit } from "../../redux/actions/postActions";

const List = ({ categoryCode }) => {
   const post = useSelector((state) => state.post.data.data?.response?.rows)
   const count = useSelector((state) => state.post.data.data?.response?.count)
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
      dispatch(postLimit(searchParamsObject))
      listScrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
   }, [searchParams, categoryCode]);

   return (
      <div ref={listScrollRef} className="list">
         <div div className="list_wrapper ms-3">
            <h4 className="list_title"> Danh Sách Tin Đăng</h4>
         </div>
         <div className="list_sort ms-3">
            <span>Sắp xếp:</span>
            <Link className="list_link" style={{ textDecoration: "underline" }}>
               Mặc Định
            </Link>
            <Link className="list_link">Mới Nhất</Link>
            <Link className="list_link">Có Video</Link>
         </div>
         <div className="list_item mt-4">
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
      </div>
   );
};

export default List;
