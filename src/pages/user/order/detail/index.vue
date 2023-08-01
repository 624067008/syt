<template>
  <div class="detail">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>挂号详情</span>
        </div>
      </template>
      <div class="content">
        <div class="head">
          <el-button type="success"
            ><el-icon><Check /></el-icon
            >{{
              orderInfo?.orderStatus === -1 ? '取消预约' : orderInfo?.orderStatus === 0 ? '预约成功，待支付' : '已支付'
            }}</el-button
          >
          <div class="qr">
            <div class="im">
              <img src="@/assets/qr1.png" alt="" />
            </div>
            <div class="info">
              <div>微信关注"北京114预约挂号"</div>
              <div>"快速预约挂号"</div>
            </div>
          </div>
        </div>
        <div class="body">
          <div class="left">
            <el-descriptions class="margin-top" :column="1" border>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊人信息</div>
                </template>
                {{ orderInfo?.patientName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊日期</div>
                </template>
                {{ orderInfo?.reserveDate }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊医院</div>
                </template>
                {{ orderInfo?.hosname }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊科室</div>
                </template>
                {{ orderInfo?.depname }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">医生职称</div>
                </template>
                {{ orderInfo?.title }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">医事服务费</div>
                </template>
                <span style="color: red"> {{ orderInfo?.amount }}</span>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">挂号单号</div>
                </template>
                {{ orderInfo?.outTradeNo }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">挂号时间</div>
                </template>
                {{ orderInfo?.createTime }}
              </el-descriptions-item>
            </el-descriptions>
          </div>
          <div class="right">
            <el-card class="box-card-inner">
              <template #header>
                <div class="card-header-inner">
                  <span>注意事项</span>
                </div>
              </template>
              <div class="item">1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；</div>
              <div class="item red">
                2.<span>[取号]</span>就诊当天需在{{ orderInfo?.fetchTime }}前在医院取号，未取号视为爽约，该号不退不换；
              </div>
              <div class="item">
                3.<span>[退号]</span>在{{ orderInfo?.quitTime }}前可在线退号，逾期将不可办理退号退费；
              </div>
              <div class="item">
                4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请于就诊当日，携带预约挂号所使用的有效身份证件到院取号;
              </div>
              <div class="item">5.请注意北京市医保患者在住院期间不能使用社保卡在门诊取号.</div>
            </el-card>
          </div>
        </div>
        <div class="foot" v-show="orderInfo?.orderStatus !== -1">
          <el-popconfirm title="您确定要取消吗?" @confirm="popConfirmHandler">
            <template #reference>
              <el-button>取消预约</el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" v-show="orderInfo?.orderStatus !== 1" @click="pay">支付</el-button>
        </div>
      </div>
    </el-card>
  </div>
  <div class="dialog">
    <el-dialog v-model="dialogVisible" title="微信支付" width="300" @close="dialogClose">
      <div class="qrcode">
        <img :src="wxCodeUrl" alt="" />
        <p>使用微信扫一扫支付</p>
      </div>
      <template #footer>
        <el-button type="primary" @click="dialogVisible = false">关闭窗口</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { reqOrderInfo, reqCancelOrder, reqWXCode, reqPayStatus } from '@/api/user/index'
import type { IOrderInfoData } from '@/api/user/type.ts'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
// @ts-ignore
import QRcode from 'qrcode'

const $route = useRoute()

const orderInfo = ref<IOrderInfoData>()

const dialogVisible = ref(false)

const wxCodeUrl = ref('')

let timer = ref<any>()

const getOrderInfo = async () => {
  const { data, code, message } = await reqOrderInfo($route.query.orderId as string)

  if (code === 200) {
    orderInfo.value = data
  } else {
    ElMessage({ type: 'error', message })
  }
}

const cancelOrder = async () => {
  const { code, message } = await reqCancelOrder($route.query.orderId as string)

  if (code === 200) {
    return ElMessage({ type: 'success', message })
  }
  ElMessage({ type: 'error', message })
}

const popConfirmHandler = async () => {
  await cancelOrder()
  getOrderInfo()
}

const getWXCode = async () => {
  const { code, data } = await reqWXCode($route.query.orderId as string)

  if (code === 200) {
    wxCodeUrl.value = await QRcode.toDataURL(data.codeUrl)
  }
}

const getPayStatus = async (): boolean => {
  const { code, data } = await reqPayStatus($route.query.orderId as string)

  if (code == 200) {
    return data
  }

  return false
}

const pay = async () => {
  await getWXCode()

  dialogVisible.value = true

  timer.value = setInterval(async () => {
    const res = await getPayStatus()

    console.log(res)

    if (res) {
      ElMessage({ type: 'success', message: '支付成功' })
      getOrderInfo()
      dialogVisible.value = false
      clearInterval(timer.value)
    }
  }, 2000)
}

const dialogClose = () => {
  clearInterval(timer.value)
}

onBeforeMount(() => {
  getOrderInfo()
})
</script>

<style scoped lang="scss">
.detail {
  .box-card {
    .card-header {
      span {
        font-size: $lFontSize;
      }
    }
    .content {
      .head {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;
        padding: 10px 0;
        margin-bottom: 20px;
        .qr {
          display: flex;
          align-items: center;
          .im {
            margin-right: 10px;
            img {
              width: 60px;
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 50px;
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
      .body {
        display: flex;
        .left {
          flex: 46;
          margin-right: 30px;

          .cell-item {
            width: 100px;
            text-align: right;
          }
        }
        .right {
          flex: 54;

          .item {
            font-size: 15px;
            line-height: 24px;
            &.red {
              color: red;
            }
            span {
              font-weight: 600;
              margin: 0 3px;
            }
          }
        }
      }

      .foot {
        margin-top: 20px;
        display: flex;
        justify-content: start;
        * {
          margin: 0 10px;
        }
      }
    }
  }
}
.dialog {
  .qrcode {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;

    img {
      width: 200px;
      margin-bottom: 20px;
    }
  }

  :deep(.el-dialog__body) {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
}
</style>
