<template>
  <div class="step">
    <div class="wrap">
      <div class="top">
        <div class="hosname">{{ stepData?.baseMap.hosname }}</div>
        <div class="line"></div>
        <div class="type">{{ stepData?.baseMap.bigname }}</div>
        <div class="dov">·</div>
        <div class="hosdeparment">{{ stepData?.baseMap.depname }}</div>
      </div>
      <div class="center">
        <div class="date">{{ stepData?.baseMap.workDateString }}</div>
        <div class="item-box">
          <div
            :class="{ item: true, gray: item.status === -1 || item.availableNumber === -1, cur: i == curStep }"
            v-for="(item, i) in stepData?.bookingScheduleList"
            @click="getScheduleList(item.workDate, item.status, i)">
            <div class="title">{{ item.workDate }}&nbsp;{{ item.dayOfWeek }}</div>
            <div class="status" v-if="item.status != 1">
              {{
                item.status === -1
                  ? '停止挂号'
                  : item.availableNumber === -1
                  ? '已约满'
                  : `有号(${item.availableNumber})`
              }}
            </div>
            <div class="status" v-else>即将放号</div>
          </div>
        </div>
        <el-pagination
          layout="prev, pager, next"
          :total="stepData?.total"
          v-model:page-size="limit"
          v-model:current-page="page"
          @current-change="curPageChangeHandler" />
      </div>
      <div class="bottom">
        <div class="will" v-show="workStatus === 1">
          <span class="time">{{ scheduleList?.length! > 0 ? scheduleList![0].workDate : '' }}&nbsp;8:00</span>
          <span>放号</span>
        </div>
        <div class="doctor" v-show="workStatus !== 1">
          <div class="morning">
            <div class="time-title">
              <el-icon color="#389CFF" size="18"><Sunny /></el-icon>上午号源
            </div>
            <div class="doctor-item" v-for="item in morningScheduleList" :key="item.id">
              <div class="left">
                <div class="name">
                  <div class="level">{{ item.title }}</div>
                  <div class="doc-line">|</div>
                  <div class="doc-name">{{ item.docname }}</div>
                </div>
                <div class="type">{{ item.skill }}</div>
              </div>
              <div class="right">
                <div class="price">￥{{ item.amount }}</div>
                <el-button type="primary" @click="toRegisterStep2(item.id)">剩余{{ item.availableNumber }}</el-button>
              </div>
            </div>
          </div>
          <div class="afternoon">
            <div class="time-title">
              <el-icon color="#389CFF" size="18"><Sunrise /></el-icon>下午号源
            </div>
            <div class="doctor-item" v-for="item in afternoonScheduleList" :key="item.id">
              <div class="left">
                <div class="name">
                  <div class="level">{{ item.title }}</div>
                  <div class="doc-line">|</div>
                  <div class="doc-name">{{ item.docname }}</div>
                </div>
                <div class="type">{{ item.skill }}</div>
              </div>
              <div class="right">
                <div class="price">￥{{ item.amount }}</div>
                <el-button type="primary" @click="toRegisterStep2(item.id)">剩余{{ item.availableNumber }}</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { reqDepartmentScheduleRule, reqScheduleList } from '@/api/hospital/index'
import { ElMessage } from 'element-plus'
import { DepartmentScheduleRuleData, DepartmentScheduleListDataItem } from '@/api/hospital/type'

const $route = useRoute()
const $router = useRouter()

const page = ref(1)
const limit = ref(6)
// 当前选中的 center item 索引
const curStep = ref(0)

// center 数据
let stepData = ref<DepartmentScheduleRuleData>()

// 判断是否为即将放号
let workStatus = ref<number>(0)

// 医生数据
let scheduleList = ref<DepartmentScheduleListDataItem[]>()
// 分上下午
const morningScheduleList = computed(() => scheduleList.value?.filter((i) => i.workTime == 0))
const afternoonScheduleList = computed(() => scheduleList.value?.filter((i) => i.workTime == 1))

// 点击 上/下一页
const curPageChangeHandler = () => {
  curStep.value = -1
  getDepartmentSchedule()
  scheduleList.value = undefined
}
// 获取center数据
const getDepartmentSchedule = async () => {
  const { hoscode, depcode } = $route.query

  const { code, data, message } = await reqDepartmentScheduleRule(
    hoscode as string,
    depcode as string,
    page.value,
    limit.value
  )

  if (code == 200) {
    stepData.value = data
  } else {
    ElMessage({
      type: 'error',
      message: message
    })
  }
}
// 医生数据
const getScheduleList = async (workDate: string, status: number = 0, cur: number = 0) => {
  curStep.value = cur

  const { hoscode, depcode } = $route.query
  const { code, data } = await reqScheduleList(hoscode as string, depcode as string, workDate)

  if (code == 200) {
    workStatus.value = status

    scheduleList.value = data
  }
}
// 跳转step2
const toRegisterStep2 = (id: string) => {
  $router.push({ path: '/hospital/register_step2', query: { id } })
}

onBeforeMount(async () => {
  await getDepartmentSchedule()
  getScheduleList(stepData.value?.bookingScheduleList[0].workDate!)
})
</script>

<style scoped lang="scss">
.step {
  .wrap {
    .top {
      display: flex;
      align-items: center;
      font-size: $sFontSize;
      color: #777;
      * {
        margin: 3px;
      }
      .line {
        width: 1px;
        height: 1em;
        background-color: #777;
      }
    }
    .center {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px 0;
      .date {
        color: #777;
        font-size: $sFontSize;
        font-weight: 600;
        margin: 10px 0;
      }
      .item-box {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        margin: 10px 0;

        .item {
          width: 14%;
          border: 1px solid $rootColor;
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          &:active {
            transform: scale(1.1);
          }
          &.cur {
            transform: scale(1.1);
          }
          .title {
            color: #777;
            font-size: $sFontSize;
            font-weight: 600;
            background-color: #81ecec;
            padding: 5px;
            text-align: center;
          }
          .status {
            height: 40px;
            font-size: $sFontSize;
            color: #777;
            line-height: 40px;
            text-align: center;
          }
          &.gray {
            border-color: #ccc;
            .title {
              background-color: #ccc;
            }
          }
        }
      }
    }
    .bottom {
      .will {
        font-size: $lFontSize;
        height: 150px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .time {
          color: $rootColor;
        }
      }
      .doctor {
        .morning,
        .afternoon {
          .time-title {
            display: flex;
            align-items: center;
            color: #777;
            font-size: 16px;
            font-weight: 600;
            margin: 20px 0;
          }
          .doctor-item {
            display: flex;
            justify-content: space-between;
            height: 65px;
            padding: 5px 0;
            margin: 10px 0;
            border-bottom: 1px solid #ccc;
            .left {
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              .name {
                display: flex;
                align-items: center;
                font-size: 14px;
                color: $rootColor;
                .doc-line {
                  margin: 0 5px;
                }
              }
              .type {
                color: #777;
                font-size: $sFontSize;
              }
            }
            .right {
              display: flex;
              width: 200px;
              justify-content: space-around;
              align-items: center;
              font-size: $sFontSize;
              color: #777;
              :deep(span) {
                font-size: $sFontSize;
              }
            }
          }
        }
      }
    }
  }
}
</style>
