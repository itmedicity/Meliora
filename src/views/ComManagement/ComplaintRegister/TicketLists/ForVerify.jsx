import { Box, CircularProgress, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt'
import CommentIcon from '@mui/icons-material/Comment'
import TextsmsIcon from '@mui/icons-material/Textsms'
import CmReplyModal from '../../AssignComplaint/Queries/CmReplyModal'
import VerifiedUserSharpIcon from '@mui/icons-material/VerifiedUserSharp'
import { keyframes } from '@emotion/react'
import UserEndVerificationModal from '../../DirectCmRegister/UserEndVerificationModal'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import ComFileView from '../../CmFileView/ComFileView'
import ViewAssetDetails from './ViewAssetDetails'
import { format } from 'date-fns'
import JSZip from 'jszip'

const ForVerify = ({ count, setCount, loading, verficationPending, forVerify }) => {
  const [replyflag, setReplyflag] = useState(0)
  const [replyOpen, setReplyOpen] = useState(false)
  const [valuee, setValuee] = useState([])
  const [verifyFlag, setverifyFlag] = useState(0)
  const [verifyOpen, setverifyOpen] = useState(false)
  const [forVerifyData, setforVerifyData] = useState([])
  const [imageViewOpen, setimageViewOpen] = useState(false)
  const [image, setimage] = useState(0)
  const [fileDetails, setfileDetails] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  // const [selectedImages, setSelectedImages] = useState([])
  const [assetflag, setAssetflag] = useState(0)
  const [assetOpen, setAssetOpen] = useState(false)

  const ForVerifyModal = useCallback(value => {
    setverifyFlag(1)
    setforVerifyData(value)
    setverifyOpen(true)
  }, [])

  const ReplyDetails = useCallback(value => {
    setReplyflag(1)
    setValuee(value)
    setReplyOpen(true)
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
    //     // Open the modal only if there are files
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

  const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`

  const sortedForVerify = useMemo(() => {
    const verificationSlnoSet = new Set((verficationPending || []).map(item => item.complaint_slno))
    return [...(forVerify || [])].sort((a, b) => {
      const aIsCommon = verificationSlnoSet.has(a.complaint_slno)
      const bIsCommon = verificationSlnoSet.has(b.complaint_slno)
      return bIsCommon - aIsCommon
    })
  }, [forVerify, verficationPending])

  return (
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      {replyflag === 1 ? (
        <CmReplyModal
          open={replyOpen}
          setReplyOpen={setReplyOpen}
          valuee={valuee}
          setReplyflag={setReplyflag}
          setCount={setCount}
          count={count}
        />
      ) : null}
      {verifyFlag === 1 ? (
        <UserEndVerificationModal
          open={verifyOpen}
          setverifyOpen={setverifyOpen}
          forVerifyData={forVerifyData}
          setverifyFlag={setverifyFlag}
          count={count}
          setcount={setCount}
        />
      ) : null}

      {assetflag === 1 ? (
        <ViewAssetDetails
          assetOpen={assetOpen}
          setAssetOpen={setAssetOpen}
          setAssetflag={setAssetflag}
          valuee={valuee}
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
      {loading ? (
        <Box sx={{ my: 3, textAlign: 'center' }}>
          <CssVarsProvider>
            <CircularProgress variant="soft" color="neutral" thickness={3} />
            <Typography>Loading...</Typography>
          </CssVarsProvider>
        </Box>
      ) : forVerify.length !== 0 ? (
        <Box sx={{ width: 2100 }}>
          <Box
            sx={{
              height: 40,
              mt: 0.5,
              mx: 0.5,
              display: 'flex',
              borderBottom: 1,
              borderTop: 1,
              borderColor: 'lightgray',
              pt: 1,
              bgcolor: 'white'
            }}
          >
            <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1.5 }}>Ticket No.</Box>
            <Box
              sx={{
                width: 125,
                fontWeight: 600,
                color: '#444444',
                fontSize: 12,
                textAlign: 'center'
              }}
            >
              Action
            </Box>
            <Box sx={{ width: 155, fontWeight: 600, color: '#444444', fontSize: 12 }}>Complaint Type</Box>
            <Box sx={{ width: 610, fontWeight: 600, color: '#444444', fontSize: 12 }}>Describtion</Box>
            <Box sx={{ width: 180, fontWeight: 600, color: '#444444', fontSize: 12 }}>Complaint To</Box>
            <Box sx={{ width: 225, fontWeight: 600, color: '#444444', fontSize: 12 }}>Complaint From</Box>
            <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12 }}>Location</Box>
            <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12 }}>Location Details</Box>
            <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12 }}>Complaint Date</Box>
          </Box>
          <Virtuoso
            style={{ height: '28vh' }}
            totalCount={sortedForVerify.length}
            itemContent={index => {
              const val = sortedForVerify[index]
              if (!val) return null
              const verificationSlnoSet = new Set((verficationPending || []).map(item => item.complaint_slno))
              const isCommon = verificationSlnoSet.has(val.complaint_slno)
              return (
                <Box
                  key={val.complaint_slno}
                  sx={{
                    display: 'flex',
                    mt: 0.3,
                    borderBottom: 0.1,
                    mx: 0.5,
                    borderColor: 'lightgrey',
                    minHeight: 35,
                    maxHeight: 200,
                    bgcolor: isCommon ? '#FFF387' : 'white',
                    pt: 0.5
                  }}
                >
                  <Box sx={{ pl: 1.5, width: 100, fontWeight: 600, fontSize: 14 }}>{val.complaint_slno}</Box>
                  <Box sx={{ width: 124, display: 'flex', gap: 0.5, textAlign: 'center' }}>
                    {val.cm_file_status === 1 ? (
                      <CssVarsProvider>
                        <Tooltip title="Attached File" placement="top-start">
                          <FilePresentRoundedIcon
                            sx={{
                              border: 1,
                              borderRadius: 3,
                              p: 0.4,
                              width: 28,
                              height: 28,
                              color: '#41729F',
                              cursor: 'pointer',
                              '&:hover': { color: '#274472' }
                            }}
                            onClick={() => fileView(val)}
                          />
                        </Tooltip>
                      </CssVarsProvider>
                    ) : (
                      <FilePresentRoundedIcon
                        sx={{
                          border: 1,
                          borderRadius: 1,
                          p: 0.4,
                          width: 28,
                          height: 28,
                          color: 'lightgrey'
                        }}
                      />
                    )}

                    <Box onClick={() => ReplyDetails(val)} sx={{ cursor: 'pointer' }}>
                      <CssVarsProvider>
                        <Tooltip title="Queries" placement="top-start">
                          {val.cm_query_status === 1 ? (
                            <MarkUnreadChatAltIcon
                              sx={{
                                border: 1,
                                borderRadius: 3,
                                p: 0.4,
                                width: 28,
                                height: 28,
                                color: '#BF4A32',
                                animation: `${blinkAnimation} 1s infinite`
                              }}
                            />
                          ) : val.cm_query_status === 2 ? (
                            <CommentIcon
                              sx={{
                                border: 1,
                                borderRadius: 3,
                                p: 0.4,
                                width: 28,
                                height: 28,
                                color: '#2B82BF',
                                animation: `${blinkAnimation} 1s infinite`
                              }}
                            />
                          ) : (
                            <TextsmsIcon
                              sx={{
                                border: 1,
                                borderRadius: 3,
                                p: 0.4,
                                width: 28,
                                height: 28,
                                color: '#647C90'
                              }}
                            />
                          )}
                        </Tooltip>
                      </CssVarsProvider>
                    </Box>
                    <CssVarsProvider>
                      <Tooltip title="Verify ticket" placement="top-start">
                        <VerifiedUserSharpIcon
                          sx={{
                            border: 1,
                            borderRadius: 3,
                            p: 0.4,
                            width: 28,
                            height: 28,
                            color: '#0B6BCB',
                            cursor: 'pointer'
                          }}
                          onClick={() => ForVerifyModal(val)}
                        />
                      </Tooltip>
                    </CssVarsProvider>
                  </Box>
                  <Box sx={{ width: 150, fontSize: 13 }}>{val.complaint_type_name}</Box>
                  <Box sx={{ width: 620, fontSize: 14, pl: 1 }}>{val.complaint_desc}</Box>
                  <Box sx={{ width: 175, fontSize: 13 }}>{val.complaint_dept_name}</Box>
                  <Box sx={{ width: 225, fontSize: 13 }}>{val.location}</Box>
                  <Box sx={{ width: 300, fontSize: 13 }}>
                    {val.rm_room_name}
                    {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name
                      ? ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''
                      }${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${val.rm_insidebuildblock_name && val.rm_floor_name ? ' - ' : ''
                      }${val.rm_floor_name ? val.rm_floor_name : ''})`
                      : 'Not Updated'}
                  </Box>
                  <Box sx={{ width: 300, fontSize: 13 }}>{val.cm_complaint_location || 'Not Updated'}</Box>
                  <Box sx={{ width: 150, fontSize: 13 }}>
                    {val.compalint_date
                      ? format(new Date(val.compalint_date), 'dd MMM yyyy,  hh:mm a')
                      : 'Invalid Date'}
                  </Box>
                </Box>
              )
            }}
          />
        </Box>
      ) : (
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: 20, color: 'lightgrey', textAlign: 'center', pt: 5 }}>
            Empty List
          </Typography>
        </Box>
      )}
    </Box>
  )
}

export default memo(ForVerify)
