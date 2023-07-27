import React, { useEffect } from "react";
import ItemNewPost from "../ItemNewPost/ItemNewPost";
import { useDispatch, useSelector } from "react-redux"
import { getAllNewPost } from "../../redux/actions/postActions";

const NewPost = ({ newpost }) => {
  const dispatch = useDispatch()
  const newPost = useSelector(state => state.post.newpost.dataNewPost)
  useEffect(() => {
    dispatch(getAllNewPost)
  }, [])
  return (
    <div className="w-full bg-white rounded-md p-4 border-2 mt-3 border-solid">
      <h3 className="font-semibold text-lg mb-4">{newpost ? 'Tin mới đăng' : 'Tin nổi bật'}</h3>
      <div className="w-full flex flex-col gap-2">
        {newPost?.map((item) => {
          return (
            <ItemNewPost
              key={item.id}
              title={item?.title}
              price={item?.attributes?.price}
              time={item?.createdAt}
              image={JSON.parse(item?.images?.image)}
              id={item?.id}
              newpost={newpost}
            />
          );
        })}
      </div>
    </div>
  )
};

export default NewPost;
