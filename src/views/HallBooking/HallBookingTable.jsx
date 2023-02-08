import { Box, Paper } from '@mui/material'
import React, { memo, useCallback, useState } from 'react'
import CardCloseOnly from '../Components/CardCloseOnly'
import CusAgGridForMain from '../Components/CusAgGridForMain'
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditButton from '../Components/EditButton';
import EditHallBookModal from './EditHallBookModal';
const HallBookingTable = ({ setView, tabledata, count, setCount }) => {
    const [column] = useState([
        { headerName: "Slno", field: 'h_book_slno' },
        { headerName: "Event Name", field: 'h_book_event', minWidth: 200 },
        { headerName: "No.of Attendees", field: 'h_book_attendees' },
        {headername:"Reason",field:"h_booking_reason"},
        { headerName: "Start date&Time", field: 'h_book_startdatetime' },
        { headerName: "End date&Time", field: 'h_book_enddatetime' },
        { headerName: "Contact Number", field: 'h_book_contno' },
        { headerName: "Email", field: 'h_book_email' },
        { headerName: "Create User", field: 'em_name' },
        { headerName: "Department", field: 'dept_name', minWidth: 250 },
        { headerName: "Action", cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> }
    ])
    const [open, setOpen] = useState(false);
    const [modal, setModal] = useState(0);
    const [mddata, setMddata] = useState({});
    const rowSelect = async (params) => {
        const data = params.api.getSelectedRows()
        setModal(1);
        setOpen(true);
        setMddata(data);
    }
    const backtoSetting = useCallback(() => {
        setView(0)
    }, [setView])

    return (
        <CardCloseOnly
            title="Booking Lists"
            close={backtoSetting}
        >
            <Box sx={{ width: "100%", p: 1 }}>
                <Paper square elevation={3}>
                    <CusAgGridForMain
                        columnDefs={column}
                        tableData={tabledata}
                        onClick={rowSelect}
                    />
                </Paper>
            </Box>
            {
                modal === 1 ? <EditHallBookModal setOpen={setOpen} open={open} setModal={setModal} mddata={mddata} count={count} setCount={setCount} /> : null
            }
        </CardCloseOnly>
    )
}
export default memo(HallBookingTable)