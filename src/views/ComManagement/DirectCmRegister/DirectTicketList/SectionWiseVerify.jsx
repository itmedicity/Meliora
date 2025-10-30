import { Box, CircularProgress, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt'
import CommentIcon from '@mui/icons-material/Comment'
import TextsmsIcon from '@mui/icons-material/Textsms'
import CmReplyModal from '../../AssignComplaint/Queries/CmReplyModal'
import VerifiedUserSharpIcon from '@mui/icons-material/VerifiedUserSharp'
import { keyframes } from '@emotion/react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import UserEndVerificationModal from '../UserEndVerificationModal'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import ComFileView from '../../CmFileView/ComFileView'
import { format } from 'date-fns'

const SectionWiseVerify = ({ count, setCount, loading, verficationPending, forVerify }) => {
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
  const [selectedImages, setSelectedImages] = useState([])

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
    try {
      const result = await axioslogin.get(`/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`)
      const { success } = result.data
      if (success === 1) {
        const data = result.data
        const fileNames = data.data
        const fileUrls = fileNames.map(fileName => {
          return `/ComplaintManagement/${complaint_slno}/${fileName}`
        })
        setImageUrls(fileUrls)
        // Open the modal only if there are files
        if (fileUrls.length > 0) {
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

  const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }`

  const ForVerifyModal = useCallback(value => {
    setverifyFlag(1)
    setforVerifyData(value)
    setverifyOpen(true)
  }, [])

  const sortedForVerify = useMemo(() => {
    const verificationSlnoSet = new Set((verficationPending || []).map(item => item.complaint_slno))
    return [...(forVerify || [])].sort((a, b) => {
      const aIsCommon = verificationSlnoSet.has(a.complaint_slno)
      const bIsCommon = verificationSlnoSet.has(b.complaint_slno)
      return bIsCommon - aIsCommon
    })
  }, [forVerify, verficationPending])

  return (
    <Box>
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

        {image === 1 ? (
          <ComFileView
            imageUrls={imageUrls}
            imageViewOpen={imageViewOpen}
            selectedImages={selectedImages}
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
          <Box sx={{ width: 2150 }}>
            <Box
              sx={{
                height: 40,
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
              <Box sx={{ width: 100, fontWeight: 600, color: '#444444', fontSize: 12, pl: 2 }}>Ticket No.</Box>
              <Box sx={{ width: 130, fontWeight: 600, color: '#444444', fontSize: 12, pl: 3 }}>Action</Box>
              <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12 }}>Complaint Type</Box>
              <Box sx={{ width: 610, fontWeight: 600, color: '#444444', fontSize: 12, pl: 1 }}>Describtion</Box>
              <Box sx={{ width: 180, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.2 }}>Complaint To</Box>
              <Box sx={{ width: 220, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.3 }}>Complaint From</Box>
              <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.3 }}>Location</Box>
              <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.5 }}>Location Details</Box>
              <Box sx={{ width: 150, fontWeight: 600, color: '#444444', fontSize: 12, pl: 0.8 }}>Complaint Date</Box>
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
                      mx: 1,
                      borderColor: 'lightgrey',
                      minHeight: 35,
                      bgcolor: isCommon ? '#FFF387' : 'white',
                      pt: 0.5
                    }}
                  >
                    <Box sx={{ pl: 2, width: 93, fontWeight: 600, fontSize: 14 }}>{val.complaint_slno}</Box>

                    <Box sx={{ width: 135, display: 'flex', gap: 0.5, textAlign: 'center' }}>
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
                        <Tooltip title="Verify Ticket" placement="top-start">
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
                    <Box sx={{ width: 160, fontSize: 13 }}>{val.complaint_type_name}</Box>
                    <Box sx={{ width: 610, fontSize: 14 }}>{val.complaint_desc}</Box>
                    <Box sx={{ width: 180, fontSize: 13 }}>{val.complaint_dept_name}</Box>
                    <Box sx={{ width: 220, fontSize: 13 }}>{val.location}</Box>
                    <Box sx={{ width: 300, fontSize: 13 }}>
                      {val.rm_room_name}
                      {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name
                        ? ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''
                        }${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${val.rm_insidebuildblock_name && val.rm_floor_name ? ' - ' : ''
                        }${val.rm_floor_name ? val.rm_floor_name : ''})`
                        : 'Not Updated'}
                    </Box>
                    <Box sx={{ width: 300, fontSize: 13, pl: 0.5 }}>{val.cm_complaint_location || 'Not Updated'}</Box>
                    <Box sx={{ width: 150, fontSize: 13, pl: 1 }}>
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
            <Typography sx={{ fontSize: 25, fontWeight: 800, color: 'lightgrey', textAlign: 'center', pt: 5 }}>
              Empty List
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(SectionWiseVerify)
