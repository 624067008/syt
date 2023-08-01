<template>
  <div class="tip">
    <div class="usually">
      <div class="title">
        <div class="left">
          <el-icon><Grid color="#e67e22" /></el-icon>常见科室
        </div>
        <div class="right">
          全部<el-icon><ArrowRightBold /></el-icon>
        </div>
      </div>
      <div class="content">
        <span>神经内科</span>
        <span>消化内科</span>

        <span>呼吸内科</span>
        <span>内科</span>

        <span>神经外科</span>
        <span>妇科</span>

        <span>产科</span>
        <span>儿科</span>
      </div>
    </div>
    <div class="notice">
      <div class="title">
        <div class="left">
          <el-icon><Cpu color="#1e90ff" /></el-icon>平台公告
        </div>
        <div class="right">
          全部<el-icon><ArrowRightBold /></el-icon>
        </div>
      </div>
      <div class="content">
        <ul>
          <li><span>关于延长北京大学国际医院放假时间和加薪通知</span></li>
          <li><span>北京中医药大学东方医院部的漂亮女医生回春妙手</span></li>
          <li><span>武警总医院号源暂停更新通知</span></li>
        </ul>
      </div>
    </div>
    <div class="stop">
      <div class="title">
        <div class="left">
          <el-icon><IceCream color="#f1c40f" /></el-icon>停诊公告
        </div>
        <div class="right">
          全部<el-icon><ArrowRightBold /></el-icon>
        </div>
      </div>
      <div class="content">
        <ul>
          <li><span>中国人民解放军总医院第六次获得诺贝尔奖</span></li>
          <li><span>北京中医药大学东方医院部的漂亮女医生回春妙手</span></li>
          <li><span>武警总医院号源暂停更新通知</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.tip {
  font-size: $sFontSize;
  color: #777;
  .usually,
  .notice,
  .stop {
    width: 100%;
    .title {
      display: flex;
      justify-content: space-between;
      margin: 10px;
      .left,
      .right {
        display: flex;
        align-items: center;
      }
    }
  }

  .usually {
    .content {
      width: 100%;
      padding: 10px;
      display: flex;
      flex-wrap: wrap;
      span {
        display: block;
        width: 50%;
        margin: 5px 0;
      }
    }
  }

  .notice {
    .content {
      padding: 0 10px 10px 10px;
      ul {
        :deep(li) {
          color: #1e90ff;

          span {
            display: block;
            width: 100%;
            margin: 10px 0;
            color: #777;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }

  .stop {
    .content {
      padding: 0 10px 10px 10px;
      ul {
        :deep(li) {
          color: #f1c40f;

          span {
            display: block;
            width: 100%;
            margin: 10px 0;
            color: #777;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
          }
        }
      }
    }
  }
}
</style>
