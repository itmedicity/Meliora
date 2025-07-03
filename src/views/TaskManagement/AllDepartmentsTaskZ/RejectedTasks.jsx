import { Box } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { Paper } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
import { Virtuoso } from 'react-virtuoso'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import { format } from 'date-fns'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { warningNotify } from 'src/views/Common/CommonCode'
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import EditIcon from '@mui/icons-material/Edit'
import EditRejectedTask from '../ModalComponent/EditRejectedTask'
import ReplyModal from '../AcceptTask/ReplyModal'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt'
import CommentIcon from '@mui/icons-material/Comment'
const RejectedTasks = () => {
  const [taskList, setTaskList] = useState([])
  const [getarry, setgetarry] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
  const [image, setimage] = useState(0)
  const [imageUrls, setImageUrls] = useState([])
  const [tableCount, setTableCount] = useState(0)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editModalFlag, setEditModalFlag] = useState(0)
  const [masterData, setMasterData] = useState([])
  const [replyflag, setReplyflag] = useState(0)
  const [replyOpen, setReplyOpen] = useState(false)
  const [valuee, setValuee] = useState([])

  useEffect(() => {
    const getAssignedTask = async () => {
      const result = await axioslogin.get('/TmAllDeptTask/getRejectedTask')
      const { success, data } = result.data
      if (success === 2) {
        setTaskList(data)
      } else {
        setTaskList([])
      }
    }
    getAssignedTask()
  }, [tableCount])

  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }
  const handleClose = useCallback(() => {
    setimage(0)
    setimageViewModalOpen(false)
    setImageUrls([])
  }, [setimageViewModalOpen, setImageUrls, setimage])

  const fileView = async val => {
    const { tm_task_slno } = val
    setgetarry(val)
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
  const rowSelectModal = useCallback(val => {
    setEditModalFlag(1)
    setEditModalOpen(true)
    setimageViewModalOpen(false)
    setimage(0)
    setMasterData(val)
  }, [])

  const ReplyDetails = useCallback(value => {
    setReplyflag(1)
    setValuee(value)
    setReplyOpen(true)
  }, [])

  return (
    <Paper sx={{ pb: 0.3, bgcolor: 'white' }}>
      {image === 1 ? (
        <ViewTaskImage
          imageUrls={imageUrls}
          open={imageViewModalOpen}
          handleClose={handleClose}
          selectedImages={selectedImages}
          getarry={getarry}
        />
      ) : null}

      {editModalFlag === 1 ? (
        <EditRejectedTask
          open={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          masterData={masterData}
          setEditModalFlag={setEditModalFlag}
          tableCount={tableCount}
          setTableCount={setTableCount}
          setMasterData={setMasterData}
        />
      ) : null}

      {replyflag === 1 ? (
        <ReplyModal
          open={replyOpen}
          setReplyOpen={setReplyOpen}
          valuee={valuee}
          setReplyflag={setReplyflag}
          setTableCount={setTableCount}
          tableCount={tableCount}
        />
      ) : null}

      <Box sx={{ width: '100%', overflow: 'auto' }}>
        {taskList.length !== 0 ? (
          <Box sx={{ width: 3000 }}>
            <Box
              sx={{
                height: 45,
                mt: 0.5,
                mx: 1.5,
                display: 'flex',
                borderBottom: 1,
                borderTop: 1,
                borderColor: 'lightgray',
                pt: 1.5,
                bgcolor: 'white',
              }}
            >
              <Box sx={{ width: 30, pl: 1.5, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                #
              </Box>
              <Box
                sx={{
                  width: 70,
                  fontWeight: 600,
                  color: '#444444',
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                Queries
              </Box>

              <Box
                sx={{
                  width: 60,
                  fontWeight: 600,
                  color: '#444444',
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                File
              </Box>
              <Box
                sx={{
                  width: 40,
                  textAlign: 'center',
                  fontWeight: 600,
                  color: '#444444',
                  fontSize: 12,
                }}
              >
                Action
              </Box>
              <Box
                sx={{
                  width: 210,
                  fontWeight: 600,
                  color: '#444444',
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                CountDown
              </Box>
              <Box
                sx={{
                  width: 450,
                  textAlign: 'center',
                  fontWeight: 600,
                  color: '#444444',
                  fontSize: 12,
                }}
              >
                Queries
              </Box>
              <Box sx={{ width: 650, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.5 }}>
                Task Name
              </Box>
              <Box sx={{ width: 600, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Project
              </Box>
              <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Department
              </Box>
              <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Section
              </Box>
              <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Assignees
              </Box>
              <Box sx={{ width: 170, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.5 }}>
                Create Date
              </Box>
              <Box sx={{ width: 170, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.5 }}>
                Due Date
              </Box>
              <Box sx={{ width: 650, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>
                Description
              </Box>
            </Box>
            <Virtuoso
              style={{ height: '65vh' }}
              totalCount={taskList?.length}
              itemContent={index => {
                const val = taskList[index]
                return (
                  <Box
                    key={val.tm_task_slno}
                    sx={{
                      flex: 1,
                      display: 'flex',
                      mt: 0.3,
                      borderBottom: 2,
                      mx: 1.5,
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
                    <Box sx={{ width: 30, pl: 1.5, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                      {index + 1}
                    </Box>
                    <Box
                      sx={{
                        width: 70,
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'grey',
                        fontSize: 12,
                        cursor: 'pointer',
                      }}
                    >
                      &nbsp;
                      {val.tm_query_status === 2 ? (
                        <>
                          <CommentIcon
                            sx={{ color: '#43616F', cursor: 'pointer' }}
                            onClick={() => ReplyDetails(val)}
                          />
                          {/* Added Reply */}
                        </>
                      ) : (
                        <>
                          <MarkUnreadChatAltIcon
                            sx={{ color: '#B47608', cursor: 'pointer' }}
                            onClick={() => ReplyDetails(val)}
                          />
                          {/* Raised a Query */}
                        </>
                      )}
                    </Box>

                    <Box
                      sx={{
                        width: 60,
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
                    <Box
                      sx={{
                        width: 50,
                        fontWeight: 600,
                        color: 'grey',
                        fontSize: 12,
                        display: 'flex',
                      }}
                    >
                      <EditIcon
                        sx={{ cursor: 'pointer', '&:hover': { color: '#003060' } }}
                        size={6}
                        onClick={() => rowSelectModal(val)}
                      />
                    </Box>
                    <Box sx={{ width: 210, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                      {val.tm_task_status !== 1 ? (
                        <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, width: 150, pl: 1 }}>
                          <CountDowncomponent DueDates={val.tm_task_due_date} />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            bgcolor: '#EAEAEA',
                            borderRadius: 15,
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
                          width: 450,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          textAlign: 'center',
                        }}
                      >
                        {val.tm_query_remark || 'not Raised'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 450,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          textAlign: 'center',
                        }}
                      >
                        {val.tm_query_remark || 'not Raised'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 650,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.tm_task_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 650,
                          fontWeight: 650,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.tm_task_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 600,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.tm_project_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 600,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.tm_project_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 300,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.dept_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 300,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.dept_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 300,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.sec_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 300,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.sec_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.em_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.em_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 180,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 180,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 180,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 180,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 650,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.tm_task_description || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 650,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                        }}
                      >
                        {val.tm_task_description || 'not given'}
                      </Box>
                    )}
                  </Box>
                )
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              textAlign: 'center',
              width: 400,
              margin: 'auto',
              height: 500,
              pt: 25,
              fontWeight: 700,
              fontSize: 30,
              color: '#C7C8CB',
            }}
          >
            No Task Under Queries
          </Box>
        )}
      </Box>
    </Paper>
  )
}

export default memo(RejectedTasks)
