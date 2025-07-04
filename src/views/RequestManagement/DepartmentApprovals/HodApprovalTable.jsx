import { Box, Typography } from '@mui/material'
import React, { useCallback, memo, useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getInchargeHodData } from 'src/redux/actions/InchargeHodChecks.action'
import { getReqApprovDept } from 'src/redux/actions/ReqAppovDept.action'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { IconButton } from '@mui/material'
import { editicon } from 'src/color/Color'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined'
import DeptApprovModel from '../DepartmentApprovals/DeptApprovModel'
import { axioslogin } from 'src/views/Axios/Axios'
import CropSquareIcon from '@mui/icons-material/CropSquare'
import DescriptionIcon from '@mui/icons-material/Description'
import CloseDetailsModal from '../InchargeApproval/CloseDetailsModal'

const HodApprovalTable = () => {
  /*** Initializing */
  const history = useNavigate()
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  //redux for geting login id
  const id = useSelector(state => {
    return state.LoginUserData.empid
  })

  const [deptsecArry, setdeptSecArry] = useState([])
  const [isIncharge, setincharge] = useState(0)
  const [ishod, setHod] = useState(0)
  const [HodData, setHodData] = useState([])

  useEffect(() => {
    const getdetptsections = async id => {
      const result = await axioslogin.get(`/common/getdeptHoddeptsec/${id}`)
      const { success, data } = result.data
      if (success === 1) {
        const xx = data.map(val => {
          return val.dept_section
        })
        setdeptSecArry(xx)
      }
    }
    getdetptsections(id)
  }, [id])

  useEffect(() => {
    dispatch(getInchargeHodData(id))
    dispatch(getReqApprovDept(deptsecArry))
  }, [dispatch, id, deptsecArry, count])

  const HodIncharge = useSelector(state => {
    return state.setInchargeHodData.InchargeHoddata
  })

  const tabledata = useSelector(state => {
    return state.setReqApprvDept.ReqApprvDeptdata
  })

  useEffect(() => {
    if (HodIncharge.length !== 0) {
      const { hod, incharge } = HodIncharge[0]
      setincharge(incharge)
      setHod(hod)
    }
  }, [HodIncharge])

  useEffect(() => {
    const incharge = tabledata.filter(val => {
      return val.hod_req === 1
    })

    if (incharge.length !== 0) {
      const datas = incharge.map(val => {
        const obj = {
          req_slno: val.req_slno,
          actual_requirement: val.actual_requirement !== null ? val.actual_requirement : 'Not Updated',
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
          incharge_user: val.incharge_user !== null ? val.incharge_user.toLowerCase() : 'Not Updated',
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
          manag_operation_remarks: val.manag_operation_remarks !== null ? val.manag_operation_remarks : 'Not Updated',
          senior_manage_approv: val.senior_manage_approv,
          smo:
            val.senior_manage_approv === 1
              ? 'Approved'
              : val.senior_manage_approv === 2
              ? 'Reject'
              : val.senior_manage_approv === 3
              ? 'On-Hold'
              : 'Not Updated',
          senior_manage_remarks: val.senior_manage_remarks !== null ? val.senior_manage_remarks : 'Not Updated',
          cao_approve: val.cao_approve,
          cao:
            val.cao_approve === 1
              ? 'Approved'
              : val.cao_approve === 2
              ? 'Reject'
              : val.cao_approve === 3
              ? 'On-Hold'
              : 'Not Updated',
          cao_approve_remarks: val.cao_approve_remarks !== null ? val.cao_approve_remarks : 'Not Updated',
          ed_approve: val.ed_approve,
          ed:
            val.ed_approve === 1
              ? 'Approved'
              : val.ed_approve === 2
              ? 'Reject'
              : val.ed_approve === 3
              ? 'On-Hold'
              : 'Not Updated',
          ed_approve_remarks: val.ed_approve_remarks !== null ? val.ed_approve_remarks : 'Not Updated',
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
          crf_close: val.crf_close !== null ? val.crf_close : 'Not Updated',
          crf_close_remark: val.crf_close_remark !== null ? val.crf_close_remark : 'Not Updated',
          crf_closed_one: val.crf_closed_one !== null ? val.crf_closed_one : 'Not Updated',
          close_user: val.close_user !== null ? val.close_user : 'Not Updated',
          close_date: val.close_date !== null ? val.close_date : 'Not Updated'
        }
        return obj
      })

      setHodData(datas)
    }
  }, [tabledata])

  //column title setting
  const [columnHod] = useState([
    {
      headerName: 'Action',
      minWidth: 100,
      cellRenderer: params => {
        if (params.data.manag_operation_approv !== null && params.data.manag_operation_req === 1) {
          return (
            <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
              <PublishedWithChangesOutlinedIcon />
            </IconButton>
          )
        } else if (params.data.dms_approve !== null && params.data.dms_req === 1) {
          return (
            <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
              <PublishedWithChangesOutlinedIcon />
            </IconButton>
          )
        } else if (params.data.crf_close === 1) {
          return (
            <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
              <PublishedWithChangesOutlinedIcon />
            </IconButton>
          )
        } else {
          return (
            <IconButton onClick={() => rowSelect(params)} sx={{ color: editicon, paddingY: 0.5 }}>
              <CustomeToolTip title="Approval">
                <PublishedWithChangesOutlinedIcon />
              </CustomeToolTip>
            </IconButton>
          )
        }
      }
    },
    {
      headerName: 'View',
      minWidth: 100,
      cellRenderer: params => {
        if (params.data.crf_close === 1) {
          return (
            <IconButton onClick={() => CloseReason(params)} sx={{ color: editicon, paddingY: 0.5 }}>
              <CustomeToolTip title="Close Detail">
                <DescriptionIcon />
              </CustomeToolTip>
            </IconButton>
          )
        } else {
          return <Box></Box>
        }
      }
    },
    { headerName: 'Req.Slno', field: 'req_slno', minWidth: 120 },
    {
      headerName: 'Purpose',
      field: 'actual_requirement',
      autoHeight: true,
      wrapText: true,
      minWidth: 250,
      filter: 'true'
    },
    {
      headerName: 'Justification',
      field: 'needed',
      autoHeight: true,
      wrapText: true,
      minWidth: 250,
      filter: 'true'
    },
    {
      headerName: 'Location',
      field: 'location',
      autoHeight: true,
      wrapText: true,
      minWidth: 250,
      filter: 'true'
    },
    { headerName: 'Req. Date', field: 'req_date', minWidth: 200 },
    {
      headerName: 'Inch.Status',
      field: 'incharge',
      autoHeight: true,
      wrapText: true,
      minWidth: 150,
      filter: 'true'
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
    { headerName: 'ED/MD.Remark', field: 'ed_approve_remarks', minWidth: 250, wrapText: true }
  ])

  const [model, setmodel] = useState(0)
  const [open, setOpen] = useState(false)
  const [datas, setdatas] = useState([])

  //Data set for edit
  const rowSelect = useCallback(params => {
    setOpen(true)
    const data = params.api.getSelectedRows()
    setdatas(data)
    setmodel(1)
  }, [])

  const [CloseModal, setCloseModal] = useState(false)
  const [CloseModalFlag, setCloseModalFlag] = useState(0)
  const [closeData, setCloseData] = useState([])

  const CloseReason = useCallback(params => {
    const data = params.api.getSelectedRows()
    setCloseModal(true)
    setCloseModalFlag(1)
    setCloseData(data)
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
    <Fragment>
      <CardCloseOnly title="Hod Approval" close={backtoSetting}>
        {model === 1 ? (
          <DeptApprovModel
            open={open}
            setOpen={setOpen}
            isIncharge={isIncharge}
            ishod={ishod}
            datas={datas}
            count={count}
            setCount={setCount}
            id={id}
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
          <CusAgGridForMain columnDefs={columnHod} tableData={HodData} getRowStyle={getRowStyle} />
        </Box>
      </CardCloseOnly>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row' }
          //   /  justifyContent: "flex-start"
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
    </Fragment>
  )
}

export default memo(HodApprovalTable)
