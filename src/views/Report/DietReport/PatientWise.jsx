import React, { useCallback, useMemo, useState, useRef } from 'react'
import { Paper, Typography, Box } from '@mui/material';
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { useHistory } from 'react-router-dom';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import CusIconButton from '../../Components/CusIconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Button from '@mui/material/Button';
import { axioslogin } from 'src/views/Axios/Axios'
import DownloadIcon from '@mui/icons-material/Download'
import CustomeToolTip from '../../Components/CustomeToolTip'
import { AgGridReact } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { ActionTyps } from 'src/redux/constants/action.type'
import { useDispatch, useSelector } from 'react-redux';
import { warningNotify } from '../../Common/CommonCode';


const PatientWise = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [TableData, setTableData] = useState([]);
    const [ptname, setPtname] = useState({
        pname: '',
        start_date: new Date(),
        end_date: new Date()
    })

    const { pname, start_date, end_date } = ptname;
    const getPtname = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setPtname({ ...ptname, [e.target.name]: value })

    }, [ptname])

    const [columnDefForTable] = useState([
        {
            headerName: '#',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            width: 30,
        },
        { headerName: 'Sl No ', field: 'slno', wrapText: true, minWidth: 1 },
        { headerName: 'Date', field: 'process_date', wrapText: true, minWidth: 100 },
        { headerName: 'Patient Id', field: 'pt_no', wrapText: true, minWidth: 60 },
        { headerName: 'Diet Name', field: 'diet_name', wrapText: true, minWidth: 100 },
        { headerName: 'Breakfast', minWidth: 100 },
        { headerName: 'Lunch', minWidth: 100 },
        { headerName: 'Dinner', minWidth: 100 },
    ])

    const cleardata = useCallback(() => {
        const reset = {
            pname: '',
            start_date: new Date(),
            end_date: new Date()
        }
        setPtname(reset)

        setTableData([])
    }, [])

    const onExportClick = () => {
        if (TableData.length === 0) {
            warningNotify("Please Click The Search Button")
        }
        else {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
        }

    }

    const postdata = useMemo(() => {
        return {
            pt_no: pname,
            start_date: start_date,
            end_date: end_date,
        }
    }, [pname, start_date, end_date])

    const clicksearch = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        const getdatareport = async (postdata) => {
            const result = await axioslogin.post('/dietReport/getPatientReport', postdata)
            const { success, data } = result.data;
            if (success === 1) {

                setTableData(data)
            }
        }
        getdatareport(postdata)
    }, [postdata, dispatch])

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

    return (

        <CardCloseOnly
            title='Patient Wise Report'
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
                            // backgroundColor: 'blue',
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
                                        <Typography>Pateint Id</Typography>
                                    </Box>
                                    <Box sx={{
                                        width: '100%',
                                        height: 15,
                                        mb: 1
                                    }}>
                                        <TextFieldCustom
                                            type="text"
                                            size="sm"
                                            name="pname"
                                            value={pname}
                                            onchange={getPtname}
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
                                            onchange={getPtname}
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
                                            onchange={getPtname}
                                        />
                                    </Box>


                                </Box>


                                <Box sx={{
                                    display: 'flex',
                                    width: { xs: '100%', sm: '100%', md: '50%', lg: '50%', xl: '50%', },
                                    ml: 1, mt: 0.5
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
                                        height: 15,
                                        mb: 1, mt: 0.6
                                    }}>
                                        <Button onClick={cleardata} variant="contained" size="small" color="primary">Clear</Button>
                                    </Box>


                                </Box>
                            </Box>
                        </Paper>






                        <Paper
                            square
                            sx={{
                                backgroundColor: 'black',
                                //  backgroundColor: 'lightGrey',
                                width: { md: '100%', lg: '100%', xl: '100%' },
                                // height: { xs: 200, sm: 200, md: 200, lg: 200, xl: 200 },
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
                                    // alignItems: "",
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
                            {/* <Box
                                sx={{
                                    borderLeft: 2,
                                    borderColor: '#d3d3d3',
                                }}
                            > */}
                            {/* Table Component */}
                            {/* <CustomAGReportDispaly
                                    columnDefForTable={columnDefForTable}
                                    tableDataForTable={TableData}

                                />
                            </Box> */}
                            {/* Rigth Side Menu  */}










                            {/* AG Grid */}




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

                {/* <CustomAGReportDispaly
                    columnDefForTable={columnDefForTable}
                    tableDataForTable={TableData}

                />

 */}

            </Box>


        </CardCloseOnly >
    )
}

export default PatientWise