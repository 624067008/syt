<template>
  <div class="info">确认挂号信息</div>
  <div class="card">
    <div class="top">
      <div class="title">请点击选择就诊人</div>
      <el-button type="success" :icon="User" @click="goUser">添加就诊人</el-button>
    </div>
    <div class="bottom">
      <Patient
        v-for="(item, i) in patientData"
        :data="item"
        :key="item.id"
        :active="i === activeIdx"
        @edit="editHandler"
        @click="activeChange(i)" />
    </div>
  </div>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>挂号信息</span>
      </div>
    </template>
    <el-descriptions class="margin-top" :column="2" border>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">就诊日期:</div>
        </template>
        {{ schedule?.workDate }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">就诊医院:</div>
        </template>
        {{ schedule?.param.hosname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">就诊科室:</div>
        </template>
        {{ schedule?.param.depname }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">医生姓名:</div>
        </template>
        {{ schedule?.docname.length! > 0 ? schedule?.docname : '匿名' }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">医生职称:</div>
        </template>
        {{ schedule?.title }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">医生专长:</div>
        </template>
        {{ schedule?.skill }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <div class="cell-item">医事服务费:</div>
        </template>
        <span class="amount">{{ schedule?.amount }}</span>
      </el-descriptions-item>
    </el-descriptions>
  </el-card>
  <div class="btn">
    <el-button type="primary" size="large" width="200px" :disabled="activeIdx == -1" @click="goUserAndOrder"
      >确认挂号</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
import { onBeforeMount, ref } from 'vue'
import { reqGetAllPatients, reqGetSchedule } from '@/api/hospital/index'
import { reqPatientOrder } from '@/api/user/index'
import type { PatientDataItem, ScheduleData } from '@/api/hospital/type'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const $route = useRoute()
const $router = useRouter()

const patientData = ref<PatientDataItem[]>()

const schedule = ref<ScheduleData>()

// 选中卡片的索引
const activeIdx = ref(-1)

const getAllPatients = async () => {
  const { data, code } = await reqGetAllPatients()

  if (code == 200) {
    patientData.value = data
  }
}

const getSchedule = async () => {
  const { data, code } = await reqGetSchedule($route.query.id as string)

  if (code == 200) {
    schedule.value = data
  }
}

const activeChange = (i: number) => {
  activeIdx.value = i
}

const goUserAndOrder = async () => {
  const { hoscode, id } = schedule.value!
  const { id: patientId } = patientData.value![activeIdx.value]

  const { data, code, message } = await reqPatientOrder(hoscode, id, patientId.toString())

  if (code === 200) {
    $router.push({ path: '/user/order', query: { orderId: data } })
  } else {
    ElMessage({
      type: 'error',
      message
    })

    $router.push({ path: '/user/order', query: { orderId: 424 } })
  }
}

const goUser = () => {
  $router.push({ path: '/user/patient', query: { type: 'add' } })
}

const editHandler = (id: number) => {
  $router.push({ path: '/user/patient', query: { type: 'edit', id } })
}

onBeforeMount(() => {
  getAllPatients()
  getSchedule()
})
</script>

<style scoped lang="scss">
.info {
  font-size: $mFontSize;
  font-weight: 700;
  margin-bottom: 30px;
}
.card {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.12);
  margin-bottom: 20px;
  border: 1px solid #ddd;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding: 20px;
    .title {
      font-size: $mFontSize;
    }
  }
  .bottom {
    display: flex;
    flex-wrap: wrap;
  }
}
.box-card {
  .card-header {
    font-size: $sFontSize;
  }
  .cell-item {
    width: 140px;
  }
}
.btn {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.amount {
  color: red;
}
</style>
