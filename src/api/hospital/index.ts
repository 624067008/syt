import axios from '@/utils/request'
import {
  HosRegResponse,
  HosDepartmentResponse,
  DepartmentScheduleRuleResponse,
  DepartmentScheduleListResponse,
  PatientResponse,
  ScheduleResponse
} from './type'

enum API {
  // 医院详情
  HOSPITAL_REG_URL = '/hosp/hospital/',
  // 医院科室
  HOSPITAL_DEPARTMENT_URL = '/hosp/hospital/department/',
  // 科室挂号时间
  DEPARTMENT_SCHEDULE_URL = '/hosp/hospital/auth/getBookingScheduleRule/',
  DEPARTMENT_SCHEDULELIST_URL = '/hosp/hospital/auth/findScheduleList/',
  PATIENT_URL = '/user/patient/auth/findAll',
  // 获取排班医生的数据
  SCHEDULE_URL = '/hosp/hospital/getSchedule/'
}

export const reqHospitalReg = (hoscode: string) => axios.get<any, HosRegResponse>(API.HOSPITAL_REG_URL + hoscode)

export const reqHospitalDepartment = (hoscode: string) =>
  axios.get<any, HosDepartmentResponse>(API.HOSPITAL_DEPARTMENT_URL + hoscode)

export const reqDepartmentScheduleRule = (hoscode: string, depcode: string, page: number, limit: number) =>
  axios.get<any, DepartmentScheduleRuleResponse>(`${API.DEPARTMENT_SCHEDULE_URL}${page}/${limit}/${hoscode}/${depcode}`)

export const reqScheduleList = (hoscode: string, depcode: string, workDate: string) =>
  axios.get<any, DepartmentScheduleListResponse>(`${API.DEPARTMENT_SCHEDULELIST_URL}${hoscode}/${depcode}/${workDate}`)

export const reqGetAllPatients = () => axios.get<any, PatientResponse>(API.PATIENT_URL)

export const reqGetSchedule = (id: string) => axios.get<any, ScheduleResponse>(API.SCHEDULE_URL + id)
