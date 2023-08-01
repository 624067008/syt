import axios from 'axios'
import { ElMessage } from 'element-plus'
import useUserStore from '@/store/modules/user'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

request.interceptors.request.use((config) => {
  const userStore = useUserStore()

  if (userStore.token.length > 0) {
    config.headers.token = userStore.token
  }

  return config
})

request.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    let status = error.response?.status

    console.log(error.response)

    if (status < 200 || status >= 300) {
      ElMessage({
        type: 'error',
        message: error.message
      })

      return Promise.reject(new Error(error.message))
    }
  }
)

export default request
