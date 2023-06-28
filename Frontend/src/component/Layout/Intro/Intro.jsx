import React, { memo } from "react";
import { dataIntro } from "../../../utils/dataIntro";
import icons from '../../../utils/icons'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatVietnameseToString } from "../../../utils/formatVietnameseToString";
const { GrStar } = icons
const star = [1, 2, 3, 4, 5]
const Intro = () => {
  const cateData = useSelector((state) => state.category.categoryData.response)

  return (
    <div className="text-center container bg-white shadow-2xl rounded-md " style={{ border: '1px solid #dedede' }}>
      <div className="title mt-1">
        <h1>{dataIntro.title}</h1>
      </div>
      <div className="content">
        <span>
          {dataIntro.content}
          {cateData?.map((item) => {
            return (
              <Link
                to={`/${formatVietnameseToString(item.value)}`}
                key={item.code}
                className="ms-1">
                {item.value},
              </Link>
            )
          })}
          {dataIntro.content2}
        </span>
      </div>
      <div className="flex mt-3 justify-content-center acess">
        {dataIntro.detail.map((item, index) => {
          return (
            <div key={index} className="ms-3">
              <h4>{item.info}</h4>
              <p>{item.quantity}</p>
            </div>
          )
        })}
      </div>
      <div className="price">
        <h4>{dataIntro.price}</h4>
      </div>
      <div className="star flex justify-content-center" style={{ color: 'yellow', fontSize: '30px' }}>
        {star.map((item) => {
          return (
            <span key={item}>
              <GrStar />
            </span>
          )
        })}
      </div>
      <div className="comment mt-3">
        <span>{dataIntro.comment}</span>
      </div>
      <div className="author mt-3">
        {dataIntro.author}
      </div>
      <div className="question mt-3 fw-bold">
        {dataIntro.question}
      </div>
      <div className="answer mt-3">
        {dataIntro.answer}
      </div>
      <button className="bg-danger p-2 mt-3 text-white fw-bold">
        Đăng tin ngay
      </button>
      <div style={{ height: '50px' }}></div>
    </div>
  )
};

export default memo(Intro);
