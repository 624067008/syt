// Response类型
export interface IResponseData {
  code: number
  message: string
  ok: boolean
}

// 医院数据类型
export interface IHospital {
  id: string
  createTime: string
  updateTime: string
  isDeleted: 0 | 1
  param: {
    fullAddress: string
    hostypeString: string
  }
  hoscode: string
  hosname: string
  hostype: string
  provinceCode: string
  cityCode: string
  districtCode: string
  address: string
  logoData: string
  intro: null
  route: string
  status: number
  bookingRule: {
    cycle: number
    quitDay: number
    quitTime: string
    releaseTime: string
    rule: string[]
    stopTime: string
  }
}

export type Content = IHospital[]

export interface HospitalResponseData extends IResponseData {
  data: {
    content: Content
    pageable: Object
    totalPages: number
    totalElements: number
    last: boolean
    first: boolean
    sort: {}
    numberOfElements: number
    size: number
    number: number
    empty: boolean
  }
}

// 等级 城市 参数
export type levelCity = 'Hostype' | 'Beijin'

export interface IHosTypeItem {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {}
  parentId: 10000
  name: string
  value: string
  dictCode: string
  hasChildren: boolean
}

export type hosType = IHosTypeItem[]

export interface HosTypeResponseData extends IResponseData {
  data: hosType
}

export interface FindHospitalResponseData extends IResponseData {
  data: Content
}
