import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getInchargeHodData } from 'src/redux/actions/InchargeHodChecks.action'
import { getReqApprovDept } from 'src/redux/actions/ReqAppovDept.action'
import EditButton from 'src/views/Components/EditButton';
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import DeptApprovModel from './DeptApprovModel'
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';

const ReqDeptApproval = () => {
    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)
    //redux for geting login id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })

    //redux for geting login section id
    const secid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })
    useEffect(() => {
        dispatch(getInchargeHodData(id))
        dispatch(getReqApprovDept(secid))
    }, [dispatch, id, secid, count])

    const HodIncharge = useSelector((state) => {
        return state.setInchargeHodData.InchargeHoddata
    })

    const [isIncharge, setincharge] = useState(0)
    const [ishod, setHod] = useState(0)

    const tabledata = useSelector((state) => {
        return state.setReqApprvDept.ReqApprvDeptdata
    })

    useEffect(() => {
        if (HodIncharge.length !== 0) {
            const { hod, incharge } = HodIncharge[0]
            setincharge(incharge)
            setHod(hod)
        }
    }, [HodIncharge])

    const icharge = tabledata.filter((val) => {
        return val.incharge_req === 1
    })

    const hod = tabledata.filter((val) => {
        return val.hod_req === 1
    })

    //column title setting
    const [column] = useState([
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
        { headerName: "Req.Slno", field: "req_slno", width: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, width: 350, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Req. Date", field: "req_date", width: 250 },
        { headerName: "Inch.Appr.Status", field: "approve_incharge", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Incharge Remarks", field: "incharge_remarks", autoHeight: true, wrapText: true, width: 350, filter: "true" },
        { headerName: "Hod.Approve Status", field: "approve_hod", width: 250 },
        { headerName: "Hod Remarks", field: "hod_remarks", width: 350 },
        { headerName: "OM Approve Status", field: "manag_operation_approvs", width: 250 },
        { headerName: "OM Remarks", field: "manag_operation_remarks", width: 350 },
        { headerName: "SMO Approve Status", field: "senior_manage_approvs", width: 250 },
        { headerName: "SMO Remarks", field: "senior_manage_remarks", width: 350 },
        { headerName: "CAO/COO/MD Approve Status", field: "cao_approves", width: 250 },
        { headerName: "CAO/COO/MD Remarks", field: "cao_approve_remarks", width: 350 },
        { headerName: "ED/MD Approve Status", field: "ed_approves", width: 250 },
        { headerName: "ED/MD Remarks", field: "ed_approve_remarks", width: 350 },
    ])
    //column title setting
    const [columnInch] = useState([
        {
            headerName: 'Action', minWidth: 100, cellRenderer: params => {
                if (params.data.hod_approve !== null) {
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
        { headerName: "Req.Slno", field: "req_slno", minWidth: 150 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 350, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Req. Date", field: "req_date", minWidth: 250 },
        { headerName: "Inch.Appr.Status", field: "approve_incharge", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Incharge Remarks", field: "incharge_remarks", autoHeight: true, wrapText: true, minWidth: 350, filter: "true" },
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
    const [columnHod] = useState([
        {
            headerName: 'Action', minWidth: 80, cellRenderer: params => {
                if (params.data.manag_operation_approv !== null) {
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
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Req. Date", field: "req_date", minWidth: 250 },
        { headerName: "OM Approve Status", field: "manag_operation_approvs", minWidth: 150, wrapText: true, },
        { headerName: "OM Remarks", field: "manag_operation_remarks", minWidth: 300, wrapText: true, },
        { headerName: "SMO Approve Status", field: "senior_manage_approvs", minWidth: 150, wrapText: true, },
        { headerName: "SMO Remarks", field: "senior_manage_remarks", minWidth: 300, wrapText: true, },
        { headerName: "CAO/COO/MD Approve Status", field: "cao_approves", minWidth: 150, wrapText: true, },
        { headerName: "CAO/COO/MD Remarks", field: "cao_approve_remarks", minWidth: 300, wrapText: true, },
        { headerName: "ED/MD Approve Status", field: "ed_approves", minWidth: 150, wrapText: true, },
        { headerName: "ED/MD Remarks", field: "ed_approve_remarks", minWidth: 300, wrapText: true, },


    ])
    const [model, setmodel] = useState(0)
    const [open, setOpen] = useState(false);
    const [datas, setdatas] = useState([])


    //Data set for edit
    const rowSelect = useCallback((params) => {
        setOpen(true)
        const data = params.api.getSelectedRows()
        setdatas(data);
        setmodel(1)
    }, [])

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    return (
        <CardCloseOnly
            title="Incharge/Hod Approval"
            close={backtoSetting}
        >
            {model === 1 ?
                <DeptApprovModel open={open}
                    setOpen={setOpen}
                    isIncharge={isIncharge}
                    ishod={ishod}
                    datas={datas}
                    count={count}
                    setCount={setCount}
                    id={id} /> : null}


            {
                (isIncharge === 1) && (ishod === 1) ? <Box sx={{ p: 1 }}>
                    <CusAgGridForMain
                        columnDefs={column}
                        tableData={tabledata}

                    />
                </Box> : isIncharge === 1 ? <Box sx={{ p: 1 }}>
                    <CusAgGridForMain
                        columnDefs={columnInch}
                        tableData={icharge}

                    />
                </Box> : ishod === 1 ? <Box sx={{ p: 1 }}>
                    <CusAgGridForMain
                        columnDefs={columnHod}
                        tableData={hod}

                    />
                </Box> : null

            }

        </CardCloseOnly>
    )
}

export default memo(ReqDeptApproval)