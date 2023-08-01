<template>
  <el-carousel width="1200px" height="350px">
    <el-carousel-item v-for="item in 4" :key="item">
      <img src="@/assets/1.png" />
    </el-carousel-item>
  </el-carousel>
</template>

<script setup lang="ts"></script>

<style scoped>
img {
  width: 1200px;
}
</style>
