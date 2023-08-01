<template>
  <div class="container">
    <div class="top">
      <div class="left" @click="goHome">
        <div class="logo">
          <img src="http://43.138.130.47/亚心少力.ico" alt="" />
        </div>
        <div class="title">EL医通 预约挂号统一平台</div>
      </div>
      <div class="right">
        <div class="help">帮助中心</div>
        <div class="user" @click="showLogin" v-if="!userStore.isLogin"><span>登录</span>/<span>注册</span></div>
        <el-dropdown v-else="userStore.isLogin">
          <span class="el-dropdown-link">
            {{ userStore.name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goUser('/user/certification')">实名认证</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/order')">挂号订单</el-dropdown-item>
              <el-dropdown-item @click="goUser('/user/patient')">就诊人管理</el-dropdown-item>
              <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import useUserStore from '@/store/modules/user'

const $router = useRouter()
const userStore = useUserStore()

const goHome = () => {
  $router.push({ path: '/home' })
}

const showLogin = () => {
  userStore.toggleShow()
}

const logout = () => {
  userStore.logout()
  $router.push({ path: '/home' })
}

const goUser = (url: string) => {
  $router.push({ path: url })
}
</script>

<style lang="scss" scoped>
.container {
  position: fixed;
  z-index: 999;
  width: 100%;
  border-bottom: 1px solid #ddd;
  box-shadow: 0 1px 2px #ddd;
  background-color: #fff;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3em;
    width: 1200px;
    margin: 0 auto;
    .left {
      display: flex;
      align-items: center;
      vertical-align: middle;
      cursor: pointer;
      .logo {
        margin-right: 10px;
        img {
          width: 2em;
          height: 2em;
          border-radius: 50%;
        }
      }
      .title {
        color: $rootColor;
        font-size: $lFontSize;
        font-weight: 500;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .help {
        font-size: $sFontSize;
        color: #777;
        margin-right: 20px;
        cursor: pointer;
        &:hover {
          color: $rootColor;
        }
      }
      .user {
        font-size: $sFontSize;
        color: #777;
        cursor: pointer;
        &:hover {
          color: $rootColor;
        }
      }
      :deep(.el-dropdown) {
        &:focus-visible {
          outline: none;
        }
      }
      :deep(.el-tooltip__trigger) {
        &:hover {
          color: $rootColor;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
