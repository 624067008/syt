<template>
  <div class="patient">
    <div class="top">
      <div class="info">
        <div class="tip">{{ prop.data?.isInsure ? '医保' : '自费' }}</div>
        <div class="name">{{ prop.data?.name }}</div>
      </div>
      <div class="button_box">
        <el-button type="primary" :icon="Edit" circle @click="editHandler(prop.data?.id!)" />
        <el-popconfirm title="您确定要删除吗?" @confirm="deletePatient(prop.data!.id)">
          <template #reference>
            <el-button type="warning" :icon="Delete" circle v-if="isDeleteShow" />
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="body">
      <div class="detail-item">
        <div class="label">证件类型:</div>
        &nbsp;
        <div class="msg">
          {{ prop.data?.param.certificatesTypeString ? prop.data?.param.certificatesTypeString : '无' }}
        </div>
      </div>
      <div class="detail-item">
        <div class="label">证件号码:</div>
        &nbsp;
        <div class="msg">{{ prop.data?.certificatesNo ? prop.data?.certificatesNo : '无' }}</div>
      </div>
      <div class="detail-item">
        <div class="label">用户性别:</div>
        &nbsp;
        <div class="msg">{{ prop.data?.sex ? '男' : '女' }}</div>
      </div>
      <div class="detail-item">
        <div class="label">出生日期:</div>
        &nbsp;
        <div class="msg">{{ prop.data?.birthdate ? prop.data?.birthdate : '无' }}</div>
      </div>
      <div class="detail-item">
        <div class="label">手机号码:</div>
        &nbsp;
        <div class="msg">{{ prop.data?.phone ? prop.data?.phone : '无' }}</div>
      </div>
      <div class="detail-item">
        <div class="label">婚姻状况:</div>
        &nbsp;
        <div class="msg">{{ prop.data?.isMarry ? '已婚' : '未婚' }}</div>
      </div>
      <div class="detail-item">
        <div class="label">当前住址:</div>
        &nbsp;
        <div class="msg">{{ prop.data?.address ? prop.data?.address : '无' }}</div>
      </div>
    </div>
    <transition name="donee">
      <div class="done" v-if="prop.active"><span>已选中</span></div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { Edit, Delete } from '@element-plus/icons-vue'
import type { PatientDataItem } from '@/api/hospital/type'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const $route = useRoute()

const $emit = defineEmits(['edit', 'delete'])

const prop: { readonly data?: PatientDataItem; readonly active?: Boolean } = defineProps(['data', 'active'])

const deletePatient = async (id: number) => {
  $emit('delete', id + '')
}

const editHandler = (id: number) => {
  $emit('edit', id)
}

const isDeleteShow = computed(() => {
  return /user/g.test($route.path)
})
</script>

<style scoped lang="scss">
.patient {
  position: relative;
  width: 29.3%;
  margin: 2%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .top {
    padding: 20px;
    display: flex;
    justify-content: space-between;
    background-color: #ddd;
    .info {
      color: #777;
      font-size: 16px;
      display: flex;
      align-items: center;
      .tip {
        background-color: #fff;
        font-size: 8px;
        color: black;
        padding: 3px;
        text-align: center;
        border: 1px solid #444;
        transform: scale(0.7);
      }
    }
    .button_box {
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 20px;
    .detail-item {
      display: flex;
      height: 30px;
      line-height: 30px;
      color: #666;
      font-size: $sFontSize;
      .label {
        color: #333;
      }
    }
  }
  .done {
    width: 200px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    line-height: 200px;
    text-align: center;
    color: red;
    font-size: 28px;
    border-radius: 50%;
    border: 10px solid red;
    opacity: 0.2;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .donee-enter-from {
    transform: scale(0.5);
  }

  .donee-enter-active {
    transition: all 0.3s ease-in-out;
  }

  .donee-enter-to {
    transform: scale(1) translate(-50%, -50%) rotate(45deg);
  }
}
</style>
