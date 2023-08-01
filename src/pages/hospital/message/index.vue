<template>
  <div class="message">
    <div class="title">{{ detailStroe.hospitalInfo.hospital?.hosname }}停诊信息</div>
    <el-empty description="暂无信息" />
  </div>
</template>

<script setup lang="ts">
import useDetailStroe from '@/store/modules/hospitalDetail'
const detailStroe = useDetailStroe()
</script>

<style scoped lang="scss">
.message {
  .title {
    font-size: $lFontSize;
    text-align: center;
  }
}
</style>
