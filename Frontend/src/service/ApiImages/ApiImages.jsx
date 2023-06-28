import axios from "axios";

const ApiImages = (images) => new Promise(async (resolve, reject) => {
  try {
    const res = await axios({
      method: 'post',
      url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
      data: images
    })
    resolve(res)
  } catch (error) {
    reject(error)
  }
})

export default ApiImages;
