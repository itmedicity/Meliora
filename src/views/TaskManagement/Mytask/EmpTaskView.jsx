import React, { memo, useCallback, useState } from 'react'
import { Box, Chip, CssVarsProvider } from '@mui/joy'
import { Paper, Typography } from '@mui/material'
import EmpStatusUpdationinDash from './EmpStatusUpdationinDash'
import CountDowncomponent from '../CountDown/CountDowncomponent'
import { warningNotify } from 'src/views/Common/CommonCode'
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import EditIcon from '@mui/icons-material/Edit'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { Virtuoso } from 'react-virtuoso'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import { useNavigate } from 'react-router-dom'

const EmpTaskView = ({ tableCount, setTableCount, setflag, tableDataEmployee, empTaskHeading }) => {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editModalFlag, setEditModalFlag] = useState(0)
  const [masterData, setMasterData] = useState([])
  const [getarry, setgetarry] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [imageViewModalOpen, setimageViewModalOpen] = useState(false)
  const [image, setimage] = useState(0)
  const [imageUrls, setImageUrls] = useState([])
  const history = useNavigate()

  const backtoDash = useCallback(() => {
    history('/Home/TaskManagementEmployeeTask')
    setflag(0)
  }, [history, setflag])

  const rowSelectModal = useCallback(value => {
    setEditModalFlag(1)
    setEditModalOpen(true)
    setMasterData(value)
  }, [])
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


  return (
    <Paper sx={{ height: '90vh', width: '100%' }}>
      <Box sx={{ flex: 1, height: 30, display: 'flex' }}>
        <Typography sx={{ color: 'grey', fontWeight: 500, flex: 1, pt: 0.5, pl: 1 }}>{empTaskHeading}</Typography>
        <Box sx={{ pl: 0.5 }}>
          <HighlightOffIcon sx={{ color: 'grey', height: 30, width: 30, cursor: 'pointer' }} onClick={backtoDash} />
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#DFE3ED', p: 0.5 }}>
        <Box sx={{ bgcolor: 'white', p: 1 }}>
          <Box sx={{ width: '100%', overflow: 'auto' }}>
            {editModalFlag === 1 ? (
              <EmpStatusUpdationinDash
                open={editModalOpen}
                setEditModalOpen={setEditModalOpen}
                masterData={masterData}
                setEditModalFlag={setEditModalFlag}
                tableCount={tableCount}
                setTableCount={setTableCount}
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
            {tableDataEmployee.length !== 0 ? (
              <Box sx={{ width: 2300 }}>
                <Box
                  sx={{
                    height: 45,
                    mt: 0.5,
                    mx: 0.5,
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
                      width: 60,
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
                      width: 60,
                      textAlign: 'center',
                      fontWeight: 600,
                      color: '#444444',
                      fontSize: 12,
                      pl: 2
                    }}
                  >
                    Files
                  </Box>
                  <Box
                    sx={{
                      width: 120,
                      textAlign: 'center',
                      fontWeight: 600,
                      color: '#444444',
                      fontSize: 12,
                      pl: 1
                    }}
                  >
                    Status
                  </Box>
                  <Box sx={{ width: 170, fontWeight: 600, color: '#444444', fontSize: 12, pl: 6 }}>CountDown</Box>
                  <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 5 }}>Task Name</Box>
                  <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 3.5 }}>Project</Box>
                  <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Created Date</Box>
                  <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Due Date</Box>
                  <Box sx={{ width: 800, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Description</Box>
                </Box>
                <Virtuoso
                  style={{ height: '80vh' }}
                  totalCount={tableDataEmployee?.length}
                  itemContent={index => {
                    const val = tableDataEmployee[index]
                    return (
                      <Box
                        key={val.tm_task_slno}
                        sx={{
                          flex: 1,
                          display: 'flex',
                          mt: 0.1,
                          borderBottom: 2,
                          mx: 0.5,
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
                        <Box sx={{ width: 150, textAlign: 'center', fontWeight: 600 }}>
                          <CssVarsProvider>
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
                          </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: 160, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                          {val.tm_task_status !== 1 ? (
                            <Box
                              sx={{
                                bgcolor: '#EAEAEA',
                                borderRadius: 15,
                                width: 150,
                                pl: 1,
                                mb: 0.5
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
              </Box>
            ) : (
              <Box
                sx={{
                  textAlign: 'center',
                  width: 200,
                  margin: 'auto',
                  height: 600,
                  pt: 20,
                  fontWeight: 700,
                  fontSize: 30,
                  color: '#C7C8CB'
                }}
              >
                No Dues
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default memo(EmpTaskView)
