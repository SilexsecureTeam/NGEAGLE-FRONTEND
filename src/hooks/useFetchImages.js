import { url } from '../axios'

// const fetchImages = (endpoint, imageName) => {
const fetchImages = (imageName) => {
  return `${url}${imageName}`
  // return `${url}/public/${endpoint}/${imageName}`
}

export default fetchImages
