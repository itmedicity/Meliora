import { Badge, Box, Chip, CircularProgress, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import ContactSupportIcon from '@mui/icons-material/ContactSupport'
import VerifiedSharpIcon from '@mui/icons-material/VerifiedSharp'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import ErrorIcon from '@mui/icons-material/Error'
import { keyframes } from '@mui/system'
import _ from 'underscore'
import BuildRoundedIcon from '@mui/icons-material/BuildRounded'
import EngineeringIcon from '@mui/icons-material/Engineering'
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled'
import AcceptOrRejectAssistRequest from './AcceptOrRejectAssistRequest'
import AssistneedModal from './AssistneedModal'
import InsertCommentIcon from '@mui/icons-material/InsertComment'
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt'
import NewRectifyModal from './NewRectifyModal'
import CmQuieryModal from '../Queries/CmQuieryModal'
import MarkAsHoldModal from './MarkAsHoldModal'
import CountDownCm from '../../CountDownCM/CountDownCm'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import ComFileView from '../../CmFileView/ComFileView'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { warningNotify } from 'src/views/Common/CommonCode'
import ViewAssetDetails from '../../ComplaintRegister/TicketLists/ViewAssetDetails'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import TextComponent from 'src/views/Components/TextComponent'
import { format } from 'date-fns'
import NotificationsIcon from '@mui/icons-material/Notifications'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

const MyAssignedList = ({ assistReq, count, setCount }) => {
  const [allPendingCompl, setAllPendingCompl] = useState([])
  const [reqDetails, setReqDetails] = useState([])
  const [assistNeed, setAssistNeed] = useState([])
  const [rectfyDta, setRectfyDta] = useState([])
  const [valuee, setValuee] = useState([])
  const [holdData, setHoldData] = useState([])
  const [fileDetails, setfileDetails] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [loading, setLoading] = useState(true)

  const [state, setState] = useState({
    assistflag: 0,
    asistModalOpen: false,
    assetflag: 0,
    assetOpen: false,
    imageViewOpen: false,
    holdflag: 0,
    holdOpen: false,
    image: 0,
    rectfyFlag: 0,
    rectfyOpen: true,
    queryflag: 0,
    queryOpen: false,
    assistNeedFlag: 0,
    assistOpen: true,
  })

  const id = useSelector(state => state.LoginUserData.empid, _.isEqual)

  const RaiseQuery = useCallback(value => {
    setState(prevState => ({
      ...prevState,
      queryflag: 1,
      valuee: value,
      queryOpen: true,
    }))
    setValuee(value)
  }, [])

  // useEffect(() => {
  //     let isMounted = true
  //     const getAllPendingComplaints = async (id) => {
  //         const result = await axioslogin.get(`/complaintassign/user/${id}`);
  //         const { success, data } = result.data;
  //         if (isMounted) {
  //             if (success === 1) {
  //                 setAllPendingCompl(data);
  //             } else {
  //                 setAllPendingCompl([]);
  //             }
  //         }
  //     }
  //     getAllPendingComplaints(id)
  //     return () => {
  //         isMounted = false
  //     };
  // }, [id, count]);
  useEffect(() => {
    let isMounted = true
    setLoading(true) // Start loading
    const getAllPendingComplaints = async id => {
      const result = await axioslogin.get(`/complaintassign/user/${id}`)
      const { success, data } = result.data

      if (isMounted) {
        if (success === 1) {
          setAllPendingCompl(data)
        } else {
          setAllPendingCompl([])
        }
        setLoading(false) // Done loading
      }
    }
    getAllPendingComplaints(id)
    return () => {
      isMounted = false
    }
  }, [id, count])

  const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`

  const borderblinkAnimation = keyframes`
 
      0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`

  const AssistRequ = useCallback(value => {
    setState(prevState => ({
      ...prevState,
      assistflag: 1,
      asistModalOpen: true,
    }))
    setReqDetails(value)
  }, [])

  const AssistanceRequest = useCallback(val => {
    setState(prevState => ({
      ...prevState,
      assistNeedFlag: 1,
      assistOpen: true,
    }))
    setAssistNeed(val)
  }, [])

  const RectifyRequest = useCallback(val => {
    setState(prevState => ({
      ...prevState,
      rectfyFlag: 1,
      rectfyOpen: true,
    }))
    setRectfyDta(val)
  }, [])

  const HoldRequest = useCallback(val => {
    setState(prevState => ({
      ...prevState,
      holdflag: 1,
      holdOpen: true,
    }))
    setHoldData(val)
  }, [])

  const fileView = async val => {
    const { complaint_slno } = val
    setState(prevState => ({
      ...prevState,
      image: 1,
      imageViewOpen: true,
    }))
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

  const AssetView = useCallback(
    value => {
      setState(prevState => ({
        ...prevState,
        assetflag: 1,
        assetOpen: true,
      }))
      setValuee(value)
    },
    [setState]
  )

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 0,
        height: '69vh',
        overflow: 'auto',
      }}
    >
      {state.queryflag === 1 && (
        <CmQuieryModal
          open={state.queryOpen}
          setqueryOpen={setState}
          valuee={valuee}
          setqueryflag={setState}
          setCount={setCount}
          count={count}
        />
      )}

      {state.image === 1 && (
        <ComFileView
          imageUrls={imageUrls}
          imageViewOpen={state.imageViewOpen}
          selectedImages={selectedImages}
          fileDetails={fileDetails}
          setimage={setState}
          setimageViewOpen={setState}
        />
      )}

      {state.assetflag === 1 && (
        <ViewAssetDetails
          assetOpen={state.assetOpen}
          setAssetOpen={setState}
          setAssetflag={setState}
          valuee={valuee}
          count={count}
          setCount={setCount}
        />
      )}

      {state.assistflag === 1 && (
        <AcceptOrRejectAssistRequest
          open={state.asistModalOpen}
          setOpen={setState}
          assistflag={state.assistflag}
          count={count}
          setCount={setCount}
          setAssistflag={setState}
          reqDetails={reqDetails}
        />
      )}

      {state.assistNeedFlag === 1 && (
        <AssistneedModal
          assistOpen={state.assistOpen}
          assistNeedFlag={state.assistNeedFlag}
          assistNeed={assistNeed}
          setassistNeedFlag={setState}
          setAssistOpen={setState}
          count={count}
          setCount={setCount}
        />
      )}
      {state.rectfyFlag === 1 && (
        <NewRectifyModal
          rectfyOpen={state.rectfyOpen}
          setrectfyOpen={setState}
          setrectfyFlag={setState}
          rectfyDta={rectfyDta}
          count={count}
          setCount={setCount}
        />
      )}
      {state.holdflag === 1 && (
        <MarkAsHoldModal
          holdOpen={state.holdOpen}
          setHoldOpen={setState}
          setHoldflag={setState}
          holdData={holdData}
          count={count}
          setCount={setCount}
        />
      )}

      <Box sx={{ p: 0.5, mb: 0.8 }}>
        {assistReq?.map((val,) => {
          return (
            <Box
              key={val.complaint_slno}
              sx={{
                flex: 1,
                border: 1,
                borderColor: '#A47551',
                borderRadius: 8,
                bgcolor: 'white',
                mb: 0.6,
                // animation: `${borderblinkAnimation} 1s infinite`,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  bgcolor: '#E5E8E9',
                  borderTopRightRadius: 6,
                  borderTopLeftRadius: 6,
                  mx: 0.1,
                  display: 'flex',
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
                          fontFamily: 'Arial',
                        }}
                        text={
                          val.compalint_date
                            ? format(new Date(val.compalint_date), 'dd MMM yyyy,   hh:mm a')
                            : 'Not Updated'
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
                      cursor: 'pointer',
                    }}
                  >
                    Ticket Registered by : {val.comp_reg_emp}
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  bgcolor: '#A47551',
                  display: 'flex',
                }}
              >
                <Box sx={{ color: 'white', pl: 1, fontWeight: 600 }}>
                  <NotificationsIcon
                    sx={{ color: 'white', animation: `${borderblinkAnimation} 1s infinite }}` }}
                  />{' '}
                  Assist Request
                </Box>
              </Box>
              <Box sx={{ flex: 1, display: 'flex', p: 0.8 }}>
                <Box
                  sx={{
                    maxWidth: 145,
                    mx: 0.3,
                    pr: 0.5,
                    borderRight: 1,
                    borderColor: 'lightgrey',
                  }}
                >
                  <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}>
                    {' '}
                    Ticket No. {val.complaint_slno}
                  </Typography>
                  <Box sx={{ flex: 1, display: 'flex', my: 1, justifyContent: 'center' }}>
                    <Tooltip
                      title="Accept / Reject  Assist Request"
                      color="warning"
                      placement="right"
                    >
                      <EngineeringIcon
                        sx={{
                          height: 28,
                          width: 30,
                          bgcolor: '#A47551 ',
                          color: 'white',
                          cursor: 'pointer',
                          border: 1,
                          borderColor: '#523A28',
                          borderRadius: 5,
                          p: 0.3,
                          '&:hover': { bgcolor: '#BC9476', color: 'white' },
                        }}
                        onClick={() => AssistRequ(val)}
                      />
                    </Tooltip>
                  </Box>
                  <Tooltip
                    title="CountUp time Starts from Ticket Registration"
                    color="neutral"
                    placement="right"
                    sx={{ width: 300 }}
                  >
                    <Box
                      sx={{
                        textAlign: 'center',
                        display: 'flex',
                        cursor: 'grab',
                        mx: 0.5,
                        width: 115,
                      }}
                    >
                      <CountDownCm complaintDate={val.compalint_date} />
                    </Box>
                  </Tooltip>
                </Box>
                <Box
                  sx={{
                    pl: 0.5,
                    maxWidth: 500,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      mt: 0.5,
                    }}
                  >
                    <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                      Department Section
                    </Typography>
                    <Typography sx={{ fontSize: 14, flex: 1, textTransform: 'capitalize' }}>
                      {val.location.charAt(0).toUpperCase() + val.location.slice(1).toLowerCase()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      mt: 0.5,
                    }}
                  >
                    <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                      Location
                    </Typography>
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
                      mt: 0.5,
                    }}
                  >
                    <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                      Complaint Type
                    </Typography>
                    <Typography sx={{ fontSize: 14, flex: 1 }}>
                      {val.complaint_type_name.charAt(0).toUpperCase() +
                        val.complaint_type_name.slice(1).toLowerCase()}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, pl: 1.5 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                    Complaint Describtion
                  </Typography>
                  <Typography
                    sx={{
                      pr: 0.5,
                      pt: 0.3,
                      fontSize: 15,
                      maxHeight: 50,
                      overflow: 'auto',
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
                  display: 'flex',
                }}
              >
                {val.priority_check === 1 ? (
                  <Box sx={{ display: 'flex', pl: 1.3 }}>
                    <ErrorIcon
                      sx={{
                        // mt: 3,
                        height: 30,
                        width: 25,
                        color: val.priority_check === 1 ? '#970C10' : 'lightgrey',
                        animation:
                          val.priority_check === 1 ? `${blinkAnimation} 1s infinite` : 'none',
                      }}
                    />
                    <Typography
                      sx={{ fontWeight: 600, pl: 0.5, fontSize: 14, pt: 0.5, color: 'darkred' }}
                    >
                      {val.priority_reason}
                    </Typography>
                  </Box>
                ) : null}
              </Box>
            </Box>
          )
        })}
        {loading ? (
          <div style={{ display: 'flex', height: '100%' }}>
            <CircularProgress
              color="neutral"
              sx={{
                '--CircularProgress-size': '51px',
                '--CircularProgress-trackThickness': '5px',
                '--CircularProgress-progressThickness': '2px',
              }}
            />
          </div>
        ) : (
          <>
            {allPendingCompl?.map((val,) => {
              const getBadgeColor = (pending, accepted, rejected) => {
                if (pending > 0) return '#0458AB'
                if (pending === 0 && accepted > 0) return 'green'
                if (pending === 0 && accepted === 0 && rejected > 0) return 'red'
                return null
              }
              const badgeColor = getBadgeColor(val.pending, val.accepted, val.rejected)
              return (
                <Box
                  key={val.complaint_slno}
                  sx={{
                    flex: 1,
                    border: 1,
                    borderColor: '#CBAE11',
                    borderRadius: 8,
                    bgcolor: 'white',
                    mb: 0.8,
                  }}
                >
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: '#E5E8E9',
                      borderTopRightRadius: 6,
                      borderTopLeftRadius: 6,
                      mx: 0.1,
                      display: 'flex',
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
                              fontFamily: 'Arial',
                            }}
                            text={
                              val.compalint_date
                                ? format(new Date(val.compalint_date), 'dd MMM yyyy,   hh:mm a')
                                : 'Not Updated'
                            }
                          />
                        </Box>
                      </Tooltip>
                    </CssVarsProvider>
                    <CssVarsProvider>
                      <Tooltip title="Ticket Assigned Date and time" placement="top-start">
                        <Box sx={{ cursor: 'pointer' }}>
                          <TextComponent
                            sx={{
                              color: 'black',
                              fontWeight: 540,
                              flex: 1,
                              fontSize: 15,
                              pl: 2,
                              py: 0.5,
                              fontFamily: 'Arial',
                            }}
                            text={
                              val.assigned_date
                                ? format(new Date(val.assigned_date), 'dd MMM yyyy,   hh:mm a')
                                : 'Not Updated'
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
                          cursor: 'pointer',
                        }}
                      >
                        Ticket Registered by : {val.comp_reg_emp}
                      </Box>
                    </Box>
                  </Box>
                  {val.aprrox_date !== null ? (
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: '#E7D2CC',
                        mb: 0.1,
                        mx: 0.1,
                        display: 'flex',
                        py: 0.3,
                      }}
                    >
                      <Typography
                        sx={{ color: '#026F7E', pl: 1, pt: 0.2, fontWeight: 700, fontSize: 13 }}
                      >
                        DELEGATED BY {val.assinged_user}
                      </Typography>
                      <Typography
                        sx={{ color: 'black', pt: 0.2, fontWeight: 500, fontSize: 13, ml: 3 }}
                      >
                        Priority :
                      </Typography>
                      <Chip sx={{ bgcolor: 'white', color: '#391306', border: 1, ml: 1 }}>
                        {val.cm_priority_desc}
                      </Chip>
                      <Typography
                        sx={{ color: 'black', pt: 0.2, fontWeight: 500, fontSize: 13, ml: 3 }}
                      >
                        Aprox Date :
                      </Typography>
                      <Chip sx={{ bgcolor: 'white', color: '#391306', border: 1, ml: 1 }}>
                        {val.aprrox_date
                          ? format(new Date(val.aprrox_date), 'dd MM yyyy,  hh:mm a')
                          : 'Not Updated'}
                      </Chip>
                      <Typography
                        sx={{ color: 'black', pt: 0.2, fontWeight: 500, fontSize: 13, ml: 3 }}
                      >
                        Remarks :
                      </Typography>
                      <Typography sx={{ color: 'black', pt: 0.2, fontSize: 13, ml: 3 }}>
                        {val.complaint_remark}
                      </Typography>
                    </Box>
                  ) : null}
                  {val.cm_rectify_status === 'Z' && val.verify_remarks !== null ? (
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: '#DFDACD',
                        display: 'flex',
                        py: 0.3,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box sx={{ display: 'flex', pl: 0.5 }}>
                        <ReportProblemIcon sx={{ color: 'darkred', P: 0.1 }} />
                        <Box sx={{ pt: 0.3, color: 'darkred', fontWeight: 700, fontSize: 14 }}>
                          TICKET RESUBMITTED
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ pl: 2, fontWeight: 600, color: 'darkred' }}>Remarks:</Box>
                        <Box sx={{ pl: 1, fontWeight: 600, color: 'darkred' }}>
                          {val.verify_remarks}
                        </Box>
                      </Box>
                    </Box>
                  ) : null}

                  {val.verify_spervsr_remarks !== null && val.verify_spervsr === 2 ? (
                    <Box
                      sx={{
                        flex: 1,
                        bgcolor: '#DFDACD      ',
                        display: 'flex',
                        py: 0.3,
                        flexWrap: 'wrap',
                      }}
                    >
                      <Box sx={{ display: 'flex', pl: 0.5 }}>
                        <ReportProblemIcon sx={{ color: 'darkred', P: 0.1 }} />
                        <Box sx={{ pt: 0.3, color: 'darkred', fontWeight: 700, fontSize: 14 }}>
                          RESUBMITTED BY {val.verifyd_sprv_user}
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex' }}>
                        <Box sx={{ pl: 2, fontWeight: 600, color: 'darkred' }}>Remarks:</Box>
                        <Box sx={{ pl: 1, fontWeight: 600, color: 'darkred' }}>
                          {val.verify_spervsr_remarks}
                        </Box>
                      </Box>
                    </Box>
                  ) : null}
                  <Box sx={{ flex: 1, display: 'flex', pt: 0.8 }}>
                    <Box
                      sx={{
                        maxWidth: 210,
                        mx: 0.3,
                        pr: 0.5,
                        borderRight: 1,
                        borderColor: 'lightgrey',
                      }}
                    >
                      <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}>
                        {' '}
                        Ticket No.
                      </Typography>
                      <Typography sx={{ fontSize: 15, textAlign: 'center', fontWeight: 700 }}>
                        {val.complaint_slno}
                      </Typography>
                      <Box sx={{ flex: 1, display: 'flex', my: 1, justifyContent: 'center' }}>
                        <Tooltip title="Rectify" color="success">
                          <VerifiedSharpIcon
                            sx={{
                              height: 28,
                              width: 30,
                              color: '#1D741B',
                              cursor: 'pointer',
                              border: 1,
                              mx: 0.5,
                              borderRadius: 5,
                              p: 0.1,
                              '&:hover': { color: '#18A558' },
                            }}
                            onClick={() => RectifyRequest(val)}
                          />
                        </Tooltip>
                        {badgeColor ? (
                          <Badge
                            badgeInset="3%"
                            sx={{
                              '& .MuiBadge-badge': {
                                backgroundColor: badgeColor,
                                mr: 0.7,
                                cursor: 'pointer',
                              },
                            }}
                          >
                            <Tooltip title="Need Assist" color="warning">
                              <BuildRoundedIcon
                                onClick={() => AssistanceRequest(val)}
                                sx={{
                                  height: 28,
                                  width: 30,
                                  color: '#B68D40',
                                  cursor: 'pointer',
                                  border: 1,
                                  borderRadius: 5,
                                  p: 0.3,
                                  '&:hover': { color: '#D6AD60' },
                                  animation:
                                    val.assist_flag === 1
                                      ? `${blinkAnimation} 1s infinite`
                                      : 'none',
                                }}
                              />
                            </Tooltip>
                          </Badge>
                        ) : (
                          <Tooltip title="Need Assist" color="warning">
                            <BuildRoundedIcon
                              onClick={() => AssistanceRequest(val)}
                              sx={{
                                height: 28,
                                width: 30,
                                color: '#B68D40',
                                cursor: 'pointer',
                                border: 1,
                                borderRadius: 5,
                                p: 0.3,
                                '&:hover': { color: '#D6AD60' },
                                animation:
                                  val.assist_flag === 1 ? `${blinkAnimation} 1s infinite` : 'none',
                              }}
                            />
                          </Tooltip>
                        )}
                        <Tooltip title="Keep On Hold">
                          <PauseCircleFilledIcon
                            sx={{
                              height: 28,
                              width: 30,
                              color: '#50655B ',
                              cursor: 'pointer',
                              border: 1,
                              borderRadius: 5,
                              p: 0.3,
                              ml: 0.5,
                              '&:hover': { color: 'grey' },
                            }}
                            onClick={() => HoldRequest(val)}
                          />
                        </Tooltip>
                        {val.cm_query_status === 1 ? (
                          <Tooltip title="Raised Query">
                            <InsertCommentIcon
                              sx={{
                                height: 28,
                                width: 30,
                                color: '#1565B1',
                                cursor: 'pointer',
                                border: 1,
                                mx: 0.5,
                                borderRadius: 5,
                                p: 0.1,
                                '&:hover': { color: '#51575C' },
                                animation: `${blinkAnimation} 1s infinite`,
                              }}
                              onClick={() => RaiseQuery(val)}
                            />
                          </Tooltip>
                        ) : val.cm_query_status === 2 ? (
                          <Tooltip title="New Replies">
                            <MarkUnreadChatAltIcon
                              sx={{
                                height: 28,
                                width: 30,
                                color: '#39918C',
                                cursor: 'pointer',
                                border: 1,
                                mx: 0.5,
                                borderRadius: 5,
                                p: 0.1,
                                '&:hover': { color: '#51575C' },
                                animation: `${blinkAnimation} 1s infinite`,
                              }}
                              onClick={() => RaiseQuery(val)}
                            />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Raise a Query" color="primary">
                            <ContactSupportIcon
                              sx={{
                                height: 28,
                                width: 30,
                                color: '#5C90FE',
                                cursor: 'pointer',
                                border: 1,
                                mx: 0.5,
                                borderRadius: 5,
                                '&:hover': { color: '#1B84FC' },
                              }}
                              onClick={() => RaiseQuery(val)}
                            />
                          </Tooltip>
                        )}
                        {val.cm_file_status === 1 ? (
                          <FilePresentRoundedIcon
                            sx={{
                              color: '#41729F',
                              cursor: 'pointer',
                              height: 28,
                              width: 30,
                              border: 1,
                              borderRadius: 5,
                              p: 0.1,
                              mr: 0.5,
                              '&:hover': { color: '#274472' },
                            }}
                            onClick={() => fileView(val)}
                          />
                        ) : null}
                        {val.cm_asset_status === 1 ? (
                          <Tooltip title="Asset Details" sx={{ bgcolor: '#4C5270' }}>
                            <MiscellaneousServicesIcon
                              sx={{
                                height: 28,
                                width: 30,
                                border: 1,
                                borderRadius: 5,
                                mr: 0.5,
                                p: 0.1,
                                color: '#4C5270',
                                cursor: 'pointer',
                              }}
                              onClick={() => AssetView(val)}
                            />
                          </Tooltip>
                        ) : null}
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        pl: 0.5,
                        maxWidth: 500,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          mt: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                          Department Section
                        </Typography>
                        <Typography sx={{ fontSize: 15, flex: 1, textTransform: 'capitalize' }}>
                          {val.location.charAt(0).toUpperCase() +
                            val.location.slice(1).toLowerCase()}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          mt: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                          Location
                        </Typography>
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
                          mt: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: 13, fontWeight: 700, width: 140 }}>
                          Complaint Type
                        </Typography>
                        <Typography sx={{ fontSize: 15, flex: 1 }}>
                          {val.complaint_type_name.charAt(0).toUpperCase() +
                            val.complaint_type_name.slice(1).toLowerCase()}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ flex: 1, pl: 1.5 }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                        Complaint Describtion
                      </Typography>
                      <Typography
                        sx={{
                          pr: 0.5,
                          pt: 0.3,
                          fontSize: 15,
                          maxHeight: 50,
                          overflow: 'auto',
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
                      display: 'flex',
                    }}
                  >
                    <Tooltip
                      title="CountUp time Starts from Ticket Registration"
                      color="neutral"
                      placement="right"
                      sx={{ width: 300 }}
                    >
                      <Box sx={{ display: 'flex', cursor: 'grab', fontSize: 13, width: 125 }}>
                        <CountDownCm complaintDate={val.compalint_date} />
                      </Box>
                    </Tooltip>
                    {val.priority_check === 1 ? (
                      <Box sx={{ display: 'flex', pl: 1 }}>
                        <ErrorIcon
                          sx={{
                            height: 30,
                            width: 25,
                            color: val.priority_check === 1 ? '#970C10' : 'lightgrey',
                            animation:
                              val.priority_check === 1 ? `${blinkAnimation} 1s infinite` : 'none',
                          }}
                        />
                        <Typography
                          sx={{ fontWeight: 600, pl: 0.5, fontSize: 14, pt: 0.5, color: 'darkred' }}
                        >
                          {val.priority_reason}
                        </Typography>
                      </Box>
                    ) : null}
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography sx={{ fontSize: 13, fontWeight: 700, pt: 0.5 }}>
                        Assignees :
                      </Typography>
                      &nbsp;&nbsp;
                      <Box sx={{ fontWeight: 600, display: 'flex', py: 0.4, gap: 0.3 }}>
                        {val.assigned_employee_names === null ? (
                          <Chip>Not Updated</Chip>
                        ) : (
                          <>
                            {val.assigned_employee_names.split(',').map((name, index) => (
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
                </Box>
              )
            })}
          </>
        )}
      </Box>
    </Box>
  )
}

export default memo(MyAssignedList)
