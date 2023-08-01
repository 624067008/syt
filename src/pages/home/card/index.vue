<template>
  <el-card class="box-card" shadow="hover" @click="goDetail(hospitalInfo.hoscode)">
    <div class="content">
      <div class="left">
        <div class="title">{{ hospitalInfo.hosname }}</div>
        <div class="info">
          <span class="level">
            <el-icon :size="12"> <Edit /> </el-icon>{{ hospitalInfo.param.hostypeString }}</span
          >
          <span class="time"
            ><el-icon :size="12"> <Timer /> </el-icon>{{ hospitalInfo.bookingRule.releaseTime }}</span
          >
        </div>
      </div>
      <div class="right">
        <img :src="`data:image/jpeg;base64,${hospitalInfo.logoData}`" />
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps(['hospitalInfo'])
const $router = useRouter()

const goDetail = (hoscode: string) => {
  $router.push({ path: '/hospital/register', query: { hoscode } })
}
</script>

<style lang="scss" scoped>
:deep(.el-card__body) {
  padding: 10px;
}

.content {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    width: 70%;
    height: 45px;
    flex-direction: column;
    justify-content: space-between;

    .title {
      font-size: $mFontSize;
    }

    .info {
      display: flex;
      justify-content: space-between;
      font-size: $sFontSize;
      color: #777;

      span {
        display: flex;
        align-items: center;
      }
    }
  }

  .right {
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
  }
}
</style>
