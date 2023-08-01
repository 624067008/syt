<template>
  <div class="container">
    <HospitalTop></HospitalTop>
    <main>
      <router-view></router-view>
    </main>
    <HospitalBottom></HospitalBottom>
  </div>
  <Login />
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  main {
    margin-top: calc(3em + 5px);
    width: 1200px;
  }
}
</style>
