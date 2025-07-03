import React, { useCallback, useEffect, useState, useMemo, memo } from 'react'
import { Box, Chip, CssVarsProvider, Modal, ModalDialog, Textarea, Typography } from '@mui/joy'
import Button from '@mui/joy/Button'
import { axioslogin } from 'src/views/Axios/Axios'
import { useDispatch, useSelector } from 'react-redux'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import Tooltip from '@mui/joy/Tooltip'
import CloseIcon from '@mui/icons-material/Close'
import imageCompression from 'browser-image-compression'
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'
import { getprojectFrTaskCreation } from 'src/redux/actions/TmProjectsList.action'
import moment from 'moment'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import Inputcomponent from '../TaskComponents/Inputcomponent'
import AssignmentSharpIcon from '@mui/icons-material/AssignmentSharp'
import TmMultAssigneesSelect from 'src/views/CommonSelectCode/TmMultAssigneesSelect'
import ProjectCreation from './ProjectCreation'
import AttachmentIcon from '@mui/icons-material/Attachment'
import TmProjectListInTaskCreaation from 'src/views/CommonSelectCode/TmProjectListInTaskCreaation'

const CreateDeptTask = ({ open, setAddModalFlag, setaddModalOpen, tableCount, setTableCount }) => {
  const dispatch = useDispatch()
  const [selectFile, setSelectFile] = useState([])
  const [employee, setEmployee] = useState([])
  const [insertId, setInsertId] = useState(0)
  const [projectz, setprojectz] = useState(0)
  const [addProjectFlag, setAddProjectFlag] = useState(0)
  const [addProjectModalOpen, setaddProjectlModalOpen] = useState(false)
  const [dueDateProject, setdueDateProject] = useState('')

  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const secName = useSelector(state => {
    return state.LoginUserData.empdeptsec
  })
  const deeptName = useSelector(state => {
    return state.LoginUserData.empdeptname
  })
  const empdept = useSelector(state => {
    return state.LoginUserData.empdept
  })

  const empsecid = useSelector(state => {
    return state.LoginUserData.empsecid
  })

  useEffect(() => {
    dispatch(getDepartSecemployee(empsecid))
  }, [dispatch, empsecid])

  useEffect(() => {
    dispatch(getprojectFrTaskCreation())
  }, [dispatch])

  const [taskMast, settaskMast] = useState({
    tm_task_slno: '',
    tm_task_name: '',
    tm_task_dept: '',
    tm_task_dept_sec: '',
    tm_task_due_date: '',
    tm_task_description: '',
    tm_onhold_remarks: '',
    tm_pending_remark: '',
    tm_completed_remarks: '',
    main_task_slno: '',
    tm_task_status: 0,
    tm_complete_date: '',
  })
  const {
    tm_task_name,
    tm_task_due_date,
    tm_task_description,
    main_task_slno,
    tm_onhold_remarks,
    tm_pending_remark,
    tm_completed_remarks,
    tm_task_status,
    tm_complete_date,
  } = taskMast

  const MastUpdate = useCallback(
    e => {
      const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
      settaskMast({ ...taskMast, [e.target.name]: value })
    },
    [taskMast]
  )
  const handleRemoveFile = index => {
    setSelectFile(prevFiles => {
      const updatedFiles = [...prevFiles]
      updatedFiles.splice(index, 1) // Remove the file at the specified index
      return updatedFiles
    })
  }
  const insertMastTask = useMemo(() => {
    return {
      tm_task_name: tm_task_name,
      tm_task_dept: empdept,
      tm_task_dept_sec: empsecid,
      tm_task_due_date: tm_task_due_date === '' ? null : tm_task_due_date,
      tm_task_description: tm_task_description,
      tm_project_slno: projectz === 0 ? null : projectz,
      tm_pending_remark: tm_pending_remark === '' ? null : tm_pending_remark,
      tm_onhold_remarks: tm_onhold_remarks === '' ? null : tm_onhold_remarks,
      tm_completed_remarks: tm_completed_remarks === '' ? null : tm_completed_remarks,
      tm_task_status: tm_task_status,
      tm_complete_date: tm_complete_date === '' ? null : tm_complete_date,
      create_user: id,
      main_task_slno: main_task_slno,
    }
  }, [
    tm_task_name,
    empdept,
    empsecid,
    tm_task_due_date,
    tm_task_description,
    main_task_slno,
    projectz,
    tm_task_status,
    tm_pending_remark,
    tm_onhold_remarks,
    tm_completed_remarks,
    tm_complete_date,
    id,
  ])

  const handleFileChange = useCallback(
    e => {
      const newFiles = [...selectFile]
      newFiles.push(e.target.files[0])
      setSelectFile(newFiles)
    },
    [selectFile, setSelectFile]
  )

  const handleClose = useCallback(() => {
    setAddModalFlag(0)
    setaddModalOpen(false)
  }, [setAddModalFlag, setaddModalOpen])

  const handleImageUpload = useCallback(async imageFile => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    }
    const compressedFile = await imageCompression(imageFile, options)
    return compressedFile
  }, [])

  const SubmitTask = useCallback(
    e => {
      e.preventDefault()
      const InsertMastTask = async insertMastTask => {
        const result = await axioslogin.post('/taskManagement/insertTask', insertMastTask)
        return result.data
      }
      const InsertDetailTask = async insertTaskDetail => {
        const result = await axioslogin.post('/taskManagement/insertDetail', insertTaskDetail)
        return result.data
      }
      const InsertFile = async (selectFile, insertId) => {
        try {
          const formData = new FormData()
          formData.append('id', insertId)
          for (const file of selectFile) {
            if (file.type.startsWith('image')) {
              const compressedFile = await handleImageUpload(file)
              formData.append('files', compressedFile, compressedFile.name)
            } else {
              formData.append('files', file, file.name)
            }
          }
          // Use the Axios instance and endpoint that matches your server setup
          const uploadResult = await axioslogin.post('/TmFileUpload/uploadFile/task', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          return uploadResult.data
        } catch (error) {
          warningNotify('An error occurred during file upload.')
        }
      }
      if (tm_task_name !== '' && employee.length !== 0 && tm_task_due_date !== '') {
        InsertMastTask(insertMastTask).then(value => {
          const { message, success, insertId } = value
          if (success === 1) {
            setInsertId(insertId)
            //check employee assigned
            if (employee.length !== 0) {
              const insertTaskDetail =
                employee &&
                employee.map(val => {
                  return {
                    tm_task_slno: insertId,
                    tm_assigne_emp: val,
                    tm_detail_status: 1,
                    tm_detl_create: id,
                  }
                })
              InsertDetailTask(insertTaskDetail).then(value => {
                const { message, success } = value
                if (success === 1) {
                  if (selectFile.length !== 0) {
                    InsertFile(selectFile, insertId).then(value => {
                      const { success, message } = value
                      if (success === 1) {
                        succesNotify('Task Created with file attach Successfully')
                        setTableCount(tableCount + 1)
                        handleClose()
                      } else {
                        warningNotify(message)
                      }
                    })
                  } else {
                    succesNotify('Task Created Successfully')
                    setTableCount(tableCount + 1)
                    handleClose()
                  }
                } else {
                  warningNotify(message)
                }
              })
            }
            // No employee assined
            else {
              //file attached check
              if (selectFile.length !== 0) {
                InsertFile(selectFile, insertId).then(value => {
                  const { success, message } = value
                  if (success === 1) {
                    succesNotify('Task Created with file attach Successfully')
                    setTableCount(tableCount + 1)
                    handleClose()
                  } else {
                    warningNotify(message)
                  }
                })
              }
              //No file
              else {
                succesNotify('Task Created Successfully')
                setTableCount(tableCount + 1)
                handleClose()
              }
            }
          } else {
            warningNotify(message)
          }
        })
      } else {
        infoNotify('Please fill the mandatory fields')
      }
    },
    [
      handleClose,
      employee,
      handleImageUpload,
      id,
      insertMastTask,
      tm_task_name,
      selectFile,
      setInsertId,
      setTableCount,
      tableCount,
      tm_task_due_date,
    ]
  )
  const CreateProject = useCallback(() => {
    setAddProjectFlag(1)
    setaddProjectlModalOpen(true)
  }, [])
  const isProjectOverdue = moment().isAfter(moment(dueDateProject))
  const tooltipText =
    "Due date cannot be added because the selected project is already overdue.To add tasks to this project, please update the project's due date."

  return (
    <Box>
      <CssVarsProvider>
        {addProjectFlag === 1 ? (
          <ProjectCreation
            open={addProjectModalOpen}
            setTableCount={setTableCount}
            tableCount={tableCount}
            setAddProjectFlag={setAddProjectFlag}
            setaddProjectlModalOpen={setaddProjectlModalOpen}
            insertId={insertId}
          />
        ) : null}
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            pl: 1,
            borderRadius: 10,
          }}
        >
          <ModalDialog variant="outlined" sx={{ width: '48vw', p: 0, overflow: 'auto' }}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ flex: 1, display: 'flex', bgcolor: 'white', height: 30 }}>
                <Typography
                  sx={{
                    color: 'lightgray',
                    fontSize: 12,
                    pl: 1,
                    flex: 1,
                    pt: 1.5,
                    fontWeight: 900,
                  }}
                >
                  Create A New Task
                </Typography>
                <HighlightOffIcon
                  sx={{
                    height: 40,
                    width: 40,
                    cursor: 'pointer',
                    color: '#52688F',
                    p: 1,
                    '&:hover': { color: '#BA0F30' },
                  }}
                  onClick={handleClose}
                />
              </Box>
              <Box sx={{ flex: 1, bgcolor: '#52688F', height: 40, mt: 1 }}></Box>
              <Box
                style={{
                  marginLeft: 50,
                  marginTop: '-0.99em',
                  paddingLeft: 2,
                  zIndex: 2,
                  backgroundColor: 'white',
                  borderRadius: 35,
                  position: 'absolute',
                  fontSize: '0.75em',
                }}
              >
                <AssignmentSharpIcon sx={{ height: 60, width: 60, p: 1.5 }} />
              </Box>
              <Typography sx={{ fontWeight: 800, color: 'grey', fontSize: 15, pt: 5, pl: 5.8 }}>
                Create Task
              </Typography>
              <Box sx={{ overflow: 'auto', mx: 3 }}>
                <Box sx={{ flex: 1, mx: 3, mt: 2.5 }}>
                  <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>
                    Task
                    <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                  </Typography>
                  <Inputcomponent
                    placeholder="New Task"
                    type="text"
                    name="tm_task_name"
                    value={tm_task_name}
                    onchange={MastUpdate}
                  />
                </Box>
                <Box sx={{ flex: 1, mx: 3, mt: 2.5 }}>
                  <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>
                    Project
                  </Typography>
                  <Box sx={{ display: 'flex' }}>
                    <TmProjectListInTaskCreaation
                      projectz={projectz}
                      setprojectz={setprojectz}
                      setdueDateProject={setdueDateProject}
                    />
                    <Box sx={{ ml: 0.5, pt: 2 }} onClick={CreateProject}>
                      <Tooltip title="Create New Project">
                        <Chip
                          sx={{
                            cursor: 'pointer',
                            bgcolor: '#90CDD0',
                            color: 'black',
                            '&:hover': { bgcolor: '#77A7B0' },
                          }}
                        >
                          {' '}
                          &nbsp;+ create&nbsp;
                        </Chip>
                      </Tooltip>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, mx: 3, mt: 2.5, display: 'flex' }}>
                  <Box sx={{ flex: 1, mr: 0.5 }}>
                    <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>
                      Department
                    </Typography>
                    <Inputcomponent type="text" name="deeptName" value={deeptName} disabled />
                  </Box>
                  <Box sx={{ flex: 1, ml: 0.5 }}>
                    <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>
                      Section{' '}
                    </Typography>
                    <Inputcomponent type="text" name="secName" value={secName} disabled />
                  </Box>
                </Box>
                <Box sx={{ flex: 1, mx: 3, mt: 2.5 }}>
                  <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>
                    Assignees
                    <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                  </Typography>
                  <TmMultAssigneesSelect value={employee} setValue={setEmployee} />
                </Box>
                <Box sx={{ flex: 1, mx: 3, mt: 2.5 }}>
                  <Typography sx={{ pl: 1.5, color: '#003B73', fontWeight: 600, fontSize: 12 }}>
                    Due Date
                    <span style={{ color: '#74112F', fontSize: 15 }}>*</span>
                  </Typography>
                  {projectz !== 0 ? (
                    <>
                      <Tooltip
                        title={isProjectOverdue ? tooltipText : ''}
                        color="warning"
                        sx={{ width: 400 }}
                      >
                        <span>
                          <Inputcomponent
                            type="datetime-local"
                            name="tm_task_due_date"
                            value={tm_task_due_date}
                            slotProps={{
                              input: {
                                min: moment(new Date()).format('YYYY-MM-DDTHH:mm'),
                                max: moment(new Date(dueDateProject)).format('YYYY-MM-DDTHH:mm'),
                              },
                            }}
                            onchange={MastUpdate}
                            disabled={isProjectOverdue}
                          />
                        </span>
                      </Tooltip>
                    </>
                  ) : (
                    <>
                      <Inputcomponent
                        type="datetime-local"
                        name="tm_task_due_date"
                        value={tm_task_due_date}
                        slotProps={{
                          input: {
                            min: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
                            max: moment(new Date(dueDateProject)).format('YYYY-MM-DD HH:mm:ss'),
                          },
                        }}
                        onchange={MastUpdate}
                      />
                    </>
                  )}
                </Box>
                <Box sx={{ mt: 2.5, mx: 3 }}>
                  <Typography
                    sx={{
                      pl: 1.5,
                      color: '#003B73',
                      fontWeight: 600,
                      textUnderline: 1,
                      fontSize: 12,
                    }}
                  >
                    Description
                  </Typography>
                  <Textarea
                    minRows={1}
                    maxRows={5}
                    placeholder="Describtion"
                    variant="plain"
                    sx={{
                      borderBottom: '2px solid',
                      borderColor: 'neutral.outlinedBorder',
                      borderRadius: 0,
                      '&:hover': {
                        borderColor: 'neutral.outlinedHoverBorder',
                      },
                      '&::before': {
                        border: '1px solid var(--Textarea-focusedHighlight)',
                        transform: 'scaleX(0)',
                        left: 0,
                        right: 0,
                        bottom: '-2px',
                        top: 'unset',
                        transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                        borderRadius: 0,
                      },
                      '&:focus-within::before': {
                        transform: 'scaleX(1)',
                      },
                    }}
                    name="tm_task_description"
                    value={tm_task_description}
                    onChange={e => MastUpdate(e)}
                  />
                </Box>
                <Box
                  sx={{
                    height: 50,
                    mt: 1,
                    border: 1,
                    borderRadius: 4,
                    borderStyle: 'dashed',
                    display: 'flex',
                    borderColor: '#C2D2D9',
                    mx: 2.3,
                    py: 1,
                  }}
                >
                  <Box
                    sx={{
                      color: '#0000FF',
                      cursor: 'pointer',
                      '&:hover': { color: '#000C66' },
                      textAlign: 'center',
                      width: 165,
                      border: 0.1,
                      mx: 0.5,
                      borderRadius: 5,
                      borderColor: '#E4E5E8',
                    }}
                  >
                    <label htmlFor="file-input">
                      <AttachmentIcon
                        sx={{
                          color: '#0000FF',
                          cursor: 'pointer',
                          '&:hover': { color: '#000C66' },
                        }}
                      />
                      <u>Choose File</u>
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      accept=".jpg, .jpeg, .png, .pdf"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                      name="file"
                      multiple // Add this attribute to allow multiple file selections
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flex: 1,
                      overflowX: 'scroll',
                      overflow: 'hidden',
                      mx: 0.5,
                    }}
                  >
                    {selectFile &&
                      selectFile.map((file, index) => (
                        <Box key={index}>
                          <Chip sx={{ bgcolor: '#B7CFDC', width: '100%', ml: 0.5 }}>
                            {file.name}
                            <CloseIcon
                              sx={{
                                pl: 0.3,
                                pb: 0.3,
                                height: 20,
                                width: 20,
                                cursor: 'pointer',
                                color: '#4D0011',
                                '&:hover': { color: '#BA0F30' },
                              }}
                              onClick={() => handleRemoveFile(index)}
                            />
                          </Chip>
                        </Box>
                      ))}
                  </Box>
                </Box>
                <Box
                  sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pt: 3, mr: 3, pb: 2 }}
                >
                  <Button variant="plain" sx={{ fontSize: 15 }} onClick={SubmitTask}>
                    Create
                  </Button>
                  <Button variant="plain" sx={{ fontSize: 15 }} onClick={handleClose}>
                    {' '}
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </ModalDialog>
        </Modal>
      </CssVarsProvider>
    </Box>
  )
}

export default memo(CreateDeptTask)
