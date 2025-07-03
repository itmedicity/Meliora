import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import CusAgGridForMain from '../Components/CusAgGridForMain'
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditButton from '../Components/EditButton'
import EditHallBookModal from './EditHallBookModal'
const HallBookingTable = ({ setView, tabledata, count, setCount }) => {
  const [column] = useState([
    {
      headerName: 'Action',
      minWidth: 100,
      cellRenderer: params => <EditButton onClick={() => rowSelect(params)} />,
    },
    { headerName: 'Slno', field: 'h_book_slno', minWidth: 100 },
    {
      headerName: 'Event Name',
      field: 'h_book_event',
      minWidth: 200,
      autoHeight: true,
      wrapText: true,
    },
    { headerName: 'Attendees', field: 'h_book_attendees', minWidth: 100 },
    // { headername: "Reason", field: "h_booking_reason", minWidth: 200, autoHeight: true, wrapText: true },
    { headerName: 'Start date&Time', field: 'h_book_startdatetime', minWidth: 200 },
    { headerName: 'End date&Time', field: 'h_book_enddatetime', minWidth: 200 },
    { headerName: 'Contact Number', field: 'h_book_contno', minWidth: 200 },
    { headerName: 'Email', field: 'h_book_email', minWidth: 200 },
    { headerName: 'Create User', field: 'em_name', minWidth: 200 },
    { headerName: 'Department', field: 'dept_name', minWidth: 250 },
  ])
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(0)
  const [mddata, setMddata] = useState({})
  const rowSelect = async params => {
    const data = params.api.getSelectedRows()
    setModal(1)
    setOpen(true)
    setMddata(data)
  }
  const backtoSetting = useCallback(() => {
    setView(0)
  }, [setView])

  return (
    <CardCloseOnly title="Booking Lists" close={backtoSetting}>
      <Box sx={{ width: '100%', p: 1 }}>
        <Paper square elevation={3}>
          <CusAgGridForMain columnDefs={column} tableData={tabledata} onClick={rowSelect} />
        </Paper>
      </Box>
      {modal === 1 ? (
        <EditHallBookModal
          setOpen={setOpen}
          open={open}
          setModal={setModal}
          mddata={mddata}
          count={count}
          setCount={setCount}
        />
      ) : null}
    </CardCloseOnly>
  )
}
export default memo(HallBookingTable)
