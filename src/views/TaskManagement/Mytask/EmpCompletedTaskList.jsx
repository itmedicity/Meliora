import { Box, Chip } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import _ from 'underscore'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import EmpTaskStatus from './EmpTaskStatus'
import ViewTaskImage from '../TaskFileView/ViewTaskImage'
import { format } from 'date-fns'
import { Virtuoso } from 'react-virtuoso'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import JSZip from 'jszip'

const EmpCompletedTaskList = ({
  tableCount,
  setTableCount,
  taskcount,
  settaskcount,
  projectcount,
  setprojectcount
}) => {
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

  useEffect(() => {
    const getMasterTable = async () => {
      const result = await axioslogin.get(`/TmTableView/employeeCompleted/${id}`)
      const { success, data } = result.data
      if (data.length !== 0) {
        if (success === 2) {
          const arry = data?.map(val => {
            const obj = {
              tm_task_slno: val.tm_task_slno,
              tm_task_name: val.tm_task_name,
              dept_name: val.dept_name.toLowerCase(),
              sec_name: val.sec_name.toLowerCase(),
              em_name: val.em_name,
              tm_assigne_emp: val.tm_assigne_emp,
              tm_task_dept: val.tm_task_dept,
              tm_task_dept_sec: val.tm_task_dept_sec,
              tm_task_due_date: val.tm_task_due_date,
              main_task_slno: val.main_task_slno,
              tm_task_description: val.tm_task_description,
              tm_task_status: val.tm_task_status,
              tm_project_slno: val.tm_project_slno,
              tm_project_name: val.tm_project_name,
              tm_pending_remark: val.tm_pending_remark,
              tm_onhold_remarks: val.tm_onhold_remarks,
              create_date: val.create_date,
              tm_complete_date: val.tm_complete_date,
              tm_completed_remarks: val.tm_completed_remarks,
              tm_task_file: val.tm_task_file,
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
              datediff: new Date(val.tm_complete_date) - new Date(val.tm_task_due_date),
              days: Math.floor(
                (new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / (1000 * 60 * 60 * 24)
              ),
              hours: Math.floor(
                ((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / (1000 * 60 * 60)) % 24
              ),
              minutes: Math.floor(((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / 1000 / 60) % 60),
              seconds: Math.floor(((new Date(val.tm_complete_date) - new Date(val.tm_task_due_date)) / 1000) % 60)
            }
            return obj
          })
          setTabledata(arry)
        } else {
          warningNotify('error occured')
        }
      } else {
      }
    }
    getMasterTable(id)
  }, [id, tableCount])

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
    // try {
    //   const result = await axioslogin.get(`/TmFileUpload/uploadFile/getTaskFile/${tm_task_slno}`)
    //   const { success } = result.data
    //   if (success === 1) {
    //     const data = result.data

    //     const fileNames = data.data

    //     const fileUrls = fileNames.map(fileName => {
    //       return `${PUBLIC_NAS_FOLDER}/TaskManagement/${tm_task_slno}/${fileName}`
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
    //     warningNotify('No Image Attached')
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

  return (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      {editModalFlag === 1 ? (
        <EmpTaskStatus
          open={editModalOpen}
          setEditModalOpen={setEditModalOpen}
          masterData={masterData}
          setEditModalFlag={setEditModalFlag}
          taskcount={taskcount}
          settaskcount={settaskcount}
          projectcount={projectcount}
          setprojectcount={setprojectcount}
          tableCount={tableCount}
          setTableCount={setTableCount}
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
      {tabledata.length !== 0 ? (
        <Box sx={{ width: 2500 }}>
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
                pl: 0.5
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
                pl: 2
              }}
            >
              Status
            </Box>
            <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2.5 }}>Completion exceed</Box>
            <Box sx={{ width: 900, fontWeight: 600, color: '#444444', fontSize: 12 }}>Task Name</Box>
            <Box sx={{ width: 900, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.5 }}>Project</Box>
            <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Created Date</Box>
            <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Due Date</Box>
            <Box sx={{ width: 250, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Completed Date</Box>
            <Box sx={{ width: 900, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Description</Box>
          </Box>

          <Virtuoso
            style={{ height: '56vh' }}
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
                    mx: 0.5,
                    borderColor: 'lightgrey',
                    minHeight: 30,
                    maxHeight: 80,
                    background: val.main_task_slno !== null ? '#EAE7FA' : val.main_task_slno === 0 ? 'white' : 'white',
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
                  <Box sx={{ width: 160, textAlign: 'center' }}>
                    <Chip
                      sx={{
                        fontSize: 11,
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
                  </Box>
                  <Box sx={{ width: 220, fontWeight: 600, color: 'grey', fontSize: 12 }}>
                    {val.datediff > 0 ? (
                      <Chip
                        sx={{
                          backgroundColor: '#F8EA8C',
                          p: 0.5,
                          color: '#3B0404',
                          fontSize: 11,
                          fontWeight: 600
                        }}
                      >
                        {val.days} Days - {val.hours}h: {val.minutes}m: {val.seconds}s
                      </Chip>
                    ) : (
                      <Chip sx={{ fontSize: 11, color: '#2C5E1A' }}>Completed On Time</Chip>
                    )}
                  </Box>
                  {val.tm_task_status === 1 ? (
                    <Box
                      sx={{
                        width: 900,
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
                        width: 900,
                        fontWeight: 650,
                        color: 'grey',
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
                        width: 900,
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
                        width: 900,
                        fontWeight: 600,
                        color: 'grey',
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
                      {format(new Date(val.create_date), 'MMM dd, yyyy HH:mm:ss')}
                    </Box>
                  ) : (
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
                        pl: 1
                      }}
                    >
                      {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
                    </Box>
                  ) : (
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
                      {format(new Date(val.tm_task_due_date), 'MMM dd, yyyy HH:mm:ss')}
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
                      {format(new Date(val.tm_complete_date), 'MMM dd, yyyy HH:mm:ss')}
                    </Box>
                  ) : (
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
                      {format(new Date(val.tm_complete_date), 'MMM dd, yyyy HH:mm:ss')}
                    </Box>
                  )}
                  {val.tm_task_status === 1 ? (
                    <Box
                      sx={{
                        width: 900,
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
                        width: 900,
                        fontWeight: 600,
                        color: 'grey',
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
            width: 400,
            margin: 'auto',
            height: 500,
            pt: 20,
            fontWeight: 700,
            fontSize: 30,
            color: '#C7C8CB'
          }}
        >
          No Task Completed Yet!
        </Box>
      )}
    </Box>
  )
}
export default memo(EmpCompletedTaskList)
