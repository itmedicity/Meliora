import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { IconButton } from '@mui/material'
import { editicon } from 'src/color/Color'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined'
import { getReqApprovDMS } from 'src/redux/actions/DMSApproval.action'
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone'
import { Typography } from '@mui/material'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import DescriptionIcon from '@mui/icons-material/Description'
import CloseDetailsModal from '../InchargeApproval/CloseDetailsModal'
import CRFDataColectRequestModal from '../DMSCrfApproval/CRFDataColectRequestModal'
import MSApprovalModel from './MSApprovalModel'
import HigherApproveModal from '../DMSCrfApproval/HigherApproveModal'
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff'

const MSApprovalTable = () => {
  /*** Initializing */
  const history = useNavigate()
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)

  useEffect(() => {
    dispatch(getReqApprovDMS())
  }, [dispatch, count])

  const tabledata = useSelector(state => {
    return state.setReqApprovDMS.ReqApprovDMSList
  })

  const [dmsData, setDmsData] = useState([])

  useEffect(() => {
    const incharge = tabledata.filter(val => {
      return val.req_status !== 'C' && val.ms_approve === null
    })

    if (incharge.length !== 0) {
      const datas = incharge.map(val => {
        const obj = {
          req_slno: val.req_slno,
          actual_requirement:
            val.actual_requirement !== null ? val.actual_requirement : 'Not Updated',
          needed: val.needed !== null ? val.needed : 'Not Updated',
          request_dept_slno: val.request_dept_slno,
          request_deptsec_slno: val.request_deptsec_slno,
          dept_name: val.dept_name,
          req_userdeptsec: val.req_userdeptsec,
          category: val.category,
          location: val.location,
          emergency: val.emergency,
          total_approx_cost: val.total_approx_cost,
          image_status: val.image_status,
          remarks: val.remarks,
          req_date: val.req_date,
          userdeptsec: val.userdeptsec,
          expected_date: val.expected_date,
          req_approv_slno: val.req_approv_slno,
          req_status: val.req_status,
          req_user: val.req_user,
          incharge_approve: val.incharge_approve,
          incharge_req: val.incharge_req,
          incharge:
            val.incharge_approve === 1
              ? 'Approved'
              : val.incharge_approve === 2
              ? 'Reject'
              : val.incharge_approve === 3
              ? 'On-Hold'
              : 'Not Updated',
          incharge_remark: val.incharge_remarks !== null ? val.incharge_remarks : 'Not Updated',
          inch_detial_analysis: val.inch_detial_analysis,
          incharge_apprv_date: val.incharge_apprv_date,
          incharge_user:
            val.incharge_user !== null ? val.incharge_user.toLowerCase() : 'Not Updated',
          hod_req: val.hod_req,
          hod_approve: val.hod_approve,
          hod:
            val.hod_approve === 1
              ? 'Approved'
              : val.hod_approve === 2
              ? 'Reject'
              : val.hod_approve === 3
              ? 'On-Hold'
              : 'Not Updated',
          hod_remarks: val.hod_remarks !== null ? val.hod_remarks : 'Not Updated',
          hod_detial_analysis: val.hod_detial_analysis,
          hod_approve_date: val.hod_approve_date,
          hod_user: val.hod_user !== null ? val.hod_user.toLowerCase() : 'Not Updated',
          dms_req: val.dms_req,
          dms_approve: val.dms_approve,
          dms:
            val.dms_approve === 1
              ? 'Approved'
              : val.dms_approve === 2
              ? 'Reject'
              : val.dms_approve === 3
              ? 'On-Hold'
              : 'Not Updated',
          dms_remarks: val.dms_remarks !== null ? val.dms_remarks : 'Not Updated',
          dms_detail_analysis:
            val.dms_detail_analysis !== null ? val.dms_detail_analysis : 'Not Updated',
          dms_approve_date: val.dms_approve_date,
          dms_user: val.dms_user,

          ms_approve_req: val.ms_approve_req,
          ms_approve: val.ms_approve,
          ms:
            val.ms_approve === 1
              ? 'Approved'
              : val.ms_approve === 2
              ? 'Reject'
              : val.ms_approve === 3
              ? 'On-Hold'
              : 'Not Updated',
          ms_approve_remark: val.ms_approve_remark !== null ? val.ms_approve_remark : 'Not Updated',
          ms_detail_analysis:
            val.ms_detail_analysis !== null ? val.ms_detail_analysis : 'Not Updated',
          ms_approve_date: val.ms_approve_date,
          ms_user: val.ms_user !== null ? val.ms_user.toLowerCase() : 'Not Updated',

          manag_operation_req: val.manag_operation_req,
          manag_operation_approv: val.manag_operation_approv,
          om:
            val.manag_operation_approv === 1
              ? 'Approved'
              : val.manag_operation_approv === 2
              ? 'Reject'
              : val.manag_operation_approv === 3
              ? 'On-Hold'
              : 'Not Updated',
          manag_operation_remarks:
            val.manag_operation_remarks !== null ? val.manag_operation_remarks : 'Not Updated',
          om_detial_analysis:
            val.om_detial_analysis !== null ? val.om_detial_analysis : 'Not Updated',
          om_approv_date: val.om_approv_date,
          manag_operation_user:
            val.manag_operation_user !== null
              ? val.manag_operation_user.toLowerCase()
              : 'Not Updated',

          senior_manage_req: val.senior_manage_req,
          senior_manage_approv: val.senior_manage_approv,
          smo:
            val.senior_manage_approv === 1
              ? 'Approved'
              : val.senior_manage_approv === 2
              ? 'Reject'
              : val.senior_manage_approv === 3
              ? 'On-Hold'
              : 'Not Updated',
          senior_manage_remarks:
            val.senior_manage_remarks !== null ? val.senior_manage_remarks : 'Not Updated',
          smo_detial_analysis:
            val.smo_detial_analysis !== null ? val.smo_detial_analysis : 'Not Updated',
          som_aprrov_date: val.som_aprrov_date,
          senior_manage_user:
            val.senior_manage_user !== null ? val.senior_manage_user.toLowerCase() : 'Not Updated',

          cao_approve: val.cao_approve,
          cao:
            val.cao_approve === 1
              ? 'Approved'
              : val.cao_approve === 2
              ? 'Reject'
              : val.cao_approve === 3
              ? 'On-Hold'
              : 'Not Updated',
          cao_approve_remarks:
            val.cao_approve_remarks !== null ? val.cao_approve_remarks : 'Not Updated',
          ceo_detial_analysis:
            val.ceo_detial_analysis !== null ? val.ceo_detial_analysis : 'Not Updated',
          cao_approv_date: val.cao_approv_date,
          cao_user: val.cao_user !== null ? val.cao_user.toLowerCase() : 'Not Updated',

          md_approve_req: val.md_approve_req,
          md_approve: val.md_approve,
          md:
            val.md_approve === 1
              ? 'Approved'
              : val.md_approve === 2
              ? 'Reject'
              : val.md_approve === 3
              ? 'On-Hold'
              : 'Not Updated',
          md_approve_remarks: val.md_approve_remarks,
          md_detial_analysis: val.md_detial_analysis,
          md_approve_date: val.md_approve_date,
          md_user: val.md_user !== null ? val.md_user.toLowerCase() : 'Not Updated',

          ed_approve_req: val.ed_approve_req,
          ed_approve: val.ed_approve,
          ed:
            val.ed_approve === 1
              ? 'Approved'
              : val.ed_approve === 2
              ? 'Reject'
              : val.ed_approve === 3
              ? 'On-Hold'
              : 'Not Updated',
          ed_approve_remarks:
            val.ed_approve_remarks !== null ? val.ed_approve_remarks : 'Not Updated',
          ed_detial_analysis: val.ed_detial_analysis,
          ed_approve_date: val.ed_approve_date,
          ed_user: val.ed_user !== null ? val.ed_user.toLowerCase() : 'Not Updated',

          crf_close: val.crf_close !== null ? val.crf_close : 'Not Updated',
          crf_close_remark: val.crf_close_remark !== null ? val.crf_close_remark : 'Not Updated',
          crf_closed_one: val.crf_closed_one !== null ? val.crf_closed_one : 'Not Updated',
          close_user: val.close_user !== null ? val.close_user : 'Not Updated',
          close_date: val.close_date !== null ? val.close_date : 'Not Updated',
        }
        return obj
      })

      setDmsData(datas)
    }
  }, [tabledata])

  //column title setting
  const [column] = useState([
    {
      headerName: 'Action',
      minWidth: 150,
      cellRenderer: params => {
        if (params.data.crf_close === 1) {
          return (
            <IconButton onClick={() => CloseReason(params)} sx={{ color: editicon, paddingY: 0.5 }}>
              <CustomeToolTip title="Close Detail">
                <SubtitlesOffIcon />
              </CustomeToolTip>
            </IconButton>
          )
        } else if (
          params.data.manag_operation_approv !== null ||
          params.data.senior_manage_approv !== null ||
          params.data.cao_approve !== null
        ) {
          return (
            <IconButton onClick={() => HigherDone(params)} sx={{ color: editicon, paddingY: 0.5 }}>
              <CustomeToolTip title="MS Approval done so you cant edit">
                <DescriptionIcon />
              </CustomeToolTip>
            </IconButton>
          )
        } else {
          return (
            <Fragment>
              <IconButton
                onClick={() => MessageSend(params)}
                sx={{ color: editicon, paddingY: 0.5 }}
              >
                <CustomeToolTip title="Forward To Data Collection">
                  <ForwardToInboxTwoToneIcon />
                </CustomeToolTip>
              </IconButton>
              <IconButton
                onClick={() => DMSApproval(params)}
                sx={{ color: editicon, paddingY: 0.5 }}
              >
                <CustomeToolTip title="Approval">
                  <PublishedWithChangesOutlinedIcon />
                </CustomeToolTip>
              </IconButton>
            </Fragment>
          )
        }
      },
    },

    { headerName: 'Req.Slno', field: 'req_slno', minWidth: 120 },
    {
      headerName: 'Purpose',
      field: 'actual_requirement',
      autoHeight: true,
      wrapText: true,
      minWidth: 250,
      filter: 'true',
    },
    {
      headerName: 'Justification',
      field: 'needed',
      autoHeight: true,
      wrapText: true,
      minWidth: 250,
      filter: 'true',
    },
    {
      headerName: 'Location',
      field: 'location',
      autoHeight: true,
      wrapText: true,
      minWidth: 250,
      filter: 'true',
    },
    { headerName: 'Req. Date', field: 'req_date', minWidth: 200 },
    {
      headerName: 'Inch.Status',
      field: 'incharge',
      autoHeight: true,
      wrapText: true,
      minWidth: 150,
      filter: 'true',
    },
    { headerName: 'Inch.Remark', field: 'incharge_remark', minWidth: 250, wrapText: true },
    { headerName: 'Hod.Status', field: 'hod', minWidth: 150, wrapText: true, filter: 'true' },
    { headerName: 'Hod.Remark', field: 'hod_remarks', minWidth: 250, wrapText: true },
    { headerName: 'DMS.Status', field: 'dms', minWidth: 150, wrapText: true, filter: 'true' },
    { headerName: 'DMS.Remark', field: 'dms_remarks', minWidth: 250, wrapText: true },
    { headerName: 'MS.Status', field: 'ms', minWidth: 150, wrapText: true, filter: 'true' },
    { headerName: 'MS.Remark', field: 'ms_approve_remark', minWidth: 250, wrapText: true },
    { headerName: 'OM Status', field: 'om', minWidth: 150, wrapText: true, filter: 'true' },
    { headerName: 'OM.Remark', field: 'manag_operation_remarks', minWidth: 250, wrapText: true },
    { headerName: 'SMO Status', field: 'smo', minWidth: 150, wrapText: true, filter: 'true' },
    { headerName: 'SMO.Remark', field: 'senior_manage_remarks', minWidth: 250, wrapText: true },
    { headerName: 'GM Status', field: 'cao', minWidth: 180, wrapText: true, filter: 'true' },
    { headerName: 'GM.Remark', field: 'cao_approve_remarks', minWidth: 250, wrapText: true },
    { headerName: 'ED/MD  Status', field: 'ed', minWidth: 150, wrapText: true, filter: 'true' },
    { headerName: 'ED/MD.Remark', field: 'ed_approve_remarks', minWidth: 250, wrapText: true },
  ])

  const [CloseModal, setCloseModal] = useState(false)
  const [CloseModalFlag, setCloseModalFlag] = useState(0)
  const [closeData, setCloseData] = useState([])

  const [dmsApproveModal, setDmsapprovModall] = useState(false)
  const [dmsApproveModalFlag, setdmsApproveModalFlag] = useState(0)
  const [dmsApproveData, setdmsApproveData] = useState([])

  const [msgSendModal, setMsgSendModal] = useState(false)
  const [msgSendModalFlag, setmsgSendModalFlag] = useState(0)
  const [msgSendData, setmsgSendData] = useState([])

  const [HigherModal, setHigherModal] = useState(false)
  const [HigherModalFlag, setHigherModalFlag] = useState(0)
  const [HigherData, setHigherData] = useState([])

  const DMSApproval = useCallback(params => {
    const data = params.api.getSelectedRows()
    setdmsApproveData(data)
    setDmsapprovModall(true)
    setdmsApproveModalFlag(1)
  }, [])

  const MessageSend = useCallback(params => {
    const data = params.api.getSelectedRows()
    setmsgSendData(data)
    setMsgSendModal(true)
    setmsgSendModalFlag(1)
  }, [])

  const CloseReason = useCallback(params => {
    const data = params.api.getSelectedRows()
    setCloseModal(true)
    setCloseModalFlag(1)
    setCloseData(data)
  }, [])

  const HigherDone = useCallback(params => {
    const data = params.api.getSelectedRows()
    setHigherModal(true)
    setHigherModalFlag(1)
    setHigherData(data)
  }, [])

  //close button function
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])
  const getRowStyle = params => {
    if (params.data.req_status === 'R') {
      return { background: '#81d4fa' }
    } else if (params.data.req_status === 'P') {
      return { background: '#fff59d' }
    } else if (params.data.crf_close === 1) {
      return { background: '#a1887f' }
    }
  }

  return (
    <CardCloseOnly title="MS Approval" close={backtoSetting}>
      {HigherModalFlag === 1 ? (
        <HigherApproveModal
          open={HigherModal}
          setOpen={setHigherModal}
          datas={HigherData}
          count={count}
          setCount={setCount}
        />
      ) : null}
      {msgSendModalFlag === 1 ? (
        <CRFDataColectRequestModal
          open={msgSendModal}
          setOpen={setMsgSendModal}
          datas={msgSendData}
          count={count}
          setCount={setCount}
        />
      ) : null}
      {dmsApproveModalFlag === 1 ? (
        <MSApprovalModel
          open={dmsApproveModal}
          setOpen={setDmsapprovModall}
          datas={dmsApproveData}
          count={count}
          setCount={setCount}
        />
      ) : null}

      {CloseModalFlag === 1 ? (
        <CloseDetailsModal
          open={CloseModal}
          setOpen={setCloseModal}
          closeData={closeData}
          setCloseData={setCloseData}
          setCloseModalFlag={setCloseModalFlag}
        />
      ) : null}

      <Box sx={{ p: 1 }}>
        <CusAgGridForMain columnDefs={column} tableData={dmsData} getRowStyle={getRowStyle} />
      </Box>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' },
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <IconButton>
            <CropSquareIcon sx={{ background: '#81d4fa', pr: 5 }} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', fontWeight: 400, pl: 1, pt: 1.2 }}>
          <Typography>Rejected</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <IconButton>
            <CropSquareIcon sx={{ background: '#fff59d', pr: 5 }} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', fontWeight: 400, pl: 1, pt: 1.2 }}>
          <Typography>On-Hold</Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <IconButton>
            <CropSquareIcon sx={{ background: '#a1887f', pr: 5 }} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', fontWeight: 400, pl: 1, pt: 1.2 }}>
          <Typography>Closed</Typography>
        </Box>
      </Box>
    </CardCloseOnly>
  )
}

export default memo(MSApprovalTable)
