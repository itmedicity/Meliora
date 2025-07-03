import { Box, Chip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import EditTaskInDir from './EditTaskInDir'
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { warningNotify } from 'src/views/Common/CommonCode'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'

const AllTaskUnderProjectzz = ({ value }) => {
  const { tm_project_slno } = value
  const [taskList, setTaskList] = useState([])
  const [masterData, setMasterData] = useState([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editModalFlag, setEditModalFlag] = useState(0)
  const [selectedImages, setSelectedImages] = useState([])
  const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
  const [tableCount, setTableCount] = useState(0)
  const [image, setimage] = useState(0)
  const [projectcount, setProjectcount] = useState(0)
  const [secCount, setsecCount] = useState(0)
  const [taskcount, settaskcount] = useState(0)
  const [statuscount, setstatuscount] = useState(0)
  const [imageUrls, setImageUrls] = useState([])
  const [getarry, setgetarry] = useState([])
  const searchData = useMemo(() => {
    return {
      tm_project_slno: tm_project_slno,
    }
  }, [tm_project_slno])

  useEffect(() => {
    const getAllTask = async () => {
      const result = await axioslogin.post('/taskManagement/allTaskListProjectz', searchData)
      const { success, data } = result.data
      if (success === 2) {
        const taskData = data?.filter(val => val.main_task_slno === null)
        setTaskList(taskData)
      } else {
        setTaskList([])
      }
    }
    getAllTask(searchData)
  }, [searchData, tableCount])

  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }

  const rowSelectModal = useCallback(val => {
    setEditModalFlag(1)
    setEditModalOpen(true)
    setimageViewModalOpen(false)
    setimage(0)
    setMasterData(val)
  }, [])

  const handleClose = useCallback(() => {
    setimage(0)
    setEditModalOpen(false)
    setEditModalFlag(0)
    setimageViewModalOpen(false)
    setImageUrls([])
  }, [setimageViewModalOpen, setEditModalOpen, setImageUrls, setimage])

  const fileView = async val => {
    const { tm_task_slno } = val
    setgetarry(val)
    setEditModalOpen(false)
    setEditModalFlag(0)
    setimage(0) // Initialize imageViewModalFlag to 0 initially
    setimageViewModalOpen(false) // Close the modal if it was open
    try {
      const result = await axioslogin.get(`/TmFileUpload/uploadFile/getTaskFile/${tm_task_slno}`)
      const { success } = result.data
      if (success === 1) {
        const data = result.data
        const fileNames = data.data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/TaskManagement/${tm_task_slno}/${fileName}`
        })
        setImageUrls(fileUrls)
        // Open the modal only if there are files
        if (fileUrls.length > 0) {
          setimage(1)
          setimageViewModalOpen(true)
          setSelectedImages(val)
        } else {
          warningNotify('No Image attached')
        }
      } else {
        warningNotify('No Image Attached')
      }
    } catch (error) {
      warningNotify('Error in fetching files:', error)
    }
  }

  return (
    <Box>
      {editModalFlag === 1 ? (
        <EditTaskInDir
          open={editModalOpen}
          masterData={masterData}
          setEditModalOpen={setEditModalOpen}
          setEditModalFlag={setEditModalFlag}
          tableCount={tableCount}
          setTableCount={setTableCount}
          taskcount={taskcount}
          settaskcount={settaskcount}
          statuscount={statuscount}
          setstatuscount={setstatuscount}
          projectcount={projectcount}
          setProjectcount={setProjectcount}
          setsecCount={setsecCount}
          secCount={secCount}
        />
      ) : null}
      {image === 1 ? (
        <ViewTaskImage
          imageUrls={imageUrls}
          open={imageViewModalOpen}
          handleClose={handleClose}
          selectedImages={selectedImages}
          getarry={getarry}
        />
      ) : null}
      {taskList.length !== 0 ? (
        <Box>
          <Box
            sx={{
              flex: 1,
              height: 45,
              mt: 0.5,
              mx: 1,
              display: 'flex',
              borderBottom: 1,
              borderTop: 1,
              borderColor: 'lightgray',
              pt: 1.5,
              bgcolor: 'white',
            }}
          >
            <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>
              #
            </Box>
            <Box
              sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12 }}
            >
              Action
            </Box>
            <Box
              sx={{ flex: 1, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12 }}
            >
              &nbsp;Files
            </Box>
            <Box
              sx={{ flex: 2, textAlign: 'center', fontWeight: 600, color: '#444444', fontSize: 12 }}
            >
              Status
            </Box>
            <Box sx={{ flex: 2.5, fontWeight: 600, color: '#444444', fontSize: 12 }}>
              &nbsp;&nbsp;CountDown
            </Box>
            <Box sx={{ flex: 7, fontWeight: 600, color: '#444444', fontSize: 12 }}>Task Name</Box>
            <Box sx={{ flex: 4, fontWeight: 600, color: '#444444', fontSize: 12 }}>Department</Box>
            <Box sx={{ flex: 4, fontWeight: 600, color: '#444444', fontSize: 12 }}>
              Department Section
            </Box>
          </Box>
          <Box sx={{ maxHeight: '60vh', overflow: 'auto' }}>
            {taskList?.map((val, index) => {
              return (
                <Box
                  key={val.tm_task_slno}
                  sx={{
                    flex: 1,
                    display: 'flex',
                    mt: 0.3,
                    borderBottom: 2,
                    mx: 1,
                    borderColor: 'lightgrey',
                    minHeight: 30,
                    maxHeight: 80,
                    background:
                      val.main_task_slno !== null
                        ? '#EAE7FA'
                        : val.main_task_slno === 0
                        ? 'white'
                        : 'white',
                    pt: 0.5,
                  }}
                >
                  <Box sx={{ width: 30, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                    {index + 1}
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      textAlign: 'center',
                      fontWeight: 600,
                      color: 'grey',
                      fontSize: 12,
                    }}
                  >
                    <EditIcon
                      sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }}
                      size={6}
                      onClick={() => rowSelectModal(val)}
                    />
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      textAlign: 'center',
                      fontWeight: 600,
                      color: 'grey',
                      fontSize: 12,
                      cursor: 'pointer',
                    }}
                  >
                    &nbsp;
                    {val.tm_task_file === 1 ? (
                      <FilePresentRoundedIcon
                        sx={{
                          color: '#41729F',
                          '&:hover': { color: '#274472' },
                        }}
                        onClick={() => fileView(val)}
                      />
                    ) : (
                      <FilePresentRoundedIcon
                        sx={{
                          color: 'grey',
                        }}
                      />
                    )}
                  </Box>
                  <Box sx={{ flex: 2, textAlign: 'center', fontWeight: 600 }}>
                    <Chip
                      sx={{
                        fontSize: 12,
                        color:
                          val.tm_task_status === null
                            ? '#311E26'
                            : val.tm_task_status === 0
                            ? '#311E26'
                            : val.tm_task_status === 1
                            ? '#94C973'
                            : val.tm_task_status === 2
                            ? '#D37506'
                            : val.tm_task_status === 3
                            ? '#67595E'
                            : val.tm_task_status === 4
                            ? '#5885AF'
                            : 'transparent',
                        minHeight: 5,
                        fontWeight: 700,
                      }}
                    >
                      {val.tm_task_status === 0
                        ? 'Not Started'
                        : val.tm_task_status === 1
                        ? 'Completed'
                        : val.tm_task_status === 2
                        ? 'On Progress'
                        : val.tm_task_status === 3
                        ? 'On Hold'
                        : val.tm_task_status === 4
                        ? 'Pending'
                        : 'not given'}
                    </Chip>
                  </Box>
                  <Box sx={{ flex: 2.5, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                    {val.tm_task_status !== 1 ? (
                      <Box
                        sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: 0.5, width: 150, pl: 1 }}
                      >
                        <CountDowncomponent DueDates={val.tm_task_due_date} />
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          bgcolor: '#EAEAEA',
                          borderRadius: 15,
                          mb: 0.5,
                          width: 150,
                          pl: 5,
                          color: 'darkgreen',
                        }}
                      >
                        Completed
                      </Box>
                    )}
                  </Box>
                  {val.tm_task_status === 1 ? (
                    <Box
                      sx={{
                        flex: 7,
                        fontWeight: 600,
                        color: 'grey',
                        fontSize: 12,
                        textTransform: 'capitalize',
                        pl: 1,
                      }}
                    >
                      {val.tm_task_name || 'not given'}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        flex: 7,
                        fontWeight: 600,
                        color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                        fontSize: 12,
                        textTransform: 'capitalize',
                        pl: 1,
                      }}
                    >
                      {val.tm_task_name || 'not given'}
                    </Box>
                  )}
                  {val.tm_task_status === 1 ? (
                    <Box
                      sx={{
                        flex: 4,
                        fontWeight: 600,
                        color: 'grey',
                        fontSize: 12,
                        textTransform: 'capitalize',
                        pl: 1,
                      }}
                    >
                      {val.dept_name || 'not given'}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        flex: 4,
                        fontWeight: 600,
                        color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                        fontSize: 12,
                        textTransform: 'capitalize',
                        pl: 1,
                      }}
                    >
                      {val.dept_name || 'not given'}
                    </Box>
                  )}
                  {val.tm_task_status === 1 ? (
                    <Box
                      sx={{
                        flex: 4,
                        fontWeight: 600,
                        color: 'grey',
                        fontSize: 12,
                        textTransform: 'capitalize',
                        pl: 1,
                      }}
                    >
                      {val.sec_name || 'not given'}
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        flex: 4,
                        fontWeight: 600,
                        color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                        fontSize: 12,
                        textTransform: 'capitalize',
                        pl: 1,
                      }}
                    >
                      {val.sec_name || 'not given'}
                    </Box>
                  )}
                </Box>
              )
            })}
          </Box>
          <Box sx={{ height: 5 }}></Box>
        </Box>
      ) : (
        <Box
          sx={{
            height: 30,
            fontWeight: 800,
            color: 'grey',
            textAlign: 'center',
            borderColor: 'lightgray',
          }}
        >
          No Task Created Under Project
        </Box>
      )}
    </Box>
  )
}

export default memo(AllTaskUnderProjectzz)
