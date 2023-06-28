import axios from "axios";
import { URL } from "../API/urlApi";

const appAxios = axios.create({
  baseURL: URL,
})
// Thêm một bộ đón chặn request
appAxios.interceptors.request.use(
  function (config) {
    // Làm gì đó trước khi request dược gửi đi
    let token = window.localStorage.getItem('persist:auth') && JSON.parse(window.localStorage.getItem('persist:auth'))?.token?.slice(1, -1)
    config.headers = {
      authorization: token ? `Bearer ${token}` : null
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

appAxios.interceptors.response.use(function (response) {
  // refeshtoken
  return response.data;
}, function (error) {
  // Bất kì mã trạng thái nào lọt ra ngoài tầm 2xx đều khiến hàm này được trigger\
  // Làm gì đó với lỗi response
  return Promise.reject(error);
});

export default appAxios;