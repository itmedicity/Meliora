import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardCloseOnly from '../Components/CardCloseOnly'
import { getHallbookDeotApprove } from 'src/redux/actions/HallbookingApproval'
import { getInchargeHodData } from 'src/redux/actions/InchargeHodChecks.action'
import CusAgGridForMain from '../Components/CusAgGridForMain'
import { Box } from '@mui/material'
import HallbookingApprmodel from './HallBookingApproval/HallbookingApprmodel'
import { IconButton } from '@mui/material'
import { editicon } from 'src/color/Color'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined'
import { useNavigate } from 'react-router-dom'
const HallBookingApproval = () => {
  const history = useNavigate()
  const dispatch = useDispatch()

  const [count, setCount] = useState(0)
  //redux for geting login id
  const id = useSelector((state) => {
    return state.LoginUserData.empid
  })
  const backtoSetting = useCallback(() => {
    history('/Home')
  }, [history])

  useEffect(() => {
    dispatch(getInchargeHodData(id))
    dispatch(getHallbookDeotApprove())
  }, [dispatch, id, count])

  const HodIncharge = useSelector((state) => {
    return state.setInchargeHodData.InchargeHoddata
  })
  const [isIncharge, setincharge] = useState(0)
  const [ishod, setHod] = useState(0)

  useEffect(() => {
    if (HodIncharge.length !== 0) {
      const { hod, incharge } = HodIncharge[0]
      setincharge(incharge)

      setHod(hod)
    }
  }, [HodIncharge])

  const tabledata = useSelector((state) => {
    return state.setdepthallbookApproval.HallbookApproveList
  })

  const icharge = tabledata.filter((val) => {
    return val.is_incharge_req === 1
  })

  const hod = tabledata.filter((val) => {
    return val.is_hod_req === 1
  })

  const [column] = useState([
    // { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    { headerName: 'Req.Slno', field: 'h_approval_slno', width: 120 },
    {
      headerName: 'Event',
      field: 'h_book_event',
      autoHeight: true,
      wrapText: true,
      width: 350,
      filter: 'true',
    },
    {
      headerName: 'No of attendees',
      field: 'h_book_attendees',
      autoHeight: true,
      wrapText: true,
      width: 250,
      filter: 'true',
    },
    { headerName: 'Reason', field: 'h_booking_reason', width: 250 },
    {
      headerName: 'Inch.Appr.Status',
      field: 'is_icharge_approve',
      autoHeight: true,
      wrapText: true,
      width: 250,
      filter: 'true',
    },
    {
      headerName: 'Incharge Remarks',
      field: 'h_incharge_remark',
      autoHeight: true,
      wrapText: true,
      width: 350,
      filter: 'true',
    },
    { headerName: 'Hod.Approve Status', field: 'is_hod_approves', width: 250 },
    { headerName: 'Hod Remarks', field: 'hod_remark', width: 350 },
    { headerName: 'CEO Approve Status', field: 'is_ceo_approved', width: 250 },
    { headerName: 'CEO Remarks', field: 'ceo_remark', width: 350 },
    // { headerName: "SMO Approve Status", field: "senior_manage_approvs", width: 250 },
    // { headerName: "SMO Remarks", field: "senior_manage_remarks", width: 350 },
    // { headerName: "CAO/COO/MD Approve Status", field: "cao_approves", width: 250 },
    // { headerName: "CAO/COO/MD Remarks", field: "cao_approve_remarks", width: 350 },
    // { headerName: "ED/MD Approve Status", field: "ed_approves", width: 250 },
    // { headerName: "ED/MD Remarks", field: "ed_approve_remarks", width: 350 },
  ])

  //is incharge

  const [columnInch] = useState([
    {
      headerName: 'Action',
      minWidth: 100,
      cellRenderer: (params) => {
        if (params.data.is_icharge_approve === 1) {
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
      },
    },
    // { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    { headerName: 'Slno', field: 'h_approval_slno', minWidth: 100 },
    { headerName: 'Hall', field: 'hall_name', minWidth: 200 },
    { headerName: 'Event', field: 'h_book_event', autoHeight: true, wrapText: true, minWidth: 200 },
    {
      headerName: 'Attendees',
      field: 'h_book_attendees',
      autoHeight: true,
      wrapText: true,
      minWidth: 150,
      filter: 'true',
    },
    { headerName: 'Reason', field: 'h_booking_reason', minWidth: 300 },
    {
      headerName: 'Start Time',
      field: 'h_book_startdatetime',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
      filter: 'true',
    },
    {
      headerName: 'End Time',
      field: 'h_book_enddatetime',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
      filter: 'true',
    },
    {
      headerName: 'Inch.Appr.Status',
      field: 'is_icharge_approves',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
      filter: 'true',
    },
    { headerName: 'InchApprv.Date', field: 'incharge_approved_date', minWidth: 200 },
    {
      headerName: 'Incharge Remarks',
      field: 'h_incharge_remark',
      autoHeight: true,
      wrapText: true,
      minWidth: 350,
      filter: 'true',
    },
    // { headerName: "CEO Approve Status", field: "is_ceo_approved", width: 250 },
    // { headerName: "CEO Remarks", field: "ceo_remark", width: 350 },
  ])

  //ishod

  const [columnHod] = useState([
    {
      headerName: 'Action',
      minWidth: 100,
      cellRenderer: (params) => {
        if (params.data.is_hod_approve === 1) {
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
      },
    },
    // { headerName: 'Action', minWidth: 80, cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
    { headerName: 'Req.Slno', field: 'h_booking_slno', minWidth: 100 },
    { headerName: 'Hall', field: 'hall_name', minWidth: 200 },
    {
      headerName: 'Event',
      field: 'h_book_event',
      autoHeight: true,
      wrapText: true,
      minWidth: 150,
      filter: 'true',
    },
    {
      headerName: 'Start Time',
      field: 'h_book_startdatetime',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
      filter: 'true',
    },
    {
      headerName: 'End Time',
      field: 'h_book_enddatetime',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
      filter: 'true',
    },
    {
      headerName: 'No of attendees',
      field: 'h_book_attendees',
      autoHeight: true,
      wrapText: true,
      width: 250,
      filter: 'true',
    },
    { headerName: 'Reason', field: 'h_booking_reason', minWidth: 150 },
    {
      headerName: 'Inch.Appr.Status',
      field: 'is_icharge_approves',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
    },
    { headerName: 'InchApprv.Date', field: 'incharge_approved_date', minWidth: 200 },
    {
      headerName: 'Incharge Remarks',
      field: 'h_incharge_remark',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
    },
    { headerName: 'Hod.Approve Status', field: 'is_hod_approves', minWidth: 200 },
    {
      headerName: 'Hod appr.Date',
      field: 'hod_approved_date',
      autoHeight: true,
      wrapText: true,
      minWidth: 200,
    },
    {
      headerName: 'Hod Remarks',
      field: 'hod_remark',
      minWidth: 150,
      autoHeight: true,
      wrapText: true,
    },
  ])
  const [model, setmodel] = useState(0)
  const [open, setOpen] = useState(false)
  const [datas, setdatas] = useState([])

  //Data set for edit
  const rowSelect = useCallback((params) => {
    setOpen(true)
    const data = params.api.getSelectedRows()
    setdatas(data)
    setmodel(1)
  }, [])

  return (
    <CardCloseOnly title="Incharge/Hod Approval" close={backtoSetting}>
      {model === 1 ? (
        <HallbookingApprmodel
          open={open}
          setOpen={setOpen}
          isIncharge={isIncharge}
          ishod={ishod}
          datas={datas}
          count={count}
          setCount={setCount}
        />
      ) : null}
      {isIncharge === 1 && ishod === 1 ? (
        <Box sx={{ p: 1 }}>
          <CusAgGridForMain columnDefs={column} tableData={tabledata} />
        </Box>
      ) : isIncharge === 1 ? (
        <Box sx={{ p: 1 }}>
          <CusAgGridForMain columnDefs={columnInch} tableData={icharge} />
        </Box>
      ) : ishod === 1 ? (
        <Box sx={{ p: 1 }}>
          <CusAgGridForMain columnDefs={columnHod} tableData={hod} />
        </Box>
      ) : null}
    </CardCloseOnly>
  )
}

export default HallBookingApproval
