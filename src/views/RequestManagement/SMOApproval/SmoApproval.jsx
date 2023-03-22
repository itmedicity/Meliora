import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { getReqApprovOthers } from 'src/redux/actions/ReqApprovOtherDept.action'
import SMOApprovalModel from './SMOApprovalModel';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NdrfModel from '../NdrfFrorm/NdrfModel'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { getNdrfList } from 'src/redux/actions/NdrfList.action'
import NdrfModelsmo from './NdrfModelsmo'
import { warningNotify } from 'src/views/Common/CommonCode'

const SmoApproval = () => {

    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)
    const [ndrf, setNdrf] = useState(true)
    const [request, setRequest] = useState(false)
    const [reqNdrf, setReqNdrf] = useState(0)
    useEffect(() => {
        dispatch(getReqApprovOthers())
        dispatch(getNdrfList())
    }, [dispatch, count, reqNdrf])

    const tabledata = useSelector((state) => {
        return state.setReqApprovOthers.ReqApprovOthersList
    })

    const ndrftable = useSelector((state) => {
        return state.setNdrfList.NdrfListdata
    })

    useEffect(() => {
        if (ndrftable.length === 0) {
            warningNotify("No NDRF pending for aprroval")
        }
        else { return 0 }

    }, [ndrftable])

    const updateNdrf = useCallback((e) => {
        if (e.target.checked === true) {
            setNdrf(true)
            setRequest(false)
            setReqNdrf(1)
        }
        else {
            setNdrf(false)
            setRequest(false)
            setReqNdrf(0)
        }
    }, [])
    const updateRequest = useCallback((e) => {
        if (e.target.checked === true) {
            setRequest(true)
            setNdrf(false)
            setReqNdrf(2)
        }
        else {
            setNdrf(false)
            setRequest(false)
            setReqNdrf(0)
        }
    }, [])

    //column title setting
    const [column] = useState([
        {
            headerName: 'Action', minWidth: 120, cellRenderer: params => {
                if (params.data.cao_approve !== null) {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <PublishedWithChangesOutlinedIcon />
                    </IconButton>
                } else {
                    return <IconButton onClick={() => rowSelect(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Approval">
                            <PublishedWithChangesOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },
        {
            headerName: 'NDRF', minWidth: 80,
            cellRenderer: params => {
                if ((params.data.cao_approve === 1) && (params.data.ed_approve_req === 0)) {
                    return <IconButton onClick={() => ndrfconvert(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="NDRF">
                            <SummarizeIcon />
                        </CustomeToolTip>
                    </IconButton>
                } else if (params.data.ed_approve === 1) {
                    return <IconButton onClick={() => ndrfconvert(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="NDRF">
                            <SummarizeIcon />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <SummarizeIcon />
                    </IconButton>
                }
            }
        },

        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Req. Date", field: "req_date", minWidth: 180, autoHeight: true, wrapText: true, },
        { headerName: "Inch.Appr.Status", field: "approve_incharge", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Incharge Remarks", field: "incharge_remarks", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Hod.Approve Status", field: "approve_hod", minWidth: 150, wrapText: true, },
        { headerName: "Hod Remarks", field: "hod_remarks", minWidth: 300, wrapText: true, },
        { headerName: "OM Approve Status", field: "manag_operation_approvs", minWidth: 150, wrapText: true, },
        { headerName: "OM Remarks", field: "manag_operation_remarks", minWidth: 300, wrapText: true, },
        { headerName: "SMO Approve Status", field: "senior_manage_approvs", minWidth: 150, wrapText: true, },
        { headerName: "SMO Remarks", field: "senior_manage_remarks", minWidth: 300, wrapText: true, },
        { headerName: "CAO/COO/MD Approve Status", field: "cao_approves", minWidth: 150, wrapText: true, },
        { headerName: "CAO/COO/MD Remarks", field: "cao_approve_remarks", minWidth: 300, wrapText: true, },
        { headerName: "ED/MD Approve Status", field: "ed_approves", minWidth: 150, wrapText: true, },
        { headerName: "ED/MD Remarks", field: "ed_approve_remarks", minWidth: 300, wrapText: true, },

    ])

    //column title setting
    const [columnndrf] = useState([
        {
            headerName: 'Action', minWidth: 120, cellRenderer: params => {
                return <IconButton onClick={() => ndrfSelect(params)}
                    sx={{ color: editicon, paddingY: 0.5 }} >
                    <CustomeToolTip title="NDRF Approval">
                        <PublishedWithChangesOutlinedIcon />
                    </CustomeToolTip>
                </IconButton>
            }
        },
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Req.Department", field: "req_dept", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.DeptSec", field: "req_deptsec", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.Date", field: "reqdate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Exp.DeptSec", field: "expdate", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "NDRF Date", field: "ndrf_date", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "Remarks", field: "remarks", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
    ])

    const [model, setmodel] = useState(0)
    const [open, setOpen] = useState(false);
    const [openNdrf, setOpenNdrf] = useState(false);
    const [openNdrfApp, setOpenNdrfApp] = useState(false);
    const [datas, setdatas] = useState([])
    const [ndrfModel, setNdrfModel] = useState(0)
    const [ndrfAppModel, setNdrfAppModel] = useState()

    //Data set for edit
    const rowSelect = useCallback((params) => {
        setOpen(true)
        const data = params.api.getSelectedRows()
        setdatas(data);
        setmodel(1)
    }, [])

    //Data set for Ndrf
    const ndrfSelect = useCallback((params) => {
        setOpenNdrfApp(true)
        const data = params.api.getSelectedRows()
        setdatas(data);
        setNdrfAppModel(1)
    }, [])

    const ndrfconvert = useCallback((params) => {
        setOpenNdrf(true)
        const data = params.api.getSelectedRows()
        setdatas(data);
        setNdrfModel(1)
    }, [])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])


    return (
        <CardCloseOnly
            title="Senior Manager Operation Approval"
            close={backtoSetting}
        >
            {model === 1 ?
                <SMOApprovalModel
                    open={open}
                    setOpen={setOpen}
                    datas={datas}
                    count={count}
                    setCount={setCount}
                /> : null}

            {
                ndrfModel === 1 ? <NdrfModel
                    open={openNdrf}
                    setOpen={setOpenNdrf}
                    datas={datas}
                    count={count}
                    setCount={setCount}

                /> : null
            }
            {
                ndrfAppModel === 1 ?
                    <NdrfModelsmo
                        open={openNdrfApp}
                        setOpen={setOpenNdrfApp}
                        datas={datas}
                        count={count}
                        setCount={setCount}

                    /> : null
            }

            <Box sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: 'center',
            }}>
                <Box sx={{ width: "20%", mt: 1 }}>
                    <CusCheckBox
                        label="NDRF Approval"
                        color="primary"
                        size="md"
                        name="ndrf"
                        value={ndrf}
                        checked={ndrf}
                        onCheked={updateNdrf}
                    />
                </Box>
                <Box sx={{ width: "20%", pr: 1, mt: 1 }}>
                    <CusCheckBox
                        label="Request Approval"
                        color="primary"
                        size="md"
                        name="request"
                        value={request}
                        checked={request}
                        onCheked={updateRequest}
                    />
                </Box>

            </Box>

            {reqNdrf === 2 ? <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={tabledata}
                />
            </Box> : <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={columnndrf}
                    tableData={ndrftable}
                />
            </Box>}
        </CardCloseOnly>
    )
}

export default memo(SmoApproval)