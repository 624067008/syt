<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title">订单列表</span>
      </div>
    </template>
    <el-form :inline="true">
      <el-form-item label="就诊人">
        <el-select placeholder="请选择就诊人" v-model="patientId" @change="getOrderInfoList">
          <el-option :label="item.name" :value="item.id" v-for="item in allpatinets"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单状态">
        <el-select placeholder="请选择订单状态" v-model="orderStatus" @change="getOrderInfoList">
          <el-option :label="item.comment" :value="item.status" v-for="item in allOrderStatus"> </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-table border style="margin: 10px 0" :data="orderList">
      <el-table-column label="就诊时间" prop="reserveDate" width="110"></el-table-column>
      <el-table-column label="医院" prop="hosname" width="110"></el-table-column>
      <el-table-column label="科室" prop="depname" width="160"></el-table-column>
      <el-table-column label="医生" prop="title" width="100"></el-table-column>
      <el-table-column label="医事服务费" prop="amount" width="100"></el-table-column>
      <el-table-column label="就诊人" prop="patientName" width="80"></el-table-column>
      <el-table-column label="订单状态" prop="param.orderStatusString" width="140"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row }">
          <el-button type="text" @click="toDetail(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="orderInfoList?.total"
      @size-change="curChangehandler"
      @current-change="getOrderInfoList" />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, computed } from 'vue'
import { reqOrderInfoList, reqAllPatients, reqOrderStatus } from '@/api/user/index'
import type {
  UserInfoListResponseData,
  AllPatientUserInfoListResponseDataItem,
  AllOrderStatusResponseDataItem
} from '@/api/user/type'
import { useRouter } from 'vue-router'

const $router = useRouter()

const pageNo = ref(1)
const pageSize = ref(10)
const patientId = ref('')
const orderStatus = ref<number>()
const allpatinets = ref<AllPatientUserInfoListResponseDataItem[]>([])
const allOrderStatus = ref<AllOrderStatusResponseDataItem[]>()

const orderInfoList = ref<UserInfoListResponseData>()

const orderList = computed(() => {
  console.log('orderList', orderList)

  return orderInfoList.value?.records
})

const getOrderInfoList = async () => {
  const { data, code } = await reqOrderInfoList(pageNo.value, pageSize.value, patientId.value, orderStatus.value)

  if (code === 200) {
    orderInfoList.value = data
  }
}

const curChangehandler = () => {
  pageNo.value = 1
  getOrderInfoList()
}

const toDetail = (row: any) => {
  $router.push({ path: '/user/order', query: { orderId: row.id } })
}

const getAllPatients = async () => {
  const { data, code } = await reqAllPatients()

  if (code === 200) {
    allpatinets.value = data
  }
}

const getAllOrderStatus = async () => {
  const { data, code } = await reqOrderStatus()

  if (code === 200) {
    allOrderStatus.value = data
  }
}

onBeforeMount(() => {
  getOrderInfoList()
  getAllPatients()
  getAllOrderStatus()
})
</script>

<style scoped lang="scss">
.box-card {
  .title {
    font-size: $lFontSize;
  }
}
</style>
