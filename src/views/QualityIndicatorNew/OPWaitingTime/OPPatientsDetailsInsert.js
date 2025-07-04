import { format } from 'date-fns'
import { axiosellider, axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'

export const OPPatientsDetailsInsert = async (qidept, depCode, searchDate, id) => {
  const patchdata = {
    last_updatedate: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    qi_dept_no: qidept
  }
  const getLastDate = async qidept => {
    const result = await axioslogin.get(`/qiendoscopy/getlast/${qidept}`)
    return result.data
  }
  const GetElliderData = async elliderSearch => {
    const result = await axiosellider.post('/qualityIndicator/assessment', elliderSearch)
    return result.data
  }
  const InsertData = async insertArray => {
    const result = await axioslogin.post('/InitialAsessment/insert', insertArray)
    return result.data
  }
  const UpdateImportedDate = async patchdata => {
    const result = await axioslogin.patch('/qiendoscopy/dateupdate', patchdata)
    return result.data
  }
  const GetServiceTimeForUpdate = async updateSearch => {
    const result = await axiosellider.post('/qualityIndicator/assessment', updateSearch)
    return result.data
  }
  const UpdateServiceTime = async updateArray => {
    const result = await axioslogin.patch('/InitialAsessment/updateTime', updateArray)
    return result.data
  }
  getLastDate(qidept).then(val => {
    const { success, data } = val
    if (success === 1) {
      const { last_updatedate } = data[0]
      const elliderSearch = {
        from: format(new Date(last_updatedate), 'dd/MM/yyyy HH:mm:ss'),
        to: format(new Date(), 'dd/MM/yyyy 23:59:59'),
        depCode: depCode
      }
      GetElliderData(elliderSearch).then(value => {
        const { success, data } = value
        if (success === 1) {
          const insertArray = data?.map(val => {
            return {
              patient_arrived_date: format(new Date(val.VSD_DATE), 'yyyy-MM-dd HH:mm:ss'),
              ptno: val.PT_NO,
              ptname: val.PTC_PTNAME,
              ptmobile: val.PTC_MOBILE,
              doctor_name: val.DOC_NAME,
              qi_dept_no: qidept,
              assessment_start:
                val.ASSESS_START_DATE !== null ? format(new Date(val.ASSESS_START_DATE), 'yyyy-MM-dd HH:mm:ss') : null,
              assessment_end:
                val.ASSESS_END_DATE !== null ? format(new Date(val.ASSESS_END_DATE), 'yyyy-MM-dd HH:mm:ss') : null,
              sumof_service_time: val.SERVICE_TIME === null ? 0 : val.SERVICE_TIME,
              create_user: id,
              consult_start_date:
                val.CONSULT_START_DATE === null
                  ? null
                  : format(new Date(val.CONSULT_START_DATE), 'yyyy-MM-dd HH:mm:ss'),
              complaint_entry_date:
                val.COMP_DATE === null ? null : format(new Date(val.COMP_DATE), 'yyyy-MM-dd HH:mm:ss'),
              investigation_req_date:
                val.INVESTIGATION_DATE === null
                  ? null
                  : format(new Date(val.INVESTIGATION_DATE), 'yyyy-MM-dd HH:mm:ss'),
              prescription_req_date:
                val.PRESCRIPTION_DATE === null ? null : format(new Date(val.PRESCRIPTION_DATE), 'yyyy-MM-dd HH:mm:ss'),
              reference_req_date: val.VRD_DATE === null ? null : format(new Date(val.VRD_DATE), 'yyyy-MM-dd HH:mm:ss')
            }
          })
          InsertData(insertArray).then(val => {
            const { success } = val
            if (success === 1) {
              const updateSearch = {
                from: format(new Date(searchDate), 'dd/MM/yyyy 00:00:00'),
                to: format(new Date(searchDate), 'dd/MM/yyyy 23:59:59'),
                depCode: depCode
              }
              GetServiceTimeForUpdate(updateSearch).then(value => {
                const { success, data } = value
                if (success === 1) {
                  const updateArray = data?.map(val => {
                    return {
                      patient_arrived_date: format(new Date(val.VSD_DATE), 'yyyy-MM-dd HH:mm:ss'),
                      ptno: val.PT_NO,
                      qi_dept_no: qidept,
                      assessment_start:
                        val.ASSESS_START_DATE !== null
                          ? format(new Date(val.ASSESS_START_DATE), 'yyyy-MM-dd HH:mm:ss')
                          : null,
                      assessment_end:
                        val.ASSESS_END_DATE !== null
                          ? format(new Date(val.ASSESS_END_DATE), 'yyyy-MM-dd HH:mm:ss')
                          : null,
                      sumof_service_time: val.SERVICE_TIME === null ? 0 : val.SERVICE_TIME,
                      consult_start_date:
                        val.CONSULT_START_DATE === null
                          ? null
                          : format(new Date(val.CONSULT_START_DATE), 'yyyy-MM-dd HH:mm:ss'),
                      complaint_entry_date:
                        val.COMP_DATE === null ? null : format(new Date(val.COMP_DATE), 'yyyy-MM-dd HH:mm:ss'),
                      investigation_req_date:
                        val.INVESTIGATION_DATE === null
                          ? null
                          : format(new Date(val.INVESTIGATION_DATE), 'yyyy-MM-dd HH:mm:ss'),
                      prescription_req_date:
                        val.PRESCRIPTION_DATE === null
                          ? null
                          : format(new Date(val.PRESCRIPTION_DATE), 'yyyy-MM-dd HH:mm:ss'),
                      reference_req_date:
                        val.VRD_DATE === null ? null : format(new Date(val.VRD_DATE), 'yyyy-MM-dd HH:mm:ss')
                    }
                  })
                  UpdateServiceTime(updateArray).then(value => {
                    const { success, message } = value
                    if (success === 1) {
                      succesNotify(message)
                    }
                  })
                }
              })
            }
          })
        } else if (success === 2) {
          const updateSearch = {
            from: format(new Date(searchDate), 'dd/MM/yyyy 00:00:00'),
            to: format(new Date(searchDate), 'dd/MM/yyyy 23:59:59'),
            depCode: depCode
          }
          GetServiceTimeForUpdate(updateSearch).then(value => {
            const { success, data } = value
            if (success === 1) {
              const updateArray = data?.map(val => {
                return {
                  patient_arrived_date: format(new Date(val.VSD_DATE), 'yyyy-MM-dd HH:mm:ss'),
                  ptno: val.PT_NO,
                  qi_dept_no: qidept,
                  assessment_start:
                    val.ASSESS_START_DATE !== null
                      ? format(new Date(val.ASSESS_START_DATE), 'yyyy-MM-dd HH:mm:ss')
                      : null,
                  assessment_end:
                    val.ASSESS_END_DATE !== null ? format(new Date(val.ASSESS_END_DATE), 'yyyy-MM-dd HH:mm:ss') : null,
                  sumof_service_time: val.SERVICE_TIME === null ? 0 : val.SERVICE_TIME,
                  consult_start_date:
                    val.CONSULT_START_DATE === null
                      ? null
                      : format(new Date(val.CONSULT_START_DATE), 'yyyy-MM-dd HH:mm:ss'),
                  complaint_entry_date:
                    val.COMP_DATE === null ? null : format(new Date(val.COMP_DATE), 'yyyy-MM-dd HH:mm:ss'),
                  investigation_req_date:
                    val.INVESTIGATION_DATE === null
                      ? null
                      : format(new Date(val.INVESTIGATION_DATE), 'yyyy-MM-dd HH:mm:ss'),
                  prescription_req_date:
                    val.PRESCRIPTION_DATE === null
                      ? null
                      : format(new Date(val.PRESCRIPTION_DATE), 'yyyy-MM-dd HH:mm:ss'),
                  reference_req_date:
                    val.VRD_DATE === null ? null : format(new Date(val.VRD_DATE), 'yyyy-MM-dd HH:mm:ss')
                }
              })
              UpdateServiceTime(updateArray).then(value => {
                const { success } = value
                if (success === 1) {
                  UpdateImportedDate(patchdata).then(value => {
                    const { success } = value
                    if (success === 1) {
                      succesNotify('Generated')
                    }
                  })
                }
              })
            } else if (success === 2) {
              infoNotify('No Report Found')
            }
          })
        }
      })
    } else if (success === 2) {
      const elliderSearch = {
        from: format(new Date(searchDate), 'dd/MM/yyyy 00:00:00'),
        to: format(new Date(), 'dd/MM/yyyy 23:59:59'),
        depCode: depCode
      }
      GetElliderData(elliderSearch).then(value => {
        const { success, data } = value
        if (success === 1) {
          const insertArray = data?.map(val => {
            return {
              patient_arrived_date: format(new Date(val.VSD_DATE), 'yyyy-MM-dd HH:mm:ss'),
              ptno: val.PT_NO,
              ptname: val.PTC_PTNAME,
              ptmobile: val.PTC_MOBILE,
              doctor_name: val.DOC_NAME,
              qi_dept_no: qidept,
              assessment_start:
                val.ASSESS_START_DATE !== null ? format(new Date(val.ASSESS_START_DATE), 'yyyy-MM-dd HH:mm:ss') : null,
              assessment_end:
                val.ASSESS_END_DATE !== null ? format(new Date(val.ASSESS_END_DATE), 'yyyy-MM-dd HH:mm:ss') : null,
              sumof_service_time: val.SERVICE_TIME === null ? 0 : val.SERVICE_TIME,
              create_user: id,
              consult_start_date:
                val.CONSULT_START_DATE !== null
                  ? format(new Date(val.CONSULT_START_DATE), 'yyyy-MM-dd HH:mm:ss')
                  : null,
              complaint_entry_date:
                val.COMP_DATE === null ? null : format(new Date(val.COMP_DATE), 'yyyy-MM-dd HH:mm:ss'),
              investigation_req_date:
                val.INVESTIGATION_DATE === null
                  ? null
                  : format(new Date(val.INVESTIGATION_DATE), 'yyyy-MM-dd HH:mm:ss'),
              prescription_req_date:
                val.PRESCRIPTION_DATE === null ? null : format(new Date(val.PRESCRIPTION_DATE), 'yyyy-MM-dd HH:mm:ss'),
              reference_req_date: val.VRD_DATE === null ? null : format(new Date(val.VRD_DATE), 'yyyy-MM-dd HH:mm:ss')
            }
          })
          InsertData(insertArray).then(val => {
            const { success, message } = val
            if (success === 1) {
              succesNotify(message)
            }
          })
        } else if (success === 2) {
          // no oracle data
          succesNotify('Generated')
        }
      })
    }
  })
}
