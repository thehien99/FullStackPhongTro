import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { postLimit } from "../../../redux/actions/postActions";
import { useDispatch, useSelector } from "react-redux";
import SilderSlick from "../../SilderSlick/SilederSlick"
import icons from "../../../utils/icons";
import Map from "../../Map/Map";
import { underMap } from "../../../utils/LocationItem";
import BoxInfo from "../../BoxInfo/BoxInfo";
import NewPost from "../../NewPost/NewPost";
import { useNavigate, createSearchParams } from "react-router-dom"
import configRouter from "../../../configRouter";

const { GrStar, MdLocationOn, GiMoneyStack, FaCreativeCommonsSampling, BsClockHistory, CiHashtag } = icons

const ProductDetail = () => {
  const navigate = useNavigate()
  const handleStar = (star) => {
    const stars = []
    for (let i = 1; i <= +star; i++) stars.push(<GrStar color="rgba(245, 199, 39, 0.8)" />)
    return stars
  }
  const { postId } = useParams()
  const post = useSelector(state => state.post?.data?.data?.response?.rows)
  const dispatch = useDispatch()
  useEffect(() => {
    postId && dispatch(postLimit({ id: postId }))
  }, [postId])

  const handleParamsLabel = () => {
    const titleTextSearch = `Tìm kiếm tin đăng cho chuyên mục ${post[0]?.labels?.value}`
    navigate({
      pathname: `/${configRouter.seacrh}`,
      search: createSearchParams({ labelCode: post[0]?.labels?.code }).toString()
    }, { state: { titleTextSearch } })
  }
  return (
    <div className="w-full h-full flex gap-4 mt-7">
      <div className="w-3/5 bg-[#fff] border rounded-md border-[#dedede]">
        <SilderSlick
          image={post?.length > 0 && JSON.parse(post[0]?.images?.image)}
        />
        <div>
          <header className="ps-4">
            <h4 className="flex">
              <span className="flex">
                {post?.length > 0 && handleStar(+post[0]?.star)?.map((star, index) => {
                  return (
                    <span key={index}>{star}</span>
                  )
                })}
              </span>
              <div>
                <Link to="/" className="text-danger no-underline text-center">{post?.length > 0 && post[0]?.title}</Link>
              </div>
            </h4>
            <p className="mt-7">
              Chuyên mục:
              <span
                className="ms-1 cursor-pointer underline text-blue-600"
                onClick={handleParamsLabel}
              >
                {post?.length > 0 && post[0]?.labels?.value}
              </span>
            </p>
            <address className="flex items-center font-medium mt-3">
              <MdLocationOn className="me-1" color="blue" /> Địa chỉ:{post?.length > 0 && post[0]?.address}
            </address>
            <div className="flex" >
              <div className="flex items-center  text-2xl font-bold text-green-500">
                <i className="me-1"><GiMoneyStack color="#ccc" /></i>
                {post?.length > 0 && post[0]?.attributes?.price}
              </div>
              <div className="flex items-center ms-12 ">
                <i className="me-1"><FaCreativeCommonsSampling /></i>
                {post?.length > 0 && post[0]?.attributes?.acreage}
              </div>
              <div className="flex items-center ms-12 ">
                <i className="me-1"><BsClockHistory /></i>
                {post?.length > 0 && post[0]?.attributes?.published}
              </div>
              <div className="flex items-center ms-12 ">
                <i className="me-1"><CiHashtag /></i>
                {post?.length > 0 && post[0]?.attributes?.hashtag}
              </div>
            </div>
          </header>
          <section className="mt-7 ps-4">
            <div>
              <h4>Thông tin mô tả:</h4>
              <div className="mt-2 p-2 flex flex-col gap-2">
                {post?.length > 0 && ((JSON.parse(post[0]?.description)))?.map((item) => {
                  return (
                    <span>{item}</span>
                  )
                })}
              </div>
            </div>
          </section>
          <section className="mt-7 ps-4">
            <div>
              <h4>Đặc điểm tin đăng</h4>
            </div>
            <div>
              <table class="table">
                <tbody>
                  <tr>
                    <td>Mã tin:</td>
                    <td>#{post?.length > 0 && post[0]?.attributes?.hashtag}</td>
                  </tr>
                  <tr>
                    <td>Khu vực</td>
                    <td>{post?.length > 0 && post[0]?.overviews?.area}</td>
                  </tr>
                  <tr>
                    <td>Loại tin rao:</td>
                    <td>{post?.length > 0 && post[0]?.overviews?.type}</td>
                  </tr>
                  <tr>
                    <td>Đối tượng thuê:</td>
                    <td>{post?.length > 0 && post[0]?.overviews?.target}</td>
                  </tr>
                  <tr>
                    <td>Gói tin:</td>
                    <td>
                      <span>{post?.length > 0 && post[0]?.overviews?.bonus}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ngày đăng:</td>
                    <td>
                      <time title={post?.length > 0 && post[0]?.overviews?.created}>{post?.length > 0 && post[0]?.overviews?.created}</time>
                    </td>
                  </tr>
                  <tr>
                    <td>Ngày hết hạn:</td>
                    <td>
                      <time title={post?.length > 0 && post[0]?.overviews?.expired}>{post?.length > 0 && post[0]?.overviews?.expired}</time>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section >
          <section className="mt-7 ps-4">
            <div class="section-header">
              <h3 class="section-title">Thông tin liên hệ</h3>
            </div>
            <div class="section-content">
              <table class="table">
                <tbody>
                  <tr>
                    <td className="w-[33%]">Liên hệ:</td>
                    <td>{post?.length > 0 && post[0]?.sellers?.name}(*)</td>
                  </tr>
                  <tr>
                    <td>Điện thoại:</td>
                    <td>{post?.length > 0 && post[0]?.sellers?.phone}</td>
                  </tr>
                  <tr>
                    <td>Zalo</td>
                    <td> {post?.length > 0 && post[0]?.sellers?.zalo} </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
          <section className="mt-7 ps-4">
            <div>
              <h3>Bản đồ</h3>
              <address>{post?.length > 0 && post[0]?.address}</address>
            </div>
            {
              post && <div>
                <Map address={post?.length > 0 && post[0]?.address} />
                <p className="text-sm text-gray-500 py-4 pe-4 text-justify">{`${underMap[0]} ${post[0]?.title}${underMap[1]}`}</p>
              </div>
            }
          </section>

        </div >
      </div>
      <div className="w-1/4 ">
        <BoxInfo userData={post?.length > 0 && post[0]?.sellers} />
        <NewPost newpost />
        <NewPost />
      </div>
    </div>
  )
};

export default ProductDetail;
