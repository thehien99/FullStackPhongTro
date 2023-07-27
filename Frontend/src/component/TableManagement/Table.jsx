import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPost, getPostAdminLimit } from "../../redux/actions/postActions";
import ButtonFrom from "../InputForm/ButtonFrom";
import UpdatePost from "../UpdatePost/updatePost";
import { deletePost } from "../../service/Post/post";
import Swal from "sweetalert2";
import { checkDateTime } from "../../utils/checkExpireTime";

const Table = ({ post, table }) => {
  const [updateData, setUpdateData] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const dataEdit = useSelector(state => state.post.postEdit)
  const dispatch = useDispatch();
  useEffect(() => {
    !dataEdit && dispatch(getPostAdminLimit())
  }, [dataEdit, updateData])
  useEffect(() => {
    !dataEdit && setIsEdit(false)
  }, [dataEdit])
  const handleDeletePost = async (postId) => {
    const response = await deletePost(postId)
    if (response?.err === 0) {
      setUpdateData(prev => !prev)
    }
    else {
      Swal.fire('Oops!', 'Có lỗi', 'error')
    }
  }
  return (
    <div>
      <table className="w-full h-full">
        <tr className="flex items-center h-16">
          {table?.map((item) => {
            return (
              <th className="border flex-1 h-full flex justify-center items-center" key={item.value}>{item.value}</th>
            )
          })}
        </tr>
        {post?.map((item) => {
          return (
            <tr className="flex items-center h-16 bg-white" key={item.id}>
              <td className="border flex-1 h-full flex justify-center items-center">#{item?.overviews?.code}</td>
              <td className="border flex-1 h-full flex justify-center items-center">
                <img src={JSON.parse(item?.images?.image)[0] || ""} alt="" className="w-[60px] rounded-md object-cover " />
              </td>
              <td className="border flex-1 h-full flex justify-center items-center">{`${item?.title.slice(0, 20)}...`}</td>
              <td className="border flex-1 h-full flex justify-center items-center">{item?.attributes?.price}</td>
              <td className="border flex-1 h-full flex justify-center items-center">{item?.overviews?.created}</td>
              <td className="border flex-1 h-full flex justify-center items-center">{item?.overviews?.expired}</td>
              <td className="border flex-1 h-full flex justify-center items-center">
                {checkDateTime(item?.overviews?.expired?.split(",")[2]) ? "Đang hoạt động" : "Đã hết hạn"}
              </td>
              <td className="border flex-1 h-full flex justify-center items-center ">
                <ButtonFrom
                  text="Sửa" px="px-2" bgColor="bg-primary" textColor="text-white" magrin="me-2"
                  onClick={() => {
                    dispatch(editPost(item))
                    setIsEdit(true)
                  }}
                />
                <ButtonFrom
                  text="Xoá"
                  px="px-2"
                  textColor="text-white"
                  bgColor="bg-danger"
                  onClick={() => handleDeletePost(item.id)}
                />
              </td>
            </tr>
          )
        })}
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  )
};

export default Table;
