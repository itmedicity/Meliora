import { Box } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { Virtuoso } from 'react-virtuoso'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import { format } from 'date-fns'
import { errorNotify, warningNotify } from 'src/views/Common/CommonCode'
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import EditIcon from '@mui/icons-material/Edit'
import EditPendingAcceptance from './EditPendingAcceptance'
import { getFilesFromZip } from 'src/api/FileViewsFn'

const PendingAssingments = ({ tableCount, setTableCount }) => {
  const [taskList, setTaskList] = useState([])
  const [getarry, setgetarry] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
  const [image, setimage] = useState(0)
  const [imageUrls, setImageUrls] = useState([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editModalFlag, setEditModalFlag] = useState(0)
  const [masterData, setMasterData] = useState([])
  const [projectcount, setProjectcount] = useState(0)
  const [secCount, setsecCount] = useState(0)
  const [taskcount, settaskcount] = useState(0)
  const [statuscount, setstatuscount] = useState(0)

  useEffect(() => {
    const getAssignedTask = async () => {
      const result = await axioslogin.get('/TmAllDeptTask/getPendingAssignedTask')
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


  const fileView = async (val) => {
    const { tm_task_slno } = val;
    setgetarry(val);
    setimage(1);
    setimageViewModalOpen(true);
    setSelectedImages(val);

    try {
      const images = await getFilesFromZip('/TmFileUpload/uploadFile/getTaskFile', tm_task_slno);

      if (images && images.length > 0) {
        setImageUrls(images);
      } else {
        setImageUrls([]);
        warningNotify('No images attached for this task.');
      }
    } catch (error) {
      errorNotify('Error fetching task images:', error);
      setImageUrls([]);
    }
  };


  const rowSelectModal = useCallback(val => {
    setEditModalFlag(1)
    setEditModalOpen(true)
    setimageViewModalOpen(false)
    setimage(0)
    setMasterData(val)
  }, [])

  return (
    <Box sx={{ pb: 0.3, bgcolor: 'white' }}>
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
        <EditPendingAcceptance
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

      <Box sx={{ width: '100%', overflow: 'auto' }}>
        {taskList.length !== 0 ? (
          <Box sx={{ width: "100%" }}>
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
                bgcolor: 'white'
              }}
            >
              <Box sx={{ width: 30, pl: 1.5, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
              <Box
                sx={{
                  width: 60,
                  fontWeight: 600,
                  color: '#444444',
                  fontSize: 12,
                  textAlign: 'center'
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
                  fontSize: 12
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
                  textAlign: 'center'
                }}
              >
                CountDown
              </Box>
              <Box sx={{ width: 650, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.5 }}>Task Name</Box>
              <Box sx={{ width: 600, fontWeight: 600, color: '#444444', fontSize: 12 }}>Project</Box>
              <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12 }}>Department</Box>
              <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12 }}>Section</Box>
              <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12 }}>Assignees</Box>
              <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.5 }}>Create Date</Box>
              <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.5 }}>Due Date</Box>
              <Box sx={{ width: 650, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Description</Box>
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
                        val.main_task_slno !== null ? '#EAE7FA' : val.main_task_slno === 0 ? 'white' : 'white',
                      pt: 0.5
                    }}
                  >
                    <Box sx={{ width: 30, pl: 1.5, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                    <Box
                      sx={{
                        width: 60,
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'grey',
                        fontSize: 12,
                        cursor: 'pointer'
                      }}
                    >
                      &nbsp;
                      {val.tm_task_file === 1 ? (
                        <FilePresentRoundedIcon
                          sx={{
                            color: '#41729F',
                            '&:hover': { color: '#274472' }
                          }}
                          onClick={() => fileView(val)}
                        />
                      ) : (
                        <FilePresentRoundedIcon
                          sx={{
                            color: 'grey'
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
                        display: 'flex'
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
                            color: 'darkgreen'
                          }}
                        >
                          Completed
                        </Box>
                      )}
                    </Box>
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 650,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize'
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
                          textTransform: 'capitalize'
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
                          textTransform: 'capitalize'
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
                          textTransform: 'capitalize'
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
                          textTransform: 'capitalize'
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
                          textTransform: 'capitalize'
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
                          textTransform: 'capitalize'
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
                          textTransform: 'capitalize'
                        }}
                      >
                        {val.sec_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 300,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize'
                        }}
                      >
                        {val.em_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 300,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize'
                        }}
                      >
                        {val.em_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 160,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize'
                        }}
                      >
                        {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 160,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize'
                        }}
                      >
                        {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 160,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize'
                        }}
                      >
                        {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 160,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize'
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
                          textTransform: 'capitalize'
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
                          textTransform: 'capitalize'
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
              color: '#C7C8CB'
            }}
          >
            No Pending Assignments
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(PendingAssingments)
