<template>
  <div class="area">
    <div class="title">地区:</div>
    <div class="content">
      <span :class="{ active: activeId === '' }" @click="activeChange('')">全部</span>
      <span
        v-for="item in regionArr"
        :class="{ active: activeId === item.value }"
        :key="item.id"
        @click="activeChange(item.value)"
        >{{ item.name }}</span
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqHospitalLevelCity } from '@/api/index'
import type { hosType, HosTypeResponseData } from '@/api/home/type'

let $emit = defineEmits(['getRegion'])

const regionArr = ref<hosType>([])
const activeId = ref<string>('')
const getRegion = async () => {
  const { data, code }: HosTypeResponseData = await reqHospitalLevelCity('Beijin')

  if (code === 200) regionArr.value = data
}

const activeChange = (id: string) => {
  activeId.value = id

  $emit('getRegion', id)
}

onMounted(() => {
  getRegion()
})
</script>

<style lang="scss" scoped>
.area {
  display: flex;
  font-size: $sFontSize;
  color: #777;
  .title {
    min-width: 3em;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    span {
      margin-left: 15px;
      &.active {
        color: $rootColor;
      }
      &:hover {
        color: $rootColor;
        cursor: pointer;
      }
    }
  }
}
</style>
