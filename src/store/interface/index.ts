import type { HosRegData, HosDepartmentData } from '@/api/hospital/type'

export interface DetailState {
  hospitalInfo: HosRegData
  department: HosDepartmentData
}

export interface UserState {
  isLogin: boolean
  show: boolean
  token: string
  name: string
  code: string
}
