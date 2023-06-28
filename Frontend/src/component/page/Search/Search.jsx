import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchItem from "./SearchItem";
import icons from "../../../utils/icons";
import Modal from "../../Modal/Modal";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import configRouter from "../../../configRouter";

const {
   ImLocation,
   GrFormNext,
   MdOutlineMapsHomeWork,
   GrMoney,
   RiCrop2Line,
   RiDeleteBack2Line,
   GrSearch,
} = icons;

const Search = () => {
   const [isShowModal, setIsShowModal] = useState(false)
   const [content, setContent] = useState([])
   const [name, setName] = useState('')
   const [defaultText, setDefauText] = useState('')
   const [queries, setQueries] = useState({})
   const [arrMinMax, setArrMinMax] = useState({})
   const location = useLocation()
   useEffect(() => {
      if (!location?.pathname.includes(configRouter.seacrh)) {
         setArrMinMax({})
         setQueries({})
      }
   }, [location])
   const dataHome = useSelector((state) => state.category.categoryData.response)
   const Price = useSelector((state) => state.price.dataPrice)
   const Acrea = useSelector((state) => state.acrea.data)
   const dataProVince = useSelector(state => state.post.province.data)
   const navigate = useNavigate()

   const handleSubmitModal = useCallback((e, query, arrMaxMin) => {
      e.stopPropagation()
      setQueries(prev => ({ ...prev, ...query }))
      setIsShowModal(false)
      arrMaxMin && setArrMinMax(prev => ({ ...prev, ...arrMaxMin }))
   }, [queries, isShowModal])

   const handleIsShowModal = (content, name, defaultText) => {
      setDefauText(defaultText)
      setContent(content)
      setName(name)
      setIsShowModal(true)
   }

   const handleSearch = () => {
      let convertGetCode = Object.entries(queries).filter(item => item[0].includes('Number')).filter(item => item[1])
      let convertArrtoObj = Object.fromEntries(convertGetCode)
      let queryTextArr = Object.entries(queries).filter(item => !item[0].includes('Number'))
      let queryTextObj = Object.fromEntries(queryTextArr)
      let titleTextSearch = `${queryTextObj.category ? queryTextObj.category : 'Cho thuê'} 
        ${queryTextObj.province ? queryTextObj.province : ''} 
        Giá ${queryTextObj.price ? queryTextObj.price : ''}, 
        Diện tích ${queryTextObj.area ? queryTextObj.area : ''} `
      navigate({
         pathname: configRouter.seacrh,
         search: createSearchParams(convertArrtoObj).toString()
      }, { state: { titleTextSearch } })
   }
   return (
      <>
         <div className="container p-[10px] my-3 bg-[#febb02] rounded-lg  flex items-center justify-evenly cursor-pointer ">
            <span onClick={() => handleIsShowModal(dataHome, 'category', 'Tìm tất cả')}>
               <SearchItem
                  text={queries.category}
                  iconAfter={<MdOutlineMapsHomeWork />}
                  iconbefore={<RiDeleteBack2Line />}
                  defaultText="Tìm tất cả"
               />
            </span>
            <span onClick={() => handleIsShowModal(dataProVince, 'province', 'Toàn quốc')}>
               <SearchItem
                  text={queries.province}
                  iconAfter={<ImLocation />}
                  iconbefore={<GrFormNext />}
                  defaultText="Toàn quốc"
               />
            </span>
            <span onClick={() => handleIsShowModal(Price, "price", "Chọn Giá")}>
               <SearchItem
                  text={queries.price}
                  iconbefore={<GrFormNext />}
                  iconAfter={<GrMoney />}
                  defaultText="Chọn Giá"
               />
            </span>
            <span onClick={() => handleIsShowModal(Acrea, "area", "Chọn Diện Tích")}>
               <SearchItem
                  text={queries.area}
                  iconAfter={<RiCrop2Line />}
                  iconbefore={<GrFormNext />}
                  defaultText="Chọn Diện Tích"
               />
            </span>
            <button
               className="btn_search"
               style={{
                  padding: '5px',
                  backgroundColor: "lightskyblue",
                  borderRadius: "5px",
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
               }}
               onClick={handleSearch}
            >
               <GrSearch style={{ marginBottom: "2px" }} />
               Tìm Kiếm
            </button>
         </div>
         {isShowModal && <Modal
            content={content}
            name={name}
            queries={queries}
            arrMinMax={arrMinMax}
            setIsShowModal={setIsShowModal}
            handleSubmitModal={handleSubmitModal}
            defaultText={defaultText}
         />
         }
      </>
   );
};

export default Search;