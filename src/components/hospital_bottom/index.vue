<template>
  <div class="bottom">
    <div class="main">
      <div class="left">
        <span>京ICP备</span>
        <span>12018369号</span>
        <span>电话挂号010-56253825</span>
      </div>
      <div class="right">
        <span>联系我们</span>
        <span>合作伙伴</span>
        <span>用户协议</span>
        <span>隐私协议</span>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.bottom {
  width: 100%;
  height: 3em;
  background-color: #eee;
  margin-top: 10px;
  .main {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left,
    .right {
      display: flex;
      align-items: center;
      font-size: $sFontSize;
      color: #777;
      span {
        margin-right: 10px;
        &:last-child {
          margin-right: 0;
        }
        &:hover {
          color: $rootColor;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
