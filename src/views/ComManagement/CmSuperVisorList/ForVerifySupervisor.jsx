import { Box, Chip, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { Virtuoso } from 'react-virtuoso'
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded'
import ErrorIcon from '@mui/icons-material/Error'
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp'
import QueryModalview from '../AssignComplaint/Queries/QueryModalview'
import SupervisorVerifyModal from './SupervisorVerifyModal'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import { warningNotify } from 'src/views/Common/CommonCode'
import ComFileView from '../CmFileView/ComFileView'
import TextComponent from 'src/views/Components/TextComponent'
import { format } from 'date-fns'
import JSZip from 'jszip'

const ForVerifySupervisor = ({ forVerifyList, count, setCount }) => {
  const [queryflag, setqueryflag] = useState(0)
  const [queryOpen, setqueryOpen] = useState(false)
  const [valuee, setValuee] = useState([])
  const [verifyFlag, setverifyFlag] = useState(0)
  const [verifyOpen, setverifyOpen] = useState(false)
  const [forVerifyData, setforVerifyData] = useState([])
  const [image, setimage] = useState(0)
  const [fileDetails, setfileDetails] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  // const [selectedImages, setSelectedImages] = useState([])
  const [imageViewOpen, setimageViewOpen] = useState(false)

  const RaiseQuery = useCallback(value => {
    setqueryflag(1)
    setValuee(value)
    setqueryOpen(true)
  }, [])

  const ForVerifyModal = useCallback(value => {
    setverifyFlag(1)
    setforVerifyData(value)
    setverifyOpen(true)
  }, [])

  const fileView = async val => {
    const { complaint_slno } = val
    setimage(1)
    setimageViewOpen(true)
    setfileDetails(val)
    // try {
    //   const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`)
    //   const { success } = result.data
    //   if (success === 1) {
    //     const data = result.data
    //     const fileNames = data.data
    //     const fileUrls = fileNames.map(fileName => {
    //       return `${PUBLIC_NAS_FOLDER}/ComplaintManagement/${complaint_slno}/${fileName}`
    //     })
    //     setImageUrls(fileUrls)
    //     if (fileUrls.length > 0) {
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
    try {
      const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`, {
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
      }
    } catch (error) {
      console.error('Error fetching or processing images:', error);
      // setUploadedImages([])
      warningNotify('No Image Attached')
    }
  }

  return (
    <Box>
      {queryflag === 1 ? (
        <QueryModalview open={queryOpen} setqueryOpen={setqueryOpen} valuee={valuee} setqueryflag={setqueryflag} />
      ) : null}
      {verifyFlag === 1 ? (
        <SupervisorVerifyModal
          open={verifyOpen}
          setverifyOpen={setverifyOpen}
          forVerifyData={forVerifyData}
          setverifyFlag={setverifyFlag}
          count={count}
          setCount={setCount}
        />
      ) : null}

      {image === 1 ? (
        <ComFileView
          imageUrls={imageUrls}
          imageViewOpen={imageViewOpen}
          // selectedImages={selectedImages}
          fileDetails={fileDetails}
          setimage={setimage}
          setimageViewOpen={setimageViewOpen}
        />
      ) : null}
      <Virtuoso
        style={{ height: '67vh' }}
        totalCount={forVerifyList?.length}
        itemContent={index => {
          const val = forVerifyList[index]
          return (
            <Box
              key={val.complaint_slno}
              sx={{
                flex: 1,
                border: 1,
                borderColor: '#0B6BCB',
                borderRadius: 8,
                bgcolor: 'white',
                mb: 0.5
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  bgcolor: '#E5E8E9',
                  borderTopRightRadius: 6,
                  borderTopLeftRadius: 6,
                  mx: 0.1,
                  display: 'flex'
                }}
              >
                <CssVarsProvider>
                  <Tooltip title="Ticket Registered Date and time" placement="top-start">
                    <Box sx={{ cursor: 'pointer' }}>
                      <TextComponent
                        sx={{
                          color: 'black',
                          fontWeight: 540,
                          flex: 1,
                          fontSize: 15,
                          pl: 1,
                          py: 0.5,
                          fontFamily: 'Arial'
                        }}
                        text={
                          val.compalint_date
                            ? format(new Date(val.compalint_date), 'dd MMM yyyy,   hh:mm a')
                            : 'Invalid Date'
                        }
                      />
                    </Box>
                  </Tooltip>
                </CssVarsProvider>
                <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <Box
                    sx={{
                      my: 0.3,
                      mr: 0.1,
                      px: 2,
                      fontWeight: 500,
                      fontSize: 14,
                      cursor: 'pointer'
                    }}
                  >
                    Ticket Registered by : {val.comp_reg_emp}
                  </Box>
                </Box>
              </Box>
              <CssVarsProvider>
                <Box sx={{ flex: 1, display: 'flex', p: 0.8 }}>
                  <Box
                    sx={{
                      maxWidth: 200,
                      mx: 1,
                      pr: 1,
                      borderRight: 1,
                      borderColor: 'lightgrey'
                    }}
                  >
                    <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}> Ticket No.</Typography>
                    <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700, px: 3 }}>
                      {val.complaint_slno}
                    </Typography>
                    <Box sx={{ flex: 1, display: 'flex', my: 0.5, justifyContent: 'center' }}>
                      {val.cm_file_status === 1 ? (
                        <Tooltip title="File View">
                          <FilePresentRoundedIcon
                            sx={{
                              color: '#41729F',
                              cursor: 'pointer',
                              height: 28,
                              width: 30,
                              border: 1,
                              borderRadius: 5,
                              p: 0.1,
                              '&:hover': { color: '#274472' }
                            }}
                            onClick={() => fileView(val)}
                          />
                        </Tooltip>
                      ) : null}
                      <Tooltip title="Verify" color="primary">
                        <VerifiedSharpIcon
                          sx={{
                            height: 28,
                            width: 30,
                            color: '#0B6BCB',
                            cursor: 'pointer',
                            border: 1,
                            borderRadius: 5,
                            p: 0.1,
                            mx: 0.5,
                            '&:hover': { color: '#41729F' }
                          }}
                          onClick={() => ForVerifyModal(val)}
                        />
                      </Tooltip>
                      {val.cm_query_status === 1 ? (
                        <Tooltip title="Queries">
                          <QuestionAnswerRoundedIcon
                            sx={{
                              height: 28,
                              width: 30,
                              color: '#098470',
                              cursor: 'pointer',
                              border: 1,
                              borderRadius: 5,
                              p: 0.1,
                              '&:hover': { color: '#41729F' }
                            }}
                            onClick={() => RaiseQuery(val)}
                          />
                        </Tooltip>
                      ) : val.cm_query_status === 2 ? (
                        <Tooltip title="Queries">
                          <QuestionAnswerRoundedIcon
                            sx={{
                              height: 28,
                              width: 30,
                              color: '#098470',
                              cursor: 'pointer',
                              border: 1,
                              borderRadius: 5,
                              p: 0.1,
                              '&:hover': { color: '#41729F' }
                            }}
                            onClick={() => RaiseQuery(val)}
                          />
                        </Tooltip>
                      ) : null}
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      pl: 0.5,
                      maxWidth: 500
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        mt: 0.5
                      }}
                    >
                      <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>Department Section</Typography>
                      <Typography sx={{ fontSize: 14, flex: 1, textTransform: 'capitalize' }}>
                        {val.location.charAt(0).toUpperCase() + val.location.slice(1).toLowerCase()}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        mt: 0.5
                      }}
                    >
                      <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>Location</Typography>
                      <Typography sx={{ fontSize: 13, flex: 1 }}>
                        {val.rm_room_name}
                        {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name
                          ? ` (${val.rm_roomtype_name || ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''
                          }${val.rm_insidebuildblock_name || ''}${val.rm_insidebuildblock_name && val.rm_floor_name ? ' - ' : ''
                          }${val.rm_floor_name || ''})`
                          : val.cm_complaint_location || 'Not Updated'}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        mt: 0.5
                      }}
                    >
                      <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>Complaint Type</Typography>
                      <Typography sx={{ fontSize: 14, flex: 1 }}>
                        {val.complaint_type_name.charAt(0).toUpperCase() +
                          val.complaint_type_name.slice(1).toLowerCase()}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ flex: 1, pl: 1.5 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 700 }}>Complaint Describtion</Typography>
                    <Typography
                      sx={{
                        pr: 0.5,
                        pt: 0.3,
                        fontSize: 14,
                        maxHeight: 50,
                        overflow: 'auto'
                      }}
                    >
                      {val.complaint_desc || 'Not Updated'}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    flex: 1,
                    bgcolor: '#E5E8E9',
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    mb: 0.1,
                    mx: 0.1,
                    display: 'flex'
                  }}
                >
                  {val.priority_check === 1 ? (
                    <Box sx={{ display: 'flex', pl: 1.5 }}>
                      <ErrorIcon
                        sx={{
                          height: 30,
                          width: 25,
                          color: val.priority_check === 1 ? '#970C10' : 'lightgrey'
                        }}
                      />
                      <Typography
                        sx={{
                          fontWeight: 600,
                          pl: 0.5,
                          fontSize: 14,
                          pt: 0.5,
                          color: 'darkred',
                          overflow: 'auto'
                        }}
                      >
                        {val.priority_reason}
                      </Typography>
                    </Box>
                  ) : null}
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, pt: 0.5 }}>Assignees :</Typography>
                    &nbsp;&nbsp;
                    <Box sx={{ fontWeight: 600, display: 'flex', py: 0.4, gap: 0.3 }}>
                      {val.assigned_employees === null ? (
                        <Chip>Not Updated</Chip>
                      ) : (
                        <>
                          {val.assigned_employees.split(',').map((name, index) => (
                            <Chip
                              key={index}
                              size="small"
                              variant="outlined"
                              sx={{ bgcolor: '#D3C7A1', fontSize: 13, px: 0.8, marginRight: 0.1 }}
                            >
                              {name.trim()}
                            </Chip>
                          ))}
                        </>
                      )}
                    </Box>
                  </Box>
                </Box>
              </CssVarsProvider>
            </Box>
          )
        }}
      />
    </Box>
  )
}

export default memo(ForVerifySupervisor)
