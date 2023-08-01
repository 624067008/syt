<template>
  <div class="main">
    <div>医院</div>
    <div class="level">
      <div class="title">等级:</div>
      <div class="content">
        <span :class="{ active: activeId === '' }" @click="changeActive('')">全部</span>
        <span
          v-for="item in hosTypeArr"
          :key="item.id"
          :class="{ active: activeId === item.value }"
          @click="changeActive(item.value)"
          >{{ item.name }}</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { reqHospitalLevelCity } from '@/api/index'
import type { hosType, HosTypeResponseData } from '@/api/home/type'

let $emit = defineEmits(['getHostype'])

const hosTypeArr = ref<hosType>([])
const activeId = ref<string>('')

// changeActive
const changeActive = (id: string) => {
  activeId.value = id
  $emit('getHostype', id)
}

// 获取等级城市列表
const getLevel = async () => {
  let { data, code }: HosTypeResponseData = await reqHospitalLevelCity('Hostype')

  if (code == 200) {
    hosTypeArr.value = data
  }
}
onMounted(() => {
  getLevel()
})
</script>

<script lang="ts">
export default {
  name: 'level'
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: $sFontSize;
  color: #777;

  .level {
    margin: 15px 0;
  }

  .level {
    display: flex;
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
}
</style>
