import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify } from 'src/views/Common/CommonCode'

export const MonthlyReportEmer = async (searchDatas, setviewData, setsearchFlag) => {
  const getEmergencyData = async searchDatas => {
    const result = await axioslogin.post('/qiemergency/viewList', searchDatas)
    return result.data
  }
  getEmergencyData(searchDatas).then(val => {
    const { success, data, message } = val
    if (success === 1) {
      setviewData(data)
      setsearchFlag(1)
      // if (reportSelect === 2) {
      //     setReturnflag(1)
      // } else {
      //     setReturnflag(0)
      // }
    } else if (success === 2) {
      infoNotify(message)
      setsearchFlag(0)
    }
  })
}
