<template>
  <div class="detail">
    <div class="title">
      <div class="name">{{ detailStore.hospitalInfo.hospital?.hosname }}</div>
      <div class="level">
        <el-icon size="14px"><Sunny /></el-icon>{{ detailStore.hospitalInfo.hospital?.param?.hostypeString }}
      </div>
    </div>
    <div class="content">
      <div class="logo">
        <img :src="`data:image/jpeg;base64,${detailStore.hospitalInfo.hospital?.logoData}`" alt="" />
      </div>
      <div class="info">
        <div class="item">具体地址：{{ detailStore.hospitalInfo.hospital?.param?.fullAddress }}</div>
        <div class="item">路线规划：{{ detailStore.hospitalInfo.hospital?.route }}</div>
      </div>
    </div>
    <div class="intro">
      <div class="title" v-if="intro">医院介绍</div>
      <div class="content">{{ detailStore.hospitalInfo.hospital?.intro }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDetailStore from '@/store/modules/hospitalDetail'

const detailStore = useDetailStore()
</script>

<style scoped lang="scss">
.detail {
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    justify-content: start;
    align-items: center;
    .name {
      font-size: $lFontSize;
      margin-right: 10px;
    }
    .level {
      color: #777;
      font-size: 14px;
      display: flex;
      justify-content: center;
    }
  }

  .content {
    display: flex;
    margin-top: 30px;
    .logo {
      flex: 1;
      display: flex;
      justify-content: center;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .info {
      flex: 9;
      .title {
        font-size: $sFontSize;
        margin: 8px 0;
      }
      .item {
        font-size: $sFontSize;
        color: #777;
        line-height: 25px;
      }
    }
  }

  .intro {
    .title {
      font-size: $sFontSize;
      margin-top: 30px;
    }
    .content {
      font-size: $sFontSize;
      margin-top: 10px;
      color: #777;
      line-height: 25px;
    }
  }
}
</style>
