import { Link } from "react-router-dom"
import icons from "../../utils/icons"
import '../Item/Item.css'
import { memo, useState } from "react"
import { formatVietnameseToString } from "../../utils/formatVietnameseToString"

const indexs = [0]
const { GrStar, AiOutlineHeart, AiFillHeart } = icons

const Item = ({ image, title, star, address, description, attributes, sellers, id }) => {
  const [isHover, setHover] = useState(false)
  const handleStar = (star) => {
    const stars = []
    for (let i = 1; i <= +star; i++) stars.push(<GrStar color="rgba(245, 199, 39, 0.8)" />)
    return stars
  }
  return (
    <div className="row mt-5 mb-2 ms-3">
      <Link
        to={`chi-tiet/${formatVietnameseToString(title)}/${id}`}
        className="image_item col-5 d-flex flex-wrap" style={{ width: '280px', height: '266px' }}>
        {
          image.length > 0 && image.filter((i, index) => indexs.some(i => i === index))?.map((i, index) => {
            return (
              <img key={index} src={i} alt="/" style={{ borderRadius: '10px', objectFit: 'cover', margin: '5px 2px', width: '100%', height: '100%' }} />
            )
          })
        }

        <span className="image_quantity">{`${image.length}`} ảnh </span>
        <span className="icon_heart"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {isHover ? <AiFillHeart size={'24px'} color={'red'} /> : <AiOutlineHeart size={'24px'} />
          }
        </span>
      </Link>
      <div className="content_item col-7">
        <div className="content_star">
          <Link to="/" className="text-decoration-none text-danger">
            <span style={{ display: "flex" }}>
              {handleStar(+star).length > 0 && handleStar(+star).map((star, index) => {
                return (
                  <span key={index}>{star}</span>
                )
              })}
            </span>
            {title}
          </Link>
        </div>
        <div className="content_detail mt-2 d-flex justify-content-between">
          <span className="price" style={{ color: 'green', fontWeight: '500', width: '50%' }}>
            {attributes.price}
          </span>
          <span className="perimeter" style={{ width: '28%' }}>{attributes.acreage}</span>
          <span className="location" >{address}</span>
          <time></time>
        </div>
        <div className="content_info mt-3">
          <p className="info" style={{ color: '#8a8d91', fontSize: '15px' }}>{description}</p>
        </div>
        <div className="user_contact d-flex justify-content-between ">
          <div>
            <img style={{ borderRadius: '50%', objectFit: 'cover', width: '50px' }} src={sellers.avatar} alt="" />
            <span className="user_name" style={{ color: '#8a8d91' }}>{sellers.name}</span>
          </div>
          <div className="me-4">
            <span className="user_phone me-2" style={{ border: '1px solid blue', backgroundColor: 'blue', color: '#fff', padding: '2px 5px', borderRadius: '10px' }}>Gọi {sellers.phone}</span>
            <span className="user_zalo" style={{ border: '1px solid blue', color: 'blue', padding: '2px 5px', borderRadius: '10px' }}>{sellers.zalo}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Item)