import { IResponseData } from '../home/type'

export interface ICodeResponseData extends IResponseData {
  data: string
}

export interface ILoginData {
  phone: string
  code: string
}

export interface ILoginResponseData extends IResponseData {
  data: {
    name: string
    token: string
  }
}
export interface LoginParamsData {
  redirectUri: string
  appid: string
  scope: string
  state: string
}

export interface ILoginParamsResponseData extends IResponseData {
  data: LoginParamsData
}

export interface IPatientOrderResponse extends IResponseData {
  data: number
}

export interface IOrderInfoData {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    orderStatusString: string
  }
  userId: number
  outTradeNo: string
  hoscode: string
  hosname: string
  depcode: string
  depname: string
  scheduleId: string
  title: string
  reserveDate: string
  reserveTime: number
  patientId: number
  patientName: string
  patientPhone: string
  hosRecordId: string
  number: number
  fetchTime: string
  fetchAddress: string
  amount: number
  quitTime: string
  orderStatus: number
}

export interface IOrderInfoResponse extends IResponseData {
  data: IOrderInfoData
}

export interface WxPayResponseData {
  codeUrl: string
  orderId: number
  totalFee: number
  resultCode: string
}

export interface WxPayResponse extends IResponseData {
  data: WxPayResponseData
}

export interface UserInfoResponseData {
  authStatus: number
  certificatesNo: string
  certificatesType: string
  certificatesUrl: string
  createTime: string
  id: number
  isDeleted: number
  name: string
  nickName: null
  openid: null
  param: {}
  phone: string
  status: number
  updateTime: string
}

export interface UserInfoResponse extends IResponseData {
  data: UserInfoResponseData
}

export interface CertificatesTypeResponseDataItem {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {}
  parentId: number
  name: string
  value: string
  dictCode: string
  hasChildren: boolean
}

export interface CertificatesTypeResponse extends IResponseData {
  data: CertificatesTypeResponseDataItem[]
}

export interface UserInfoListResponseData {
  current: number
  hitCount: boolean
  orders: null
  pages: number
  records: IOrderInfoData
  searchCount: boolean
  size: number
  total: number
}

export interface UserInfoListResponse extends IResponseData {
  data: UserInfoListResponseData
}

export interface AllPatientUserInfoListResponseDataItem {
  address: string
  birthdate: string
  cardNo: string
  certificatesNo: string
  certificatesType: string
  cityCode: number
  contactsCertificatesNo: string
  contactsCertificatesType: string
  contactsName: string
  contactsPhone: string
  createTime: string
  districtCode: number
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
  provinceCode: number
  sex: number
  status: string
  updateTime: string
  userId: number
}

export interface AllPatientUserInfoListResponse extends IResponseData {
  data: AllPatientUserInfoListResponseDataItem[]
}

export interface AllOrderStatusResponseDataItem {
  comment: string
  status: number
}

export interface AllOrderStatusResponse extends IResponseData {
  data: AllOrderStatusResponseDataItem[]
}

export interface AddressOptionResponseDataItem {
  createTime: string
  dictCode: string
  hasChildren: boolean
  id: number
  isDeleted: number
  name: string
  param: {}
  parentId: number
  updateTime: string
  value: string
}

export interface AddressOptionResponse extends IResponseData {
  data: AddressOptionResponseDataItem[]
}

export interface AddUserParams {
  name: string
  certificatesType: string
  certificatesNo: string
  sex: number
  birthdate: string
  phone: string
  isMarry: number
  isInsure: number
  addressSelected: string[]
  address: string
  contactsName: string
  contactsCertificatesType: string
  contactsCertificatesNo: string
  contactsPhone: string
}

export interface EditUserParams extends AddUserParams {
  id: number
}

export interface PatientInfoResponseData {
  id: number
  createTime: string
  updateTime: string
  isDeleted: number
  param: {
    certificatesTypeString: null
    contactsCertificatesTypeString: null
    cityString: null
    fullAddress: string
    districtString: null
    provinceString: null
  }
  userId: number
  name: string
  certificatesType: string
  certificatesNo: string
  sex: number
  birthdate: null
  phone: string
  isMarry: number
  provinceCode: null
  cityCode: null
  districtCode: null
  address: string
  contactsName: string
  contactsCertificatesType: string
  contactsCertificatesNo: string
  contactsPhone: string
  isInsure: number
  cardNo: null
  status: string
}

export interface PatientInfoResponse extends IResponseData {
  data: PatientInfoResponseData
}
