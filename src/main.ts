import { createApp } from 'vue'
import '@/style/index.scss'
import App from './App.vue'
import HospitalTop from '@/components/hospital_top/index.vue'
import HospitalBottom from '@/components/hospital_bottom/index.vue'
import Patient from '@/components/patient/index.vue'
import Login from '@/components/login/index.vue'
import router from '@/router'
import pinia from '@/store'
// 组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)

// 声明全局组件
app.component('HospitalTop', HospitalTop)
app.component('HospitalBottom', HospitalBottom)
app.component('Login', Login)
app.component('Patient', Patient)

app.use(router)
// 组件
app.use(ElementPlus, {
  locale: zhCn
})
// 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

import './permission'

app.use(pinia)

app.mount('#app')
