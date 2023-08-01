<template>
  <div class="content">
    <el-autocomplete
      width="600px"
      v-model="iptdata"
      :fetch-suggestions="querySearch"
      clearable
      placeholder="请输入医院"
      @select="handleSelect" />
    <el-button type="primary" icon="search"></el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { reqFindHospitals } from '@/api/index'
import { FindHospitalResponseData } from '@/api/home/type'
const iptdata = ref<string>('')
const $router = useRouter()

const querySearch = async (query: string, cb: Function) => {
  const { data, code }: FindHospitalResponseData = await reqFindHospitals(query)

  if (code === 200) {
    cb(
      data.map((i) => {
        return {
          value: i.hosname,
          hoscode: i.hoscode
        }
      })
    )
  }
}

const handleSelect = (item: { value: string; hoscode: string }) => {
  $router.push({ path: '/hospital', query: { hoscode: item.hoscode } })
}
</script>
<script lang="ts">
export default {
  name: 'Search'
}
</script>

<style lang="scss" scoped>
.content {
  width: 1200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.el-input) {
  width: 550px;
  margin-right: 5px;
}
</style>
