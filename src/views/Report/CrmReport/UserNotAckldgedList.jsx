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

const UserNotAckldgedList = () => {
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
        { headerName: 'Sl No ', field: 'slno' },
        { headerName: 'Req Slno', field: 'req_slno' },
        { headerName: 'Department', field: 'dept_name' },
        { headerName: 'Department Section', field: 'sec_name' },
        { headerName: 'Actual Requirement', field: 'actual_requirement' },
        { headerName: 'Needed', field: 'needed' },
        { headerName: 'Category', field: 'category' },
        { headerName: 'Location', field: 'location' },
        { headerName: 'Expected Date', field: 'expected_date' },
        { headerName: 'Emergency Tye', field: 'emer_type_name' },
        { headerName: 'Emergency remarks', field: 'emergeny_remarks' },
        { headerName: 'Req.DeptSec', field: 'user_deptsec' },
        { headerName: 'Req.Status', field: 'req_status' },
        { headerName: 'Req.User', field: 'req_user' },
        { headerName: 'Acknowledgement Remark', field: 'user_acknldge_remarks' },
        { headerName: 'Acknowledgement User', field: 'user_ack_user' },
        { headerName: 'Acknowledgement date', field: 'user_ack_date' },
    ])


    const clicksearch = useCallback((e) => {
        e.preventDefault();
        setOpen(true)
        const postdata = {
            start_date: start_date,
            end_date: end_date,
        }
        const getdataUserAcknldged = async (postdata) => {
            const result = await axioslogin.post('/CrfReports/getdataUserNotAcknldged', postdata)
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
            title='User Acknowledged CRF'
            close={backToSetting}
        >
            <CustomBackDrop open={open} text="Please Wait" />
            <Box sx={{ width: "100%", p: 1 }}>
                <Paper
                    square
                    sx={{
                        height: { xs: 700, sm: 700, md: 700, lg: 700, xl: 700 },
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
                    </Box>
                </Paper>
            </Box>

        </CardCloseOnly>
    )
}

export default memo(UserNotAckldgedList)