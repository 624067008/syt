import { IResponseData } from '../home/type'

export interface HosRegData {
  bookingRule: {
    cycle: number
    releaseTime: string
    stopTime: string
    quitDay: number
    quitTime: string
    rule: string[]
  }
  hospital: {
    id: string
    createTime: string
    updateTime: string
    isDeleted: number
    param: {
      hostypeString: string
      fullAddress: string
    }
    hoscode: string
    hosname: string
    hostype: string
    provinceCode: string
    cityCode: string
    districtCode: string
    address: string
    logoData: string
    status: number
    intro: string
    route: string
    bookingRule: {}
  }
}

export interface HosRegResponse extends IResponseData {
  data: HosRegData
}

export interface HosDepartmentDataItem {
  depcode: 'a4e171f4cf9b6816acdfb9ae62c414d7'
  depname: '专科'
  children?: HosDepartmentDataItem[]
}

export type HosDepartmentData = HosDepartmentDataItem[]

export interface HosDepartmentResponse extends IResponseData {
  data: HosDepartmentData
}

export interface DepartmentScheduleRuleDataItem {
  workDate: string
  workDateMd: string
  dayOfWeek: string
  docCount: number
  reservedNumber: null
  availableNumber: number
  status: number
}

export interface DepartmentScheduleRuleData {
  total: 10
  bookingScheduleList: DepartmentScheduleRuleDataItem[]
  baseMap: {
    workDateString: string
    releaseTime: string
    bigname: string
    stopTime: string
    depname: string
    hosname: string
  }
}

export interface DepartmentScheduleRuleResponse extends IResponseData {
  data: DepartmentScheduleRuleData
}

export interface DepartmentScheduleListDataItem {
  id: string
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    dayOfWeek: string
    depname: string
    hosname: string
  }
  hoscode: string
  depcode: string
  title: string
  docname: string
  skill: string
  workDate: string
  workTime: number
  reservedNumber: number
  availableNumber: number
  amount: number
  status: number
  hosScheduleId: string
}

export interface DepartmentScheduleListResponse extends IResponseData {
  data: DepartmentScheduleListDataItem[]
}

export interface PatientDataItem {
  address: string
  birthdate: string
  cardNo: string
  certificatesNo: string
  certificatesType: string
  cityCode: string
  contactsCertificatesNo: string
  contactsCertificatesType: string
  contactsName: string
  contactsPhone: string
  createTime: string
  districtCode: string
  id: number
  isDeleted: number
  isInsure: number
  isMarry: number
  name: string
  param: {
    certificatesTypeString: string
    cityString: string
    contactsCertificatesTypeString: string
    districtString: string
    fullAddress: string
    provinceString: string
  }
  phone: string
  provinceCode: string
  sex: number
  status: string
  updateTime: string
  userId: number
}

export interface PatientResponse extends IResponseData {
  data: PatientDataItem[]
}
export interface ScheduleData {
  id: string
  createTime: string
  updateTime: string
  isDeleted: 0
  param: {
    dayOfWeek: string
    depname: string
    hosname: string
  }
  hoscode: string
  depcode: string
  title: string
  docname: string
  skill: string
  workDate: string
  workTime: number
  reservedNumber: number
  availableNumber: number
  amount: number
  status: number
  hosScheduleId: string
}

export interface ScheduleResponse extends IResponseData {
  data: ScheduleData
}
