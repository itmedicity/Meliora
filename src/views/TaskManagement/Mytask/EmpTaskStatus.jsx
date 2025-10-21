import {
  Box,
  Button,
  CssVarsProvider,
  Grid,
  Modal,
  ModalDialog,
  Textarea,
  Tooltip,
  Typography
} from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import EmpProgressTable from './EmpProgressTable'
import AddSubTaskEmp from './AddSubTaskEmp'
import SubtaskTableEmp from './SubtaskTableEmp'
import EditSubtaskEmp from './EditSubtaskEmp'
import imageCompression from 'browser-image-compression'
import moment from 'moment'
import AutoDeleteTwoToneIcon from '@mui/icons-material/AutoDeleteTwoTone'
import DueDateModal from '../ModalComponent/DueDateModal'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import CancelIcon from '@mui/icons-material/Cancel'
import { taskColor } from 'src/color/Color'
import FileViewSingle from 'src/views/Components/FileViewSingle'
import ClearSharpIcon from '@mui/icons-material/ClearSharp'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import AddIcon from '@mui/icons-material/Add';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import FormattedDate from 'src/views/Components/FormattedDate'
import { useQueryClient } from '@tanstack/react-query'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const EmpTaskStatus = ({
  open,
  masterData,
  setEditModalFlag,
  setEditModalOpen,
  projectcount,
  setprojectcount,
}) => {
  const {
    tm_task_slno,
    tm_task_name,
    tm_task_description,
    tm_task_due_date,
    main_task_slno,
    sec_name,
    tm_task_dept,
    tm_task_dept_sec,
    tm_task_status,
    dept_name,
    tm_project_slno,
    tm_project_name,
    create_date,
    tm_onhold_remarks,
    tm_pending_remark,
    tm_completed_remarks
  } = masterData

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })
  const [completed, setCompleted] = useState(
    tm_task_status === 1
      ? true
      : tm_task_status === 2
        ? false
        : tm_task_status === 3
          ? false
          : tm_task_status === 4
            ? false
            : false
  )
  const [onProgress, setOnProgress] = useState(
    tm_task_status === 2
      ? true
      : tm_task_status === 1
        ? false
        : tm_task_status === 3
          ? false
          : tm_task_status === 4
            ? false
            : false
  )
  const [onHold, setOnHold] = useState(
    tm_task_status === 3
      ? true
      : tm_task_status === 1
        ? false
        : tm_task_status === 2
          ? false
          : tm_task_status === 4
            ? false
            : false
  )
  const [onPending, setOnPending] = useState(
    tm_task_status === 4
      ? true
      : tm_task_status === 1
        ? false
        : tm_task_status === 2
          ? false
          : tm_task_status === 3
            ? false
            : false
  )
  const queryClient = useQueryClient()
  const [checkFlag, setcheckFlag] = useState(tm_task_status)
  const [assignedEmp, setAssignedEmp] = useState([])
  const [progresstabledata, setprogresstabledata] = useState([])
  const [progressCount, setprogressCount] = useState(0)
  const [projectz, setprojectz] = useState(tm_project_slno === null ? 0 : tm_project_slno)
  const [value, setvalue] = useState(0)
  const [flag, setflag] = useState(0)
  const [arry, setArry] = useState([])
  const [tableRendering, setTableRendering] = useState(0)
  const [subTaskData, setsubTaskData] = useState([])
  const [viewSubTask, setViewSubTask] = useState(0)
  const [selectTaskfile, setselectTaskfile] = useState([])
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })
  const [imageShow, setImageShow] = useState(false)
  const [imageShowFlag, setImageShowFlag] = useState(0)
  const [updateTask, setupdateTask] = useState({
    pendingRemarks: tm_pending_remark ? tm_pending_remark : '',
    onHoldRemaks: tm_onhold_remarks ? tm_onhold_remarks : '',
    completedRemarks: tm_completed_remarks ? tm_completed_remarks : ''
  })
  const { onHoldRemaks, pendingRemarks, completedRemarks } = updateTask
  const [completeFlag, setCompleteFlag] = useState(0)
  const [taskProgress, setTaskProgress] = useState({
    PrgSlNo: '',
    tm_task_slno: tm_task_slno,
    tm_task_status: checkFlag,
    ProgressDate: '',
    progress_emp: id,
    progressDetails: ''
  })
  const { PrgSlNo, ProgressDate, progressDetails } = taskProgress
  const [dueDateModalFlag, setdueDateModalFlag] = useState(0)
  const [dueDateModal, setdueDateModal] = useState(false)
  const [dueDates, setdueDates] = useState([])
  let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  const ProgresssUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setTaskProgress({ ...taskProgress, [e.target.name]: value })
    },
    [taskProgress]
  )

  const postProgress = useMemo(() => {
    return {
      tm_task_slno: tm_task_slno,
      tm_task_status: checkFlag,
      tm_progres_date: ProgressDate === '' ? null : ProgressDate,
      progress_emp: id,
      main_task_slno: main_task_slno,
      tm_task_progress: progressDetails
    }
  }, [tm_task_slno, checkFlag, ProgressDate, progressDetails, id, main_task_slno])

  const patchProgress = useMemo(() => {
    return {
      progress_slno: PrgSlNo,
      tm_task_slno: tm_task_slno,
      tm_task_status: checkFlag,
      tm_progres_date: ProgressDate === '' ? null : ProgressDate,
      progress_emp: id,
      tm_task_progress: progressDetails
    }
  }, [PrgSlNo, tm_task_slno, checkFlag, ProgressDate, progressDetails, id])

  const ProgressData = useMemo(() => {
    return {
      tm_task_slno: tm_task_slno
    }
  }, [tm_task_slno])

  useEffect(() => {
    const getProgress = async () => {
      const result = await axioslogin.post('/taskManagement/viewProgress', ProgressData)
      const { success, data } = result.data
      if (data.length !== 0) {
        if (success === 2) {
          const arry = data?.map(val => {
            const obj = {
              progress_slno: val.progress_slno,
              tm_task_slno: val.tm_task_slno,
              tm_task_status: val.tm_task_status,
              tm_progres_date: val.tm_progres_date,
              em_name: val.em_name,
              progress_emp: val.progress_emp,
              tm_task_progress: val.tm_task_progress
            }
            return obj
          })
          setprogresstabledata(arry)
        } else {
          setprogresstabledata([])
          warningNotify('error occured')
        }
      }
    }
    getProgress(ProgressData)
  }, [progressCount, ProgressData])

  useEffect(() => {
    const getEmpName = async () => {
      const result = await axioslogin.get(`/TmTableView/empname/${tm_task_slno}`)
      const { data } = result.data

      if (data.length !== 0) {
        const { em_name } = data[0]
        setAssignedEmp(em_name)
      }
    }
    getEmpName(tm_task_slno)
  }, [tm_task_slno])

  const ChangeCompleted = useCallback(e => {
    if (e.target.checked === true) {
      setCompleted(true)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(1)
    } else {
      setCompleted(false)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(0)
    }
  }, [])

  const ChangeOnProgress = useCallback(e => {
    if (e.target.checked === true) {
      setCompleted(false)
      setOnProgress(true)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(2)
    } else {
      setCompleted(false)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(0)
    }
  }, [])
  const ChangeOnHold = useCallback(e => {
    if (e.target.checked === true) {
      setCompleted(false)
      setOnHold(true)
      setOnProgress(false)
      setOnPending(false)
      setcheckFlag(3)
    } else {
      setCompleted(false)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(0)
    }
  }, [])

  const ChangeOnPending = useCallback(e => {
    if (e.target.checked === true) {
      setCompleted(false)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(true)
      setcheckFlag(4)
    } else {
      setCompleted(false)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(0)
    }
  }, [])

  const handleTaskFileChange = useCallback(
    e => {
      const newFiles = [...selectTaskfile]
      newFiles.push(e.target.files[0])
      setselectTaskfile(newFiles)
    },
    [selectTaskfile, setselectTaskfile]
  )
  const handleImageUpload = useCallback(async imageFile => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true
    }
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, [])

  const handleEditClose = useCallback(() => {
    setEditModalFlag(0)
    setEditModalOpen(false)
  }, [setEditModalOpen, setEditModalFlag])

  const TaskMasterUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setupdateTask({ ...updateTask, [e.target.name]: value })
    },
    [updateTask]
  )
  const updateMasterTask = useMemo(() => {
    return {
      tm_task_slno: tm_task_slno,
      tm_task_name: tm_task_name,
      tm_task_dept: tm_task_dept,
      tm_task_dept_sec: tm_task_dept_sec,
      tm_task_due_date: tm_task_due_date,
      tm_task_description: tm_task_description,
      tm_task_status: checkFlag,
      tm_pending_remark: pendingRemarks === '' ? null : pendingRemarks,
      tm_onhold_remarks: onHoldRemaks === '' ? null : onHoldRemaks,
      tm_completed_remarks: completedRemarks === '' ? null : completedRemarks,
      tm_project_slno: projectz === 0 ? null : projectz,
      tm_complete_date: completed === true ? newDate : null,
      edit_user: id
    }
  }, [
    tm_task_name,
    checkFlag,
    tm_task_dept,
    tm_task_dept_sec,
    tm_task_slno,
    onHoldRemaks,
    pendingRemarks,
    tm_task_due_date,
    completedRemarks,
    projectz,
    completed,
    tm_task_description,
    newDate,
    id
  ])

  const UpdateStatus = useCallback(
    e => {
      e.preventDefault()
      const UpdateMastTask = async updateMasterTask => {
        const result = await axioslogin.patch('/taskManagement/updateMasterTask', updateMasterTask)
        return result.data
      }
      const InsertFile = async (selectTaskfile, tm_task_slno) => {
        try {
          const formData = new FormData()
          formData.append('id', tm_task_slno)
          for (const taskFile of selectTaskfile) {
            if (taskFile.type.startsWith('image')) {
              const compressedFile = await handleImageUpload(taskFile)
              formData.append('files', compressedFile, compressedFile.name)
            } else {
              formData.append('files', taskFile, taskFile.name)
            }
          }
          // Use the Axios instance and endpoint that matches your server setup
          const uploadResult = await axioslogin.post('/TmFileUpload/uploadFile/task', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          return uploadResult.data
        } catch (error) {
          warningNotify('An error occurred during file upload.')
        }
      }
      UpdateMastTask(updateMasterTask).then(value => {
        const { message, success } = value
        if (success === 2) {
          if (selectTaskfile.length !== 0) {
            InsertFile(selectTaskfile, tm_task_slno).then(value => {
              const { success } = value
              if (success === 1) {
                if (
                  (completed === true && completedRemarks === null) ||
                  (onHold === true && onHoldRemaks === null) ||
                  (onPending === true && pendingRemarks === null)
                ) {
                  infoNotify('please enter Remarks')
                } else {
                  succesNotify('Task updated Successfully with file Upload')
                  setprojectcount(projectcount + 1)
                  queryClient.invalidateQueries({
                    queryKey: ['getAllSubTaskUnderTask'],
                    exact: false,
                  });
                  queryClient.invalidateQueries({
                    queryKey: ['getEmpAllTasksList'],
                    exact: false,
                  });
                  queryClient.invalidateQueries({
                    queryKey: ['getIncompletedAllTaskUnderDepartment'],
                    exact: false,
                  });
                  handleEditClose()
                }
              } else {

                setprojectcount(projectcount + 1)
                queryClient.invalidateQueries({
                  queryKey: ['getAllSubTaskUnderTask'],
                  exact: false,
                });
                queryClient.invalidateQueries({
                  queryKey: ['getEmpAllTasksList'],
                  exact: false,
                });
                queryClient.invalidateQueries({
                  queryKey: ['getIncompletedAllTaskUnderDepartment'],
                  exact: false,
                });
              }
            })
          } else {
            if (
              (completed === true && completedRemarks === null) ||
              (onHold === true && onHoldRemaks === null) ||
              (onPending === true && pendingRemarks === null)
            ) {
              infoNotify('please enter Remarks')
            } else {
              succesNotify(message)
              setprojectcount(projectcount + 1)
              queryClient.invalidateQueries({
                queryKey: ['getAllSubTaskUnderTask'],
                exact: false,
              });
              queryClient.invalidateQueries({
                queryKey: ['getEmpAllTasksList'],
                exact: false,
              });
              queryClient.invalidateQueries({
                queryKey: ['getIncompletedAllTaskUnderDepartment'],
                exact: false,
              });
              handleEditClose()
            }
          }
        } else {
          warningNotify('error in updation')
        }
      })
    },
    [
      updateMasterTask,
      handleEditClose,
      completed,
      completedRemarks,
      onHold,
      onHoldRemaks,
      onPending,
      pendingRemarks,
      selectTaskfile,
      tm_task_slno,
      handleImageUpload,
      queryClient,
      projectcount,
      setprojectcount,

    ]
  )

  const resetProgress = () => {
    const form = {
      PrgSlNo: '',
      ProgressDate: '',
      progressDetails: ''
    }
    setTaskProgress(form)
  }
  const InsertProgress = useCallback(
    e => {
      e.preventDefault()
      if (ProgressDate !== '') {
        const InsertMastProgress = async postProgress => {
          const result = await axioslogin.post('/taskManagement/insertProgress', postProgress)
          const { message, success } = result.data
          if (success === 1) {
            succesNotify(message)
            setprogressCount(progressCount + 1)
            setprogressCount(progressCount + 1)
            resetProgress()
          } else if (success === 0) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        }
        InsertMastProgress(postProgress)
      } else {
        infoNotify('Please Select Date For Entering Task Progress')
      }
    },
    [postProgress, setprogressCount, progressCount, ProgressDate]
  )
  const rowSelect = useCallback(data => {
    setvalue(1)
    const { progress_slno, tm_task_slno, tm_task_status, tm_progres_date, progress_emp, tm_task_progress } = data

    const frmdata = {
      PrgSlNo: progress_slno,
      tm_task_slno: tm_task_slno,
      tm_task_status: tm_task_status,
      ProgressDate: tm_progres_date === '' ? null : tm_progres_date,
      progress_emp: progress_emp,
      progressDetails: tm_task_progress === '' ? null : tm_task_progress
    }
    setTaskProgress(frmdata)
    setOnProgress(true)
    setCompleted(false)
    setOnHold(false)
    setOnPending(false)
  }, [])
  const UpdateProgress = useCallback(
    e => {
      e.preventDefault()
      if (ProgressDate !== '') {
        const UpdateProgressMast = async patchProgress => {
          const result = await axioslogin.patch('/taskManagement/updateProgress', patchProgress)
          const { message, success } = result.data

          if (success === 2) {
            succesNotify(message)
            setprogressCount(progressCount + 1)
            resetProgress()
            setvalue(0)
          } else if (success === 0) {
            infoNotify(message)
          } else {
            infoNotify(message)
          }
        }
        UpdateProgressMast(patchProgress)
      } else {
        infoNotify('Please Select Date For Entering Task Progress')
      }
    },
    [patchProgress, progressCount, ProgressDate]
  )

  const openAddSubtask = useCallback(() => {
    setflag(1)
  },
    [setflag]
  )

  const selectForEditsSubTask = useCallback(
    value => {
      setflag(2)
      setsubTaskData(value)

    },
    [setsubTaskData,]
  )

  const handleRemoveTaskFile = index => {
    setselectTaskfile(prevTaskFiles => {
      const updatedFiles = [...prevTaskFiles]
      updatedFiles.splice(index, 1) // Remove the file at the specified index
      return updatedFiles
    })
  }

  const getAllDueDates = useCallback(() => {
    const getDueDate = async () => {
      const result = await axioslogin.get(`/taskManagement/getAllDueDates/${tm_task_slno}`)
      const { success, data } = result.data
      if (success === 2) {
        if (data.length > 1) {
          setdueDates(data)
          setdueDateModalFlag(1)
          setdueDateModal(true)
        } else if (data.length === 1) {
          infoNotify('Duedate is not extended')
        } else if (data.length === 0) {
          infoNotify('Duedate is not extended')
        }
      }
    }
    getDueDate()
  }, [tm_task_slno])

  const ViewImage = useCallback(file => {
    const fileType = file.url
      ? file.url.endsWith('.pdf')
        ? 'pdf'
        : 'image'
      : file.type.includes('application/pdf')
        ? 'pdf'
        : 'image'

    const fileUrl = file.url || URL.createObjectURL(file)
    setPreviewFile({ url: fileUrl, type: fileType })
    setImageShow(true)
    setImageShowFlag(1)
  }, [])

  const CloseFile = useCallback(() => {
    setImageShowFlag(0)
    setImageShow(false)
  }, [])


  return (
    <Box>
      <CssVarsProvider>

        <Modal open={open}>
          <ModalDialog
            sx={{
              overflowY: 'scroll',
              width: '85vw',
              height: '90vh',
              p: 0
            }}
          >
            {imageShowFlag === 1 ? (
              <Box>
                <FileViewSingle previewFile={previewFile} imageShow={imageShow} CloseFile={CloseFile} />
              </Box>
            ) : null}
            <Box>
              {dueDateModalFlag === 1 ? (
                <DueDateModal
                  dueDateModal={dueDateModal}
                  taskName={tm_task_name}
                  dueDates={dueDates}
                  setdueDateModalFlag={setdueDateModalFlag}
                  setdueDateModal={setdueDateModal}
                  tm_task_due_date={tm_task_due_date}
                  create_date={create_date}
                />
              ) : null}
            </Box>



            <Box sx={{ borderRight: 1, borderLeft: 1, borderBottom: 1, borderColor: '#D9E4EC' }}>
              <Box sx={{ flex: 1, display: 'flex', bgcolor: 'white', height: 30 }}>
                <Typography sx={{ color: taskColor.darkPurple, pl: 1, flex: 1, pt: 1, fontWeight: 900 }}>
                  My Task
                </Typography>
                <CancelIcon
                  sx={{
                    height: 45,
                    width: 45,
                    cursor: 'pointer',
                    color: 'darkred',
                    p: 1,
                    '&:hover': { color: '#BA0F30' }
                  }}
                  onClick={handleEditClose}
                />
              </Box>
              <Box sx={{ flex: 1, bgcolor: taskColor.darkPurple, height: 40, mt: 1 }}></Box>
              <Box
                style={{
                  marginLeft: 50,
                  marginTop: '-0.99em',
                  paddingLeft: 2,
                  zIndex: 2,
                  backgroundColor: 'white',
                  borderRadius: 35,
                  position: 'absolute',
                  fontSize: '0.75em'
                }}
              >
                <AssignmentSharpIcon sx={{ height: 30, width: 30, color: taskColor.darkPurple, m: 1 }} />
              </Box>
              <Box>
                <Box sx={{ flex: 1, mt: 4, color: taskColor.darkPurple, ml: 4, pr: 2 }}>
                  {tm_project_name && (
                    <Box sx={{ display: 'flex', py: 0.5, alignItems: 'center' }}>
                      <Box sx={{ width: '120px', fontWeight: 600 }}>Project</Box>
                      <Box sx={{ flex: 1, color: taskColor.darkPurple, fontWeight: 600 }}>
                        : {tm_project_name}
                      </Box>
                    </Box>
                  )}

                  <Box sx={{ display: 'flex', py: 0.5, alignItems: 'center' }}>
                    <Box sx={{ width: '120px', fontWeight: 600 }}>Task Number</Box>
                    <Box sx={{ flex: 1, color: taskColor.darkPurple, fontWeight: 600 }}>
                      : {tm_task_slno}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', py: 0.5, alignItems: 'center' }}>
                    <Box sx={{ width: '120px', fontWeight: 600 }}>Task Name</Box>
                    <Box sx={{ flex: 1, color: taskColor.darkPurple, fontWeight: 600 }}>
                      : {tm_task_name}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', py: 0.5, alignItems: 'center' }}>
                    <Box sx={{ width: '120px', fontWeight: 600 }}>Department</Box>
                    <Box sx={{ flex: 1, color: taskColor.darkPurple, fontWeight: 600 }}>
                      : {dept_name}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', py: 0.5, alignItems: 'center' }}>
                    <Box sx={{ width: '120px', fontWeight: 600 }}>Section</Box>
                    <Box sx={{ flex: 1, color: taskColor.darkPurple, fontWeight: 600 }}>
                      : {sec_name}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', py: 0.5, alignItems: 'center' }}>
                    <Box sx={{ width: '120px', fontWeight: 600 }}>Assignees</Box>
                    <Box sx={{ flex: 1, color: taskColor.darkPurple, fontWeight: 600 }}>
                      : {assignedEmp}
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', py: 0.5, alignItems: 'center' }}>
                    <Box sx={{ width: '120px', fontWeight: 600 }}>Created Date</Box>
                    <Box sx={{ flex: 1, color: taskColor.darkPurple, fontWeight: 600 }}>
                      : <FormattedDate date={create_date} />
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', py: 0.5, alignItems: 'center' }}>
                    <Box sx={{ width: '120px', fontWeight: 600 }}>Due Date</Box>
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', color: taskColor.darkPurple, fontWeight: 600 }}>
                      :&nbsp;<FormattedDate date={tm_task_due_date} />
                      <Tooltip title="Changed Duedates">
                        <AutoDeleteTwoToneIcon
                          sx={{ color: '#391306', cursor: 'pointer', ml: 1 }}
                          onClick={getAllDueDates}
                        />
                      </Tooltip>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', py: 0.5, alignItems: 'flex-start' }}>
                    <Box sx={{ width: '120px', fontWeight: 600 }}>Description</Box>
                    <Box sx={{ flex: 1, color: taskColor.darkPurple, fontWeight: 600 }}>
                      : {tm_task_description}
                    </Box>
                  </Box>
                </Box>

                <Box sx={{
                  border: 1, borderRadius: 1, borderStyle: 'dashed',
                  borderColor: '#887BB0', mx: 3, pb: 2, px: 1,
                }}>

                  <label htmlFor="file-input">
                    <u>Choose File</u>
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept=".jpg, .jpeg, .png, .pdf"
                    style={{ display: 'none' }}
                    onChange={handleTaskFileChange}
                    name="selectTaskfile"
                    multiple
                  />


                  <Grid
                    container
                    spacing={1}
                    sx={{
                      mx: 0.5,
                      overflow: 'visible',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'flex-start',
                    }}
                  >
                    {selectTaskfile.length !== 0 &&
                      selectTaskfile.map((file, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #e0e0e0',
                            borderRadius: '4px',
                            p: 0.5,
                            m: 0.5
                          }}
                        >
                          {file.type.includes('image') ? (
                            <img
                              src={URL.createObjectURL(file)}
                              alt={file.name}
                              style={{
                                width: '40px',
                                height: '40px',
                                objectFit: 'cover',
                                borderRadius: '4px',
                                marginRight: '8px',
                                cursor: 'pointer'
                              }}
                              onClick={() => ViewImage(file)}
                            />
                          ) : file.type === 'application/pdf' ? (
                            <PictureAsPdfIcon
                              sx={{
                                width: '40px',
                                height: '40px',
                                color: '#e53935',
                                marginRight: '8px',
                                cursor: 'pointer'
                              }}
                              onClick={() => ViewImage(file)}
                            />
                          ) : (
                            <InsertDriveFileIcon
                              sx={{
                                width: '40px',
                                height: '40px',
                                color: '#9e9e9e',
                                marginRight: '8px',
                                cursor: 'pointer'
                              }}
                              onClick={() => ViewImage(file)}
                            />
                          )}
                          <Box sx={{ fontSize: 14, cursor: 'pointer', flexGrow: 1 }}>{file.name}</Box>
                          <ClearSharpIcon
                            sx={{
                              pl: 0.3,
                              pb: 0.3,
                              height: 20,
                              width: 20,
                              cursor: 'pointer',
                              color: '#4D0011',
                              mx: 0.5,
                              '&:hover': { color: '#BA0F30' }
                            }}
                            onClick={() => handleRemoveTaskFile(index)}
                          />
                        </Box>
                      ))}
                  </Grid>


                </Box>


                <Box sx={{ pl: 2, pt: 2, display: 'flex', flex: 1, gap: 1 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, px: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {main_task_slno !== null || completeFlag.length === 0 ? (
                        <CusCheckBox
                          color="primary"
                          size="lg"
                          name="completed"
                          value={completed}
                          checked={completed}
                          onCheked={ChangeCompleted}
                        />
                      ) : (
                        <CusCheckBox
                          color="primary"
                          size="lg"
                          name="completed"
                          value={completed}
                          checked={completed}
                          disabled
                        />
                      )}
                      <Box sx={{ color: taskColor.darkPurple, fontFamily: 'Georgia' }}>Task Completed</Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CusCheckBox
                        color="primary"
                        size="lg"
                        name="onProgress"
                        value={onProgress}
                        checked={onProgress}
                        onCheked={ChangeOnProgress}
                      />
                      <Box sx={{ color: taskColor.darkPurple, fontFamily: 'Georgia' }}>Task On Progress</Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CusCheckBox
                        color="primary"
                        size="lg"
                        name="onHold"
                        value={onHold}
                        checked={onHold}
                        onCheked={ChangeOnHold}
                      />
                      <Box sx={{ color: taskColor.darkPurple, fontFamily: 'Georgia' }}>Task On Hold</Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CusCheckBox
                        color="primary"
                        size="lg"
                        name="onPending"
                        value={onPending}
                        checked={onPending}
                        onCheked={ChangeOnPending}
                      />
                      <Box sx={{ color: taskColor.darkPurple, fontFamily: 'Georgia' }}>Task On Pending</Box>
                    </Box>
                  </Box>


                  <Box sx={{ flex: 1, px: 2 }}>
                    {onHold && (
                      <Box sx={{ border: 1, borderColor: '#D9E4EC', borderRadius: 2, p: 1 }}>
                        <Typography sx={{ fontWeight: 600, pb: 1 }}>On Hold Remarks</Typography>
                        <Textarea
                          type="text"
                          size="sm"
                          placeholder="Type here..."
                          variant="outlined"
                          minRows={4}
                          maxRows={5}
                          name="onHoldRemaks"
                          value={onHoldRemaks}
                          onChange={TaskMasterUpdate}
                        />
                      </Box>
                    )}

                    {completed && (
                      <Box sx={{ border: 1, borderColor: '#D9E4EC', borderRadius: 2, p: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>Completed Remarks</Typography>
                        <Textarea
                          type="text"
                          size="sm"
                          placeholder="Type here..."
                          variant="outlined"
                          minRows={4}
                          maxRows={5}
                          name="completedRemarks"
                          value={completedRemarks}
                          onChange={TaskMasterUpdate}
                        />
                      </Box>
                    )}

                    {onPending && (
                      <Box sx={{ border: 1, borderColor: '#D9E4EC', borderRadius: 2, p: 1 }}>
                        <Typography sx={{ fontWeight: 600 }}>Pending Remarks</Typography>
                        <Textarea
                          type="text"
                          size="sm"
                          placeholder="Type here..."
                          variant="outlined"
                          minRows={4}
                          maxRows={5}
                          name="pendingRemarks"
                          value={pendingRemarks}
                          onChange={TaskMasterUpdate}
                        />
                      </Box>
                    )}
                  </Box>
                </Box>

                {onProgress === true ? (
                  <Box sx={{ mx: 2, mt: 2, border: 1, borderColor: taskColor.darkPurple, borderStyle: 'dashed', borderRadius: 4 }}>
                    <Typography sx={{ p: 1, fontSize: 20, color: 'black' }}>Add Main Task Progress</Typography>

                    <Box sx={{ p: 1, width: 250 }}>
                      <Typography sx={{ color: 'black', fontFamily: 'Georgia', pl: 1 }}>
                        Progress Date
                      </Typography>
                      <Box sx={{}}>
                        <TextFieldCustom
                          slotProps={{
                            input: {
                              min: create_date,
                              max: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
                            }
                          }}
                          type="datetime-local"
                          size="sm"
                          name="ProgressDate"
                          value={ProgressDate}
                          onchange={ProgresssUpdate}
                        ></TextFieldCustom>
                      </Box>
                    </Box>
                    <Box sx={{ px: 1, }}>
                      <Typography sx={{ color: 'black', fontFamily: 'Georgia', pl: 1 }}>
                        Progress description
                      </Typography>
                      <Box sx={{}}>
                        <Textarea
                          type="text"
                          size="sm"
                          placeholder="type here..."
                          variant="outlined"
                          minRows={3}
                          maxRows={5}
                          name="progressDetails"
                          value={progressDetails}
                          onChange={e => ProgresssUpdate(e)}
                        ></Textarea>
                      </Box>
                    </Box>
                    <Box sx={{ px: 1, pt: .5, pb: 1 }}>
                      {value === 0 ? (
                        <Button sx={{ width: 100, color: 'white' }}
                          size='sm' variant='solid' color='neutral' onClick={InsertProgress} startDecorator={< AddIcon />}>Add</Button>
                      ) : value === 1 ? (
                        <Button sx={{ width: 100, color: 'white' }}
                          size='sm' variant='solid' color='neutral' onClick={UpdateProgress} startDecorator={< CreateOutlinedIcon />}>Update</Button>
                      ) : null}
                    </Box>

                  </Box>
                ) : null}
                <EmpProgressTable progresstabledata={progresstabledata} rowSelect={rowSelect} />
                {main_task_slno === null ? (
                  <Box
                    sx={{
                      m: 2,
                      border: 1,
                      borderColor: '#603A70',
                      borderRadius: 3,
                      boxShadow: '1px 1px 4px #887BB0'
                    }}
                  >
                    {completed === true ? (
                      <Box>
                        <Tooltip title="Unable to add a subtask to a completed task" placement="top-start">
                          <Button
                            endDecorator={<AddIcon />}
                            variant='outlined'
                            color='neutral'
                            sx={{
                              m: 1,
                              '&:hover': {
                                opacity: 10
                              }
                            }}
                          >
                            Add Subtask
                          </Button>

                        </Tooltip>
                      </Box>
                    ) : (
                      <Button
                        endDecorator={<AddIcon />}
                        onClick={openAddSubtask}
                        variant='outlined'
                        sx={{
                          m: 1,
                          '&:hover': {
                            opacity: 10
                          }
                        }}
                      >
                        Add Subtask
                      </Button>


                    )}
                    <Box sx={{ mt: 1, pl: 1 }}>
                      {flag === 1 ? (
                        <Box>
                          <AddSubTaskEmp
                            tm_task_slno={tm_task_slno}
                            tm_task_due_date={tm_task_due_date}
                            tm_project_slno={tm_project_slno}
                            setTableRendering={setTableRendering}
                            tableRendering={tableRendering}
                            setflag={setflag}
                            setprojectz={setprojectz}
                            projectz={projectz}
                          />
                        </Box>
                      ) : flag === 2 ? (
                        <Box>
                          <EditSubtaskEmp
                            setflag={setflag}
                            subTaskData={subTaskData}
                            setsubTaskData={setsubTaskData}
                            setTableRendering={setTableRendering}
                            tableRendering={tableRendering}
                            setprojectz={setprojectz}
                            projectz={projectz}
                            main_task_slno={main_task_slno}
                            tm_task_due_date={tm_task_due_date}
                          />
                        </Box>
                      ) : null}
                    </Box>
                    <Box>
                      <SubtaskTableEmp
                        completeFlag={completeFlag}
                        setCompleteFlag={setCompleteFlag}
                        arry={arry}
                        setArry={setArry}
                        tm_task_slno={tm_task_slno}
                        setflag={setflag}
                        selectForEditsSubTask={selectForEditsSubTask}
                        tableRendering={tableRendering}
                        setTableRendering={setTableRendering}
                        viewSubTask={viewSubTask}
                        setViewSubTask={setViewSubTask}
                      />
                    </Box>
                  </Box>
                ) : null}
              </Box>
            </Box>

            <Box sx={{ textAlign: 'right', pb: 2, pr: 2, gap: 1 }}>
              <Button variant='plain' onClick={UpdateStatus} sx={{ fontSize: 16 }}>
                Update
              </Button>
              <Button style={{ ml: 1 }} variant="plain" sx={{ fontSize: 16 }} onClick={handleEditClose}>
                Cancel
              </Button>
            </Box>

          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box >
  )
}

export default memo(EmpTaskStatus)
