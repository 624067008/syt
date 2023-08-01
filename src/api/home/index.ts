import axios from '@/utils/request.ts'
import { HospitalResponseData, levelCity, HosTypeResponseData, FindHospitalResponseData } from './type'
// 接口地址统一管理
enum API {
  HOSPITAL_URL = '/hosp/hospital/',
  HOSPITAL_LEVEL_CITY_URL = '/cmn/dict/findByDictCode/',
  HOSPITAL_INFO_URL = '/hosp/hospital/findByHosname/'
}

export const reqHospitalInfo = (
  page: number = 1,
  limit: number = 10,
  hostype: string = '',
  districtCode: string = ''
) =>
  axios.get<any, HospitalResponseData>(
    API.HOSPITAL_URL + `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
  )

export const reqHospitalLevelCity = (levelCity: levelCity) =>
  axios.get<any, HosTypeResponseData>(API.HOSPITAL_LEVEL_CITY_URL + levelCity)

export const reqFindHospitals = (hosname: string) =>
  axios.get<any, FindHospitalResponseData>(API.HOSPITAL_INFO_URL + hosname)
