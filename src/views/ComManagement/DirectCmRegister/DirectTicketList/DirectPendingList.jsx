import CmReplyModal from '../../AssignComplaint/Queries/CmReplyModal'
import { Box, CircularProgress, CssVarsProvider, Menu, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import EditIcon from '@mui/icons-material/Edit'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt'
import CommentIcon from '@mui/icons-material/Comment'
import TextsmsIcon from '@mui/icons-material/Textsms'
import { axioslogin } from 'src/views/Axios/Axios'
import { keyframes } from '@emotion/react'
import ViewAssetDetails from '../../ComplaintRegister/TicketLists/ViewAssetDetails'
import { warningNotify } from 'src/views/Common/CommonCode'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import ComFileView from '../../CmFileView/ComFileView'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import PersonIcon from '@mui/icons-material/Person'
import { differenceInMinutes, format, parseISO } from 'date-fns'
import CloseIcon from '@mui/icons-material/Close'
import NotificationsIcon from '@mui/icons-material/Notifications'

const DirectPendingList = ({ count, setCount, rowSelect, pendingCompl, loading }) => {
  const [replyflag, setReplyflag] = useState(0)
  const [replyOpen, setReplyOpen] = useState(false)
  const [valuee, setValuee] = useState([])
  const [assetflag, setAssetflag] = useState(0)
  const [assetOpen, setAssetOpen] = useState(false)
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

  const AssetView = useCallback(
    value => {
      setValuee(value)
      setAssetflag(1)
      setAssetOpen(true)
    },
    [setAssetflag, setAssetOpen]
  )

  const fileView = async val => {
    const { complaint_slno } = val
    setimage(1)
    setimageViewOpen(true)
    setfileDetails(val)
    try {
      const result = await axioslogin.get(
        `/complaintFileUpload/uploadFile/getComplaintFile/${complaint_slno}`
      )
      const { success } = result.data
      if (success === 1) {
        const data = result.data
        const fileNames = data.data
        const fileUrls = fileNames.map(fileName => {
          return `${PUBLIC_NAS_FOLDER}/ComplaintManagement/${complaint_slno}/${fileName}`
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
    100% { opacity: 1; }
`

  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedRow, setSelectedRow] = useState(null)

  const handleClick = (event, val) => {
    setAnchorEl(event.currentTarget)
    setSelectedRow(val)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setSelectedRow(null)
  }

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

        {loading ? (
          <Box sx={{ my: 3, textAlign: 'center' }}>
            <CssVarsProvider>
              <CircularProgress variant="soft" color="neutral" thickness={3} />
              <Typography>Loading...</Typography>
            </CssVarsProvider>
          </Box>
        ) : pendingCompl.length !== 0 ? (
          <Box sx={{ width: 2150, pb: 1 }}>
            <Box
              sx={{
                height: 40,
                mt: 0.5,
                mx: 1,
                display: 'flex',
                borderBottom: 1,
                borderTop: 1,
                borderColor: 'lightgray',
                pt: 1.5,
                bgcolor: 'white',
                gap: 1,
              }}
            >
              <Box sx={{ width: 50, fontWeight: 600, color: '#444444', fontSize: 12 }}></Box>
              <Box sx={{ width: 90, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Ticket No.
              </Box>
              <Box
                sx={{
                  width: 155,
                  fontWeight: 600,
                  color: '#444444',
                  fontSize: 12,
                  textAlign: 'center',
                }}
              >
                Action
              </Box>
              <Box sx={{ width: 160, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Complaint Type
              </Box>
              <Box sx={{ width: 590, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Describtion
              </Box>
              <Box sx={{ width: 178, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Complaint To
              </Box>
              <Box sx={{ width: 220, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Complaint From
              </Box>
              <Box sx={{ width: 283, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Location
              </Box>
              <Box sx={{ width: 300, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Location Details
              </Box>
              <Box sx={{ width: 200, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Complaint Date
              </Box>
              <Box sx={{ width: 180, fontWeight: 600, color: '#444444', fontSize: 12 }}>
                Registered Employee
              </Box>
            </Box>
            <Virtuoso
              style={{ height: '28vh' }}
              totalCount={pendingCompl?.length}
              itemContent={index => {
                const val = pendingCompl[index]
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
                      bgcolor: val.priority_check === 1 ? '#B7CFDC' : 'white',
                      pt: 0.5,
                      gap: 1,
                    }}
                  >
                    {val.compalint_status === 1 ? (
                      <Box
                        sx={{
                          mx: 1,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 0.5,
                          mb: 0.5,
                          width: 35,
                          boxShadow: '0px 4px 10px rgba(138, 148, 148, 0.2)',
                          borderRadius: '50%',
                          cursor: 'pointer',
                          height: 28,
                        }}
                        onClick={event => handleClick(event, val)}
                      >
                        <PersonIcon sx={{ color: '#09B009', fontSize: 20 }} />
                      </Box>
                    ) : (
                      <Tooltip title="Ticket is in Pending List" placement="top-start">
                        <Box
                          sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            width: 35,
                            mx: 1,
                            justifyContent: 'center',
                            p: 0.5,
                            mb: 0.5,
                            boxShadow: '0px 4px 10px rgba(138, 148, 148, 0.2)',
                            borderRadius: '50%',
                            cursor: 'pointer',
                            height: 28,
                          }}
                        >
                          <PersonIcon sx={{ color: 'lightgrey', fontSize: 20 }} />
                        </Box>
                      </Tooltip>
                    )}

                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      placement="bottom-start"
                      sx={{ py: 1, px: 1.5, width: 360 }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
                      </Box>

                      <Box sx={{ textAlign: 'center' }}>
                        <NotificationsIcon sx={{ width: 40, height: 40 }} />
                      </Box>
                      {selectedRow && (
                        <>
                          {(() => {
                            if (!selectedRow.aprrox_date) {
                              return (
                                <Typography
                                  level="body2"
                                  sx={{
                                    mb: 0.5,
                                    color: 'black',
                                    fontWeight: 600,
                                    textAlign: 'center',
                                  }}
                                >
                                  Not Updated
                                </Typography>
                              )
                            }
                            const approxTime = parseISO(selectedRow.aprrox_date)
                            const now = new Date()
                            let diffInMinutes = differenceInMinutes(approxTime, now)
                            const isExceeded = diffInMinutes < 0
                            diffInMinutes = Math.abs(diffInMinutes)
                            const days = Math.floor(diffInMinutes / (60 * 24))
                            const hours = Math.floor((diffInMinutes % (60 * 24)) / 60)
                            const minutes = diffInMinutes % 60
                            const formattedTime = [
                              days > 0 ? `${days} day${days > 1 ? 's' : ''}` : '',
                              hours > 0 ? `${hours} hr${hours > 1 ? 's' : ''}` : '',
                              minutes > 0 ? `${minutes} min` : '',
                            ]
                              .filter(Boolean)
                              .join(' ')

                            if (isExceeded) {
                              return (
                                <Typography
                                  level="body2"
                                  sx={{
                                    mb: 0.5,
                                    color: 'Darkred',
                                    fontWeight: 500,
                                    textAlign: 'center',
                                  }}
                                >
                                  Time Exceeded by {formattedTime}
                                </Typography>
                              )
                            }

                            return (
                              <Typography
                                level="body2"
                                sx={{
                                  mb: 0.5,
                                  color: '#274472',
                                  fontWeight: 600,
                                  textAlign: 'center',
                                }}
                              >
                                Time Remaining: {formattedTime}
                              </Typography>
                            )
                          })()}
                          <Typography level="h6" sx={{ pb: 0.5, flex: 1 }}>
                            Ticket No: {selectedRow.complaint_slno}
                          </Typography>
                          <Typography level="h6" sx={{ pb: 0.5 }}>
                            Ticket To : {selectedRow.complaint_dept_name}
                          </Typography>
                          <Typography level="h6" sx={{ pb: 0.5 }}>
                            Completion Estimate :{' '}
                            {selectedRow.aprrox_date
                              ? format(new Date(selectedRow.aprrox_date), 'dd MMM yyyy,  hh:mm a')
                              : 'Not Updated'}
                          </Typography>
                          <Box sx={{ height: 10 }}></Box>
                        </>
                      )}
                    </Menu>

                    <Box sx={{ fontWeight: 600, fontSize: 14, width: 90 }}>
                      {val.complaint_slno}
                    </Box>
                    <Box sx={{ width: 165, display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                      {val.compalint_status === 1 ? (
                        <EditIcon
                          sx={{
                            border: 1,
                            borderRadius: 3,
                            p: 0.4,
                            width: 28,
                            height: 28,
                            color: 'lightgrey',
                          }}
                        />
                      ) : (
                        <EditIcon
                          sx={{
                            border: 1,
                            borderRadius: 3,
                            p: 0.4,
                            width: 28,
                            height: 28,
                            cursor: 'pointer',
                            color: '#145DA0',
                            '&:hover': { color: '#0C2D48' },
                          }}
                          onClick={() => rowSelect(val)}
                        />
                      )}
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
                                '&:hover': { color: '#274472' },
                              }}
                              onClick={() => fileView(val)}
                            />
                          </Tooltip>
                        </CssVarsProvider>
                      ) : (
                        <FilePresentRoundedIcon
                          sx={{
                            border: 1,
                            borderRadius: 3,
                            p: 0.4,
                            width: 28,
                            height: 28,
                            color: 'lightgrey',
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
                                  animation: `${blinkAnimation} 1s infinite`,
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
                                  animation: `${blinkAnimation} 1s infinite`,
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
                                  color: '#647C90',
                                }}
                              />
                            )}
                          </Tooltip>
                        </CssVarsProvider>
                      </Box>
                      {val.cm_asset_status === 1 ? (
                        <CssVarsProvider>
                          <Tooltip title="Asset Added Under Ticket" placement="top-start">
                            <MiscellaneousServicesIcon
                              sx={{
                                border: 1,
                                borderRadius: 3,
                                p: 0.4,
                                width: 28,
                                height: 28,
                                color: '#4C5270',
                                cursor: 'pointer',
                              }}
                              onClick={() => AssetView(val)}
                            />
                          </Tooltip>
                        </CssVarsProvider>
                      ) : (
                        <CssVarsProvider>
                          <Tooltip title="No Asset Added Under Complaint" placement="right">
                            <MiscellaneousServicesIcon
                              sx={{
                                border: 1,
                                borderRadius: 3,
                                width: 28,
                                height: 28,
                                p: 0.4,
                                color: 'lightgrey',
                                cursor: 'pointer',
                              }}
                            />
                          </Tooltip>
                        </CssVarsProvider>
                      )}
                    </Box>
                    <Box sx={{ width: 170, fontSize: 13 }}>{val.complaint_type_name}</Box>
                    <Box sx={{ width: 620, fontSize: 14 }}>{val.complaint_desc}</Box>
                    <Box sx={{ width: 184, fontSize: 13 }}>{val.complaint_dept_name}</Box>
                    <Box sx={{ width: 230, fontSize: 13 }}>{val.location}</Box>
                    <Box sx={{ width: 295, fontSize: 13, pl: 0.5 }}>
                      {val.rm_room_name}
                      {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name
                        ? ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${
                            val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''
                          }${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${
                            val.rm_insidebuildblock_name && val.rm_floor_name ? ' - ' : ''
                          }${val.rm_floor_name ? val.rm_floor_name : ''})`
                        : 'Not Updated'}
                    </Box>
                    <Box sx={{ width: 300, fontSize: 13, pl: 1 }}>
                      {val.cm_complaint_location || 'Not Updated'}
                    </Box>
                    <Box sx={{ width: 235, fontSize: 13, pl: 2 }}>
                      {val.compalint_date
                        ? format(new Date(val.compalint_date), 'dd MMM yyyy,  hh:mm a')
                        : 'Invalid Date'}
                    </Box>
                    <Box sx={{ width: 172, fontSize: 12 }}>
                      {val.ticket_reg_employee || 'Not Updated'}
                    </Box>
                  </Box>
                )
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{ fontWeight: 800, fontSize: 20, color: 'lightgrey', textAlign: 'center', my: 4 }}
          >
            Empty Pending Tickets
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default memo(DirectPendingList)
