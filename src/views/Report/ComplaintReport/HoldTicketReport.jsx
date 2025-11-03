import React, { useCallback, useState, memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import CusIconButton from '../../Components/CusIconButton';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import DownloadIcon from '@mui/icons-material/Download'
import { Box, Button, CircularProgress, CssVarsProvider, Table } from '@mui/joy';
import ComplaintDepartmentWithAll from 'src/views/CommonSelectCode/ComplaintDepartmentWithAll';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNotify } from 'src/views/Common/CommonCode';
import { format } from 'date-fns';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const HoldTicketReport = () => {

    const history = useNavigate();
    const [ticketDept, setTicketDept] = useState(0)
    const [ticketList, setTicketList] = useState([])
    const [loading, setLoading] = useState(false);

    const backToSetting = useCallback(() => {
        history(`/Home/Reports`)
    }, [history])

    const postDept = useMemo(() => ({ ticketDept }), [ticketDept]);

    const SearchTickets = useCallback(async () => {
        setLoading(true);
        try {
            const result = await axioslogin.post('/getTatReports/getHoldedTicketsReport', postDept);
            const { success, data } = result.data;
            setTicketList(success === 1 ? data : []);
        } catch (error) {
            errorNotify("Error fetching Holded Tickets:", error);
            setTicketList([]);
        } finally {
            setLoading(false);
        }
    }, [postDept]);

    const onExportClick = useCallback(() => {
        if (ticketList.length === 0) {
            errorNotify("No data available to export!");
            return;
        }
        // Map ticketList to plain objects (Excel friendly)
        const excelData = ticketList.map((val, index) => ({
            "Serial No": index + 1,
            "Ticket No": val.TICKET_NO,
            "Ticket Registered Date": format(new Date(val.TICKET_REG_DATE), 'dd-MM-yyyy hh:mm:ss a'),
            "Ticket Type": val.TICKET_TYPE,
            "Ticket Description": val.TICKET_DES,
            "Ticket To": val.TICKET_TO,
            "Ticket From Section": val.TICKET_FROM_SEC,
            "Location": `${val.ROOM_NAME || ''} ${val.ROOM_TYPE || ''} ${val.BLOCK_NO || ''} ${val.FLOOR || ''}`,
            "Ticket Registered Employee": val.TICKET_REG_EMPLOYEE,
            "Priority Reason": val.PRIORITY_REAS,
            "Assigned Date": format(new Date(val.ASSINGED_DATE), 'dd-MM-yyyy hh:mm:ss a'),
            "Assigned Employee": val.ASSINGED_EMP,
            "Hold User": val.HOLD_USER,
            "Hold Date": format(new Date(val.HOLDED_ON), 'dd-MM-yyyy hh:mm:ss a'),
            "Hold Reason": val.PENDING !== null ? val.PENDING : val.HOLD_REAS || ""
        }));
        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(excelData);
        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Holded Tickets");
        // Export
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([wbout], { type: "application/octet-stream" }), "HoldedTickets.xlsx");
    }, [ticketList]);

    const Refresh = useCallback(() => {
        setTicketList([])
        setTicketDept(0)
    }, [setTicketDept, setTicketList])

    return (
        <CardCloseOnly
            title='Tickets on Hold'
            close={backToSetting}
        >

            <CssVarsProvider>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box sx={{ m: 1, }}>
                        <Box sx={{ py: .5, px: 1, display: 'flex', bgcolor: '#eff3f6' }}>

                            <ComplaintDepartmentWithAll ticketDept={ticketDept} setTicketDept={setTicketDept} />
                            <Button variant="outlined" onClick={SearchTickets}> Search</Button>
                            <Button variant="outlined" onClick={Refresh} sx={{ ml: .5 }} > Refresh</Button>
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                                <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                                    <DownloadIcon />
                                </CusIconButton>
                            </Box>



                        </Box>

                        {loading ? (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <CircularProgress />
                            </Box>
                        ) : ticketList.length === 0 ? (
                            <Box sx={{ felx: 1, border: 1, py: 5, borderColor: '#D3D3D3', display: 'flex', justifyContent: 'center', mt: 1 }}>
                                No Data Available
                            </Box>
                        ) : (
                            <Box sx={{ width: '90vw', overflow: 'auto', }}>

                                <Box sx={{ height: '74vh', width: 3000, mt: 1, pr: 1 }}>

                                    <Table padding={"none"} stickyHeader size='sm' borderAxis='both' >
                                        <thead>
                                            <tr style={{ backgroundColor: '#c1c8e4' }}>
                                                <th style={{ width: 70, minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Serial No</th>
                                                <th style={{ width: 80, minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Ticket No</th>
                                                <th style={{ width: 160, minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Ticket Registered Date</th>
                                                <th style={{ width: "auto", minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Ticket Type</th>
                                                <th style={{ width: "auto", minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Ticket Description</th>
                                                <th style={{ width: 200, minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Ticket To</th>
                                                <th style={{ width: "auto", minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Ticket From Section</th>
                                                <th style={{ width: "auto", minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Location</th>
                                                <th style={{ width: 200, minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Ticket Registered Employee</th>
                                                <th style={{ width: "auto", minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Priority Reason</th>
                                                <th style={{ width: 160, minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Assigned Date</th>
                                                <th style={{ width: "auto", minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Assigned Employee</th>
                                                <th style={{ width: 200, minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Hold User</th>
                                                <th style={{ width: 160, minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Hold Date</th>
                                                <th style={{ width: 500, minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Hold Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ticketList?.map((val, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td style={{ width: 80, }}>{index + 1}</td>
                                                        <td style={{ width: 80, }}>{val.TICKET_NO} </td>
                                                        <td style={{ width: "auto", }}>
                                                            {format(new Date(val.TICKET_REG_DATE), 'dd-MM-yyyy hh:mm:ss a')}</td>
                                                        <td style={{ width: "auto", }}>{val.TICKET_TYPE}</td>
                                                        <td style={{ width: "auto", }}>{val.TICKET_DES}</td>
                                                        <td style={{ width: "auto", }}>{val.TICKET_TO}</td>
                                                        <td style={{ width: "auto", }}>{val.TICKET_FROM_SEC}</td>
                                                        <td style={{ width: "auto", }}>
                                                            {val.ROOM_NAME}
                                                            {(val.ROOM_TYPE || val.BLOCK_NO || val.FLOOR) ? (
                                                                ` (${val.ROOM_TYPE || ''}
                                                            ${val.ROOM_TYPE && val.BLOCK_NO ? ' - ' : ''}${val.BLOCK_NO || ''}
                                                            ${val.BLOCK_NO && val.FLOOR ? ' - ' : ''}${val.FLOOR || ''})`
                                                            ) : (
                                                                val.cm_complaint_location || "Not Updated"
                                                            )}
                                                        </td>
                                                        <td style={{ width: "auto", }}>{val.TICKET_REG_EMPLOYEE}</td>
                                                        <td style={{ width: "auto", }}>{val.PRIORITY_REAS}</td>
                                                        <td style={{ width: "auto", }}>
                                                            {format(new Date(val.ASSINGED_DATE), 'dd-MM-yyyy hh:mm:ss a')}
                                                        </td>
                                                        <td style={{ width: "auto", }}>{val.ASSINGED_EMP}</td>
                                                        <td style={{ width: "auto", }}>{val.HOLD_USER}</td>
                                                        <td style={{ width: "auto", }}>
                                                            {format(new Date(val.HOLDED_ON), 'dd-MM-yyyy hh:mm:ss a')}
                                                        </td>
                                                        <td style={{ width: "auto", }}>
                                                            {val.PENDING !== null ? val.PENDING : val.HOLD_REAS !== null ? val.HOLD_REAS : ''}
                                                        </td>

                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>

                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </CssVarsProvider>
        </CardCloseOnly >
    )
}

export default memo(HoldTicketReport)