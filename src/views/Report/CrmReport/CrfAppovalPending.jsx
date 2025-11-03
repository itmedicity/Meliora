import { Box, CssVarsProvider, Grid, Tooltip, Typography } from '@mui/joy'
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import CustomCloseIconCmp from 'src/views/CentralRequestManagement/ComonComponent/Components/CustomCloseIconCmp'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusIconButton from 'src/views/Components/CusIconButton'
import DownloadIcon from '@mui/icons-material/Download'
import { AgGridReact } from 'ag-grid-react'
import { useDispatch, useSelector } from 'react-redux'
import CustomeToolTip from 'src/views/Components/CustomeToolTip'
import { ActionTyps } from 'src/redux/constants/action.type'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Paper } from '@mui/material'
import ImageViewComp from 'src/views/CentralRequestManagement/CrfDashboardNew/Components/ImageViewComp'
import hodimg from '../../../assets/images/CRF/HOD.png'
import dmsimg from '../../../assets/images/CRF/DMS.png'
import msimg from '../../../assets/images/CRF/MS.png'
import moimg from '../../../assets/images/CRF/OM.png'
import smoimg from '../../../assets/images/CRF/SMO.png'
import gmimg from '../../../assets/images/CRF/GM.png'
import edimg from '../../../assets/images/CRF/ED.png'
import mdimg from '../../../assets/images/CRF/MD.png'
import { getCRMDashboard } from 'src/redux/actions/CrmDashBoardList.action'

const CrfAppovalPending = () => {
    const history = useNavigate()
    const dispatch = useDispatch()
    const [flag, setflag] = useState(0)
    const [TableData, setTableData] = useState([])
    const [Name, setName] = useState("")
    const [exports, setexport] = useState(0)

    useEffect(() => {
        dispatch(getCRMDashboard())
        // }
    }, [dispatch])
    const backToSetting = useCallback(() => {
        history(`/Home/Reports`)
    }, [history])

    const backToSettingmain = useCallback(() => {
        setflag(0)
    }, [])
    const crfData = useSelector(state => {
        return state.setCRMDashBoard.setCRMDashboardList
    })
    const apprvdData = useMemo(() => crfData, [crfData])

    const [crfApprv, setCrfApprv] = useState({
        hod: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0, hodpending: 0 },
        dms: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0, dmspending: 0 },
        ms: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0, mspending: 0 },
        mo: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0, mopending: 0 },
        smo: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0, smopending: 0 },
        gm: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0, gmpending: 0 },
        md: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0, mdpending: 0 },
        ed: { pending: 0, clinic: 0, nonClinic: 0, title: '', imageView: [], imName: '', id: 0, edpending: 0 },
    })
    useEffect(() => {
        if (apprvdData?.length) {
            const hodPending = apprvdData?.filter(
                item =>
                    item.hod_req === 1 &&
                    item.hod_approve === null &&
                    item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    ((item.dms_req === 1 && item.dms_approve === null) || (item.dms_req === 0 && item.dms_approve === null)) &&
                    ((item.ms_approve_req === 1 && item.ms_approve === null) ||
                        (item.ms_approve_req === 0 && item.ms_approve === null))
            )

            const dmsPending = apprvdData?.filter(
                item =>
                    item.dms_req === 1 &&
                    item.dms_approve === null &&
                    item.ms_approve === null &&
                    item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1 || item.hod_approve === null || item.incharge_approve === null)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )
            const dmsApprPending = apprvdData?.filter(
                item =>
                    item.dms_req === 1 &&
                    item.dms_approve === null &&
                    item.ms_approve === null &&
                    item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    item.hod_approve === 1 &&
                    (item.incharge_approve === 1 || item.hod_approve === 1 || item.hod_approve === null || item.incharge_approve === null)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )
            const msPending = apprvdData?.filter(
                item =>
                    item.ms_approve_req === 1 &&
                    item.ms_approve === null &&
                    item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1 || item.hod_approve === null || item.incharge_approve === null)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )
            const msApprPending = apprvdData?.filter(
                item =>
                    item.ms_approve_req === 1 &&
                    item.ms_approve === null &&
                    item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    item.dms_approve === 1 &&
                    (item.incharge_approve === 1 || item.hod_approve === 1 || item.hod_approve === null || item.incharge_approve === null)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )
            const moPending = apprvdData?.filter(
                item =>
                    item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1 || item.ms_approve === 1 || item.dms_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )

            const moApprPending = apprvdData?.filter(
                item =>
                    item.manag_operation_approv === null &&
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    item.ms_approve === 1 &&
                    (item.incharge_approve === 1 || item.hod_approve === 1 || item.ms_approve === 1 || item.dms_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )


            const smoPending = apprvdData?.filter(
                item =>
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    (item.incharge_approve === 1 || item.hod_approve === 1 || item.ms_approve === 1 || item.dms_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )
            const smoapprPending = apprvdData?.filter(
                item =>
                    item.senior_manage_approv === null &&
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    item.manag_operation_approv === 1 &&
                    (item.incharge_approve === 1 || item.hod_approve === 1 || item.ms_approve === 1 || item.dms_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )


            const gmPending = apprvdData?.filter(
                item =>
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&

                    (item.incharge_approve === 1 || item.hod_approve === 1 || item.ms_approve === 1 || item.dms_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )
            const gmapprPending = apprvdData?.filter(
                item =>
                    item.gm_approve === null &&
                    item.md_approve === null &&
                    item.ed_approve === null &&
                    item.manag_operation_approv === 1 &&
                    (item.incharge_approve === 1 || item.hod_approve === 1 || item.ms_approve === 1 || item.dms_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )


            const mdPending = apprvdData?.filter(
                item => item.md_approve === null && (item.incharge_approve === 1 || item.hod_approve === 1 || item.ms_approve === 1 || item.dms_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )

            const mdapprPending = apprvdData?.filter(
                item => item.md_approve === null && (item.incharge_approve === 1 || item.hod_approve === 1 || item.ms_approve === 1 || item.dms_approve === 1) &&
                    item.gm_approve === 1
                // item.req_status !== 'P' && item.req_status !== 'R'
            )


            const edPending = apprvdData?.filter(
                item => item.ed_approve === null && (item.incharge_approve === 1 || item.hod_approve === 1 || item.ms_approve === 1 || item.dms_approve === 1)
                // item.req_status !== 'P' && item.req_status !== 'R'
            )
            const edapprPending = apprvdData?.filter(
                item => item.ed_approve === null && (item.incharge_approve === 1 || item.hod_approve === 1 || item.ms_approve === 1 || item.dms_approve === 1) && item.md_approve === 1
                // item.req_status !== 'P' && item.req_status !== 'R'
            )


            setCrfApprv({
                hod: {
                    pending: hodPending?.length,
                    title: 'HOD',
                    imageView: hodimg,
                    imName: 'hod',
                    id: 11,
                    pendingmain: hodPending?.length
                },
                dms: {
                    pending: dmsPending?.length,
                    title: 'DMS',
                    imageView: dmsimg,
                    imName: 'dms',
                    id: 1,
                    pendingmain: dmsApprPending?.length

                },
                ms: {
                    pending: msPending?.length,
                    title: 'MS',
                    imageView: msimg,
                    imName: 'ms',
                    id: 9,
                    pendingmain: msApprPending?.length

                },
                mo: {
                    pending: moPending?.length,
                    title: 'MO',
                    imageView: moimg,
                    imName: 'mo',
                    id: 10,
                    pendingmain: moApprPending?.length

                },
                smo: {
                    pending: smoPending?.length,
                    title: 'SMO',
                    imageView: smoimg,
                    imName: 'smo',
                    id: 18,
                    pendingmain: smoapprPending?.length

                },
                gm: {
                    pending: gmPending?.length,
                    title: 'GMO',
                    imageView: gmimg,
                    imName: 'gm',
                    id: 19,
                    pendingmain: gmapprPending?.length

                },
                md: {
                    pending: mdPending?.length,
                    title: 'MD',
                    imageView: mdimg,
                    imName: 'md',
                    id: 20,
                    pendingmain: mdapprPending?.length

                },
                ed: {
                    pending: edPending?.length,
                    title: 'ED',
                    imageView: edimg,
                    imName: 'ed',
                    id: 21,
                    pendingmain: edapprPending?.length

                }
            })
        } else {
            setCrfApprv({
                hod: {
                    pending: 0,
                    title: 'HOD',
                    imageView: hodimg,
                    imName: 'hod',
                    id: 1
                },
                dms: {
                    pending: 0,
                    title: 'DMS',
                    imageView: dmsimg,
                    imName: 'dms',
                    id: 2
                },
                ms: {
                    pending: 0,
                    title: 'MS',
                    imageView: msimg,
                    imName: 'ms',
                    id: 3
                },
                mo: {
                    pending: 0,
                    title: 'MO',
                    imageView: moimg,
                    imName: 'mo',
                    id: 4
                },
                smo: {
                    pending: 0,
                    title: 'SMO',
                    imageView: smoimg,
                    imName: 'smo',
                    id: 5
                },
                gm: {
                    pending: 0,
                    title: 'GM',
                    imageView: gmimg,
                    imName: 'gm',
                    id: 6
                },
                md: {
                    pending: 0,
                    title: 'MD',
                    imageView: mdimg,
                    imName: 'md',
                    id: 7
                },
                ed: {
                    pending: 0,
                    title: 'ED',
                    imageView: edimg,
                    imName: 'ed',
                    id: 8
                }
            })
        }
    }, [apprvdData])


    const getData = useCallback(async (value) => {
        setName(value?.title)
        const postdata = {
            level: value?.id
        }
        try {
            if (value?.id === 11) {
                const result = await axioslogin.get(`/CRFDashboard/getApprvPending/Dashboard/${value?.id}`)
                const { success, data } = result.data
                if (success === 1) {
                    setflag(1)
                    setTableData(data)
                } else {
                    setflag(0)
                    setTableData([])
                }
            } else {
                const result = await axioslogin.post('/newCRFRegister/getPendingList', postdata);
                const { success, data } = result.data;
                if (success === 1) {
                    setflag(1)
                    setTableData(data)
                } else {
                    setflag(0)
                    setTableData([])
                }
            }

        } catch (error) {
            warningNotify("something went wrong")
        }
    }, []);

    const getDatamain = useCallback(async (value) => {
        setName(value?.title)
        const postdata = {
            level: value?.id
        }
        try {
            if (value?.id === 11) {
                const result = await axioslogin.get(`/CRFDashboard/getApprvPending/Dashboard/${value?.id}`)
                const { success, data } = result.data
                if (success === 1) {
                    setflag(1)
                    setTableData(data)
                } else {

                }
            } else {
                const result = await axioslogin.post('/newCRFRegister/getPendingListmain', postdata);
                const { success, data } = result.data;
                if (success === 1) {
                    setflag(1)
                    setTableData(data)
                } else {
                    setflag(0)
                    setTableData([])
                }
            }

        } catch (error) {
            warningNotify("something went wrong")

        }
    }, []);
    const apiRef = useRef()
    const exportState = useSelector(state => {
        return state.changeStateAggrid.aggridstate
    })

    if (exportState > 0 && TableData.length > 0) {
        apiRef.current.api.exportDataAsCsv()
    }
    const rowHeight = 25
    const headerHeight = 30
    const defaultColDef = {
        sortable: true,
        filter: 'agTextColumnFilter'
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
            '"Segoe UI Symbol"'
        ].join(',')
    }
    const onGridReady = params => {
        params.columnApi.autoSizeAllColumns()
    }

    const [columnDefForTable] = useState([
        { headerName: 'Req Slno', field: 'req_slno', autoHeight: true, wrapText: true, minWidth: 20 },
        { headerName: 'Req Date', field: 'req_date', autoHeight: true, wrapText: true, minWidth: 30 },
        {
            headerName: 'Department',
            field: 'dept_name',
            autoHeight: true,
            wrapText: true,
            minWidth: 90,
            filter: 'true'
        },
        {
            headerName: 'Department Section',
            field: 'req_deptsec',
            autoHeight: true,
            wrapText: true,
            minWidth: 90,
            filter: 'true'
        },
        {
            headerName: 'Actual Requirement',
            field: 'actual_requirement',
            autoHeight: true,
            wrapText: true,
            minWidth: 150
        },
        { headerName: 'Needed', field: 'needed', autoHeight: true, wrapText: true, minWidth: 150 },
        {
            headerName: 'Category',
            field: 'category',
            autoHeight: true,
            wrapText: true,
            minWidth: 120,
            filter: 'true'
        },

        {
            headerName: 'Expected Date',
            field: 'expected_date',
            autoHeight: true,
            wrapText: true,
            minWidth: 90
        },
        {
            headerName: 'Create User',
            field: 'create_user',
            autoHeight: true,
            wrapText: true,
            minWidth: 90
        },


    ])
    const onExportClick = () => {
        if (TableData.length === 0) {
            warningNotify('Please Click The Search Button')
            setexport(0)
        } else {
            setexport(1)
        }
    }
    useEffect(() => {
        if (exports === 1) {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 1 })
            setexport(0)
        } else {
            dispatch({ type: ActionTyps.FETCH_CHANGE_STATE, aggridstate: 0 })
        }
    }, [exports, setexport, dispatch])
    return (
        <Fragment>
            {
                flag === 1 ? <Box
                    className="ag-theme-material ListItemScrol"
                    sx={{
                        height: window.innerHeight - 200,
                        flexWrap: 'wrap',
                        bgcolor: 'white',
                        width: '100%',
                        '&::-webkit-scrollbar': { height: 10 },
                        mt: 2
                    }}
                >

                    <Box sx={{ border: '1px solid #B4F5F0' }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ fontWeight: 750, flex: 1, pl: 1, pt: 0.5, color: '#385E72' }}>Crf Approval Pending {Name}</Box>
                            <Box sx={{ display: 'flex' }}>
                                {flag === 1 ? (
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <CustomeToolTip title="Download" placement="bottom">
                                            <Box>
                                                <CusIconButton variant="outlined" size="sm" color="success"
                                                    onClick={onExportClick}
                                                >
                                                    <DownloadIcon />
                                                </CusIconButton>
                                            </Box>
                                        </CustomeToolTip>
                                    </Box>
                                ) : null}
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, }}>
                                    <CusIconButton variant="outlined" size="sm" color="success" >
                                        <CustomCloseIconCmp handleChange={backToSettingmain} />
                                    </CusIconButton>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
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
                    :

                    <Box sx={{ height: window.innerHeight - 80, flexWrap: 'wrap', bgcolor: 'white', width: '100%' }}>
                        <Box sx={{ border: '1px solid #B4F5F0' }}>
                            <Box sx={{ display: 'flex' }}>
                                <Box sx={{ fontWeight: 550, flex: 1, pl: 1, pt: 0.5, color: '#385E72' }}>Crf Approval Pending</Box>
                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', flex: 1, fontSize: 20, m: 0.5 }}>
                                    <CssVarsProvider>
                                        <CustomCloseIconCmp handleChange={backToSetting} />
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Box>
                        <Paper variant="plain" sx={{ bgcolor: 'white', flexWrap: 'wrap', px: 1 }}>
                            <Grid container spacing={0.5} sx={{ flexGrow: 1, p: 0.5 }}>
                                {Object.entries(crfApprv)?.map(([key, value]) => (
                                    <Grid xs={12} sm={12} md={6} lg={4} xl={3} sx={{ width: '100%' }} key={key} >
                                        <Paper
                                            variant="outlined"
                                            square
                                            sx={{
                                                bgcolor: 'white',
                                                height: 180,
                                                border: '1px solid #bbdefb',
                                                borderRadius: 5
                                            }}
                                        >
                                            <Box sx={{ marginBottom: 1, display: 'flex', height: 'calc(100% - 40px)' }}>
                                                <Box
                                                    sx={{
                                                        flex: 0.5,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        pl: 1,
                                                        py: 1
                                                    }}
                                                >
                                                    <ImageViewComp src={value?.imageView} alt={value?.imName} style={{ width: 110, height: 90 }} />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', pr: 2, py: 2 }}>
                                                        <Typography sx={{ fontSize: 20, fontWeight: 650, color: '#003371' }}>{value?.title}</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: "space-evenly" }}>
                                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                                                            <Tooltip
                                                                title={`${value?.title} Pending Count`}
                                                                placement="bottom"
                                                                sx={{
                                                                    fontSize: 14,
                                                                    color: 'white',
                                                                    bgcolor: '#60A3D9',
                                                                    fontWeight: 650
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        borderTopLeftRadius: 15,
                                                                        borderBottomLeftRadius: 15,
                                                                        fontSize: 40,
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        width: 100,
                                                                        fontWeight: 650,
                                                                        color: '#3f51b5',
                                                                        bgcolor: '#e3f2fd',
                                                                        '&:hover': {
                                                                            bgcolor: '#e3f2fd',
                                                                            color: '#3f51b5'
                                                                        }
                                                                    }}
                                                                    onClick={() => getDatamain(value)}
                                                                >
                                                                    {value?.pendingmain}

                                                                </Box>
                                                            </Tooltip>
                                                        </Box>

                                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 0.5 }}>
                                                            <Tooltip
                                                                title="Total Pending Count"
                                                                placement="bottom"
                                                                sx={{
                                                                    fontSize: 14,
                                                                    color: 'white',
                                                                    bgcolor: '#60A3D9',
                                                                    fontWeight: 650
                                                                }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        cursor: 'pointer',
                                                                        borderTopLeftRadius: 15,
                                                                        borderBottomLeftRadius: 15,
                                                                        fontSize: 40,
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        width: 100,
                                                                        fontWeight: 650,
                                                                        color: 'var(--royal-purple-400)',
                                                                        bgcolor: '#e3f2fd',
                                                                        '&:hover': {
                                                                            bgcolor: '#e3f2fd',
                                                                            color: '#3f51b5'
                                                                        }
                                                                    }}
                                                                    onClick={() => getData(value)}                                                    >
                                                                    {value?.pending}
                                                                </Box>
                                                            </Tooltip>
                                                        </Box>
                                                    </Box>



                                                </Box>
                                            </Box>
                                            {/* <Divider sx={{ backgroundColor: 'rgba(0,51,122,0.6)', mx: 1 }} /> */}

                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Box>
            }
            {/* <CustomBackDrop open={open} text="Please Wait" /> */}

        </Fragment>
    )
}

export default CrfAppovalPending