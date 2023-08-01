<template>
  <div class="user">
    <div class="menu">
      <h5 class="title">
        <el-icon color="#777"><House /></el-icon>&nbsp;/&nbsp;会员中心
      </h5>
      <el-menu :default-active="$route.path">
        <el-menu-item index="/user/certification" @click="gothere('/user/certification')">
          <el-icon><Postcard /></el-icon>
          <span>实名认证</span>
        </el-menu-item>
        <el-menu-item index="/user/order" @click="gothere('/user/order')">
          <el-icon><DocumentCopy /></el-icon>
          <span>挂号订单</span>
        </el-menu-item>
        <el-menu-item index="/user/patient" @click="gothere('/user/patient')">
          <el-icon><User /></el-icon>
          <span>就诊人管理</span>
        </el-menu-item>
        <el-menu-item index="/user/profile" @click="gothere('/user/profile')">
          <el-icon><Tickets /></el-icon>
          <span>账号信息</span>
        </el-menu-item>
        <el-menu-item index="/user/feedback" @click="gothere('/user/feedback')">
          <el-icon><ChatLineRound /></el-icon>
          <span>意见反馈</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

const $route = useRoute()

const $router = useRouter()

const gothere = (to: string) => {
  $router.push({ path: to })
}

onBeforeMount(() => {})
</script>

<style lang="scss" scoped>
.user {
  width: 1200px;
  min-width: 1200px;
  min-height: calc(100vh - 80px);
  display: flex;
  .menu {
    flex: 2;
    .title {
      font-size: $sFontSize;
      color: #777;
      display: flex;
      align-items: center;
    }
  }
  .content {
    flex: 8;
    padding: 20px 40px;
    width: 960px;
  }
}
</style>
