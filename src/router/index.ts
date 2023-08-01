import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  // 设置路由模式
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      component: () => import('@/pages/home/index.vue'),
      meta: {
        title: '首页'
      }
    },
    {
      path: '/hospital',
      component: () => import('@/pages/hospital/index.vue'),
      redirect: '/hospital/register',
      children: [
        {
          path: 'register',
          component: () => import('@/pages/hospital/register/index.vue'),
          meta: {
            title: '预约挂号'
          }
        },
        {
          path: 'datenotice',
          component: () => import('@/pages/hospital/dateNotice/index.vue'),
          meta: {
            title: '预约通知'
          }
        },
        {
          path: 'detail',
          component: () => import('@/pages/hospital/detail/index.vue'),
          meta: {
            title: '医院详情'
          }
        },
        {
          path: 'message',
          component: () => import('@/pages/hospital/message/index.vue'),
          meta: {
            title: '停诊信息'
          }
        },
        {
          path: 'query',
          component: () => import('@/pages/hospital/query/index.vue'),
          meta: {
            title: '查询'
          }
        },
        {
          path: 'register_step1',
          component: () => import('@/pages/hospital/register/register_step1.vue'),
          meta: {
            title: '选择医师'
          }
        },
        {
          path: 'register_step2',
          component: () => import('@/pages/hospital/register/register_step2.vue'),
          meta: {
            title: '确定挂号'
          }
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/pages/user/index.vue'),
      children: [
        {
          path: 'certification',
          component: () => import('@/pages/user/certification/index.vue'),
          meta: {
            title: '实名认证'
          }
        },
        {
          path: 'order',
          component: () => import('@/pages/user/order/index.vue'),
          meta: {
            title: '订单'
          }
        },
        {
          path: 'patient',
          component: () => import('@/pages/user/patient/index.vue'),
          meta: {
            title: '就诊人'
          }
        },
        {
          path: 'profile',
          component: () => import('@/pages/user/profile/index.vue'),
          meta: {
            title: '账号信息'
          }
        },
        {
          path: 'feedback',
          component: () => import('@/pages/user/feedback/index.vue'),
          meta: {
            title: '反馈'
          }
        }
      ],
      redirect: '/user/certification'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/wxlogin',
      component: () => import('@/pages/login/index.vue')
    }
  ],
  scrollBehavior() {
    return {
      left: 0,
      top: 0
    }
  }
})
