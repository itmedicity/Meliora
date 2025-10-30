import { format } from 'date-fns'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'

export const RefreshIpPatients = async (qidept, count, setCount, depCode, id, dailyDate) => {
  const patchdata = {
    last_updatedate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    qi_dept_no: qidept
  }
  const getLastDate = async qidept => {
    const result = await axioslogin.get(`/qiendoscopy/getlast/${qidept}`)
    return result.data
  }
  const GetElliderData = async elliderSearch => {
    const result = await axiosellider.post('/qualityIndicator/ipList', elliderSearch)
    return result.data
  }
  const InsertIPData = async insertarray => {
    const result = await axioslogin.post('/qiInpatients/save', insertarray)
    return result.data
  }
  const UpdateImportedDate = async patchdata => {
    const result = await axioslogin.patch('/qiendoscopy/dateupdate', patchdata)
    return result.data
  }
  const GetDischargeDateForUpdate = async updateSearch => {
    const result = await axiosellider.post('/qualityIndicator/ipList', updateSearch)
    return result.data
  }
  const UpdateDischargeDate = async updateArray => {
    const result = await axioslogin.patch('/qiInpatients/dischargeDate', updateArray)
    return result.data
  }
  getLastDate(qidept).then(val => {
    const { success, data } = val
    if (success === 1) {
      const { last_updatedate } = data[0]
      const elliderSearch = {
        from: format(new Date(last_updatedate), 'dd/MM/yyyy HH:mm:ss'),
        to: format(new Date(), 'dd/MM/yyyy 23:59:59'),
        nsCode: depCode
      }
      GetElliderData(elliderSearch).then(value => {
        const { success, data } = value
        if (success === 1) {
          const insertarray = data?.map(val => {
            return {
              ip_no: val.IP_NO,
              ipd_date: format(new Date(val.IPD_DATE), 'yyyy-MM-dd HH:mm:ss'),
              ptno: val.PT_NO,
              ptname: val.PTC_PTNAME,
              ptsex: val.PTC_SEX,
              ptage: val.PTN_YEARAGE + 'Y ' + val.PTN_MONTHAGE + 'M ' + val.PTN_DAYAGE + 'D',
              ptaddrs1: val.PTC_LOADD1,
              ptaddrs2: val.PTC_LOADD2,
              ptmobile: val.PTC_MOBILE,
              ip_bed: val.BDC_NO,
              doctor_name: val.DOC_NAME,
              discharge_date: val.IPD_DISC === null ? null : format(new Date(val.IPD_DISC), 'yyyy-MM-dd HH:mm:ss'),
              qi_dept_no: qidept,
              create_user: id
            }
          })
          InsertIPData(insertarray).then(val => {
            const { success } = val
            if (success === 1) {
              const updateSearch = {
                from: format(new Date(dailyDate), 'dd/MM/yyyy 00:00:00'),
                to: format(new Date(dailyDate), 'dd/MM/yyyy 23:59:59'),
                nsCode: depCode
              }
              GetDischargeDateForUpdate(updateSearch).then(value => {
                const { success, data } = value
                if (success === 1) {
                  const updateArray = data?.map(val => {
                    return {
                      discharge_date:
                        val.IPD_DISC === null ? null : format(new Date(val.IPD_DISC), 'yyyy-MM-dd HH:mm:ss'),
                      ip_no: val.IP_NO
                    }
                  })
                  UpdateDischargeDate(updateArray).then(value => {
                    const { success } = value
                    if (success === 1) {
                      setCount(count + 1)
                    }
                  })
                }
              })
            }
          })
        } else if (success === 2) {
          const updateSearch = {
            from: format(new Date(dailyDate), 'dd/MM/yyyy 00:00:00'),
            to: format(new Date(dailyDate), 'dd/MM/yyyy 23:59:59'),
            nsCode: depCode
          }
          GetDischargeDateForUpdate(updateSearch).then(value => {
            const { success, data } = value
            if (success === 1) {
              const updateArray = data?.map(val => {
                return {
                  discharge_date: val.IPD_DISC === null ? null : format(new Date(val.IPD_DISC), 'yyyy-MM-dd HH:mm:ss'),
                  ip_no: val.IP_NO
                }
              })
              UpdateDischargeDate(updateArray).then(value => {
                const { success } = value
                if (success === 1) {
                  UpdateImportedDate(patchdata).then(value => {
                    const { success } = value
                    if (success === 1) {
                      setCount(count + 1)
                    }
                  })
                }
              })
            } else if (success === 2) {
              setCount(count + 1)
            }
          })
        }
      })
    } else if (success === 2) {
      const elliderSearch = {
        from: format(new Date(dailyDate), 'dd/MM/yyyy 00:00:00'),
        to: format(new Date(), 'dd/MM/yyyy 23:59:59'),
        nsCode: depCode
      }
      GetElliderData(elliderSearch).then(value => {
        const { success, data } = value
        if (success === 1) {
          const insertarray = data?.map(val => {
            return {
              ip_no: val.IP_NO,
              ipd_date: format(new Date(val.IPD_DATE), 'yyyy-MM-dd HH:mm:ss'),
              ptno: val.PT_NO,
              ptname: val.PTC_PTNAME,
              ptsex: val.PTC_SEX,
              ptage: val.PTN_YEARAGE + 'Y ' + val.PTN_MONTHAGE + 'M ' + val.PTN_DAYAGE + 'D',
              ptaddrs1: val.PTC_LOADD1,
              ptaddrs2: val.PTC_LOADD2,
              ptmobile: val.PTC_MOBILE,
              ip_bed: val.BDC_NO,
              doctor_name: val.DOC_NAME,
              discharge_date: val.IPD_DISC === null ? null : format(new Date(val.IPD_DISC), 'yyyy-MM-dd HH:mm:ss'),
              qi_dept_no: qidept,
              create_user: id
            }
          })
          InsertIPData(insertarray).then(val => {
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
