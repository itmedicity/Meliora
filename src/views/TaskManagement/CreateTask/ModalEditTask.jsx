import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Chip, Grid, Modal, ModalDialog, Textarea, Tooltip, Typography, } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import { DialogActions } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action';
import CusCheckBox from 'src/views/Components/CusCheckBox';
import { getprojectFrTaskCreation } from 'src/redux/actions/TmProjectsList.action';
import imageCompression from 'browser-image-compression';
import EmpProgressTable from '../Mytask/EmpProgressTable';
import AddIcon from '@mui/icons-material/Add';
import moment from 'moment';
import AutoDeleteTwoToneIcon from '@mui/icons-material/AutoDeleteTwoTone';
import DueDateModal from '../ModalComponent/DueDateModal';
import Inputcomponent from '../TaskComponents/Inputcomponent';
import TmMultAssigneesSelect from 'src/views/CommonSelectCode/TmMultAssigneesSelect';
import ProjectCreation from '../ModalComponent/ProjectCreation';
import TmProjectListInTaskCreaation from 'src/views/CommonSelectCode/TmProjectListInTaskCreaation';
import { useQueryClient } from '@tanstack/react-query';
import RadarIcon from '@mui/icons-material/Radar'
import { taskColor } from 'src/color/Color';
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import AddSubTaskEmp from '../Mytask/AddSubTaskEmp';
import EditSubtaskEmp from '../Mytask/EditSubtaskEmp';
import SubtaskTableEmp from '../Mytask/SubtaskTableEmp';
import FileViewSingle from 'src/views/Components/FileViewSingle';
import ClearSharpIcon from '@mui/icons-material/ClearSharp'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const ModalEditTask = ({ open, masterData, setEditModalFlag, setEditModalOpen, }) => {

  const { tm_task_slno, main_task_slno, tm_project_slno, tm_task_status, dept_name, create_date, tm_project_name, tm_task_due_date, tm_mast_duedate_count,
    tm_assigne_emp } = masterData


  const dispatch = useDispatch();
  const queryClient = useQueryClient()
  const [departmentMast, setdepartmentMast] = useState(0)
  const [departmentSecMast, setdepartmentSecMast] = useState(0)
  const [employeeMast, setEmployeeMast] = useState(tm_assigne_emp || [])
  const [empArry, setEmpArry] = useState([])
  const [flag, setflag] = useState(0)
  const [subTaskData, setsubTaskData] = useState([])
  const [selectTaskfile, setselectTaskfile] = useState([])
  const [projectz, setprojectz] = useState(tm_project_slno === null ? '' : tm_project_slno)
  const [value, setvalue] = useState(0)
  const [completed, setCompleted] = useState(tm_task_status === 1 ? true : tm_task_status === 2 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
  const [onProgress, setOnProgress] = useState(tm_task_status === 2 ? true : tm_task_status === 1 ? false : tm_task_status === 3 ? false : tm_task_status === 4 ? false : false)
  const [onHold, setOnHold] = useState(tm_task_status === 3 ? true : tm_task_status === 1 ? false : tm_task_status === 2 ? false : tm_task_status === 4 ? false : false)
  const [onPending, setOnPending] = useState(tm_task_status === 4 ? true : tm_task_status === 1 ? false : tm_task_status === 2 ? false : tm_task_status === 3 ? false : false)
  const [checkFlag, setcheckFlag] = useState(tm_task_status)
  const [progresstabledata, setProgressTableData] = useState([])
  const [progressCount, setprogressCount] = useState(0)
  const [completeFlag, setCompleteFlag] = useState(0)
  const [dueDateModalFlag, setdueDateModalFlag] = useState(0)
  const [dueDateModal, setdueDateModal] = useState(false)
  const [dueDates, setdueDates] = useState([])
  const [addProjectFlag, setAddProjectFlag] = useState(0)
  const [addProjectModalOpen, setaddProjectlModalOpen] = useState(false)
  const [dueDateProject, setdueDateProject] = useState('')
  const [previewFile, setPreviewFile] = useState({ url: '', type: '' })
  const [imageShow, setImageShow] = useState(false)
  const [imageShowFlag, setImageShowFlag] = useState(0)
  const [countDue, setcountDue] = useState(0)
  const [tableCount, setTableCount] = useState(0)


  let newDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const id = useSelector((state) => { return state.LoginUserData.empid })
  const [taskData, setTaskData] = useState({
    tm_task_slno: '',
    taskName: '',
    dueDate: '',
    description: '',
    pendingRemarks: '',
    onHoldRemaks: '',
    completedRemarks: '',
  })

  const { taskName, dueDate, description, onHoldRemaks, pendingRemarks, completedRemarks } = taskData
  const taskDataUpdate = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setTaskData({ ...taskData, [e.target.name]: value })
    },
    [taskData],
  )
  const ChangeCompleted = useCallback((e) => {
    if (e.target.checked === true) {
      setCompleted(true)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(1)
    }
    else {
      setCompleted(false)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(0)
    }
  }, [])
  const ChangeOnProgress = useCallback((e) => {
    if (e.target.checked === true) {
      setCompleted(false)
      setOnProgress(true)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(2)
    }
    else {
      setCompleted(false)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(0)
    }
  }, [])
  const ChangeOnHold = useCallback((e) => {
    if (e.target.checked === true) {
      setCompleted(false)
      setOnHold(true)
      setOnProgress(false)
      setOnPending(false)
      setcheckFlag(3)
    }
    else {
      setCompleted(false)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(0)
    }
  }, [])
  const ChangeOnPending = useCallback((e) => {
    if (e.target.checked === true) {
      setCompleted(false)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(true)
      setcheckFlag(4)
    }
    else {
      setCompleted(false)
      setOnProgress(false)
      setOnHold(false)
      setOnPending(false)
      setcheckFlag(0)
    }
  }, [])
  const [taskProgress, setTaskProgress] = useState({
    progress_slno: '',
    tm_task_slno: tm_task_slno,
    tm_task_status: checkFlag,
    tm_progres_date: '',
    progress_emp: id,
    tm_task_progress: ''
  })
  const { progress_slno, tm_progres_date, tm_task_progress, } = taskProgress
  const ProgresssUpdate = useCallback(
    (e) => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setTaskProgress({ ...taskProgress, [e.target.name]: value })
    },
    [taskProgress],
  )
  const postProgress = useMemo(() => {
    return {
      tm_task_slno: tm_task_slno,
      tm_task_status: checkFlag,
      tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
      progress_emp: id,
      main_task_slno: main_task_slno,
      tm_task_progress: tm_task_progress === '' ? null : tm_task_progress,
    }
  }, [tm_task_slno, checkFlag, tm_progres_date, tm_task_progress, main_task_slno, id])

  const patchProgress = useMemo(() => {
    return {
      progress_slno: progress_slno,
      tm_task_slno: tm_task_slno,
      tm_task_status: checkFlag,
      tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
      progress_emp: id,
      tm_task_progress: tm_task_progress,
    }
  }, [progress_slno, tm_task_slno, checkFlag, tm_progres_date, tm_task_progress, id])

  const ProgressData = useMemo(() => {
    return {
      tm_task_slno: tm_task_slno
    }
  }, [tm_task_slno])

  useEffect(() => {
    const getProgress = async () => {
      const result = await axioslogin.post('/taskManagement/viewProgress', ProgressData);
      const { success, data } = result.data;
      if (data.length !== 0) {
        if (success === 2) {
          const arry = data?.map((val) => {
            const obj = {
              progress_slno: val.progress_slno,
              tm_task_slno: val.tm_task_slno,
              tm_task_status: val.tm_task_status,
              tm_progres_date: val.tm_progres_date,
              em_name: val.em_name,
              tm_task_progress: val.tm_task_progress
            }
            return obj
          })
          setProgressTableData(arry)
        }
        else {
          setProgressTableData([])
        }
      }

    }
    getProgress(ProgressData)
  }, [progressCount, ProgressData])

  useEffect(() => {
    const getDueCount = async () => {
      const result = await axioslogin.get(`/TmAllDeptTask/getDuedateCount/${1}`);
      const { data } = result.data;
      if (data.length !== 0) {
        const { tm_duedate_count } = data[0]
        setcountDue(tm_duedate_count)
      }
      else {
        setcountDue(0)
      }
    }
    getDueCount()
  }, [])

  const getAllDueDates = useCallback(() => {
    const getDueDate = async () => {
      const result = await axioslogin.get(`/taskManagement/getAllDueDates/${tm_task_slno}`)
      const { success, data } = result.data;
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


  const empdept = useSelector((state) => {
    return state.LoginUserData.empdept
  })
  const empsecid = useSelector((state) => {
    return state.LoginUserData.empsecid
  })
  useEffect(() => {
    dispatch(getDepartSecemployee(empsecid))
  }, [dispatch, empsecid])

  useEffect(() => {
    dispatch(getprojectFrTaskCreation())
  }, [dispatch,])

  const handleEditClose = useCallback(() => {
    setEditModalFlag(0)
    setEditModalOpen(false)
  }, [setEditModalOpen, setEditModalFlag])

  const resetProgress = useCallback(() => {
    const form = {
      progress_slno: '',
      tm_progres_date: '',
      tm_task_progress: '',
    }
    setTaskProgress(form)
  }, [])

  const InsertProgress = useCallback((e) => {
    e.preventDefault()
    if (tm_progres_date !== '') {
      const InsertMastProgress = async (postProgress) => {
        const result = await axioslogin.post('/taskManagement/insertProgress', postProgress)

        const { message, success } = result.data
        if (success === 1) {
          succesNotify(message)
          setprogressCount(progressCount + 1)

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
  }, [postProgress, progressCount, tm_progres_date, resetProgress, queryClient])

  const rowSelect = useCallback((data) => {
    setvalue(1)
    const {
      progress_slno,
      tm_task_slno,
      tm_task_status,
      tm_progres_date,
      progress_emp,
      tm_task_progress
    } = data
    const frmdata = {
      progress_slno: progress_slno,
      tm_task_slno: tm_task_slno,
      tm_task_status: tm_task_status,
      tm_progres_date: tm_progres_date === '' ? null : tm_progres_date,
      progress_emp: progress_emp,
      tm_task_progress: tm_task_progress === '' ? null : tm_task_progress
    }
    setTaskProgress(frmdata)
    setOnProgress(true)
    setCompleted(false)
    setOnHold(false)
    setOnPending(false)
  }, [])

  const UpdateProgress = useCallback((e) => {
    e.preventDefault()
    if (tm_progres_date !== '') {
      const UpdateProgressMast = async (patchProgress) => {
        const result = await axioslogin.patch('/taskManagement/updateProgress', patchProgress)
        const { message, success } = result.data
        if (success === 2) {
          succesNotify(message)
          succesNotify("Subtask Created Successfully")
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
  }, [patchProgress, progressCount, tm_progres_date, queryClient, resetProgress])

  useEffect(() => {
    if (tm_project_slno !== null) {
      const getprojectduedate = async (tm_project_slno) => {
        const result = await axioslogin.get(`/TmGraph/projectduedate/${tm_project_slno}`);
        const { success, data } = result.data;
        if (success === 2) {
          const { tm_project_duedate } = data[0]
          setdueDateProject(tm_project_duedate)
        }
      }
      getprojectduedate(tm_project_slno)
    }
  }, [tm_project_slno])


  useEffect(() => {
    const getMasterTask = async (tm_task_slno) => {
      const result = await axioslogin.get(`/taskManagement/viewMasterTaskByid/${tm_task_slno}`);
      const { success, data } = result.data;
      if (success === 2) {
        const { tm_task_slno, tm_task_name, tm_task_due_date, tm_task_description, tm_project_slno, tm_task_status,
          tm_pending_remark, tm_onhold_remarks, tm_completed_remarks } = data[0]
        const formdata = {
          taskSlno: tm_task_slno,
          taskName: tm_task_name,
          dueDate: (tm_task_due_date ? tm_task_due_date : ''),
          description: (tm_task_description ? tm_task_description : ''),
          pendingRemarks: (tm_pending_remark ? tm_pending_remark : ''),
          onHoldRemaks: (tm_onhold_remarks ? tm_onhold_remarks : ''),
          completedRemarks: (tm_completed_remarks ? tm_completed_remarks : ''),
        }
        setTaskData(formdata)
        setdepartmentMast(empdept)
        setdepartmentSecMast(empsecid)
        setprojectz(tm_project_slno === null ? '' : tm_project_slno)
        setCompleted(tm_task_status === 1 ? true : false)
        setOnProgress(tm_task_status === 2 ? true : false)
      }
      else {
        setTaskData(false)
      }
    }
    const getMastEmployee = async (tm_task_slno) => {
      const result = await axioslogin.get(`/taskManagement/viewMasterEmpByid/${tm_task_slno}`);
      const { success, data } = result.data;
      if (data.length !== 0) {
        if (success === 2) {
          const setEmpData = data && data.map((val) => {
            return {
              tm_create_detl_slno: val.tm_create_detl_slno,
              tm_assigne_emp: val.tm_assigne_emp,
              tm_detl_edit: id
            }
          })
          setEmpArry(setEmpData)
        }
        else {
          setEmpArry([])
        }
      }

    }
    getMasterTask(tm_task_slno)
    getMastEmployee(tm_task_slno);
  }, [tm_task_slno, dispatch, empdept, empsecid, tm_project_slno, setEmpArry, id])

  const openAddSubtask = useCallback(() => {
    setflag(1)
  }, [setflag])

  const updateMasterTask = useMemo(() => {
    return {
      tm_task_slno: tm_task_slno,
      tm_task_name: taskName === '' ? null : taskName,
      tm_task_due_date: dueDate === '' ? null : dueDate,
      tm_task_description: description === '' ? null : description,
      tm_task_dept: departmentMast === 0 ? null : departmentMast,
      tm_task_dept_sec: departmentSecMast === 0 ? null : departmentSecMast,
      tm_task_status: checkFlag,
      tm_pending_remark: pendingRemarks === '' ? null : pendingRemarks,
      tm_onhold_remarks: onHoldRemaks === '' ? null : onHoldRemaks,
      tm_completed_remarks: completedRemarks === '' ? null : completedRemarks,
      tm_project_slno: projectz === '' ? null : projectz,
      tm_complete_date: completed === true ? newDate : null,
      tm_mast_duedate_count: (tm_task_due_date !== dueDate) ? tm_mast_duedate_count + 1 : tm_mast_duedate_count,
      edit_user: id,
    }
  }, [tm_task_slno, taskName, checkFlag, dueDate, description, departmentMast, departmentSecMast, pendingRemarks, onHoldRemaks, completedRemarks, projectz,
    completed, newDate, tm_mast_duedate_count, tm_task_due_date, id])

  const postEmpDetails = Array.isArray(employeeMast)
    ? employeeMast.map((val) => ({
      tm_task_slno,
      tm_assigne_emp: val,
      tm_detail_status: 1,
      tm_detl_create: id,
    }))
    : [];




  const inactive = empArry && empArry.map((val) => {
    return {
      tm_task_slno: tm_task_slno,
      tm_assigne_emp: val.tm_assigne_emp,
    }
  })

  const selectForEditsSubTask = useCallback((value) => {
    setflag(2)
    setsubTaskData(value)
  }, [setsubTaskData])

  const handleTaskFileChange = useCallback((e) => {
    const newFiles = [...selectTaskfile]
    newFiles.push(e.target.files[0])
    setselectTaskfile(newFiles)
  }, [selectTaskfile, setselectTaskfile])

  const handleImageUpload = useCallback(async (imageFile) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, []);



  const SubmitTask = useCallback(async (e) => {
    e.preventDefault();
    try {
      if (!taskName || !dueDate) {
        infoNotify("Please fill mandatory fields");
        return;
      }
      const { success, message } = await axioslogin.patch("/taskManagement/updateMasterTask", updateMasterTask).then(res => res.data);
      if (success !== 2) {
        warningNotify(message);
        return;
      }
      if (selectTaskfile.length > 0) {
        const formData = new FormData();
        formData.append("id", tm_task_slno);
        for (const taskFile of selectTaskfile) {
          if (taskFile.type.startsWith("image")) {
            const compressedFile = await handleImageUpload(taskFile);
            formData.append("files", compressedFile, compressedFile.name);
          } else {
            formData.append("files", taskFile, taskFile.name);
          }
        }
        const fileRes = await axioslogin.post("/TmFileUpload/uploadFile/task", formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        ).then(res => res.data);
        if (fileRes.success !== 1) {
          warningNotify(fileRes.message);
          return;
        }
      }
      if (postEmpDetails.length > 0) {
        if (employeeMast !== 0) {
          const empRes = await axioslogin.post("/taskManagement/employeeInactive", inactive).then(res => res.data);
          if (empRes.succes === 1) {
            const subTaskRes = await axioslogin.post("/taskManagement/insertDetail", postEmpDetails).then(res => res.data);
            if (subTaskRes.success === 1) {
              succesNotify(subTaskRes.message);
              queryClient.invalidateQueries({
                queryKey: ['getIncompletedAllTaskUnderDepartment'],
                exact: false,
              });
            }
          }
        } else {

        }
      }

      succesNotify("Task updated successfully");
      queryClient.invalidateQueries({
        queryKey: ['getIncompletedAllTaskUnderDepartment'],
        exact: false,
      });
      handleEditClose();
    } catch (error) {
      infoNotify("Error occurred: " + error.message);
    }
  }, [taskName, dueDate, updateMasterTask, selectTaskfile, tm_task_slno, employeeMast, inactive, postEmpDetails, handleImageUpload, queryClient,
    handleEditClose]);


  const handleRemoveTaskFile = (index) => {
    setselectTaskfile((prevTaskFiles) => {
      const updatedFiles = [...prevTaskFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const CreateProject = useCallback(() => {
    setAddProjectFlag(1)
    setaddProjectlModalOpen(true)
  }, [])
  const isProjectOverdue = moment().isAfter(moment(dueDateProject));

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
      <Modal open={open}>
        < ModalDialog
          sx={{
            width: '80vw',
            height: '90vw',
            p: 0,
            overflow: 'auto'
          }}
        >
          {imageShowFlag === 1 ? (
            <Box>
              <FileViewSingle previewFile={previewFile} imageShow={imageShow} CloseFile={CloseFile} />
            </Box>
          ) : null}
          {addProjectFlag === 1 ? <ProjectCreation open={addProjectModalOpen} setTableCount={setTableCount}
            tableCount={tableCount}
            setAddProjectFlag={setAddProjectFlag} setaddProjectlModalOpen={setaddProjectlModalOpen}
          /> : null}
          {dueDateModalFlag === 1 ?
            <DueDateModal dueDateModal={dueDateModal} dueDates={dueDates} setdueDateModalFlag={setdueDateModalFlag}
              setdueDateModal={setdueDateModal} taskName={taskName} create_date={create_date}
              tm_task_due_date={tm_task_due_date}
            />
            : null}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              borderBottom: '1px solid',
              borderColor: 'neutral.outlinedBorder',
              bgcolor: 'white',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <RadarIcon sx={{ height: 40, width: 40, color: taskColor.darkPurple }} />
              <Typography
                sx={{ fontWeight: 700, color: taskColor.darkPurple, pt: 1 }}
              >
                Task Management
              </Typography>
            </Box>
            <HighlightOffIcon
              onClick={handleEditClose}
              sx={{
                height: 30, width: 30,
                cursor: 'pointer',
                color: taskColor.darkPurple,
              }}
            />
          </Box>


          <Box sx={{ mx: 10, mt: 1 }}>

            <Box>
              <Typography sx={{ fontWeight: 700, color: taskColor.darkPurple, pl: .5, fontSize: 13 }}>
                Project
              </Typography>
              <Box sx={{ display: 'flex', }}>
                {main_task_slno === null ?
                  <Box sx={{ mt: .5, flex: 1 }}>
                    <TmProjectListInTaskCreaation projectz={projectz} setprojectz={setprojectz} setdueDateProject={setdueDateProject} />
                  </Box> :
                  <Box sx={{ flex: 1 }}>
                    {tm_project_name === null ?
                      <Inputcomponent
                        type="text"
                        name="tm_project_name"
                        disabled
                      />
                      : <Inputcomponent
                        type="text"
                        name="tm_project_name"
                        value={tm_project_name}
                        disabled
                      />}
                  </Box>
                }
                <Box sx={{ ml: .5, pt: 2 }}
                  onClick={CreateProject}
                >
                  <Tooltip title="Create New Project">
                    <Chip sx={{ cursor: 'pointer', bgcolor: '#90CDD0', color: 'black', '&:hover': { bgcolor: '#77A7B0' } }}
                    >+ create</Chip>
                  </Tooltip>
                </Box>
              </Box>
            </Box>

            <Box sx={{ pt: 1 }}>
              <Typography sx={{ fontWeight: 700, color: taskColor.darkPurple, pl: .5, fontSize: 13 }}>
                Task<span style={{ color: '#74112F' }}> *</span>
              </Typography>
              <Inputcomponent
                placeholder="New Task"
                type="text"
                name="taskName"
                value={taskName}
                onchange={taskDataUpdate}
              />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, pt: 2 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography sx={{ fontWeight: 700, color: taskColor.darkPurple, pl: .5, fontSize: 13 }}>
                  Created Date
                </Typography>
                <Inputcomponent type="text" name="create_date" value={create_date} disabled />
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    color: taskColor.darkPurple,
                    pl: 0.5,
                    fontSize: 13,
                  }}
                >
                  Due Date
                </Typography>

                <Tooltip
                  sx={{ width: 250 }}
                  title={
                    tm_mast_duedate_count >= countDue
                      ? 'Change limit exceeded.'
                      : isProjectOverdue
                        ? 'Project is overdue. Please update the project due date first.'
                        : ''
                  }
                >
                  <span>
                    <Inputcomponent
                      type="datetime-local"
                      name="dueDate"
                      value={dueDate}
                      inputProps={{
                        min: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
                        max: moment(new Date(dueDateProject)).format('YYYY-MM-DDTHH:mm'),
                      }}
                      onChange={taskDataUpdate}
                      disabled={tm_mast_duedate_count >= countDue || isProjectOverdue}
                    />
                  </span>
                </Tooltip>
              </Box>


              <AutoDeleteTwoToneIcon
                sx={{ color: '#92443A', cursor: 'pointer', mt: 3 }}
                onClick={getAllDueDates}
              />
            </Box>

            <Box sx={{ pt: 1 }}>
              <Typography sx={{ fontWeight: 700, color: taskColor.darkPurple, pl: .5, fontSize: 13 }}>
                Department
              </Typography>
              <Inputcomponent type="text" name="dept_name" value={dept_name} disabled />
            </Box>

            <Box sx={{ pt: 1 }}>
              <Typography sx={{ fontWeight: 700, color: taskColor.darkPurple, pl: .5, fontSize: 13 }}>
                Assignees<span style={{ color: '#74112F' }}> *</span>
              </Typography>
              <TmMultAssigneesSelect value={employeeMast} setValue={setEmployeeMast} />
            </Box>

            <Box sx={{ pt: 1 }}>
              <Typography sx={{ fontWeight: 700, color: taskColor.darkPurple, pl: .5, fontSize: 13 }}>
                Task Description
              </Typography>

              <Inputcomponent
                placeholder="Description"
                type="text"
                name="description"
                value={description}
                onchange={taskDataUpdate}
              />
            </Box>
            <Box sx={{
              border: 1, borderRadius: 1, borderStyle: 'dashed',
              borderColor: '#887BB0', mt: 1, p: 1,
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

            <Box sx={{ pt: 2, display: 'flex', flex: 1, gap: 1 }}>
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
                    <Tooltip sx={{ width: 200 }} title={"Unable to complete the main task as subtasks are yet to be completed"} >
                      <span>
                        <CusCheckBox
                          color="primary"
                          size="lg"
                          name="completed"
                          value={completed}
                          checked={completed}
                          disabled
                        />
                      </span>
                    </Tooltip>

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
              <Box sx={{ flex: 1, pl: 2 }}>
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
                      onChange={taskDataUpdate}
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
                      onChange={taskDataUpdate}
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
                      onChange={taskDataUpdate}
                    />
                  </Box>
                )}
              </Box>
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
                    name="tm_progres_date"
                    value={tm_progres_date}
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
                    name="tm_task_progress"
                    value={tm_task_progress}
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
                mx: 2,
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
                  setCompleteFlag={setCompleteFlag}
                  tm_task_slno={tm_task_slno}
                  setflag={setflag}
                  selectForEditsSubTask={selectForEditsSubTask}
                />
              </Box>
            </Box>
          ) : null}
          <DialogActions>
            <Box sx={{ textAlign: 'right' }}>
              <Button
                variant="plain"
                onClick={SubmitTask}
                sx={{ color: "#004F76", fontSize: 16, }}
              >Update</Button>
              <Button
                variant="plain"
                sx={{ color: "#004F76", fontSize: 16, }}
                onClick={handleEditClose}
              >Cancel</Button>
            </Box>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Box >
  )
}
export default memo(ModalEditTask)