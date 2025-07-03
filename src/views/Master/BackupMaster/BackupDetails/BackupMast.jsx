import React from 'react'
import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { memo } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getBackupDetails } from 'src/redux/actions/BackupDetails.action'
import { getScheduleTime } from 'src/redux/actions/BackupScheduleTime.action'
import { getScheduleType } from 'src/redux/actions/BackupScheduleType.action'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import BackupScheduleSelect from 'src/views/CommonSelectCode/BackupScheduleSelect'
import BackupTimeSelect from 'src/views/CommonSelectCode/BackupTimeSelect'
import BackupTypeSelect from 'src/views/CommonSelectCode/BackupTypeSelect'
import CardMaster from 'src/views/Components/CardMaster'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import BackupMastTable from './BackupMastTable'
import { CssVarsProvider } from '@mui/joy'
import moment from 'moment'
import { addDays } from 'date-fns'
import { getDepartment } from 'src/redux/actions/Department.action'
import AmDepartmentSelecct from 'src/views/CommonSelectCode/AmDepartmentSelecct'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useNavigate } from 'react-router-dom'

const BackupMast = () => {
  const history = useNavigate()
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  const [edit, setEdit] = useState(0)
  const [backupType, setBackupType] = useState(0)
  const [scheduleType, setScheduleType] = useState(0)
  const [scheduleTime, setScheduleTime] = useState([])
  const [editScheduleType, seteditScheduleType] = useState(0)
  const [days, setdays] = useState(0)
  const [backupDept, setbackupDept] = useState(0)
  const [deptName, setDeptName] = useState('')

  const backtoSetting = useCallback(() => {
    history('/Home/Settings')
  }, [history])
  const id = useSelector(state => {
    return state?.LoginUserData.empid
  })
  useEffect(() => {
    dispatch(getScheduleType())
    dispatch(getScheduleTime())
    dispatch(getBackupDetails())
    dispatch(getDepartment())
  }, [dispatch])
  const [backupstore, setBackupstore] = useState({
    backup_slno: '0',
    backupname: '',
    ipadd1: '',
    ipadd2: '',
    compname1: '',
    compname2: '',
    physicalLoc1: '',
    physicalLoc2: '',
    backup_selected_date: '',
    backup_active_status: true,
  })
  const {
    backup_slno,
    backupname,
    ipadd1,
    ipadd2,
    compname1,
    compname2,
    physicalLoc1,
    physicalLoc2,
    backup_selected_date,
    backup_active_status,
  } = backupstore
  const reset = useCallback(() => {
    const frmdata = {
      backup_slno: '0',
      backupname: '',
      ipadd1: '',
      ipadd2: '',
      compname1: '',
      compname2: '',
      physicalLoc1: '',
      physicalLoc2: '',
      backup_selected_date: '',
      backup_active_status: false,
    }
    setBackupstore(frmdata)
    setBackupType(0)
    setScheduleType(0)
    setScheduleTime([])
    setEdit(0)
    setCount(0)
    setdays(0)
    seteditScheduleType(0)
    setbackupDept(0)
  }, [
    setBackupstore,
    setBackupType,
    setScheduleType,
    setScheduleTime,
    setEdit,
    setCount,
    setdays,
    setbackupDept,
  ])

  const UpdateBackupChecksDetails = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setBackupstore({ ...backupstore, [e.target.name]: value })
    },
    [backupstore]
  )
  const Selecteddayschange = useCallback(e => {
    setdays(e.target.value)
  }, [])
  const refreshWindow = useCallback(() => {
    reset()
  }, [reset])
  const postdata = useMemo(() => {
    return {
      backup_type: backupType,
      backup_name: backupname,
      backup_location: backupDept,
      backup_device_ip: ipadd1,
      backup_device_name: compname1,
      backup_device_location: physicalLoc1,
      transferred_device_ip: ipadd2,
      transferred_device_name: compname2,
      transferred_device_location: physicalLoc2,
      backup_schedule_type: scheduleType,
      backup_schedule_time: scheduleTime,
      selected_days: days,
      create_user: id,
      backup_active_status: backup_active_status === true ? 1 : 0,
    }
  }, [
    backupType,
    backupname,
    backupDept,
    ipadd1,
    compname1,
    physicalLoc1,
    ipadd2,
    compname2,
    physicalLoc2,
    scheduleType,
    scheduleTime,
    days,
    id,
    backup_active_status,
  ])

  const patchdata = useMemo(() => {
    return {
      backup_slno: backup_slno,
      backup_type: backupType,
      backup_name: backupname,
      backup_location: backupDept,
      backup_device_ip: ipadd1,
      backup_device_name: compname1,
      backup_device_location: physicalLoc1,
      transferred_device_ip: ipadd2,
      transferred_device_name: compname2,
      transferred_device_location: physicalLoc2,
      backup_schedule_type: scheduleType,
      backup_schedule_time: scheduleTime,
      selected_days: days,
      edit_user: id,
      backup_active_status: backup_active_status === true ? 1 : 0,
    }
  }, [
    backup_slno,
    backupType,
    backupname,
    backupDept,
    ipadd1,
    compname1,
    physicalLoc1,
    ipadd2,
    compname2,
    physicalLoc2,
    scheduleType,
    scheduleTime,
    days,
    id,
    backup_active_status,
  ])
  const inactivedatas = useMemo(() => {
    return {
      backup_slno: backup_slno,
      status: 0,
      edit_user: id,
    }
  }, [backup_slno, id])

  const deletedata = useMemo(() => {
    return {
      backup_slno: backup_slno,
    }
  }, [backup_slno])

  const rowSelect = useCallback(
    data => {
      setEdit(1)
      const {
        backup_slno,
        backup_type,
        backup_name,
        backup_location,
        backup_device_ip,
        backup_device_name,
        backup_device_location,
        transferred_device_ip,
        transferred_device_name,
        transferred_device_location,
        backup_schedule_type,
        selected_days,
        backup_selected_date,
        backup_active_status,
      } = data
      const frmdata = {
        backup_slno: backup_slno,
        backupname: backup_name,
        ipadd1: backup_device_ip,
        compname1: backup_device_name,
        ipadd2: transferred_device_ip,
        compname2: transferred_device_name,
        physicalLoc1: backup_device_location,
        physicalLoc2: transferred_device_location,
        backup_selected_date: backup_selected_date,
        backup_active_status: backup_active_status === 1 ? true : false,
      }
      setbackupDept(backup_location)
      setBackupstore(frmdata)
      setBackupType(backup_type)
      setScheduleType(backup_schedule_type)
      setdays(selected_days)
      seteditScheduleType(backup_schedule_type)

      const schdltime = JSON?.parse(data?.backup_schedule_time)
      setScheduleTime(schdltime)
    },
    [setbackupDept]
  )

  const BackupChecksDetails = useCallback(
    e => {
      if (backupType === 0) {
        infoNotify('Please Select Valid Backup Type')
      } else if (scheduleType !== 5 && scheduleTime.length === 0) {
        infoNotify('Select Any Schedule Time')
      } else if (scheduleType === 5 && days === 0) {
        infoNotify('Enter Number Of Days')
      } else {
        e.preventDefault()
        const InsertDetailsMast = async postdata => {
          const result = await axioslogin.post('/backupdetails/insertMast', postdata)
          return result.data
        }
        const UpdateDetailsMast = async patchdata => {
          const result = await axioslogin.patch('/backupdetails/updateMast', patchdata)
          return result.data
        }
        if (edit === 0) {
          InsertDetailsMast(postdata).then(value => {
            const { message, success, insert_id } = value
            if (success === 1) {
              const postdatas = scheduleTime?.map(val => {
                return {
                  backup_slno: insert_id,
                  backup_name: backupname,
                  backup_schedule_type: scheduleType,
                  backup_schedule_time: val,
                  status: 1,
                  create_user: id,
                }
              })

              if (scheduleType === 1) {
                const InsertScheduleTime = async postdatas => {
                  const result = await axioslogin.post('/backupdetails/detailInsert', postdatas)
                  return result.data
                }
                InsertScheduleTime(postdatas).then(item => {
                  const { success, time_id } = item
                  if (success === 1) {
                    const dailydata = scheduleTime?.map(val => {
                      return {
                        time_slno: time_id,
                        backup_slno: insert_id,
                        backup_daily_date: moment(new Date()).format('YYYY-MM-DD'),
                        backup_schedule_time: val,
                        verify_status: 0,
                        create_user: id,
                      }
                    })
                    const InsertBackupDaily = async dailydata => {
                      const result = await axioslogin.post('/backupdetails/daydetails', dailydata)
                      const { message, success } = result.data
                      if (success === 1) {
                        succesNotify(message)
                        setCount(count + 1)
                        reset()
                      }
                    }
                    InsertBackupDaily(dailydata)
                  }
                })
              } else if (scheduleType === 5) {
                const startdate = moment(new Date()).format('YYYY-MM-DD')
                const insertdata = {
                  backup_slno: insert_id,
                  selected_days: days,
                  backup_selected_date: startdate,
                  due_date: moment(addDays(new Date(startdate), days - 1)).format('YYYY-MM-DD'),
                  verify_status: 0,
                  create_user: id,
                }
                const InsertSelectedDays = async insertdata => {
                  const result = await axioslogin.post('/backupdetails/add', insertdata)
                  const { message, success } = result.data
                  if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                  }
                }
                InsertSelectedDays(insertdata)
              } else {
                const InsertScheduleTime = async postdatas => {
                  const result = await axioslogin.post('/backupdetails/detailInsert', postdatas)
                  const { message, success } = result.data
                  if (success === 1) {
                    succesNotify(message)
                    setCount(count + 1)
                    reset()
                  }
                }
                InsertScheduleTime(postdatas)
              }
            } else if (success === 0) {
              infoNotify(message)
            } else {
              infoNotify(message)
            }
          })
        } else if (backup_active_status === false) {
          UpdateDetailsMast(patchdata).then(value => {
            const { success } = value
            if (success === 2) {
              succesNotify('Status Updated')
            }
          })
        } else {
          if (editScheduleType !== scheduleType) {
            if (editScheduleType === 1) {
              const DeleteDetails = async deletedata => {
                const result = await axioslogin.post('/backupdetails/daydelete', deletedata)
                const { success } = result.data
                if (success === 2) {
                }
              }
              DeleteDetails(deletedata)
            } else if (editScheduleType === 2) {
              const DeleteDetails = async deletedata => {
                const result = await axioslogin.post('/backupdetails/monthdelete', deletedata)
                const { success } = result.data
                if (success === 2) {
                }
              }
              DeleteDetails(deletedata)
            } else if (editScheduleType === 3) {
              const DeleteDetails = async deletedata => {
                const result = await axioslogin.post('/backupdetails/weekdelete', deletedata)
                const { success } = result.data
                if (success === 2) {
                }
              }
              DeleteDetails(deletedata)
            } else if (editScheduleType === 4) {
              const DeleteDetails = async deletedata => {
                const result = await axioslogin.post('/backupdetails/yeardelete', deletedata)
                const { success } = result.data
                if (success === 2) {
                }
              }
              DeleteDetails(deletedata)
            } else {
              const DeleteDetails = async deletedata => {
                const result = await axioslogin.post('/backupdetails/seldaysdelete', deletedata)
                const { success } = result.data
                if (success === 2) {
                }
              }
              DeleteDetails(deletedata)
            }
          }
          if (scheduleType === 1) {
            const inactiveScheduleTime = async inactivedatas => {
              const result = await axioslogin.patch('/backupdetails/inactive', inactivedatas)
              return result.data
            }
            inactiveScheduleTime(inactivedatas).then(val => {
              const { message, success } = val
              if (success === 2) {
                UpdateDetailsMast(patchdata).then(value => {
                  const { success } = value
                  if (success === 2) {
                    const patchdatas = scheduleTime?.map(val => {
                      return {
                        backup_slno: backup_slno,
                        backup_name: backupname,
                        backup_schedule_type: scheduleType,
                        backup_schedule_time: val,
                        status: 1,
                        create_user: id,
                      }
                    })
                    const InsertScheduleTime = async patchdatas => {
                      const result = await axioslogin.post(
                        '/backupdetails/detailInsert',
                        patchdatas
                      )
                      return result.data
                    }
                    InsertScheduleTime(patchdatas).then(item => {
                      const { success, time_id } = item
                      if (success === 1) {
                        const dailydata = scheduleTime?.map(val => {
                          return {
                            time_slno: time_id,
                            backup_slno: backup_slno,
                            backup_daily_date: moment(new Date()).format('YYYY-MM-DD'),
                            backup_schedule_time: val,
                            verify_status: 0,
                            create_user: id,
                          }
                        })
                        const InsertBackupDaily = async dailydata => {
                          const result = await axioslogin.post(
                            '/backupdetails/daydetails',
                            dailydata
                          )
                          const { message, success } = result.data
                          if (success === 1) {
                            succesNotify(message)
                            setCount(count + 1)
                            reset()
                          }
                        }
                        InsertBackupDaily(dailydata)
                      }
                    })
                  }
                })
              } else if (success === 0) {
                infoNotify(message)
              } else {
                infoNotify(message)
              }
            })
          } else if (scheduleType === 5) {
            UpdateDetailsMast(patchdata).then(value => {
              const { success, message } = value
              if (success === 2) {
                if (editScheduleType !== 5) {
                  const inactiveScheduleTime = async inactivedatas => {
                    const result = await axioslogin.patch('/backupdetails/inactive', inactivedatas)
                    return result.data
                  }
                  inactiveScheduleTime(inactivedatas).then(val => {
                    const { success } = val
                    if (success === 2) {
                      const startdate = moment(new Date()).format('YYYY-MM-DD')
                      const insertdata = {
                        backup_slno: backup_slno,
                        selected_days: days,
                        backup_selected_date: startdate,
                        due_date: moment(addDays(new Date(startdate), days - 1)).format(
                          'YYYY-MM-DD'
                        ),
                        verify_status: 0,
                        create_user: id,
                      }
                      const InsertSelectedDays = async insertdata => {
                        const result = await axioslogin.post('/backupdetails/add', insertdata)
                        const { message, success } = result.data
                        if (success === 1) {
                          succesNotify(message)
                          setCount(count + 1)
                          reset()
                        }
                      }
                      InsertSelectedDays(insertdata)
                    }
                  })
                } else {
                  const updatedata = {
                    backup_slno: backup_slno,
                    selected_days: days,
                    due_date: moment(addDays(new Date(backup_selected_date), days - 1)).format(
                      'YYYY-MM-DD'
                    ),
                    edit_user: id,
                  }
                  const updateSelectedDays = async updatedata => {
                    const result = await axioslogin.patch('/backupdetails/updatedays', updatedata)
                    const { message, success } = result.data
                    if (success === 2) {
                      succesNotify(message)
                      setCount(count + 1)
                      reset()
                    }
                  }
                  updateSelectedDays(updatedata)
                }
              } else if (success === 0) {
                infoNotify(message)
              } else {
                infoNotify(message)
              }
            })
          } else {
            const inactiveScheduleTime = async inactivedatas => {
              const result = await axioslogin.patch('/backupdetails/inactive', inactivedatas)
              return result.data
            }
            inactiveScheduleTime(inactivedatas).then(val => {
              const { message, success } = val
              if (success === 2) {
                UpdateDetailsMast(patchdata).then(value => {
                  const { success } = value
                  if (success === 2) {
                    const patchdatas = scheduleTime?.map(val => {
                      return {
                        backup_slno: backup_slno,
                        backup_name: backupname,
                        backup_schedule_type: scheduleType,
                        backup_schedule_time: val,
                        status: 1,
                        create_user: id,
                      }
                    })
                    const InsertScheduleTime = async patchdatas => {
                      const result = await axioslogin.post(
                        '/backupdetails/detailInsert',
                        patchdatas
                      )
                      const { message, success } = result.data
                      if (success === 1) {
                        succesNotify(message)
                        setCount(count + 1)
                        reset()
                      }
                    }
                    InsertScheduleTime(patchdatas)
                  }
                })
              } else if (success === 0) {
                infoNotify(message)
              } else {
                infoNotify(message)
              }
            })
          }
        }
      }
    },
    [
      postdata,
      count,
      patchdata,
      edit,
      inactivedatas,
      scheduleType,
      scheduleTime,
      backupType,
      backup_selected_date,
      days,
      backup_slno,
      id,
      backupname,
      reset,
      deletedata,
      editScheduleType,
      backup_active_status,
    ]
  )

  return (
    <Box>
      <CardMaster
        title="Backup Details"
        submit={BackupChecksDetails}
        close={backtoSetting}
        refresh={refreshWindow}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
          <Box sx={{ flex: 0.5 }}> </Box>
          <Box sx={{ flex: 3 }}>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Box sx={{ flex: 1, pt: 0.2, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography>Backup Type </Typography>
              </Box>
              <Box sx={{ flex: 3, pl: 2 }}>
                <BackupTypeSelect backupType={backupType} setBackupType={setBackupType} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Box sx={{ flex: 1, pt: 0.6, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography>Backup Name</Typography>
              </Box>
              <Box sx={{ flex: 3, pl: 2 }}>
                <TextFieldCustom
                  placeholder="Backup Name"
                  type="text"
                  size="sm"
                  name="backupname"
                  value={backupname}
                  onchange={UpdateBackupChecksDetails}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Box sx={{ flex: 1, pt: 0.6, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography>Backup Location</Typography>
              </Box>
              <Box sx={{ flex: 3, pl: 2 }}>
                <AmDepartmentSelecct
                  department={backupDept}
                  setDepartment={setbackupDept}
                  setDeptName={setDeptName}
                  deptName={deptName}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Box sx={{ flex: 1, pt: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography>Device Details</Typography>
              </Box>
              <Box sx={{ flex: 3, pl: 2 }}>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <TextFieldCustom
                      placeholder="IP Address"
                      type="text"
                      size="sm"
                      name="ipadd1"
                      value={ipadd1}
                      onchange={UpdateBackupChecksDetails}
                    />
                  </Box>
                  <Box sx={{ flex: 1, pl: 0.5 }}>
                    <TextFieldCustom
                      placeholder="Computer Name"
                      type="text"
                      size="sm"
                      name="compname1"
                      value={compname1}
                      onchange={UpdateBackupChecksDetails}
                    />
                  </Box>
                  <Box sx={{ flex: 1, pl: 0.5 }}>
                    <TextFieldCustom
                      placeholder="Physical Location"
                      type="text"
                      size="sm"
                      name="physicalLoc1"
                      value={physicalLoc1}
                      onchange={UpdateBackupChecksDetails}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Box sx={{ flex: 1, pt: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography>Transferred Device</Typography>
              </Box>
              <Box sx={{ flex: 3, pl: 2 }}>
                <Box sx={{ display: 'flex' }}>
                  <Box sx={{ flex: 1 }}>
                    <TextFieldCustom
                      placeholder="IP Address"
                      type="text"
                      size="sm"
                      name="ipadd2"
                      value={ipadd2}
                      onchange={UpdateBackupChecksDetails}
                    />
                  </Box>
                  <Box sx={{ flex: 1, pl: 0.5 }}>
                    <TextFieldCustom
                      placeholder="Computer Name"
                      type="text"
                      size="sm"
                      name="compname2"
                      value={compname2}
                      onchange={UpdateBackupChecksDetails}
                    />
                  </Box>
                  <Box sx={{ flex: 1, pl: 0.5 }}>
                    <TextFieldCustom
                      placeholder="Physical Location"
                      type="text"
                      size="sm"
                      name="physicalLoc2"
                      value={physicalLoc2}
                      onchange={UpdateBackupChecksDetails}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', pt: 0.5 }}>
              <Box sx={{ flex: 1, pt: 0.5, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography> Backup Schedule</Typography>
              </Box>
              <Box sx={{ flex: 3, pl: 2 }}>
                <Box sx={{ display: 'flex', flex: 1 }}>
                  <Box sx={{ flex: 1 }}>
                    <BackupScheduleSelect
                      scheduleType={scheduleType}
                      setScheduleType={setScheduleType}
                    />
                  </Box>
                  {scheduleType === 5 ? (
                    <Box sx={{ flex: 1, pl: 0.5 }}>
                      <TextFieldCustom
                        type="text"
                        size="sm"
                        name="days"
                        value={days}
                        onchange={Selecteddayschange}
                      />
                    </Box>
                  ) : (
                    <Box sx={{ flex: 1, pl: 0.5, pt: 0.6 }}>
                      <BackupTimeSelect
                        scheduleTime={scheduleTime}
                        setScheduleTime={setScheduleTime}
                      />
                    </Box>
                  )}
                </Box>
                <Box sx={{ pt: 1.5 }}>
                  <CusCheckBox
                    label="Backup Active Status"
                    color="primary"
                    size="md"
                    name="backup_active_status"
                    value={backup_active_status}
                    checked={backup_active_status}
                    onCheked={UpdateBackupChecksDetails}
                  ></CusCheckBox>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ flex: 1 }}> </Box>
        </Box>
      </CardMaster>
      <Box sx={{ display: 'flex', overflow: 'auto' }}>
        <CssVarsProvider>
          <BackupMastTable EditBackup={rowSelect} count={count} />
        </CssVarsProvider>
      </Box>
    </Box>
  )
}
export default memo(BackupMast)
