import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { getReqApprovOthers } from 'src/redux/actions/ReqApprovOtherDept.action'
import CEOApprovalModel from './CAOApprovalModel';
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import NdrfModel from '../NdrfFrorm/NdrfModel'
const CEOApproval = () => {

    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)

    useEffect(() => {
        dispatch(getReqApprovOthers())
    }, [dispatch, count])

    const tabledata = useSelector((state) => {
        return state.setReqApprovOthers.ReqApprovOthersList
    })

    //column title setting
    const [column] = useState([
        {
            headerName: 'Action', minWidth: 100, cellRenderer: params => {
                if (params.data.ed_approve !== null) {
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
    const [model, setmodel] = useState(0)
    const [open, setOpen] = useState(false);
    const [openNdrf, setOpenNdrf] = useState(false);
    const [datas, setdatas] = useState([])
    const [ndrfModel, setNdrfModel] = useState(0)
    //Data set for edit
    const rowSelect = useCallback((params) => {
        setOpen(true)
        const data = params.api.getSelectedRows()
        setdatas(data);
        setmodel(1)
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
            title="CAO/COO/MS Approval"
            close={backtoSetting}
        >
            {model === 1 ?
                <CEOApprovalModel
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

            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={tabledata}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(CEOApproval)