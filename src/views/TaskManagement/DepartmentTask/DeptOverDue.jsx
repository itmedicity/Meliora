import { Box, Chip, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import EditIcon from '@mui/icons-material/Edit'
import ModalEditTask from '../CreateTask/ModalEditTask'
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import { Virtuoso } from 'react-virtuoso'
import SearchIcon from '@mui/icons-material/Search'
import FilterListIcon from '@mui/icons-material/FilterList'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import TmProjectListSearch from 'src/views/CommonSelectCode/TmProjectListSearch'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import SelectTaskStatus from '../CreateTask/SelectTaskStatus'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import JSZip from 'jszip'

const DeptOverDue = ({ setTableCount, tableCount }) => {
  const [tableData, setTableData] = useState([])
  const [masterData, setMasterData] = useState([])
  const [getarry, setgetarry] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
  const [image, setimage] = useState(0)
  const [imageUrls, setImageUrls] = useState([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editModalFlag, setEditModalFlag] = useState(0)
  const [taskcount, settaskcount] = useState(0)
  const [projectcount, setProjectcount] = useState(0)
  const [statuscount, setstatuscount] = useState(0)
  const [projectz, setprojectz] = useState(0)
  const [taskstatus, setTaskStatus] = useState(1)
  const [taxkFlag, setTaxkFlag] = useState(0)
  const [projxFlag, setprojxFlag] = useState(0)
  const [statusFlag, setStatusFlag] = useState(0)
  const [projectBasdData, setProjectBasdData] = useState([])
  const [enterText, setEnterText] = useState('')
  const [statusDataFlag, setstatusDataFlag] = useState(0)
  const [statusData, setStatusData] = useState([])
  const [borderB, setborderB] = useState(0)
  const [borderT, setborderT] = useState(0)
  const [borderS, setborderS] = useState(0)
  const [alphbased, setAlphbased] = useState(0)
  const [alphbasedData, setAlphbasedData] = useState([])
  const [searchFlag, setsearchFlag] = useState(0)
  const empsecid = useSelector(state => {
    return state.LoginUserData.empsecid
  })

  useEffect(() => {
    const getOverDueTable = async () => {
      const result = await axioslogin.get(`/TmTableView/departmentOverDue/${empsecid}`)
      const { success, data } = result.data
      if (data.length !== 0) {
        if (success === 2) {
          const arr = data?.map(val => {
            const obj = {
              tm_task_slno: val.tm_task_slno,
              tm_task_name: val.tm_task_name,
              dept_name: val.dept_name,
              sec_name: val.sec_name,
              tm_assigne_emp: val.tm_assigne_emp,
              em_name: val.em_name,
              create_date: val.create_date,
              tm_project_slno: val.tm_project_slno,
              tm_project_name: val.tm_project_name,
              tm_task_dept: val.tm_task_dept,
              tm_task_dept_sec: val.tm_task_dept_sec,
              main_task_slno: val.main_task_slno,
              tm_task_due_date: val.tm_task_due_date,
              tm_task_description: val.tm_task_description,
              tm_task_status: val.tm_task_status,
              tm_project_duedate: val.tm_project_duedate,
              TaskStatus:
                val.tm_task_status === 1
                  ? 'Completed'
                  : val.tm_task_status === 1
                    ? 'Completed'
                    : val.tm_task_status === 2
                      ? 'On Progress'
                      : val.tm_task_status === 3
                        ? 'On Hold'
                        : val.tm_task_status === 4
                          ? 'Pending'
                          : val.tm_task_status === 0
                            ? 'Not Started'
                            : 'Not Started',
              tm_task_file: val.tm_task_file,
              tm_mast_duedate_count: val.tm_mast_duedate_count
            }
            return obj
          })
          setTableData(arr)
        } else {
          setTableData([])
        }
      } else {
        setTableData([])
      }
    }
    getOverDueTable(empsecid)
  }, [empsecid, tableCount])

  const rowSelectModal = useCallback(value => {
    setEditModalFlag(1)
    setEditModalOpen(true)
    setimageViewModalOpen(false)
    setimage(0)
    setMasterData(value)
  }, [])

  const fileView = async val => {
    const { tm_task_slno } = val
    setgetarry(val)
    setimage(0) // Initialize imageViewModalFlag to 0 initially
    setimageViewModalOpen(false) // Close the modal if it was open

    // try {
    //   const result = await axioslogin.get(`/TmFileUpload/uploadFile/getTaskFile/${tm_task_slno}`)
    //   const { success } = result.data
    //   if (success === 1) {
    //     const data = result.data
    //     const fileNames = data.data
    //     const fileUrls = fileNames.map(fileName => {
    //       return `http://192.168.22.9/NAS/TaskManagement/${tm_task_slno}/${fileName}`
    //     })
    //     setImageUrls(fileUrls)

    //     // Open the modal only if there are files
    //     if (fileUrls.length > 0) {
    //       setimage(1)
    //       setimageViewModalOpen(true)
    //       setSelectedImages(val)
    //     } else {
    //       warningNotify('No Image attached')
    //     }
    //   } else {
    //     warningNotify('No Image attached')
    //   }
    // } catch (error) {
    //   warningNotify('Error in fetching files:', error)
    // }
    const getImage = async tm_task_slno => {
      try {
        const result = await axioslogin.get(`/TmFileUpload/uploadFile/getTaskFile/${tm_task_slno}`, {
          responseType: 'blob'
        });

        const contentType = result.headers['content-type'] || '';
        if (contentType?.includes('application/json')) {
          return;
        } else {
          const zip = await JSZip.loadAsync(result.data);
          // Extract image files (e.g., .jpg, .png)
          const imageEntries = Object.entries(zip.files).filter(
            ([filename]) => /\.(jpe?g|png|gif|pdf)$/i.test(filename)
          );
          // Convert each to a Blob URL
          // const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
          //   const blob = await fileObj.async('blob');
          //   const url = URL.createObjectURL(blob);
          //   return { imageName: filename, url };
          // });
          const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
            // Get the original blob (no type)
            const originalBlob = await fileObj.async('blob');
            // Determine MIME type based on filename extension (or any other logic)
            let mimeType = '';
            if (filename.endsWith('.pdf')) {
              mimeType = 'application/pdf';
            } else if (filename.endsWith('.png')) {
              mimeType = 'image/png';
            } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
              mimeType = 'image/jpeg';
            } else {
              mimeType = 'application/octet-stream'; // fallback
            }
            // Recreate blob with correct type
            const blobWithType = new Blob([originalBlob], { type: mimeType });
            // Create URL from new blob
            const url = URL.createObjectURL(blobWithType);
            return { imageName: filename, url, blob: blobWithType };
          });
          const images = await Promise.all(imagePromises);
          setImageUrls(images)
          setimage(1)
          setimageViewModalOpen(true)
          setSelectedImages(val)
          // setImageShowFlag(1)
          // setImageShow(true)
        }
      } catch (error) {
        console.error('Error fetching or processing images:', error);
        // setImageArry([])
      }
    }
    getImage(tm_task_slno)
  }

  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }

  const handleClose = useCallback(() => {
    setimage(0)
    setEditModalOpen(false)
    setEditModalFlag(0)
    setimageViewModalOpen(false)
    setImageUrls([])
  }, [setimageViewModalOpen, setEditModalOpen, setImageUrls, setimage])

  const projxWise = useCallback(() => {
    setprojxFlag(1)
    setTaxkFlag(0)
    setStatusFlag(0)
    setborderB(1)
    setborderT(0)
    setborderS(0)
  }, [])

  const taskWise = useCallback(() => {
    setTaxkFlag(1)
    setprojxFlag(0)
    setStatusFlag(0)
    setborderT(1)
    setborderB(0)
    setborderS(0)
  }, [])

  const statusWise = useCallback(() => {
    setStatusFlag(1)
    setTaxkFlag(0)
    setprojxFlag(0)
    setborderT(0)
    setborderS(1)
    setborderB(0)
  }, [])

  const closeSearchWise = useCallback(() => {
    setprojxFlag(0)
    setsearchFlag(0)
    setprojectz(0)
    setStatusFlag(0)
    setTaxkFlag(0)
    setEnterText('')
    setAlphbased(0)
    setstatusDataFlag(0)
    setTaskStatus(1)
    setborderB(0)
    setborderT(0)
    setborderS(0)
  }, [])

  const SearchInTableProject = useCallback(() => {
    if (projectz !== 0) {
      let newTableDataaProject = tableData && tableData.filter(val => val.tm_project_slno === projectz)
      setsearchFlag(1)
      setProjectBasdData(newTableDataaProject)
    } else {
      infoNotify('please select a project to search')
    }
  }, [projectz, tableData])

  useEffect(() => {
    if (projxFlag === 1) {
      let newTableDataaProject = tableData && tableData.filter(val => val.tm_project_slno === projectz)
      setProjectBasdData(newTableDataaProject)
    }
  }, [taskcount, tableData, alphbased, enterText, projectz, projxFlag])

  const updateEnterText = useCallback(e => {
    setEnterText(e.target.value)
  }, [])

  const SearchInTableByTask = useCallback(() => {
    if (enterText.length < 3) {
      infoNotify('Please enter a minimum of 3 characters to search task name')
    } else {
      const searchText = enterText.toLowerCase()
      const newTableDataa =
        tableData &&
        tableData.filter(item => {
          const taskName = item.tm_task_name.toLowerCase()
          return taskName.includes(searchText)
        })
      setAlphbased(1)
      setAlphbasedData(newTableDataa)
    }
  }, [enterText, tableData])

  useEffect(() => {
    if (alphbased === 1) {
      const searchText = enterText.trim().toLowerCase()
      const newTableDataa =
        tableData && tableData.filter(val => val.tm_task_name.trim().toLowerCase().includes(searchText))
      setAlphbasedData(newTableDataa)
    }
  }, [taskcount, tableData, alphbased, enterText])

  const SearchInTableByTaskStatus = useCallback(() => {
    let newTablStatusDataa = tableData && tableData.filter(val => val.tm_task_status === taskstatus)
    setstatusDataFlag(1)
    setStatusData(newTablStatusDataa)
  }, [taskstatus, tableData])

  useEffect(() => {
    if (statusFlag === 1) {
      let newTablStatusDataa = tableData && tableData.filter(val => val.tm_task_status === taskstatus)
      setStatusData(newTablStatusDataa)
    }
  }, [statuscount, tableData, statusFlag, taskstatus])

  return (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      {editModalFlag === 1 ? (
        <ModalEditTask
          open={editModalOpen}
          masterData={masterData}
          setEditModalOpen={setEditModalOpen}
          setEditModalFlag={setEditModalFlag}
          taskcount={taskcount}
          settaskcount={settaskcount}
          statuscount={statuscount}
          setstatuscount={setstatuscount}
          tableCount={tableCount}
          setTableCount={setTableCount}
          projectcount={projectcount}
          setProjectcount={setProjectcount}
        />
      ) : image === 1 ? (
        <ViewTaskImage
          imageUrls={imageUrls}
          open={imageViewModalOpen}
          handleClose={handleClose}
          selectedImages={selectedImages}
          getarry={getarry}
        />
      ) : null}
      <Box sx={{ maxHeight: 80, flex: 1, display: 'flex' }}>
        <Box sx={{ flex: 1.5 }}></Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ flex: 1, display: 'flex', ml: 2 }}>
            <Box sx={{ flex: 0.5, display: 'flex', cursor: 'pointer' }} onClick={projxWise}>
              {borderB === 1 ? <SwapVertIcon sx={{ p: 0.3, color: 'blue' }} /> : <SwapVertIcon sx={{ p: 0.3 }} />}
              <Typography sx={{ fontSize: 12, '&:hover': { color: 'blue' } }}>
                {borderB === 1 ? <u style={{ textDecorationColor: 'blue', color: 'blue' }}>Project</u> : <>Project</>}
              </Typography>
            </Box>
            <Box sx={{ flex: 0.5, display: 'flex', cursor: 'pointer' }} onClick={taskWise}>
              {borderT === 1 ? (
                <FilterAltOutlinedIcon sx={{ p: 0.3, color: 'blue' }} />
              ) : (
                <FilterAltOutlinedIcon sx={{ p: 0.3 }} />
              )}

              <Typography sx={{ fontSize: 12, '&:hover': { color: 'blue' }, pt: 0.1 }}>
                {borderT === 1 ? <u style={{ textDecorationColor: 'blue', color: 'blue' }}>Task</u> : <>Task</>}
              </Typography>
            </Box>
            <Box sx={{ flex: 0.5, display: 'flex', cursor: 'pointer' }} onClick={statusWise}>
              {borderS === 1 ? <FilterListIcon sx={{ p: 0.3, color: 'blue' }} /> : <FilterListIcon sx={{ p: 0.3 }} />}
              <Typography sx={{ fontSize: 12, '&:hover': { color: 'blue' } }}>
                {borderS === 1 ? <u style={{ textDecorationColor: 'blue', color: 'blue' }}>Status</u> : <>Status</>}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ flex: 1, mr: 11, ml: 5, my: 2 }}>
            {projxFlag === 1 ? (
              <Box sx={{ flex: 1, display: 'flex', mt: 1, mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <TmProjectListSearch projectz={projectz} setprojectz={setprojectz} />
                </Box>
                <Box>
                  <CssVarsProvider>
                    <Tooltip title="search">
                      <Box
                        sx={{
                          pl: 0.5,
                          bgcolor: '#E7F2F8',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          height: '100%'
                        }}
                        onClick={SearchInTableProject}
                      >
                        <SearchIcon />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
                <Box>
                  <CssVarsProvider>
                    <Tooltip title="exit">
                      <Box
                        sx={{
                          pl: 0.5,
                          bgcolor: '#E7F2F8',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          height: '100%'
                        }}
                        onClick={closeSearchWise}
                      >
                        <HighlightOffRoundedIcon />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
              </Box>
            ) : null}
            {taxkFlag === 1 ? (
              <Box sx={{ flex: 1, display: 'flex', mt: 1, mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Input
                    size="xs"
                    name="enterText"
                    value={enterText}
                    placeholder="type task name to search..."
                    sx={{
                      height: 29,
                      borderRadius: 0,
                      pl: 1
                    }}
                    onChange={updateEnterText}
                  />
                </Box>
                <Box>
                  <CssVarsProvider>
                    <Tooltip title="search">
                      <Box
                        sx={{
                          pl: 0.5,
                          bgcolor: '#E7F2F8',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          height: '100%'
                        }}
                        onClick={SearchInTableByTask}
                      >
                        <SearchIcon />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
                <Box>
                  <CssVarsProvider>
                    <Tooltip title="exit">
                      <Box
                        sx={{
                          pl: 0.5,
                          bgcolor: '#E7F2F8',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          height: '100%'
                        }}
                        onClick={closeSearchWise}
                      >
                        <HighlightOffRoundedIcon />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
              </Box>
            ) : null}
            {statusFlag === 1 ? (
              <Box sx={{ flex: 1, display: 'flex', mt: 1, mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <SelectTaskStatus taskstatus={taskstatus} setTaskStatus={setTaskStatus} />
                </Box>
                <Box>
                  <CssVarsProvider>
                    <Tooltip title="search">
                      <Box
                        sx={{
                          pl: 0.5,
                          bgcolor: '#E7F2F8',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          height: '100%'
                        }}
                        onClick={SearchInTableByTaskStatus}
                      >
                        <SearchIcon />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
                <Box>
                  <CssVarsProvider>
                    <Tooltip title="exit">
                      <Box
                        sx={{
                          pl: 0.5,
                          bgcolor: '#E7F2F8',
                          cursor: 'pointer',
                          borderRight: 1,
                          borderTop: 1,
                          borderBottom: 1,
                          borderColor: '#B2C4CB',
                          height: '100%'
                        }}
                        onClick={closeSearchWise}
                      >
                        <HighlightOffRoundedIcon />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                </Box>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '100%', overflow: 'auto' }}>
        <Box sx={{ width: 2600 }}>
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
            <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>#</Box>
            <Box
              sx={{
                width: 80,
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
                width: 40,
                textAlign: 'center',
                fontWeight: 600,
                color: '#444444',
                fontSize: 12
              }}
            >
              Files
            </Box>
            <Box
              sx={{
                width: 160,
                fontWeight: 600,
                color: '#444444',
                fontSize: 12,
                textAlign: 'center'
              }}
            >
              Status
            </Box>
            <Box sx={{ width: 170, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>CountDown</Box>
            <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 7 }}>Task Name</Box>
            <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 4.5 }}>Project</Box>
            <Box sx={{ width: 500, fontWeight: 600, color: '#444444', fontSize: 12, pl: 3 }}>Assignee</Box>
            <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Created Date</Box>
            <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Due Date</Box>
            <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Description</Box>
          </Box>
          {alphbased === 0 && searchFlag === 0 && statusDataFlag === 0 ? (
            <Virtuoso
              style={{ height: '55vh' }}
              totalCount={tableData?.length}
              itemContent={index => {
                const val = tableData[index]
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
                    <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                    <Box
                      sx={{
                        width: 60,
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'grey',
                        fontSize: 12
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
                        width: 80,
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
                    <Box sx={{ width: 170, textAlign: 'center', fontWeight: 600 }}>
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
                                      ? '#56382D'
                                      : val.tm_task_status === 4
                                        ? '#5885AF'
                                        : 'transparent',
                          minHeight: 5,
                          fontWeight: 700
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
                    <Box sx={{ width: 160, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                      {val.tm_task_status !== 1 ? (
                        <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: 0.5, width: 150, pl: 1 }}>
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
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 650,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_project_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_project_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 500,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.em_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 500,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.em_name || 'not given'}
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
                          pl: 1
                        }}
                      >
                        {val.create_date || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.create_date || 'not given'}
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
                          pl: 1
                        }}
                      >
                        {val.tm_task_due_date || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_due_date || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_description || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_description || 'not given'}
                      </Box>
                    )}
                  </Box>
                )
              }}
            />
          ) : alphbased === 0 && projxFlag === 1 && statusDataFlag === 0 ? (
            <Virtuoso
              style={{ height: '55vh' }}
              totalCount={projectBasdData?.length}
              itemContent={index => {
                const val = projectBasdData[index]
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
                    <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                    <Box
                      sx={{
                        width: 60,
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'grey',
                        fontSize: 12
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
                    <Box sx={{ width: 200, textAlign: 'center', fontWeight: 600 }}>
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
                                      ? '#56382D'
                                      : val.tm_task_status === 4
                                        ? '#5885AF'
                                        : 'transparent',
                          minHeight: 5,
                          fontWeight: 700
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
                    <Box sx={{ width: 160, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                      {val.tm_task_status !== 1 ? (
                        <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: 0.5, width: 150, pl: 1 }}>
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
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 650,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_project_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_project_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 500,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.em_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 500,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.em_name || 'not given'}
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
                          pl: 1
                        }}
                      >
                        {val.create_date || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.create_date || 'not given'}
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
                          pl: 1
                        }}
                      >
                        {val.tm_task_due_date || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_due_date || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_description || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_description || 'not given'}
                      </Box>
                    )}
                  </Box>
                )
              }}
            />
          ) : alphbased === 1 && projxFlag === 0 && statusDataFlag === 0 ? (
            <Virtuoso
              style={{ height: '55vh' }}
              totalCount={alphbasedData?.length}
              itemContent={index => {
                const val = alphbasedData[index]
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
                    <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                    <Box
                      sx={{
                        width: 60,
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'grey',
                        fontSize: 12
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
                    <Box sx={{ width: 200, textAlign: 'center', fontWeight: 600 }}>
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
                                      ? '#56382D'
                                      : val.tm_task_status === 4
                                        ? '#5885AF'
                                        : 'transparent',
                          minHeight: 5,
                          fontWeight: 700
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
                    <Box sx={{ width: 160, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                      {val.tm_task_status !== 1 ? (
                        <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: 0.5, width: 150, pl: 1 }}>
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
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 650,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_project_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_project_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 500,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.em_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 500,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.em_name || 'not given'}
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
                          pl: 1
                        }}
                      >
                        {val.create_date || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.create_date || 'not given'}
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
                          pl: 1
                        }}
                      >
                        {val.tm_task_due_date || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_due_date || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_description || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_description || 'not given'}
                      </Box>
                    )}
                  </Box>
                )
              }}
            />
          ) : statusDataFlag === 1 && alphbased === 0 && projxFlag === 0 ? (
            <Virtuoso
              style={{ height: '55vh' }}
              totalCount={statusData?.length}
              itemContent={index => {
                const val = statusData[index]
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
                    <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}>{index + 1}</Box>
                    <Box
                      sx={{
                        width: 60,
                        textAlign: 'center',
                        fontWeight: 600,
                        color: 'grey',
                        fontSize: 12
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
                    <Box sx={{ width: 200, textAlign: 'center', fontWeight: 600 }}>
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
                                      ? '#56382D'
                                      : val.tm_task_status === 4
                                        ? '#5885AF'
                                        : 'transparent',
                          minHeight: 5,
                          fontWeight: 700
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
                    <Box sx={{ width: 160, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                      {val.tm_task_status !== 1 ? (
                        <Box sx={{ bgcolor: '#EAEAEA', borderRadius: 15, mb: 0.5, width: 150, pl: 1 }}>
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
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 650,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_project_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_project_name || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 500,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.em_name || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 500,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.em_name || 'not given'}
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
                          pl: 1
                        }}
                      >
                        {val.create_date || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.create_date || 'not given'}
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
                          pl: 1
                        }}
                      >
                        {val.tm_task_due_date || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 250,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_due_date || 'not given'}
                      </Box>
                    )}
                    {val.tm_task_status === 1 ? (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_description || 'not given'}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          width: 800,
                          fontWeight: 600,
                          color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                          fontSize: 12,
                          textTransform: 'capitalize',
                          pl: 1
                        }}
                      >
                        {val.tm_task_description || 'not given'}
                      </Box>
                    )}
                  </Box>
                )
              }}
            />
          ) : (
            <Box></Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default memo(DeptOverDue)
