// 路由鉴权
import router from './router/index'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import pinia from '@/store'
// @ts-ignore
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

Nprogress.configure({ showSpinner: false })

const userStore = useUserStore(pinia)

let unAuthList = [
  '/home',
  '/hospital/register',
  '/hospital/detail',
  '/hospital/datenotice',
  '/hospital/message',
  '/hospital/query'
]

router.beforeEach((to, from, next) => {
  Nprogress.start()

  if (userStore.token) {
    next()
  } else {
    if (unAuthList.includes(to.path)) {
      next()
    } else {
      next({ path: '/home', query: { redirect: to.fullPath } })

      userStore.show = true

      ElMessage({ type: 'error', message: '请先登录' })
    }
  }

  document.title = `E医通-${to.meta.title}`
})

router.afterEach((to, from) => {
  Nprogress.done()
})
