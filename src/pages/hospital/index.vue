<template>
  <div class="hospital">
    <div class="menu">
      <h5 class="title">
        <el-icon color="#777"><House /></el-icon>&nbsp;/&nbsp;医院信息
      </h5>
      <el-menu :default-active="$route.path">
        <el-menu-item index="/hospital/register" @click="gothere('/hospital/register')">
          <el-icon><Grid /></el-icon>
          <span>预约挂号</span>
        </el-menu-item>
        <el-menu-item index="/hospital/detail" @click="gothere('/hospital/detail')">
          <el-icon><Tickets /></el-icon>
          <span>医院详情</span>
        </el-menu-item>
        <el-menu-item index="/hospital/datenotice" @click="gothere('/hospital/datenotice')">
          <el-icon><Watch /></el-icon>
          <span>预约须知</span>
        </el-menu-item>
        <el-menu-item index="/hospital/message" @click="gothere('/hospital/message')">
          <el-icon><CirclePlusFilled /></el-icon>
          <span>停诊信息</span>
        </el-menu-item>
        <el-menu-item index="/hospital/query" @click="gothere('/hospital/query')">
          <el-icon><Search /></el-icon>
          <span>查询/取消</span>
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
import useDetailStore from '@/store/modules/hospitalDetail'
import { onBeforeMount } from 'vue'

const $route = useRoute()
const detailStore = useDetailStore()

const $router = useRouter()

const gothere = (to: string) => {
  $router.push({ path: to, query: { hoscode: $route.query.hoscode } })
}

onBeforeMount(() => {
  detailStore.getHospital($route.query.hoscode as string)
  detailStore.getDepartment($route.query.hoscode as string)
})
</script>

<style lang="scss" scoped>
.hospital {
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
  }
}
</style>
