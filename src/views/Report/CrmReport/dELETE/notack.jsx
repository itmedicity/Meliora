import React, { useCallback, useState, memo, useEffect, useRef } from 'react'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useHistory } from 'react-router-dom';
import CustomBackDrop from 'src/views/Components/CustomBackDrop';
import { Paper, Box } from '@mui/material';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CusIconButton from '../../Components/CusIconButton';
import { warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { Typography } from '@mui/joy'
import { useDispatch, useSelector } from 'react-redux';
import { ActionTyps } from 'src/redux/constants/action.type'
import CustomeToolTip from '../../Components/CustomeToolTip'
import DownloadIcon from '@mui/icons-material/Download'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { format } from 'date-fns';


const CRFAllReportWithPO = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false)
    const [TableData, setTableData] = useState([]);
    const [TableDataDis, setTableDataDis] = useState(0);
    const [exports, setexport] = useState(0)
    const [dateset, SetDate] = useState({
        start_date: '',
        end_date: ''
    })


    const { start_date, end_date } = dateset;
    const getDate = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        SetDate({ ...dateset, [e.target.name]: value })

    }, [dateset])

    const [columnDefForTable] = useState([
        { headerName: 'Sl No ', field: 'slno', autoHeight: true, wrapText: true, minWidth: 30 },
        { headerName: 'Req Slno', field: 'req_slno', autoHeight: true, wrapText: true, minWidth: 30 },
        { headerName: 'Department', field: 'dept_name', autoHeight: true, wrapText: true, minWidth: 90, filter: "true" },
        { headerName: 'Department Section', field: 'sec_name', autoHeight: true, wrapText: true, minWidth: 90, filter: "true" },
        { headerName: 'Actual Requirement', field: 'actual_requirement', autoHeight: true, wrapText: true, minWidth: 150, },
        { headerName: 'Needed', field: 'needed', autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: 'Category', field: 'category', autoHeight: true, wrapText: true, minWidth: 120, filter: "true" },
        { headerName: 'Location', field: 'location', autoHeight: true, wrapText: true, minWidth: 90, filter: "true" },
        { headerName: 'Expected Date', field: 'expected_date', autoHeight: true, wrapText: true, minWidth: 90 },
        { headerName: 'Req.Status', field: 'req_status', autoHeight: true, wrapText: true, minWidth: 90 },
        { headerName: 'Req.User', field: 'req_user', autoHeight: true, wrapText: true, minWidth: 90 },
        { headerName: 'PO No', field: 'po_number', autoHeight: true, wrapText: true, minWidth: 90 },
        { headerName: 'PO Date', field: 'po_date', autoHeight: true, wrapText: true, minWidth: 90 },
        { headerName: 'Acknowledgement Remark', field: 'user_acknldge_remarks', autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: 'Acknowledgement User', field: 'ack_user', autoHeight: true, wrapText: true, minWidth: 90 },
        { headerName: 'Acknowledgement date', field: 'user_ack_date', autoHeight: true, wrapText: true, minWidth: 90 },
    ])


    const clicksearch = useCallback((e) => {
        e.preventDefault();
        setOpen(true)
        const postdata = {
            start_date: start_date,
            end_date: end_date,
        }
        const getdataUserAcknldged = async (postdata) => {
            const result = await axioslogin.post('/CrfReports/getdataAllCRFWithPO', postdata)
            const { success, data } = result.data;
            if (success === 1) {
                setTableDataDis(1)
                setTableData(data)
                setOpen(false)
            } else {
                warningNotify("No data under selected condition")
                setOpen(false)
            }
        }

        if (start_date !== '' && end_date !== '') {
            getdataUserAcknldged(postdata)
        } else {
            warningNotify("Please Select start date and end date before search")
            setOpen(false)
        }


    }, [start_date, end_date])



    const onExportClick = () => {
        if (TableData.length === 0) {
            warningNotify("Please Click The Search Button")
            setexport(0)
        }
        else {
            setexport(1)
        }
    }

    useEffect(() => {
        if (exports === 1) {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
            setexport(0)
        }
        else {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        }
    }, [exports, setexport, dispatch])


    const apiRef = useRef();
    /** useSelector is used for get aggrid download button state */
    const exportState = useSelector((state) => {
        return state.changeStateAggrid.aggridstate
    })

    /** To download report as excel */
    if (exportState > 0 && TableData.length > 0) {
        apiRef.current.api.exportDataAsCsv();
    }

    /** Ag grid report row and column formatting */
    const rowHeight = 25
    const headerHeight = 30
    const defaultColDef = {
        sortable: true,
        filter: 'agTextColumnFilter',
    }

    const rowStyle = {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
    const onGridReady = params => {
        params.columnApi.autoSizeAllColumns();
    };


    const backToSetting = useCallback(() => {
        history.push(`/Home/Reports`)
    }, [history])


    return (
        <CardCloseOnly
            title='All CRF Report With PO'
            close={backToSetting}
        >
            <CustomBackDrop open={open} text="Please Wait" />
            <Box sx={{ width: "100%", p: 1 }}>
                <Paper
                    square
                    sx={{
                        height: { xs: 775000, sm: 750, md: 750, lg: 750, xl: 750 },
                        p: 0.5,

                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Paper square elevation={2} sx={{ p: 2 }} >
                            <Box sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: 'row',
                                justifyContent: 'center'
                            }}>
                                <Box sx={{
                                    width: '10%',
                                    ml: 0.5, mt: 0.5
                                }}>
                                    <Typography>Start Date</Typography>
                                </Box>
                                <Box sx={{
                                    width: '20%',
                                    // height: 15,
                                    mb: 1, pr: 3
                                }}>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="start_date"
                                        value={start_date}
                                        onchange={getDate}
                                        slotProps={{
                                            input: {
                                                min: format(new Date("2023-12-27"), "yyyy-MM-dd")
                                            },
                                        }}

                                    />
                                </Box>
                                <Box sx={{
                                    width: '10%',
                                    ml: 0.5, mt: 0.5
                                }}>
                                    <Typography>End Date</Typography>
                                </Box>
                                <Box sx={{
                                    width: '20%',
                                    // height: 15,
                                    mb: 1, pr: 3
                                }}>
                                    <TextFieldCustom
                                        type="date"
                                        size="sm"
                                        name="end_date"
                                        value={end_date}
                                        onchange={getDate}
                                    />
                                </Box>


                                <Box sx={{
                                    width: '20%',

                                }}>
                                    <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={clicksearch} >
                                        <SearchOutlinedIcon fontSize='small' />
                                    </CusIconButton>
                                </Box>
                            </Box>
                        </Paper>
                        {TableDataDis === 1 ?

                            <Paper
                                square
                                sx={{
                                    backgroundColor: 'black',
                                    width: { md: '100%', lg: '100%', xl: '100%' },
                                }}
                            >
                                {/* Rigth Side Menu  */}
                                <Paper
                                    square
                                    sx={{
                                        backgroundColor: '#f0f3f5',
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        flexDirection: 'row-reverse',
                                        gap: 0.1,
                                        p: 0.3,
                                        borderLeft: 2,
                                        borderColor: '#d3d3d3',
                                    }}
                                >
                                    <CustomeToolTip title="Download" placement="bottom">
                                        <Box>
                                            <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                                                <DownloadIcon />
                                            </CusIconButton>
                                        </Box>
                                    </CustomeToolTip>
                                </Paper>
                                <Box
                                    className="ag-theme-material ListItemScrol"
                                    sx={{
                                        height: { xs: 475, sm: 475, md: 565, lg: 582, xl: 582 },
                                        width: '100%',
                                    }}
                                >
                                    <AgGridReact
                                        ref={apiRef}
                                        columnDefs={columnDefForTable}
                                        rowData={TableData}
                                        defaultColDef={defaultColDef}
                                        rowHeight={rowHeight}
                                        headerHeight={headerHeight}
                                        rowDragManaged={true}
                                        animateRows={true}
                                        onGridReady={onGridReady}
                                        rowSelection="multiple"
                                        rowStyle={rowStyle}
                                        suppressColumnVirtualisation={true}
                                        suppressRowVirtualisation={true}
                                        suppressRowClickSelection={true}
                                        groupSelectsChildren={true}
                                        rowGroupPanelShow={'always'}
                                        pivotPanelShow={'always'}
                                        enableRangeSelection={true}
                                    ></AgGridReact>
                                </Box>
                            </Paper>
                            : null}
                        {TableDataDis === 1 ?
                            <Box sx={{
                                width: "100%", display: "flex", flexDirection: 'row', pt: 2
                            }}>
                                <Typography sx={{ pl: 5 }}>A -</Typography>
                                <Typography>Approved</Typography>
                                <Typography sx={{ pl: 5 }}>R -</Typography>
                                <Typography>Rejected</Typography>
                                <Typography sx={{ pl: 5 }}>P -</Typography>
                                <Typography>On-Hold</Typography>
                                <Typography sx={{ pl: 5 }}>C -</Typography>
                                <Typography>Closed</Typography>
                            </Box>
                            : null}
                    </Box>
                </Paper>
            </Box>

        </CardCloseOnly>
    )
}

export default memo(CRFAllReportWithPO)