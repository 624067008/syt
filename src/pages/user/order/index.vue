<template>
  <div class="order">
    <Detail v-if="$route.query.orderId"></Detail>

    <OrderList v-else></OrderList>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import Detail from './detail/index.vue'
import OrderList from './orderList/index.vue'

const $route = useRoute()
</script>

<style scoped lang="scss">
.order {
  width: 100%;
}
</style>
