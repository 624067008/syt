import axios from '@/utils/request'
import type {
  ICodeResponseData,
  ILoginData,
  ILoginResponseData,
  ILoginParamsResponseData,
  IPatientOrderResponse,
  IOrderInfoResponse,
  WxPayResponse,
  UserInfoResponse,
  CertificatesTypeResponse,
  UserInfoListResponse,
  AllPatientUserInfoListResponse,
  AllOrderStatusResponse,
  AddressOptionResponse,
  AddUserParams,
  EditUserParams,
  PatientInfoResponse
} from './type'

enum API {
  GET_USER_CODE_URL = '/sms/send/',
  USER_LOGIN_URL = '/user/login/',
  WX_LOGIN_PARAMS = '/user/weixin/getLoginParam/?',
  PATIENT_ORDER_URL = '/order/orderInfo/auth/submitOrder/',
  ORDERINFO_URL = '/order/orderInfo/auth/getOrderInfo/',
  CANCEL_ORDER_URL = '/order/orderInfo/auth/cancelOrder/',
  WECHAT_PAYCODE_URL = '/order/weixin/createNative/',
  PAY_STATUS_URL = '/order/weixin/queryPayStatus/',
  USER_INFO_URL = '/user/auth/getUserInfo',
  CERTIFICATES_TYPE_URL = '/cmn/dict/findByDictCode/CertificatesType',
  USER_AUTH_URL = '/user/auth/userAuah',
  ORDERINFOLIST_URL = '/order/orderInfo/auth/',
  ALL_PATIENT_URL = '/user/patient/auth/findAll',
  ORDER_STATUS_URL = '/order/orderInfo/auth/getStatusList',
  ADDRESS_OPTIONS_URL = '/cmn/dict/findByParentId/',
  ADD_PATIENT_URL = '/user/patient/auth/save',
  EDIT_PATIENT_URL = '/user/patient/auth/update',
  PATIENT_INFO_URL = '/user/patient/auth/get/',
  DELETE_USER_URL = '/user/patient/auth/remove/'
}

export const reqUserCode = (phone: string) => axios.get<any, ICodeResponseData>(`${API.GET_USER_CODE_URL}${phone}`)

export const reqUserLogin = (data: ILoginData) => axios.post<any, ILoginResponseData>(API.USER_LOGIN_URL, data)

export const reqGetLoginParams = (redirectUri: string) =>
  axios.get<any, ILoginParamsResponseData>(API.WX_LOGIN_PARAMS + 'wxRedirectUri=' + redirectUri)

export const reqPatientOrder = (hoscode: string, scheduleId: string, patientId: string) =>
  axios.post<any, IPatientOrderResponse>(API.PATIENT_ORDER_URL + `${hoscode}/${scheduleId}/${patientId}`)

export const reqOrderInfo = (id: string) => axios.get<any, IOrderInfoResponse>(API.ORDERINFO_URL + id)

export const reqCancelOrder = (id: string) => axios.get<any, any>(API.CANCEL_ORDER_URL + id)

export const reqWXCode = (id: string) => axios.get<any, WxPayResponse>(API.WECHAT_PAYCODE_URL + id)

export const reqPayStatus = (id: string) => axios.get<any, any>(API.PAY_STATUS_URL + id)

export const reqUserInfo = () => axios.get<any, UserInfoResponse>(API.USER_INFO_URL)

export const reqCertificatesType = () => axios.get<any, CertificatesTypeResponse>(API.CERTIFICATES_TYPE_URL)

export const reqUserAuth = (data: {
  certificatesNo: string
  certificatesType: string
  certificatesUrl: string
  name: string
}) => axios.post<any, any>(API.CERTIFICATES_TYPE_URL, data)

export const reqOrderInfoList = (page: number, limit: number, patientId?: string, orderStatus?: string) =>
  axios.get<any, UserInfoListResponse>(
    API.ORDERINFOLIST_URL + `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`
  )

export const reqAllPatients = () => axios.get<any, AllPatientUserInfoListResponse>(API.ALL_PATIENT_URL)

export const reqOrderStatus = () => axios.get<any, AllOrderStatusResponse>(API.ORDER_STATUS_URL)

export const reqAddressOptions = (id: string = '86') =>
  axios.get<any, AddressOptionResponse>(API.ADDRESS_OPTIONS_URL + id)

export const reqAddPatient = (data: AddUserParams) => axios.post<any, any>(API.ADD_PATIENT_URL, data)

export const reqEditPatient = (data: EditUserParams) => axios.put<any, any>(API.EDIT_PATIENT_URL, data)

export const reqPatientInfoById = (id: string) => axios.get<any, PatientInfoResponse>(API.PATIENT_INFO_URL + id)

export const reqDeletePatient = (id: string) => axios.delete<any, any>(API.DELETE_USER_URL + id)
