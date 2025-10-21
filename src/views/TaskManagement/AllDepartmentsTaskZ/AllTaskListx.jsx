import { Box, Button, Chip, Input, Table, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import EditIcon from '@mui/icons-material/Edit'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import { getProjectList } from 'src/redux/actions/TmProjectsList.action'
import { useDispatch } from 'react-redux'
import { getDepartment } from 'src/redux/actions/Department.action'
import EditTaskInDir from './EditTaskInDir'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import { getFilesFromZip } from 'src/api/FileViewsFn'
import { useQuery } from '@tanstack/react-query'
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/joy/CircularProgress';



const AllTaskListx = () => {
  const dispatch = useDispatch()
  const [masterData, setMasterData] = useState([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editModalFlag, setEditModalFlag] = useState(0)
  const [selectedImages, setSelectedImages] = useState([])
  const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
  const [image, setimage] = useState(0)
  const [tableCount, setTableCount] = useState(0)
  const [imageUrls, setImageUrls] = useState([])
  const [getarry, setgetarry] = useState([])
  const [statuscount, setstatuscount] = useState(0)
  const [projectcount, setProjectcount] = useState(0)
  const [taskcount, settaskcount] = useState(0)
  const [secCount, setsecCount] = useState(0)
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    dispatch(getDepartment())
    dispatch(getProjectList())
  }, [dispatch])


  const fetchTaskMaster = async () => {
    const result = await axioslogin.get(`/taskManagement/viewTask`);
    const { success, data } = result.data;
    if (success === 2) return data;
    return [];
  };

  const {
    data: taskData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['taskMaster', tableCount],
    queryFn: fetchTaskMaster,
    staleTime: 0,
  });


  const filteredData = taskData.filter((row) =>
    Object.values(row)
      .join(' ')
      .toLowerCase()
      .includes(filterText.toLowerCase())
  );



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


  const fileView = async (val) => {

    const { tm_task_slno } = val
    setgetarry(val)
    setSelectedImages(val)
    setimage(1)
    setimageViewModalOpen(true)
    const images = await getFilesFromZip('/TmFileUpload/uploadFile/getTaskFile', tm_task_slno);
    setImageUrls(images);
  };





  return (
    <Box>
      {editModalFlag === 1 ? (
        <EditTaskInDir
          open={editModalOpen}
          masterData={masterData}
          setEditModalOpen={setEditModalOpen}
          setEditModalFlag={setEditModalFlag}
          tabledata={taskData}
          tableCount={tableCount}
          setTableCount={setTableCount}
          taskcount={taskcount}
          settaskcount={settaskcount}
          statuscount={statuscount}
          setstatuscount={setstatuscount}
          setsecCount={setsecCount}
          secCount={secCount}
          projectcount={projectcount}
          setProjectcount={setProjectcount}
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

      <Box sx={{ width: '100%', overflowX: 'auto' }}>

        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', p: 1 }}>
          <Input
            label="Search"
            variant="outlined"
            placeholder="Type here..."
            autoComplete="off"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            startDecorator={
              <Button variant="soft" color="neutral">
                <SearchIcon /> Search
              </Button>
            }
            sx={{ width: 300 }}
          />
        </Box>


        {isLoading ? (
          <Box sx={{ p: 3 }}>
            <CircularProgress />
            <Typography sx={{ mt: 1, fontSize: 14, color: 'grey' }}>Loading tasks...</Typography>
          </Box>
        ) : isError ? (
          <Box sx={{ textAlign: 'center', py: 3, color: 'red' }}>
            Failed to load tasks
          </Box>
        ) : (

          <Box sx={{ height: '70vh', overflow: 'auto', p: .5 }}>
            <Table
              borderAxis="both"
              stickyHeader
              size="sm"

              sx={{
                '& thead th': {
                  bgcolor: 'white',
                  fontWeight: 600,
                  color: '#444444',
                  textAlign: 'center',
                  fontSize: 12,
                },
                '& tbody td': {
                  fontSize: 12,
                  color: 'grey',
                  textTransform: 'capitalize',
                  borderBottom: '1px solid lightgrey',
                },
                '& tbody tr:hover': {
                  bgcolor: '#F7F7F7',
                },
              }}
            >
              <thead>
                <tr>
                  <th style={{ width: 40 }}>#</th>
                  <th style={{ width: 50 }}>Action</th>
                  <th style={{ width: 50 }}>Files</th>
                  <th style={{ width: 100 }}>Status</th>
                  <th style={{ width: 180 }}>CountDown</th>
                  <th>Task Name</th>
                  <th>Department</th>
                  <th>Department Section</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((val, index) => {
                  const rowColor =
                    val.main_task_slno !== null
                      ? '#EAE7FA'
                      : val.main_task_slno === 0
                        ? 'white'
                        : 'white'

                  const isCompleted = val.tm_task_status === 1
                  const overdue = !isCompleted && isPastDue(val.tm_task_due_date)

                  return (
                    <tr key={val.tm_task_slno} style={{ background: rowColor }}>

                      <td style={{ textAlign: 'center', fontWeight: 600 }}>
                        {index + 1}
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <EditIcon
                          sx={{
                            cursor: 'pointer',
                            '&:hover': { color: '#003060' },
                          }}
                          onClick={() => rowSelectModal(val)}
                        />
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        {val.tm_task_file === 1 ? (
                          <FilePresentRoundedIcon
                            sx={{
                              color: '#41729F',
                              cursor: 'pointer',
                              '&:hover': { color: '#274472' },
                            }}
                            onClick={() => fileView(val)}
                          />
                        ) : (
                          <FilePresentRoundedIcon sx={{ color: 'grey' }} />
                        )}
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        <Chip
                          size="sm"
                          sx={{
                            fontSize: 12,
                            fontWeight: 700,
                            color:
                              val.tm_task_status === 1
                                ? '#94C973'
                                : val.tm_task_status === 2
                                  ? '#D37506'
                                  : val.tm_task_status === 3
                                    ? '#67595E'
                                    : val.tm_task_status === 4
                                      ? '#5885AF'
                                      : '#311E26',
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
                                    : 'Not Given'}
                        </Chip>
                      </td>

                      <td style={{ textAlign: 'center' }}>
                        {isCompleted ? (
                          <Box
                            sx={{
                              bgcolor: '#EAEAEA',
                              borderRadius: 15,
                              mb: 0.5,
                              width: 150,
                              mx: 'auto',
                              textAlign: 'center',
                              color: 'darkgreen',
                            }}
                          >
                            Completed
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              bgcolor: '#EAEAEA',
                              borderRadius: 15,
                              mb: 0.5,
                              width: 150,
                              mx: 'auto',
                              pl: 1,
                            }}
                          >
                            <CountDowncomponent DueDates={val.tm_task_due_date} />
                          </Box>
                        )}
                      </td>

                      <td style={{ color: overdue ? '#B32800' : 'grey' }}>
                        {val.tm_task_name || 'not given'}
                      </td>

                      <td style={{ color: overdue ? '#B32800' : 'grey' }}>
                        {val.dept_name || 'not given'}
                      </td>

                      <td style={{ color: overdue ? '#B32800' : 'grey' }}>
                        {val.sec_name || 'not given'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
          </Box>)}

      </Box>
    </Box >
  )
}

export default memo(AllTaskListx)
