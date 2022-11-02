import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react'
import { Paper, Typography, Box } from '@mui/material';
import { useHistory } from 'react-router-dom';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusIconButton from '../../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { axioslogin } from 'src/views/Axios/Axios'
import DownloadIcon from '@mui/icons-material/Download'
import CustomeToolTip from '../../Components/CustomeToolTip'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { ActionTyps } from 'src/redux/constants/action.type'
import { useDispatch, useSelector } from 'react-redux';
import { warningNotify } from '../../Common/CommonCode';
import CusCheckBox from 'src/views/Components/CusCheckBox';


const MonthlyReport = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [TableData, setTableData] = useState([]);
    const [total, setTotal] = useState([]);
    const [extra, setExtra] = useState([]);
    const [dataset, setdataa] = useState([])
    const [add, Setadd] = useState(false)
    const [Discharge, setDischarged] = useState(false)
    const [dateset, SetDate] = useState({
        start_date: new Date(),
        end_date: new Date()
    })

    const { start_date, end_date } = dateset;
    const getDate = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        SetDate({ ...dateset, [e.target.name]: value })

    }, [dateset])

    const [columnDefForTable] = useState([
        { headerName: 'Sl No ', field: 'slno' },
        { headerName: 'Date', field: 'process_date' },
        { headerName: 'Patient Id', field: 'pt_no' },
        { headerName: 'Room Category', field: 'roomtype' },
        { headerName: 'Room/Bed No', field: 'roonno' },
        { headerName: 'Rate hospital', field: 'hossum' },
        { headerName: 'Extra Rate(hos)', field: 'extraAmnt' },
        { headerName: 'Total Rate', field: 'totalsum' },
        { headerName: 'Rate Canteen', field: 'cantsum' },
        { headerName: 'Extra Rate Canteen', field: 'extracantAmt' },
        { headerName: 'Total Rate Canteen', field: 'totalextrasum' },
    ])

    const [checking, setchecking] = useState(0)
    const updateaddm = (e) => {
        if (e.target.checked === true) {
            Setadd(true)
            setchecking(1)
            setDischarged(false)
        } else {
            Setadd(false)
            setchecking(0)
            setDischarged(false)
            setTableData([])
        }
    }
    const updateDisc = (e) => {
        if (e.target.checked === true) {
            setDischarged(true)
            setchecking(2)
            Setadd(false)
        } else {
            Setadd(false)
            setchecking(0)
            setDischarged(false)
            setTableData([])
        }
    }

    useEffect(() => {
        if (checking === 1) {
            const arry = dataset && dataset.filter((val) => {
                return val.discharge === 'N' ? val : null
            })
            setTableData(arry)
        }
        else if (checking === 2) {
            const arrys = dataset && dataset.filter((val) => {
                return val.discharge === 'Y' ? val : null
            })
            setTableData(arrys)
        }
        else {
            const arrys = dataset && dataset.filter((val) => {
                return val
            })
            setTableData(arrys)
        }
    }, [checking, dataset])

    const postdata = useMemo(() => {
        return {
            start_date: start_date,
            end_date: end_date,
        }
    }, [start_date, end_date])

    const clicksearch = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getdatareport = async (postdata) => {
            const result = await axioslogin.post('/dietReport/getPatientReport/Monthly', postdata)
            const { success, data } = result.data;
            if (success === 1) {
                setTotal(data)
            }
        }
        getdatareport(postdata)
        const getExtraOrder = async (postdata) => {
            const result = await axioslogin.post('/dietReport/getPatientReport/Monthly/Extra', postdata)
            const { success, data } = result.data;
            if (success === 1) {
                setExtra(data)
            }
        }
        getExtraOrder(postdata)
    }, [postdata, dispatch])


    const [exports, setexport] = useState(0)

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

    useEffect(() => {
        if ((total.length !== 0) && (extra.length !== 0)) {
            const newarrt = total && total.map((val) => {
                const a1 = extra.find((ele) => ele.proc_slno === val.proc_slno)
                return {
                    ...val, extraAmnt: a1?.exhossum ?? 0,
                    extracantAmt: a1?.excantsum ?? 0
                }
            })
            const newhos = newarrt.map((val) => {
                const obj = {
                    ...val, totalsum: val.hossum + val.extraAmnt,
                    totalextrasum: val.cantsum + val.extracantAmt
                }
                return obj
            })
            setTableData(newhos);
            setdataa(newhos)
        }

    }, [total, extra])

    const backToSetting = useCallback(() => {
        history.push(`/Home/Reports`)
    }, [history])

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

    return (
        <CardCloseOnly
            title='Monthly patient Wise Report'
            close={backToSetting}
        >
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
                                flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row', xl: 'row', },
                            }}>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                    mt: 1
                                }} >
                                    <Box sx={{
                                        width: '100%',
                                        ml: 0.5, mt: 0.5
                                    }}>
                                        <Typography>Start Date</Typography>
                                    </Box>
                                    <Box sx={{
                                        width: '100%',
                                        height: 15,
                                        mb: 1
                                    }}>
                                        <TextFieldCustom
                                            type="date"
                                            size="sm"
                                            name="start_date"
                                            value={start_date}
                                            onchange={getDate}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                    mt: 1
                                }} >
                                    <Box sx={{
                                        width: '100%',
                                        ml: 0.5, mt: 0.5
                                    }}>
                                        <Typography>End Date</Typography>
                                    </Box>
                                    <Box sx={{
                                        width: '100%',
                                        height: 15,
                                        mb: 1
                                    }}>
                                        <TextFieldCustom
                                            type="date"
                                            size="sm"
                                            name="end_date"
                                            value={end_date}
                                            onchange={getDate}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                    ml: 1, mt: 0.5,
                                }} >
                                    <Box sx={{
                                        width: '20%',
                                        mt: 0.8
                                    }}>
                                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={clicksearch} >
                                            <SearchOutlinedIcon fontSize='small' />
                                        </CusIconButton>
                                    </Box>

                                    <Box sx={{
                                        width: '100%',
                                        pt: 1.5, pl: 2
                                    }}>
                                        <CusCheckBox
                                            label="Addmitted"
                                            color="primary"
                                            size="md"
                                            name="add"
                                            value={add}
                                            checked={add}
                                            onCheked={updateaddm}
                                        />
                                    </Box>
                                    <Box sx={{
                                        width: '100%',
                                        pt: 1.5, pl: 2
                                    }}>
                                        <CusCheckBox
                                            label="Discharged"
                                            color="primary"
                                            size="md"
                                            name="Discharge"
                                            value={Discharge}
                                            checked={Discharge}
                                            onCheked={updateDisc}
                                        />
                                    </Box>
                                </Box>
                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                    mt: 1
                                }} >
                                </Box>
                            </Box>
                        </Paper>
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
                    </Box>
                </Paper>
            </Box>
        </CardCloseOnly>
    )
}

export default MonthlyReport