import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { getReqApprovOthers } from 'src/redux/actions/ReqApprovOtherDept.action'
import EDApprovalModel from './EDApprovalModel';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { getNdrfList } from 'src/redux/actions/NdrfList.action'
import EDNdrfAppModel from './EDNdrfAppModel'


const EDApproval = () => {

    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)

    useEffect(() => {
        dispatch(getReqApprovOthers())
        dispatch(getNdrfList())
    }, [dispatch, count])

    const tabledata = useSelector((state) => {
        return state.setReqApprovOthers.ReqApprovOthersList
    })

    const ndrf = useSelector((state) => {
        return state.setNdrfList.NdrfListdata
    })

    const ed = tabledata.filter((val) => {
        return val.ed_approve_req === 1
    })

    const [approve, setApprove] = useState(false)
    const [reject, setReject] = useState(true)
    const [reqNdrf, setReqNdrf] = useState(0)
    const updateApprove = useCallback((e) => {
        if (e.target.checked === true) {
            setApprove(true)
            setReject(false)
            setReqNdrf(1)
        }
        else {
            setApprove(false)
            setReject(false)
            setReqNdrf(0)
        }
    }, [])
    const updateReject = useCallback((e) => {
        if (e.target.checked === true) {
            setReject(true)
            setApprove(false)
            setReqNdrf(2)
        }
        else {
            setApprove(false)
            setReject(false)
            setReqNdrf(0)
        }
    }, [])


    //column title setting
    const [column] = useState([
        {
            headerName: 'Action', minWidth: 120, cellRenderer: params => {
                return <IconButton onClick={() => rowSelect(params)}
                    sx={{ color: editicon, paddingY: 0.5 }} >
                    <CustomeToolTip title="Approval">
                        <PublishedWithChangesOutlinedIcon />
                    </CustomeToolTip>
                </IconButton>
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
                    <CustomeToolTip title="Approval">
                        <PublishedWithChangesOutlinedIcon />
                    </CustomeToolTip>
                </IconButton>
            }
        },

        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 200, filter: "true" },
        { headerName: "Req.Department", field: "req_dept", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Req.DeptSec", field: "req_deptsec", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Approx. Cost", field: "total_approx_cost", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Req.Date", field: "req_date", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Exp.DeptSec", field: "expected_date", autoHeight: true, wrapText: true, minWidth: 180, filter: "true" },
        { headerName: "NDRF Date", field: "ndrf_date", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Remarks", field: "remarks", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
    ])


    const [model, setmodel] = useState(0)
    const [open, setOpen] = useState(false);
    const [datas, setdatas] = useState([])


    //Data set for Request Approval
    const rowSelect = useCallback((params) => {
        setOpen(true)
        const data = params.api.getSelectedRows()
        setdatas(data);
        setmodel(1)
    }, [])

    //Data set for Ndrf
    const ndrfSelect = useCallback((params) => {
        setOpen(true)
        const data = params.api.getSelectedRows()
        setdatas(data);
        setmodel(2)
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])


    return (
        <CardCloseOnly
            title="Executive/Managing Director Approval"
            close={backtoSetting}
        >
            {model === 1 ?
                <EDApprovalModel
                    open={open}
                    setOpen={setOpen}
                    datas={datas}
                    count={count}
                    setCount={setCount}
                /> : model === 2 ?
                    <EDNdrfAppModel
                        open={open}
                        setOpen={setOpen}
                        datas={datas}
                        count={count}
                        setCount={setCount}
                    /> : null}

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
                        name="reject"
                        value={reject}
                        checked={reject}
                        onCheked={updateReject}
                    />
                </Box>
                <Box sx={{ width: "20%", pr: 1, mt: 1 }}>
                    <CusCheckBox
                        label="Request Approval"
                        color="primary"
                        size="md"
                        name="approve"
                        value={approve}
                        checked={approve}
                        onCheked={updateApprove}
                    />
                </Box>

            </Box>

            {reqNdrf === 1 ? <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={ed}
                />
            </Box> : <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={columnndrf}
                    tableData={ndrf}
                />
            </Box>}
        </CardCloseOnly>
    )
}

export default memo(EDApproval)