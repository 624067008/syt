<template>
  <Carousel />
  <Search />
  <el-row :gutter="20">
    <el-col :span="20">
      <Level @getHostype="getHostype" />
      <Region @getRegion="getRegion" />
      <div class="hospital" v-if="hospitalArr.length > 0">
        <Card class="card" v-for="item in hospitalArr" :key="item.id" :hospitalInfo="item" />
      </div>

      <el-empty v-else description="description" />
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="total"
        @size-change="handleCurrentChange"
        @current-change="handleCurrentChange" />
    </el-col>
    <el-col :span="4">
      <Tip />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import Carousel from '@/pages/home/carousel/index.vue'
import Search from '@/pages/home/search/index.vue'
import Level from '@/pages/home/level/index.vue'
import Region from '@/pages/home/region/index.vue'
import Card from '@/pages/home/card/index.vue'
import Tip from '@/pages/home/tip/index.vue'

import { ref, onMounted } from 'vue'
import { reqHospitalInfo } from '@/api/index'
import { Content, HospitalResponseData } from '@/api/home/type'

const currentPage = ref<number>(1)
const pageSize = ref<number>(8)
const hospitalArr = ref<Content>([])
const total = ref<number>(0)
const hostype = ref<string>('') // active host type
const districtCode = ref<string>('') //active district code

// 页码变化处理函数
const handleCurrentChange = () => {
  getHospitalInfo()
}

// 获取医院信息
const getHospitalInfo = async () => {
  const { code, data }: HospitalResponseData = await reqHospitalInfo(
    currentPage.value,
    pageSize.value,
    hostype.value,
    districtCode.value
  )

  if (code === 200) {
    hospitalArr.value = data.content
    total.value = data.totalElements
  }
}
// 18273193292

// getHostype 自定以事件
const getHostype = async (level: string) => {
  hostype.value = level

  getHospitalInfo()
}

// getRegion
const getRegion = async (id: string) => {
  districtCode.value = id

  getHospitalInfo()
}

onMounted(() => {
  getHospitalInfo()
})
</script>

<style lang="scss" scoped>
.hospital {
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 10px;
  .card {
    width: 49%;
    margin-top: 10px;
  }
}
</style>
