import { Box, Chip, CssVarsProvider, Input, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import _ from 'underscore'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, warningNotify } from 'src/views/Common/CommonCode'
import EmpTaskStatus from './EmpTaskStatus'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import SearchIcon from '@mui/icons-material/Search'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import TmProjectListSearch from 'src/views/CommonSelectCode/TmProjectListSearch'
import { getProjectList } from 'src/redux/actions/TmProjectsList.action'
import { useDispatch } from 'react-redux'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import SwapVertIcon from '@mui/icons-material/SwapVert'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import { format } from 'date-fns'
import { Virtuoso } from 'react-virtuoso'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'

const EmpAllTask = ({
  tableCount,
  setTableCount,
  taskcount,
  settaskcount,
  projectcount,
  setprojectcount,
}) => {
  const dispatch = useDispatch()
  const [tabledata, setTabledata] = useState([])
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editModalFlag, setEditModalFlag] = useState(0)
  const [masterData, setMasterData] = useState([])
  const [getarry, setgetarry] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
  const [image, setimage] = useState(0)
  const [imageUrls, setImageUrls] = useState([])
  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)
  const [alphbased, setAlphbased] = useState(0)
  const [alphbasedData, setAlphbasedData] = useState([])
  const [projectBasdData, setProjectBasdData] = useState([])
  const [searchFlag, setsearchFlag] = useState(0)
  const [taxkFlag, setTaxkFlag] = useState(0)
  const [projxFlag, setprojxFlag] = useState(0)
  const [enterText, setEnterText] = useState('')
  const [statusDataFlag, setstatusDataFlag] = useState(0)
  const [borderB, setborderB] = useState(0)
  const [borderT, setborderT] = useState(0)
  const [sectiondataFlag, setsectiondataFlag] = useState(0)
  const [projectz, setprojectz] = useState(0)

  useEffect(() => {
    dispatch(getProjectList())
  }, [dispatch])

  useEffect(() => {
    const getMasterTable = async () => {
      const result = await axioslogin.get(`/TmTableView/employeeAllTask/${id}`)
      const { success, data } = result.data
      if (data.length !== 0) {
        if (success === 2) {
          setTabledata(data)
        } else {
          setTabledata([])
        }
      } else {
        setTabledata([])
      }
    }
    getMasterTable(id)
  }, [id, tableCount])

  const SearchInTableProject = useCallback(() => {
    if (projectz !== 0) {
      let newtabledataaProject =
        tabledata && tabledata.filter(val => val.tm_project_slno === projectz)
      setsearchFlag(1)
      setProjectBasdData(newtabledataaProject)
    } else {
      infoNotify('please select a project to search')
    }
  }, [projectz, tabledata])

  useEffect(() => {
    if (projxFlag === 1) {
      let newtabledataaProject =
        tabledata && tabledata.filter(val => val.tm_project_slno === projectz)
      setProjectBasdData(newtabledataaProject)
    }
  }, [taskcount, tabledata, alphbased, enterText, projectz, projxFlag])

  const updateEnterText = useCallback(e => {
    setEnterText(e.target.value)
  }, [])

  const SearchInTableByTask = useCallback(() => {
    if (enterText.length < 3) {
      infoNotify('Please enter a minimum of 3 characters to search task name')
    } else {
      const searchText = enterText.toLowerCase()
      const newtabledataa =
        tabledata &&
        tabledata.filter(item => {
          const taskName = item.tm_task_name.toLowerCase()
          return taskName.includes(searchText)
        })
      setAlphbased(1)
      setAlphbasedData(newtabledataa)
    }
  }, [enterText, tabledata])

  useEffect(() => {
    if (alphbased === 1) {
      const searchText = enterText.trim().toLowerCase()
      const newTableDataa =
        tabledata &&
        tabledata.filter(val => val.tm_task_name.trim().toLowerCase().includes(searchText))
      setAlphbasedData(newTableDataa)
    }
  }, [taskcount, tabledata, alphbased, enterText])

  const projxWise = useCallback(() => {
    setprojxFlag(1)
    setTaxkFlag(0)
    setborderB(1)
    setborderT(0)
  }, [])

  const taskWise = useCallback(() => {
    setTaxkFlag(1)
    setprojxFlag(0)
    setborderT(1)
    setborderB(0)
  }, [])

  const closeSearchWise = useCallback(() => {
    setprojxFlag(0)
    setprojectz(0)
    setTaxkFlag(0)
    setsearchFlag(0)
    setEnterText('')
    setAlphbased(0)
    setstatusDataFlag(0)
    setsectiondataFlag(0)
    setborderB(0)
    setborderT(0)
  }, [])

  const rowSelectModal = useCallback(value => {
    setEditModalFlag(1)
    setEditModalOpen(true)
    setimageViewModalOpen(false)
    setimage(0)
    setMasterData(value)
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
  const isPastDue = tm_task_due_date => {
    const today = new Date()
    const due = new Date(tm_task_due_date)
    return due < today
  }

  return (
    <Box>
      {tabledata.length !== 0 ? (
        <Box>
          {editModalFlag === 1 ? (
            <EmpTaskStatus
              open={editModalOpen}
              setEditModalOpen={setEditModalOpen}
              masterData={masterData}
              setEditModalFlag={setEditModalFlag}
              searchFlag={searchFlag}
              taskcount={taskcount}
              settaskcount={settaskcount}
              tableCount={tableCount}
              setTableCount={setTableCount}
              projectcount={projectcount}
              setprojectcount={setprojectcount}
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
            <Box sx={{ flex: 2 }}></Box>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ flex: 1, display: 'flex', ml: 2 }}>
                <Box sx={{ flex: 0.5, display: 'flex', cursor: 'pointer' }} onClick={projxWise}>
                  {borderB === 1 ? (
                    <SwapVertIcon sx={{ p: 0.3, color: 'blue' }} />
                  ) : (
                    <SwapVertIcon sx={{ p: 0.3 }} />
                  )}
                  <Typography sx={{ fontSize: 12, '&:hover': { color: 'blue' } }}>
                    {borderB === 1 ? (
                      <u style={{ textDecorationColor: 'blue', color: 'blue' }}>Project</u>
                    ) : (
                      <>Project</>
                    )}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', cursor: 'pointer' }} onClick={taskWise}>
                  {borderT === 1 ? (
                    <FilterAltOutlinedIcon sx={{ p: 0.3, color: 'blue' }} />
                  ) : (
                    <FilterAltOutlinedIcon sx={{ p: 0.3 }} />
                  )}

                  <Typography sx={{ fontSize: 12, '&:hover': { color: 'blue' }, pt: 0.1 }}>
                    {borderT === 1 ? (
                      <u style={{ textDecorationColor: 'blue', color: 'blue' }}>Task</u>
                    ) : (
                      <>Task</>
                    )}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1, mr: 11, ml: 5 }}>
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
                              height: '100%',
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
                              height: '100%',
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
                          pl: 1,
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
                              height: '100%',
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
                              height: '100%',
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
            <Box sx={{ width: 2200 }}>
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
                <Box sx={{ width: 40, pl: 1.7, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                  #
                </Box>
                <Box
                  sx={{
                    width: 70,
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
                    width: 60,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#444444',
                    fontSize: 12,
                  }}
                >
                  Files
                </Box>
                <Box
                  sx={{
                    width: 140,
                    textAlign: 'center',
                    fontWeight: 600,
                    color: '#444444',
                    fontSize: 12,
                  }}
                >
                  Status
                </Box>
                <Box
                  sx={{
                    width: 250,
                    fontWeight: 600,
                    color: '#444444',
                    fontSize: 12,
                    textAlign: 'center',
                  }}
                >
                  CountDown
                </Box>
                <Box sx={{ width: 700, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                  Task Name
                </Box>
                <Box sx={{ width: 700, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                  Project
                </Box>
                <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                  Created Date
                </Box>
                <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                  Due Date
                </Box>
                <Box sx={{ width: 700, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                  Description
                </Box>
              </Box>
              {alphbased === 0 &&
              searchFlag === 0 &&
              statusDataFlag === 0 &&
              sectiondataFlag === 0 ? (
                <Virtuoso
                  style={{ height: '52vh' }}
                  totalCount={tabledata?.length}
                  itemContent={index => {
                    const val = tabledata[index]
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
                        <Box
                          sx={{ width: 40, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}
                        >
                          {index + 1}
                        </Box>
                        <Box
                          sx={{
                            width: 60,
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
                        <Box sx={{ width: 160, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                          {val.tm_task_status !== 1 ? (
                            <Box
                              sx={{
                                bgcolor: '#EAEAEA',
                                borderRadius: 15,
                                mb: 0.5,
                                width: 150,
                                pl: 1,
                              }}
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
                              width: 700,
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
                              width: 700,
                              fontWeight: 650,
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
                              width: 700,
                              fontWeight: 600,
                              color: 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {val.tm_project_name || 'not given'}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 700,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {val.tm_project_name || 'not given'}
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
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 250,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
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
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 250,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                          </Box>
                        )}
                        {val.tm_task_status === 1 ? (
                          <Box
                            sx={{
                              width: 700,
                              fontWeight: 600,
                              color: 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {val.tm_task_description || 'not given'}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 700,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
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
                  style={{ height: '50vh' }}
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
                            val.main_task_slno !== null
                              ? '#EAE7FA'
                              : val.main_task_slno === 0
                              ? 'white'
                              : 'white',
                          pt: 0.5,
                        }}
                      >
                        <Box
                          sx={{ width: 40, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}
                        >
                          {index + 1}
                        </Box>
                        <Box
                          sx={{
                            width: 60,
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
                        <Box sx={{ width: 180, textAlign: 'center', fontWeight: 600 }}>
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
                        <Box sx={{ width: 160, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                          {val.tm_task_status !== 1 ? (
                            <Box
                              sx={{
                                bgcolor: '#EAEAEA',
                                borderRadius: 15,
                                mb: 0.5,
                                width: 150,
                                pl: 1,
                              }}
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
                              width: 700,
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
                              width: 700,
                              fontWeight: 650,
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
                              width: 700,
                              fontWeight: 600,
                              color: 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {val.tm_project_name || 'not given'}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 700,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {val.tm_project_name || 'not given'}
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
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 250,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
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
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 250,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                          </Box>
                        )}
                        {val.tm_task_status === 1 ? (
                          <Box
                            sx={{
                              width: 700,
                              fontWeight: 600,
                              color: 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {val.tm_task_description || 'not given'}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 700,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
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
                  style={{ height: '50vh' }}
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
                            val.main_task_slno !== null
                              ? '#EAE7FA'
                              : val.main_task_slno === 0
                              ? 'white'
                              : 'white',
                          pt: 0.5,
                        }}
                      >
                        <Box
                          sx={{ width: 40, pl: 1.7, fontWeight: 600, color: 'grey', fontSize: 12 }}
                        >
                          {index + 1}
                        </Box>
                        <Box
                          sx={{
                            width: 60,
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
                        <Box sx={{ width: 180, textAlign: 'center', fontWeight: 600 }}>
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
                        <Box sx={{ width: 160, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                          {val.tm_task_status !== 1 ? (
                            <Box
                              sx={{
                                bgcolor: '#EAEAEA',
                                borderRadius: 15,
                                mb: 0.5,
                                width: 150,
                                pl: 1,
                              }}
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
                              width: 700,
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
                              width: 700,
                              fontWeight: 650,
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
                              width: 700,
                              fontWeight: 600,
                              color: 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {val.tm_project_name || 'not given'}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 700,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {val.tm_project_name || 'not given'}
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
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 250,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
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
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 250,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                          </Box>
                        )}
                        {val.tm_task_status === 1 ? (
                          <Box
                            sx={{
                              width: 700,
                              fontWeight: 600,
                              color: 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
                            }}
                          >
                            {val.tm_task_description || 'not given'}
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              width: 700,
                              fontWeight: 600,
                              color: isPastDue(val.tm_task_due_date) ? '#B32800' : 'grey',
                              fontSize: 12,
                              textTransform: 'capitalize',
                              pl: 1,
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
              <Box sx={{ height: 5 }}></Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            textAlign: 'center',
            pt: 20,
            height: 500,
            fontWeight: 700,
            fontSize: 30,
            color: '#C7C8CB',
          }}
        >
          No Task Asssigned!
        </Box>
      )}
    </Box>
  )
}

export default memo(EmpAllTask)
