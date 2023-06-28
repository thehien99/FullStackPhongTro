import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import configRouter from "../../../configRouter/index";
import "../../page/userManage/userManage.css"
import appAxios from "../../../utils/api";
import { BsFillArrowLeftCircleFill } from "react-icons/bs"

const UserManage = () => {
  const [allUsers, setAllUsers] = useState([]);
  const fecthData = async (inputId) => {
    return await appAxios.get(`/api/alluser?id=${inputId}`)
  }
  //mount
  useEffect(() => {
    const getAllUser = async () => {
      const data = await fecthData('ALL');
      setAllUsers(data.users)
    }
    getAllUser()
  }, [])
  return (
    <div>
      <Link style={{ width: "200px", marginLeft: "15px", padding: "15px" }} className="nav-link" to={configRouter.home} >
        <BsFillArrowLeftCircleFill />
        HOME
      </Link>
      <table className="mt-4">
        <tr>
          <th>FIRTSNAME</th>
          <th>LASTNAME</th>
          <th>ADDRESS</th>
          <th>EMAIL</th>
        </tr>
        {allUsers && allUsers.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td> {item.address}</td>
              <td>{item.email}</td>
            </tr>
          )
        })}

      </table>
    </div >
  )
}

export default UserManage