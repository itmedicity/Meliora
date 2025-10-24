
import React, { useCallback, useState, memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom';
import CusIconButton from '../../Components/CusIconButton';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import DownloadIcon from '@mui/icons-material/Download'
import { Box, Button, CircularProgress, CssVarsProvider, Option, Select, selectClasses, Table } from '@mui/joy';
import { axioslogin } from 'src/views/Axios/Axios';
import { errorNotify, infoNotify } from 'src/views/Common/CommonCode';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

const PendingTicketsCountReport = () => {

    const history = useNavigate();
    const [ticketOption, setTicketOption] = useState(0)
    const [ticketList, setTicketList] = useState([])
    const [loading, setLoading] = useState(false);

    const backToSetting = useCallback(() => {
        history(`/Home/Reports`)
    }, [history])

    const postDept = useMemo(() => ({ ticketOption }), [ticketOption]);

    const SearchTickets = useCallback(async () => {
        if (ticketOption === 0 || ticketOption === null) {
            infoNotify("Select any ticket search option")
            return
        }
        else {
            setLoading(true);
            try {
                const result = await axioslogin.post('/getTatReports/getPendingTicketsCountReport', postDept);
                const { success, data } = result.data;
                setTicketList(success === 1 ? data : []);
            } catch (error) {
                errorNotify("Error fetching Holded Tickets:", error);
                setTicketList([]);
            } finally {
                setLoading(false);
            }
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
            "Ticket To": val.TICKET_TO,
            "Ticket Tickets": val.TOTAL_TICKETS
        }));
        // Create worksheet
        const ws = XLSX.utils.json_to_sheet(excelData);
        // Create workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Holded Tickets");
        // Export
        const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        saveAs(new Blob([wbout], { type: "application/octet-stream" }), "PendingTicketsCount.xlsx");
    }, [ticketList]);

    const Refresh = useCallback(() => {
        setTicketList([])
        setTicketOption(0)
    }, [setTicketOption, setTicketList])


    return (
        <CardCloseOnly
            title='Pending Tickets Count Dept Wise'
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
                            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                                <Select
                                    value={ticketOption ?? null}
                                    onChange={(e, value) => setTicketOption(value)}
                                    placeholder="Select a Ticket Option"
                                    indicator={<KeyboardArrowDown />}
                                    sx={{
                                        width: 400,

                                        [`& .${selectClasses.indicator}`]: {
                                            transition: '0.2s',
                                            [`&.${selectClasses.expanded}`]: {
                                                transform: 'rotate(-180deg)',
                                            },
                                        },
                                    }}
                                >
                                    <Option value={1}>Pendings (Not Assinged)</Option>
                                    <Option value={2}>Assinged (Holded Tickets Included)</Option>
                                    <Option value={3}>All Pendings (Not Assinged, Assinged, Not Rectified - Holded Tickets Included)</Option>
                                    <Option value={4}>Holded Tickets</Option>
                                </Select>
                                <Button variant="outlined" onClick={SearchTickets} sx={{ ml: .5 }} > Search</Button>
                                <Button variant="outlined" onClick={Refresh} sx={{ ml: .5 }} > Refresh</Button>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                            <Box sx={{ height: '74vh', flex: 1, mt: 1, }}>
                                <Table padding={"none"} stickyHeader size='sm' borderAxis='both' >
                                    <thead>
                                        <tr style={{ backgroundColor: '#c1c8e4' }}>
                                            <th style={{ width: 80, textAlign: 'center', minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Serial No</th>
                                            <th style={{ width: "auto", minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>Ticket TO</th>
                                            <th style={{ width: 150, textAlign: 'center', minHeight: 200, whiteSpace: "normal", fontSize: 13 }}>TOTAL TICKETS </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ticketList?.map((val, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td style={{ width: 80, textAlign: 'center', }}>{index + 1}</td>
                                                    <td style={{ width: "auto", }}>{val.TICKET_TO} </td>
                                                    <td style={{ width: 150, textAlign: 'center', }}>{val.TOTAL_TICKETS}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </Box>
                        )}
                    </Box>
                </Box>
            </CssVarsProvider>
        </CardCloseOnly >
    )
}

export default memo(PendingTicketsCountReport)