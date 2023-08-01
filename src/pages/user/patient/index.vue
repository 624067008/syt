<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span class="title">就诊人管理</span>
        <el-button type="success" @click="addUser"
          ><el-icon><User /></el-icon>添加就诊人</el-button
        >
      </div>
    </template>
    <div class="edit" v-if="showEdit">
      <el-divider content-position="left"><div class="tip">就诊人信息</div></el-divider>
      <el-form
        style="width: 45%; margin: 0 auto"
        label-width="80px"
        status-icon
        ref="patientFormRef"
        :model="patientForm">
        <el-form-item label="用户姓名" prop="name">
          <el-input placeholder="请输入用户姓名" v-model="patientForm.name"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="certificatesType">
          <el-select style="width: 100%" placeholder="请选择证件类型" v-model="patientForm.certificatesType">
            <el-option :label="item.name" v-for="item in certificatesTypeData" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="name">
          <el-input placeholder="请输入证件号码" v-model="patientForm.certificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="用户性别" prop="name">
          <el-radio-group v-model="patientForm.sex">
            <el-radio :label="0">女</el-radio>
            <el-radio :label="1">男</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="出生日期" prop="name">
          <el-date-picker
            type="date"
            placeholder="选择出生日期"
            style="width: 100%"
            value-format="YYYY-MM-DD"
            v-model="patientForm.birthdate" />
        </el-form-item>
        <el-form-item label="手机号码" prop="name">
          <el-input placeholder="请输入手机号码" v-model="patientForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left"><div class="tip">建档信息(完善后部分医院首次就诊不排队建档)</div></el-divider>
      <el-form style="width: 45%; margin: 0 auto" label-width="80px" status-icon ref="otherFormRef" :model="otherForm">
        <el-form-item label="婚姻状况" prop="name">
          <el-radio-group v-model="otherForm.isMarry">
            <el-radio :label="0">未婚</el-radio>
            <el-radio :label="1">已婚</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自费/医保" prop="name">
          <el-radio-group v-model="otherForm.isInsure">
            <el-radio :label="0">自费</el-radio>
            <el-radio :label="1">医保</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="当前地址" prop="name">
          <el-cascader :props="props" style="width: 100%" v-model="otherForm.addressSelected" />
        </el-form-item>

        <el-form-item label="详细地址" prop="name">
          <el-input placeholder="请输入详细地址" v-model="otherForm.address"></el-input>
        </el-form-item>
      </el-form>
      <el-divider content-position="left"><div class="tip">联系人信息(选填)</div></el-divider>
      <el-form
        style="width: 45%; margin: 0 auto"
        label-width="80px"
        status-icon
        ref="contactFormRef"
        :model="contactForm">
        <el-form-item label="用户姓名" prop="name">
          <el-input placeholder="请输入用户姓名" v-model="contactForm.contactsName"></el-input>
        </el-form-item>
        <el-form-item label="证件类型" prop="certificatesType">
          <el-select style="width: 100%" placeholder="请选择证件类型" v-model="contactForm.contactsCertificatesType">
            <el-option :label="item.name" v-for="item in certificatesTypeData" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件号码" prop="name">
          <el-input placeholder="请输入证件号码" v-model="contactForm.contactsCertificatesNo"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="name">
          <el-input placeholder="请输入手机号码" v-model="contactForm.contactsPhone"></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="submit">提交</el-button>
          <el-button type="primary" @click="clearAllForm">重写</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="patient-box" v-else>
      <Patient v-for="item in patientData" :data="item" :key="item.id" @edit="editHandler" @delete="deletePatient" />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { reqGetAllPatients } from '@/api/hospital/index'
import type { PatientDataItem } from '@/api/hospital/type'
import { onBeforeMount, ref, reactive, onMounted } from 'vue'
import type { CertificatesTypeResponseDataItem } from '@/api/user/type'
import {
  reqCertificatesType,
  reqAddressOptions,
  reqAddPatient,
  reqEditPatient,
  reqPatientInfoById,
  reqDeletePatient
} from '@/api/user/index'
import { ElMessage, type CascaderProps } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'

const $route = useRoute()
const $router = useRouter()

const patientForm = reactive({
  name: '',
  certificatesType: '',
  certificatesNo: '',
  sex: 0,
  birthdate: '',
  phone: ''
})

const otherForm = reactive({
  isMarry: 0,
  isInsure: 0,
  addressSelected: [] as string[],
  address: ''
})

const contactForm = reactive({})

const patientData = ref<PatientDataItem[]>()
const showEdit = ref(false)
const editId = ref(0)

const certificatesTypeData = ref<CertificatesTypeResponseDataItem[]>()

const props: CascaderProps = {
  lazy: true,
  async lazyLoad(node, resolve) {
    const { data, code } = await reqAddressOptions((node.value as string) || '86')

    if (code == 200) {
      const showData = data.map((item) => {
        return {
          label: item.name,
          value: item.value,
          leaf: !item.hasChildren
        }
      })

      resolve(showData)
    }
  }
}

const getAllPatients = async () => {
  const { data, code } = await reqGetAllPatients()

  if (code == 200) {
    patientData.value = data
  }
}

const editHandler = (id: number) => {
  showEdit.value = true

  editId.value = id

  getEditInfo()
}

const addUser = () => {
  showEdit.value = true

  editId.value = 0
}

const getCertificateType = async () => {
  const { data, code } = await reqCertificatesType()

  if (code == 200) {
    certificatesTypeData.value = data
  }
}

const clearAllForm = () => {
  patientForm.name = ''
  patientForm.certificatesType = ''
  patientForm.certificatesNo = ''
  patientForm.sex = 0
  patientForm.birthdate = ''
  patientForm.phone = ''

  otherForm.isMarry = 0
  otherForm.isInsure = 0
  otherForm.addressSelected = []
  otherForm.address = ''

  contactForm.contactsName = ''
  contactForm.contactsCertificatesType = ''
  contactForm.contactsCertificatesNo = ''
  contactForm.contactsPhone = ''
}

const submit = async () => {
  if (editId.value) {
    let params = Object.assign(patientForm, otherForm, contactForm, { id: editId.value })

    const { code } = await reqEditPatient(params)

    if (code == 200) {
      ElMessage({ type: 'success', message: '修改成功' })
      showEdit.value = false
      editId.value = 0
      getAllPatients()
    } else {
      ElMessage({ type: 'error', message: '修改失败' })
    }
  } else {
    let params = Object.assign(patientForm, otherForm, contactForm)

    const { code } = await reqAddPatient(params)

    if (code == 200) {
      ElMessage({ type: 'success', message: '添加成功' })
      showEdit.value = false
      getAllPatients()
    } else {
      ElMessage({ type: 'error', message: '添加失败' })
    }
  }

  clearAllForm()

  if ($route.query.type) {
    $router.back()
  }
}

const getEditInfo = async () => {
  const { data, code } = await reqPatientInfoById(editId.value + '')

  if (code == 200) {
    Object.assign(patientForm, {
      name: data.name,
      certificatesType: data.certificatesType,
      certificatesNo: data.certificatesNo,
      sex: data.sex,
      birthdate: data.birthdate,
      phone: data.phone
    })

    Object.assign(otherForm, {
      isMarry: data.isMarry,
      isInsure: data.isInsure,
      address: data.address
    })

    Object.assign(contactForm, {
      contactsName: data.contactsName,
      contactsCertificatesType: data.contactsCertificatesType,
      contactsCertificatesNo: data.contactsCertificatesNo,
      contactsPhone: data.contactsPhone
    })
  }
}

const deletePatient = async (id: string) => {
  const { code } = await reqDeletePatient(id)

  if (code == 200) {
    getAllPatients()
    ElMessage({ type: 'success', message: '删除成功' })
  } else {
    ElMessage({ type: 'error', message: '删除失败' })
  }
}

onBeforeMount(() => {
  getAllPatients()
  getCertificateType()
})

const routeHandler = () => {
  if ($route.query.type === 'add') {
    addUser()
  }

  if ($route.query.type === 'edit') {
    editHandler(parseInt($route.query.id as string))
  }
}

onMounted(() => {
  routeHandler()
})
</script>

<style scoped lang="scss">
.box-card {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title {
      font-size: $lFontSize;
    }
  }
  .patient-box {
    display: flex;
    flex-wrap: wrap;
  }
  .edit {
    .tip {
      font-size: $sFontSize;
      color: #777;
    }
  }
}
</style>
