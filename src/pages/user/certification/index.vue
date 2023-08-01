<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>实名信息</span>
      </div>
    </template>
    <div class="tip">
      <p>
        <el-icon size="14"><InfoFilled /></el-icon
        >完成实名认证后才能添加就诊人，正常进行挂号，为了不影响后续步骤，建议提前实名认证。
      </p>
    </div>
    <div class="certified" v-if="userInfo?.authStatus === 1">
      <el-descriptions class="margin-top" :column="1" border>
        <el-descriptions-item :width="20" label-align="right">
          <template #label>
            <div class="cell-item">用户姓名</div>
          </template>
          {{ userInfo?.name }}
        </el-descriptions-item>
        <el-descriptions-item :width="20" label-align="right">
          <template #label>
            <div class="cell-item">证件类型</div>
          </template>
          {{ userInfo?.certificatesType }}
        </el-descriptions-item>
        <el-descriptions-item :width="20" label-align="right">
          <template #label>
            <div class="cell-item">证件号码</div>
          </template>
          {{ userInfo?.certificatesNo }}
        </el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="uncertified" v-else>
      <el-form
        style="width: 45%; margin: 0 auto"
        label-width="80px"
        :model="params"
        :rules="rules"
        status-icon
        ref="formRef">
        <el-form-item label="用户姓名" prop="name">
          <el-input placeholder="请输入用户姓名" v-model="params.name"></el-input>
        </el-form-item>

        <el-form-item label="证件类型" prop="certificatesType">
          <el-select style="width: 100%" placeholder="请选择证件类型" v-model="params.certificatesType">
            <el-option :label="item.name" v-for="item in certificatesType" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="certificatesNo">
          <el-input placeholder="请输入证件号码" v-model="params.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="上传证件" prop="certificatesUrl">
          <el-upload
            ref="upload"
            list-type="picture-card"
            action="/api/oss/file/fileUpload?fileHost=userAuth"
            :on-success="uploadSuccess"
            :on-exceed="exceed"
            :on-preview="preview"
            :on-remove="remove"
            :limit="1">
            <img src="@/assets/upload.png" alt="" style="width: 100%; height: 100%" />
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userAuth">提交</el-button>
          <el-button @click="reset">重写</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-card>
  <el-dialog v-model="dialogVisible" title="Tips" width="50%">
    <img v-if="params.certificatesUrl" :src="params.certificatesUrl" alt="" style="width: 100%; height: 100%" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭预览</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, reactive } from 'vue'
import { reqUserInfo, reqCertificatesType, reqUserAuth } from '@/api/user/index'
import type { UserInfoResponseData, CertificatesTypeResponseDataItem } from '@/api/user/type'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()

const userInfo = ref<UserInfoResponseData>()
const certificatesType = ref<CertificatesTypeResponseDataItem[]>()

const dialogVisible = ref(false)

const upload = ref()

const params = reactive({
  certificatesNo: '',
  certificatesType: '',
  certificatesUrl: '',
  name: ''
})

// 表单验证
const validatecertificatesNo = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请先输入证件号码'))
  } else if (!/^\d{14}$/.test(value)) {
    callback(new Error('请输入正确的证件号码（14位数字）'))
  } else {
    callback()
  }
}

const validatecertificatesType = (rule: any, value: any, callback: any) => {
  if (!['10', '20'].includes(value)) {
    callback(new Error('请先选择证件类型'))
  } else {
    callback()
  }
}

const validatecertificatesUrl = (rule: any, value: any, callback: any) => {
  if (!params.certificatesUrl) {
    callback(new Error('请先上传证件照片'))
  } else {
    callback()
  }
}

const validatename = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请先输入姓名'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules<typeof params>>({
  certificatesNo: [{ validator: validatecertificatesNo, trigger: 'change', required: true }],
  certificatesType: [{ validator: validatecertificatesType, trigger: 'blur', required: true }],
  certificatesUrl: [{ validator: validatecertificatesUrl, trigger: 'change', required: true }],
  name: [{ validator: validatename, trigger: 'blur', required: true }]
})

const getUserInfo = async () => {
  const { data, code } = await reqUserInfo()

  if (code == 200) {
    userInfo.value = data
  }
}

const getCertificateType = async () => {
  const { data, code } = await reqCertificatesType()

  if (code == 200) {
    certificatesType.value = data
  }
}

const uploadSuccess = (res: any) => {
  params.certificatesUrl = res.data

  formRef.value?.clearValidate('certificatesUrl')
}

const exceed = () => {
  ElMessage({
    type: 'error',
    message: '只能上传一张哦'
  })
}

const preview = () => {
  dialogVisible.value = true
}

const remove = () => {
  params.certificatesUrl = ''
}

const reset = () => {
  params.certificatesUrl = ''
  params.certificatesNo = ''
  params.certificatesType = ''
  params.name = ''

  upload.value.clearFiles()

  formRef.value!.clearValidate()
}

const userAuth = async () => {
  await formRef.value!.validate()

  const { code } = await reqUserAuth(params)

  if (code === 200) {
    ElMessage({ type: 'success', message: '认证成功' })

    getUserInfo()
  } else {
    ElMessage({ type: 'error', message: '认证失败' })
  }
}

onBeforeMount(async () => {
  await getUserInfo()
  if (userInfo.value?.authStatus === 0) {
    getCertificateType()
  }
})
</script>

<style scoped lang="scss">
.card-header {
  font-size: $lFontSize;
}
.tip {
  p {
    font-size: $sFontSize;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #777;
  }
  margin-bottom: 30px;
}
.certified {
}
</style>
