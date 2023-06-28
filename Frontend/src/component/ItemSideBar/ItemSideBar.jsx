import React, { memo } from "react";
import icons from "../../utils/icons";
import { Link, createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { formatVietnameseToString } from "../../utils/formatVietnameseToString";
const { GrFormNext } = icons

const ItemSideBar = ({ content, tilte, isDouble, type }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const formatContent = () => {
    const oddEl = content?.filter((item, index) => index % 2 !== 0)
    const evenEl = content?.filter((item, index) => index % 2 === 0)
    const formatContent = oddEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl?.find((item2, index2) => index2 === index)
      }
    })
    return formatContent
  }

  const handleFilterPost = (code) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({
        [type]: code
      }).toString()
    })
  }

  return (
    <div className="border-2 mb-4 border-solid p-4 rounded-md bg-white w-full">
      <p className="text-lg font-semibold mb-4">{tilte}</p>
      {!isDouble && <div className=" flex flex-col gap-2">
        {content?.length > 0 && content.map((item) => {
          return (
            <Link
              to={`${formatVietnameseToString(item.value)}`}
              key={item.code}
              className="flex gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed no-underline	text-black"
            >
              <GrFormNext size={10} color='#ccc' />
              <span> {item.value} </span>
            </Link>
          )
        })}
      </div>
      }
      {isDouble && <div className='flex flex-col gap-2'>
        {content?.length > 0 && formatContent(content).map((item, index) => {
          return (
            <div key={index} >
              <div className=' flex items-center justify-around'>
                <div
                  onClick={() => handleFilterPost(item.left.code)}
                  className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'
                >
                  <GrFormNext size={10} color='#ccc' />
                  <span>{item.left.value}</span>
                </div>
                <div
                  className='flex flex-1 gap-2 items-center cursor-pointer hover:text-orange-600 border-b border-gray-200 pb-1 border-dashed'
                  onClick={() => handleFilterPost(item.right.code)}
                >
                  <GrFormNext size={10} color='#ccc' />
                  <span>{item.right.value}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>}
    </div>
  )
};

export default memo(ItemSideBar)
