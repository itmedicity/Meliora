import { Box, Chip, CssVarsProvider, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import ErrorIcon from '@mui/icons-material/Error'
import { keyframes } from '@mui/system'
import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded'
import ArticleIcon from '@mui/icons-material/Article'
import HoldReasonModal from '../MyTicketList/HoldReasonModal'
import CountDownCm from '../../CountDownCM/CountDownCm'
import QueryModalview from '../Queries/QueryModalview'
import DetailAssingModal from '../../CmSuperVisorList/DetailAssingModal'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import ChangeAssingeesModal from '../../CmSuperVisorList/ChangeAssingeesModal'
import SettingsAccessibilityIcon from '@mui/icons-material/SettingsAccessibility'
import FilePresentRoundedIcon from '@mui/icons-material/FilePresentRounded'
import { warningNotify } from 'src/views/Common/CommonCode'
import ComFileView from '../../CmFileView/ComFileView'
import ViewAssetDetails from '../../ComplaintRegister/TicketLists/ViewAssetDetails'
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices'
import TextComponent from 'src/views/Components/TextComponent'
import { format } from 'date-fns'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import JSZip from 'jszip'

const OnholdInAllList = ({ onholdCompl, count, setCount, menurights }) => {
  const [valuee, setValuee] = useState([])
  const [holdData, setHoldData] = useState([])
  const [detailAssingData, setdetailAssingData] = useState([])
  const [emptransferData, setEmpTransferData] = useState([])
  const [fileDetails, setfileDetails] = useState([])
  const [imageUrls, setImageUrls] = useState([])
  const [selectedImages, setSelectedImages] = useState([])

  const [flags, setFlags] = useState({
    queryflag: 0,
    assetflag: 0,
    detailAssingFlag: 0,
    empTransferFlag: 0,
    image: 0,
    holdflag: 0
  })

  const [dialogs, setDialogs] = useState({
    assetOpen: false,
    queryOpen: false,
    imageViewOpen: false,
    empTransferOpen: false,
    detailAssingOpen: false,
    holdOpen: false
  })

  const blinkAnimation = keyframes`
    0% { opacity: 1; }
    50% { opacity: 0; }
    100% { opacity: 1; }
`

  const RaiseQuery = useCallback(value => {
    setFlags(prevFlags => ({ ...prevFlags, queryflag: 1 }))
    setValuee(value)
    setDialogs(prevDialogs => ({ ...prevDialogs, queryOpen: true }))
  }, [])

  const HoldReason = useCallback(val => {
    setHoldData(val)
    setFlags(prevFlags => ({ ...prevFlags, holdflag: 1 }))
    setDialogs(prevDialogs => ({ ...prevDialogs, holdOpen: true }))
  }, [])

  const EmpTransfer = useCallback(val => {
    setEmpTransferData(val)
    setFlags(prevFlags => ({ ...prevFlags, empTransferFlag: 1 }))
    setDialogs(prevDialogs => ({ ...prevDialogs, empTransferOpen: true }))
  }, [])

  const DetailAssing = useCallback(value => {
    setFlags(prevFlags => ({ ...prevFlags, detailAssingFlag: 1 }))
    setdetailAssingData(value)
    setDialogs(prevDialogs => ({ ...prevDialogs, detailAssingOpen: true }))
  }, [])

  const fileView = async val => {
    const { complaint_slno } = val
    setFlags(prevFlags => ({ ...prevFlags, image: 1 }))
    setDialogs(prevDialogs => ({ ...prevDialogs, imageViewOpen: true }))
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
          const blob = await fileObj.async('blob');
          const url = URL.createObjectURL(blob);
          return { imageName: filename, url };
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

  const AssetView = useCallback(value => {
    setValuee(value)
    setFlags(prevFlags => ({ ...prevFlags, assetflag: 1 }))
    setDialogs(prevDialogs => ({ ...prevDialogs, assetOpen: true }))
  }, [])

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 0,
        height: '67vh',
        overflow: 'auto'
      }}
    >
      {flags.queryflag === 1 ? (
        <QueryModalview
          open={dialogs.queryOpen}
          setqueryOpen={open => setDialogs(prev => ({ ...prev, queryOpen: open }))}
          valuee={valuee}
          setqueryflag={flag => setFlags(prev => ({ ...prev, queryflag: flag }))}
          setCount={setCount}
          count={count}
        />
      ) : null}

      {flags.image === 1 ? (
        <ComFileView
          imageUrls={imageUrls}
          imageViewOpen={dialogs.imageViewOpen}
          selectedImages={selectedImages}
          fileDetails={fileDetails}
          setimage={image => setFlags(prev => ({ ...prev, image }))}
          setimageViewOpen={open => setDialogs(prev => ({ ...prev, imageViewOpen: open }))}
        />
      ) : null}

      {flags.assetflag === 1 ? (
        <ViewAssetDetails
          assetOpen={dialogs.assetOpen}
          setAssetOpen={open => setDialogs(prev => ({ ...prev, assetOpen: open }))}
          setAssetflag={flag => setFlags(prev => ({ ...prev, assetflag: flag }))}
          valuee={valuee}
          count={count}
          setCount={setCount}
        />
      ) : null}

      {flags.holdflag === 1 ? (
        <HoldReasonModal
          holdOpen={dialogs.holdOpen}
          setHoldOpen={open => setDialogs(prev => ({ ...prev, holdOpen: open }))}
          setHoldflag={flag => setFlags(prev => ({ ...prev, holdflag: flag }))}
          holdData={holdData}
          count={count}
          setCount={setCount}
        />
      ) : null}

      {flags.detailAssingFlag === 1 ? (
        <DetailAssingModal
          open={dialogs.detailAssingOpen}
          setdetailAssingOpen={open => setDialogs(prev => ({ ...prev, detailAssingOpen: open }))}
          detailAssingData={detailAssingData}
          setdetailAssingFlag={flag => setFlags(prev => ({ ...prev, detailAssingFlag: flag }))}
          setCount={setCount}
          count={count}
        />
      ) : null}

      {flags.empTransferFlag === 1 ? (
        <ChangeAssingeesModal
          empTransferOpen={dialogs.empTransferOpen}
          setEmptransferOpen={open => setDialogs(prev => ({ ...prev, empTransferOpen: open }))}
          emptransferData={emptransferData}
          setEmptransferFlag={flag => setFlags(prev => ({ ...prev, empTransferFlag: flag }))}
          setCount={setCount}
          count={count}
        />
      ) : null}

      {onholdCompl.length !== 0 ? (
        <Box sx={{ p: 0.1, mb: 0.8 }}>
          {onholdCompl?.map(val => {
            return (
              <Box
                key={val.complaint_slno}
                sx={{
                  flex: 1,
                  border: 1,
                  borderColor: '#50655B',
                  borderRadius: 8,
                  bgcolor: 'white',
                  mb: 0.6
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
                            fontFamily: 'Arial'
                          }}
                          text={
                            val.assigned_date
                              ? format(new Date(val.assigned_date), 'dd MMM yyyy,   hh:mm a')
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
                {val.cm_rectify_status === 'Z' && val.verify_remarks !== null ? (
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: '#DFDACD',
                      display: 'flex',
                      py: 0.3,
                      flexWrap: 'wrap'
                    }}
                  >
                    <Box sx={{ display: 'flex', pl: 0.5 }}>
                      <ReportProblemIcon sx={{ color: 'darkred', P: 0.1 }} />
                      <Box sx={{ pt: 0.3, color: 'darkred', fontWeight: 700, fontSize: 14 }}>TICKET RESUBMITTED</Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ pl: 2, fontWeight: 600, color: 'darkred' }}>Remarks:</Box>
                      <Box sx={{ pl: 1, fontWeight: 600, color: 'darkred' }}>{val.verify_remarks}</Box>
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
                      flexWrap: 'wrap'
                    }}
                  >
                    <Box sx={{ display: 'flex', pl: 0.5 }}>
                      <ReportProblemIcon sx={{ color: 'darkred', P: 0.1 }} />
                      <Box sx={{ pt: 0.3, color: 'darkred', fontWeight: 700, fontSize: 14 }}>
                        RESUBMITTED BY SUPERVISOR
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex' }}>
                      <Box sx={{ pl: 2, fontWeight: 600, color: 'darkred' }}>Remarks:</Box>
                      <Box sx={{ pl: 1, fontWeight: 600, color: 'darkred' }}>{val.verify_spervsr_remarks}</Box>
                    </Box>
                  </Box>
                ) : null}

                {val.aprrox_date !== null ? (
                  <Box
                    sx={{
                      flex: 1,
                      bgcolor: '#E7D2CC',
                      display: 'flex',
                      py: 0.3
                    }}
                  >
                    <Typography sx={{ color: '#026F7E', pl: 1, pt: 0.2, fontWeight: 700, fontSize: 13 }}>
                      DELEGATED BY {val.assinged_user}
                    </Typography>
                    <Typography sx={{ color: 'black', pt: 0.2, fontWeight: 500, fontSize: 13, ml: 3 }}>
                      Priority :
                    </Typography>
                    <Chip sx={{ bgcolor: 'white', color: '#391306', border: 1, ml: 1 }}>
                      {val.compalint_priority === 1
                        ? 'Emergency'
                        : val.compalint_priority === 2
                          ? 'High Priority'
                          : val.compalint_priority === 3
                            ? 'Medium Priority'
                            : val.compalint_priority === 4
                              ? 'Normal'
                              : 'Normal'}
                    </Chip>
                    <Typography sx={{ color: 'black', pt: 0.2, fontWeight: 500, fontSize: 13, ml: 3 }}>
                      Aprox Date :
                    </Typography>
                    <Chip sx={{ bgcolor: 'white', color: '#391306', border: 1, ml: 1 }}>
                      {val.aprrox_date ? format(new Date(val.aprrox_date), 'dd MM yyyy,  hh:mm a') : 'Invalid Date'}
                    </Chip>
                    <Typography sx={{ color: 'black', pt: 0.2, fontWeight: 500, fontSize: 13, ml: 3 }}>
                      Remarks :
                    </Typography>
                    <Typography sx={{ color: 'black', pt: 0.2, fontSize: 13, ml: 3 }}>
                      {val.complaint_remark}
                    </Typography>
                  </Box>
                ) : null}

                <Box sx={{ flex: 1, display: 'flex', p: 0.8 }}>
                  <Box
                    sx={{
                      maxWidth: 200,
                      mx: 0.3,
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
                              mr: 0.5,
                              '&:hover': { color: '#274472' }
                            }}
                            onClick={() => fileView(val)}
                          />
                        </Tooltip>
                      ) : null}
                      {val.cm_query_status === 1 ? (
                        <Tooltip title="Queries">
                          <QuestionAnswerRoundedIcon
                            sx={{
                              height: 28,
                              width: 30,
                              color: '#0E86D4',
                              cursor: 'pointer',
                              border: 1,
                              mr: 0.5,
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
                              color: '#0E86D4',
                              cursor: 'pointer',
                              border: 1,
                              mr: 0.5,
                              borderRadius: 5,
                              p: 0.1,
                              '&:hover': { color: '#41729F' }
                            }}
                            onClick={() => RaiseQuery(val)}
                          />
                        </Tooltip>
                      ) : null}

                      {menurights.map(({ slno }, idx) =>
                        slno === 251 ? (
                          <Tooltip title="Add Assignees" color="warning" key={slno || idx}>
                            <PersonAddIcon
                              sx={{
                                height: 28,
                                width: 30,
                                color: '#CBAE77',
                                cursor: 'pointer',
                                border: 1,
                                borderRadius: 5,
                                p: 0.3,
                                '&:hover': { color: '#CBAE77' },
                                mr: 0.5
                              }}
                              onClick={() => DetailAssing(val)}
                            />
                          </Tooltip>
                        ) : null
                      )}

                      {menurights.map(({ slno }, idx) =>
                        slno === 251 ? (
                          <Tooltip title="Change Assignees" key={slno || idx}>
                            <SettingsAccessibilityIcon
                              sx={{
                                height: 28,
                                width: 30,
                                color: '#603F8B',
                                cursor: 'pointer',
                                border: 1,
                                borderRadius: 5,
                                p: 0.3,
                                mr: 0.5,
                                '&:hover': { color: '#A16AE8' }
                              }}
                              onClick={() => EmpTransfer(val)}
                            />
                          </Tooltip>
                        ) : null
                      )}

                      <Tooltip title="On Hold Reason">
                        <ArticleIcon
                          sx={{
                            height: 28,
                            width: 30,
                            color: '#50655B ',
                            cursor: 'pointer',
                            border: 1,
                            borderRadius: 5,
                            p: 0.3,
                            '&:hover': { color: 'grey' },
                            mr: 0.5
                          }}
                          onClick={() => HoldReason(val)}
                        />
                      </Tooltip>

                      {val.cm_asset_status === 1 ? (
                        <Tooltip title="Asset Details" sx={{ bgcolor: '#4C5270' }}>
                          <MiscellaneousServicesIcon
                            sx={{
                              height: 28,
                              width: 30,
                              border: 1,
                              borderRadius: 5,
                              p: 0.1,
                              color: '#4C5270',
                              cursor: 'pointer',
                              mr: 0.5
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
                        {/* {val.rm_room_name}
                                                {val.rm_roomtype_name || val.rm_insidebuildblock_name || val.rm_floor_name ?
                                                    ` (${val.rm_roomtype_name ? val.rm_roomtype_name : ''}${val.rm_roomtype_name && val.rm_insidebuildblock_name ? ' - ' : ''}${val.rm_insidebuildblock_name ? val.rm_insidebuildblock_name : ''}${(val.rm_insidebuildblock_name && val.rm_floor_name) ? ' - ' : ''}${val.rm_floor_name ? val.rm_floor_name : ''})`
                                                    : "Not Updated"} */}
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
                  <CssVarsProvider>
                    <Tooltip
                      title="CountUp time Starts from Ticket Registration"
                      color="neutral"
                      placement="right"
                      sx={{ width: 300 }}
                    >
                      <Box sx={{ textAlign: 'center', display: 'flex', cursor: 'grab' }}>
                        <CountDownCm complaintDate={val.compalint_date} />
                      </Box>
                    </Tooltip>
                  </CssVarsProvider>
                  {val.priority_check === 1 ? (
                    <Box sx={{ display: 'flex', pl: 1.3 }}>
                      <ErrorIcon
                        sx={{
                          height: 30,
                          width: 25,
                          color: val.priority_check === 1 ? '#970C10' : 'lightgrey',
                          animation: val.priority_check === 1 ? `${blinkAnimation} 1s infinite` : 'none'
                        }}
                      />
                      <Typography sx={{ fontWeight: 600, pl: 0.5, fontSize: 14, pt: 0.5, color: 'darkred' }}>
                        {val.priority_reason}
                      </Typography>
                    </Box>
                  ) : null}
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 700, pt: 0.4 }}>Assignees :</Typography>
                    &nbsp;
                    <Box sx={{ fontWeight: 600, display: 'flex', pt: 0.3, gap: 0.3, pb: 0.2 }}>
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
              </Box>
            )
          })}
        </Box>
      ) : (
        <Box
          sx={{
            flex: 1,
            height: '50%',
            m: 1,
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 22,
            color: 'lightgray',
            pt: 10
          }}
        >
          Hold List Empty
        </Box>
      )}
    </Box>
  )
}
export default memo(OnholdInAllList)
