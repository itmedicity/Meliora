import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify } from 'src/views/Common/CommonCode'

export const EndoscopyMonthlyReportView = async (searchDatas, setviewData, setsearchFlag, setIpViewReport) => {
  const getEndoscopyData = async searchDatas => {
    const result = await axioslogin.post('/qiendoscopy/view', searchDatas)
    return result.data
  }
  const getIPEndoscopyData = async searchDatas => {
    const result = await axioslogin.post('/qiendoscopy/IPReportview', searchDatas)
    return result.data
  }
  getEndoscopyData(searchDatas).then(val => {
    const { success, data } = val
    if (success === 1) {
      setviewData(data)
      setsearchFlag(1)
      getIPEndoscopyData(searchDatas).then(val => {
        const { success, data } = val
        if (success === 1) {
          setIpViewReport(data)
        }
      })
    } else if (success === 2) {
      getIPEndoscopyData(searchDatas).then(val => {
        const { success, data, message } = val
        if (success === 1) {
          setIpViewReport(data)
          setsearchFlag(1)
        } else if (success === 2) {
          infoNotify(message)
          setsearchFlag(0)
        }
      })
    }
  })
}
