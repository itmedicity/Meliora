import { format } from 'date-fns'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'

export const RefreshEmergency = async (qidept, count, setCount, depCode, id, dailyDate) => {
  const patchdata = {
    last_updatedate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    qi_dept_no: qidept,
  }
  const getLastDate = async qidept => {
    const result = await axioslogin.get(`/qiendoscopy/getlast/${qidept}`)
    return result.data
  }
  const GetElliderData = async elliderSearch => {
    const result = await axiosellider.post('/qualityIndicator/patientList', elliderSearch)
    return result.data
  }
  const InsertEmergencyData = async insertArray => {
    const result = await axioslogin.post('/qiemergency/insertData', insertArray)
    return result.data
  }
  const UpdateImportedDate = async patchdata => {
    const result = await axioslogin.patch('/qiendoscopy/dateupdate', patchdata)
    return result.data
  }
  getLastDate(qidept).then(val => {
    const { success, data } = val
    if (success === 1) {
      const { last_updatedate } = data[0]
      const elliderSearch = {
        from: format(new Date(last_updatedate), 'dd/MM/yyyy HH:mm:ss'),
        to: format(new Date(), 'dd/MM/yyyy 23:59:59'),
        depCode: depCode,
      }
      GetElliderData(elliderSearch).then(value => {
        const { success, data } = value
        if (success === 1) {
          const insertArray = data?.map(val => {
            return {
              patient_arrived_date: format(new Date(val.VSD_DATE), 'yyyy-MM-dd HH:mm:ss'),
              ptno: val.PT_NO,
              ptname: val.PTC_PTNAME,
              ptsex: val.PTC_SEX,
              ptage: val.PTN_YEARAGE + 'Y ' + val.PTN_MONTHAGE + 'M ' + val.PTN_DAYAGE + 'D',
              ptaddrs1: val.PTC_LOADD1,
              ptaddrs2: val.PTC_LOADD2,
              ptaddrs3: val.PTC_LOADD3,
              ptaddrs4: val.PTC_LOADD4,
              doctor_name: val.DOC_NAME,
              qi_dept_no: qidept,
              // qi_dept_code: val.DP_CODE,
              create_user: id,
              ptmobile: val.PTC_MOBILE,
              visit_token: val.VSN_TOKEN,
            }
          })
          InsertEmergencyData(insertArray).then(val => {
            const { success } = val
            if (success === 1) {
              setCount(count + 1)
            }
          })
        } else if (success === 2) {
          UpdateImportedDate(patchdata).then(value => {
            const { success } = value
            if (success === 1) {
              setCount(count + 1)
            }
          })
        }
      })
    } else if (success === 2) {
      const elliderSearch = {
        from: format(new Date(dailyDate), 'dd/MM/yyyy 00:00:00'),
        to: format(new Date(), 'dd/MM/yyyy 23:59:59'),
        depCode: depCode,
      }
      GetElliderData(elliderSearch).then(value => {
        const { success, data } = value
        if (success === 1) {
          const insertArray = data?.map(val => {
            return {
              patient_arrived_date: format(new Date(val.VSD_DATE), 'yyyy-MM-dd HH:mm:ss'),
              ptno: val.PT_NO,
              ptname: val.PTC_PTNAME,
              ptsex: val.PTC_SEX,
              ptage: val.PTN_YEARAGE + 'Y ' + val.PTN_MONTHAGE + 'M ' + val.PTN_DAYAGE + 'D',
              ptaddrs1: val.PTC_LOADD1,
              ptaddrs2: val.PTC_LOADD2,
              ptaddrs3: val.PTC_LOADD3,
              ptaddrs4: val.PTC_LOADD4,
              doctor_name: val.DOC_NAME,
              qi_dept_no: qidept,
              create_user: id,
              ptmobile: val.PTC_MOBILE,
              visit_token: val.VSN_TOKEN,
            }
          })
          InsertEmergencyData(insertArray).then(val => {
            const { success } = val
            if (success === 1) {
              setCount(count + 1)
            }
          })
        } else if (success === 2) {
          // no oracle data
          // infoNotify(message)
        }
      })
    }
  })
}
