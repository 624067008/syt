<template>
  <div class="login">
    <el-dialog v-model="userStore.show" title="用户登录" @close="close">
      <el-row>
        <el-col :span="12">
          <div class="loginForm" v-show="!showWxScan">
            <el-form :rules="rules" status-icon :model="loginParams" ref="loginFormRef">
              <el-form-item prop="phone">
                <el-input :prefix-icon="User" placeholder="请输入手机号" v-model="loginParams.phone" />
              </el-form-item>
              <el-form-item prop="code">
                <el-input :prefix-icon="Lock" placeholder="请输入验证码" v-model="loginParams.code" />
              </el-form-item>
              <el-form-item>
                <el-button :disabled="!isPhoneNum || codeTime > 0" @click="getCode"
                  >获取验证码{{ codeTime > 0 ? `(${codeTime}s)` : '' }}</el-button
                >
              </el-form-item>
              <el-form-item>
                <el-button style="width: 100%" type="primary" @click="login" :disabled="!isPhoneNum || !isCode"
                  >用户登录</el-button
                >
              </el-form-item>
              <div class="wx" @click="changeToWxSanLogin">
                <div class="text">微信扫码登录</div>
                <div class="icon">
                  <img src="@/assets/wechat-9.png" alt="" />
                </div>
              </div>
            </el-form>
          </div>
          <div class="scan" v-show="showWxScan">
            <div class="wxScan" id="login_container"></div>
            <div class="phone" @click="showWxScan = false">
              <p>手机短信验证码登录</p>
              <div class="icon">
                <el-icon color="#fff" size="18px"><Iphone /></el-icon>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="qrcode">
            <div class="top">
              <div class="left">
                <img src="@/assets/qr1.png" alt="" />
                <span>微信扫一扫关注</span>
                <span>"快速预约挂号"</span>
              </div>
              <div class="right">
                <img src="@/assets/qr2.png" alt="" />
                <span>扫一扫下载</span>
                <span>"预约挂号"App</span>
              </div>
            </div>
            <div class="bottom">
              <span>xxxxxx官方指定平台</span>
              <span>快速挂号&nbsp;安全放心</span>
            </div>
          </div>
        </el-col>
      </el-row>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="userStore.show = false">关闭窗口</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue'
import { ElMessage, type FormRules, type FormInstance } from 'element-plus'
import type { LoginParamsData } from '@/api/user/type'
import { useRoute, useRouter } from 'vue-router'
const $route = useRoute()
const $router = useRouter()

const userStore = useUserStore()

const showWxScan = ref(false) // 是否显示微信扫一扫登录二维码
const loginParams = reactive({
  phone: '19999999999',
  code: ''
})

const codeTime = ref(0) // 验证码禁用一分钟
const loginFormRef = ref<FormInstance>()

const isPhoneNum = computed(() => {
  let reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/

  return reg.test(loginParams.phone)
})
const isCode = computed(() => {
  return /^\d{6}$/.test(loginParams.code)
})

const checkPhone = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入手机号'))
  }
  setTimeout(() => {
    if (!isPhoneNum.value) {
      return callback(new Error('请输入正确的手机号'))
    } else {
      callback()
    }
  }, 300)
}
const checkCode = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入验证码'))
  }
  setTimeout(() => {
    if (!isCode.value) {
      return callback(new Error('请输入6位验证码'))
    } else {
      callback()
    }
  }, 300)
}

const rules = reactive<FormRules<typeof loginParams>>({
  phone: [{ validator: checkPhone, trigger: 'change' }],
  code: [{ validator: checkCode, trigger: 'change' }]
})

const getCode = async () => {
  try {
    await userStore.getCode(loginParams.phone)

    loginParams.code = userStore.code
    if (!userStore.code) {
      ElMessage({
        message: '获取验证码频繁',
        type: 'error'
      })
    } else {
      ElMessage({
        message: '获取验证码成功',
        type: 'success'
      })
    }

    codeTime.value = 60

    let timer = setInterval(() => {
      codeTime.value--
      if (codeTime.value <= 0) {
        clearInterval(timer)
        codeTime.value = 0
      }
    }, 1000)
  } catch (e) {
    ElMessage({
      message: (e as Error).message,
      type: 'error'
    })
  }
}

const login = async () => {
  try {
    await userStore.login({
      phone: loginParams.phone,
      code: loginParams.code
    })

    ElMessage({
      type: 'success',
      message: '登录成功'
    })

    if ($route.query.redirect) {
      $router.push($route.query.redirect as string)
    }
  } catch (e) {
    ElMessage({
      type: 'error',
      message: (e as Error).message
    })
  }
}

const close = () => {
  Object.assign(loginParams, { name: '', code: '' })
  loginFormRef.value?.resetFields()
}

// 切换到微信扫码登录
const changeToWxSanLogin = async () => {
  showWxScan.value = true

  const redirectUrl = encodeURIComponent(window.location.origin + '/wxlogin')

  const {
    appid,
    redirectUri: redirect_uri,
    scope,
    state
  }: LoginParamsData = (await userStore.getWxLoginParams(redirectUrl)) as LoginParamsData

  // @ts-ignore

  new WxLogin({
    self_redirect: true,
    id: 'login_container',
    appid,
    scope,
    redirect_uri,
    state,
    style: 'black'
  })
}
</script>

<style scoped lang="scss">
.login {
  :deep(.el-dialog__body) {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .loginForm {
      border: 1px solid #ddd;
      padding: 20px;
      border-radius: 8px;
      .wx {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #999;
        cursor: pointer;
        .icon {
          img {
            width: 40px;
            height: 40px;
          }
        }
      }
    }
    .scan {
      display: flex;
      flex-direction: column;
      align-items: center;
      .text {
        font-size: $mFontSize;
      }
      .imgbox {
        width: 70%;
        padding: 20px;
        margin: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #ddd;
        img {
          width: 100%;
        }
      }
      .info {
        color: black;
        font-size: $sFontSize;
        margin-bottom: 20px;
      }
      .phone {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: $sFontSize;
        cursor: pointer;
        .icon {
          background-color: #d35400;
          width: 30px;
          height: 30px;
          margin: 3px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }

    .qrcode {
      display: flex;
      flex-direction: column;
      .top {
        display: flex;
        .left,
        .right {
          width: 50%;
          padding: 0 20px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
          img {
            width: calc(100%);
          }
          span {
            margin: 5px 0;
          }
        }
      }
      .bottom {
        margin: 20px 0;
        display: flex;
        flex-direction: column;
        font-size: $lFontSize;
        text-align: center;
        span {
          margin: 10px 0;
          font-style: italic;
        }
      }
    }
  }
}
</style>
