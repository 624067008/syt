import { defineStore } from 'pinia'
import { reqUserCode, reqUserLogin, reqGetLoginParams } from '@/api/user/index'
import { ILoginData } from '@/api/user/type'
import { UserState } from '../interface'

const useUserStore = defineStore('userStore', {
  state: (): UserState => {
    return {
      isLogin: localStorage.getItem('SYT_TOKEN')?.length ? true : false,
      show: false, // 展示登录组件
      code: '',
      token: JSON.parse(localStorage.getItem('SYT_TOKEN')!) || '',
      name: JSON.parse(localStorage.getItem('SYT_NAME')!) || ''
    }
  },
  actions: {
    toggleShow() {
      this.show = !this.show
    },
    async getCode(phone: string) {
      const { data, code } = await reqUserCode(phone)
      if (code === 200) {
        this.code = data

        return 'OK'
      } else {
        return Promise.reject(new Error('获取验证码失败'))
      }
    },
    async login(pdata: ILoginData) {
      const { data, code } = await reqUserLogin(pdata)

      if (code === 200) {
        this.isLogin = true
        this.token = data.token
        this.name = data.name
        this.show = false

        localStorage.setItem('SYT_NAME', JSON.stringify(data.name))
        localStorage.setItem('SYT_TOKEN', JSON.stringify(data.token))

        return 'OK'
      } else {
        return Promise.reject(new Error('登录失败'))
      }
    },
    logout() {
      localStorage.removeItem('SYT_NAME')
      localStorage.removeItem('SYT_TOKEN')

      this.token = ''
      this.name = ''
      this.isLogin = false
    },
    async getWxLoginParams(redirectUrl: string) {
      const { data, code } = await reqGetLoginParams(redirectUrl)

      if (code === 200) {
        return data
      }
    }
  },
  getters: {}
})

export default useUserStore
