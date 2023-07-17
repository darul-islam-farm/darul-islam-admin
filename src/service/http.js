import axios from 'axios'
const baseURL = process.env.REACT_APP_URI
const instance = axios.create({
  baseURL,
  timeout: 15000
})

// Adding a request interceptor
// instance.interceptors.request.use(function (config) {
//   return {
//     ...config,
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('admin_token')}`
//     }
//   }
// })

// Common function to get acctual data from response
const responseBody = response => response.data

const requests = {
  get: url => instance.get(url).then(responseBody),
  post: (url, body) => instance.post(url, body).then(responseBody),
  patch: (url, body) => instance.patch(url, body).then(responseBody),
  delete: url => instance.delete(url).then(responseBody)
}

export default requests
