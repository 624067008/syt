<template>
  <div>wxlogin</div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

const $route = useRoute()
console.log($route.query)
</script>

<style scoped></style>
