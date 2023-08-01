import { defineStore } from 'pinia'
import { reqHospitalReg, reqHospitalDepartment } from '@/api/index'
import { DetailState } from '../interface/index'
import type { HosRegResponse, HosRegData, HosDepartmentData } from '@/api/hospital/type'

const useDetailStore = defineStore('Ditail', {
  state: (): DetailState => {
    return {
      hospitalInfo: {} as HosRegData,
      department: [] as HosDepartmentData
    }
  },
  getters: {},
  actions: {
    async getHospital(hoscode: string) {
      const { data, code }: HosRegResponse = await reqHospitalReg(hoscode)

      if (code == 200) {
        this.hospitalInfo = data
      }
    },
    async getDepartment(hoscode: string) {
      const { data, code } = await reqHospitalDepartment(hoscode)

      if (code === 200) {
        this.department = data
      }
    }
  }
})

export default useDetailStore
