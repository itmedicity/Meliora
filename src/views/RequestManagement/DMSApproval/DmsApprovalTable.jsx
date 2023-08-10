import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { IconButton } from '@mui/material';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import PublishedWithChangesOutlinedIcon from '@mui/icons-material/PublishedWithChangesOutlined';
import { getReqApprovDMS } from 'src/redux/actions/DMSApproval.action'
import ForwardToInboxTwoToneIcon from '@mui/icons-material/ForwardToInboxTwoTone';
import DMSDataCollectModel from './DMSDataCollectModel'
import DMSApprovalModel from './DMSApprovalModel'
import { Fragment } from 'react'



const DmsApprovalTable = () => {

    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();
    const [count, setCount] = useState(0)

    const [model, setmodel] = useState(0)
    const [open, setOpen] = useState(false);
    const [datas, setdatas] = useState([])

    const [dmsOpen, setDmsopen] = useState(false);
    const [dmsModel, setDmsModel] = useState(0)

    useEffect(() => {
        dispatch(getReqApprovDMS())

    }, [dispatch, count])

    const tabledata = useSelector((state) => {
        return state.setReqApprovDMS.ReqApprovDMSList
    })


    //column title setting
    const [column] = useState([

        {
            headerName: 'Action', minWidth: 150, cellRenderer: params => <Fragment>
                <IconButton onClick={() => MessageSend(params)}
                    sx={{ color: editicon, paddingY: 0.5 }} >
                    <CustomeToolTip title="Forward To Data Collection">
                        < ForwardToInboxTwoToneIcon />
                    </CustomeToolTip>
                </IconButton>
                <IconButton onClick={() => DMSApproval(params)}
                    sx={{ color: editicon, paddingY: 0.5 }} >
                    <CustomeToolTip title="Approval">
                        <PublishedWithChangesOutlinedIcon />
                    </CustomeToolTip>
                </IconButton>
            </Fragment>
        },
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 300, filter: "true" },
        { headerName: "Emergency", field: "Emergency", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
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


    //Data set for edit
    const DMSApproval = useCallback((params) => {
        const data = params.api.getSelectedRows()
        setDmsopen(true)
        setdatas(data);
        setDmsModel(1)
    }, [])

    const MessageSend = useCallback((params) => {

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
            title="DMS Approval"
            close={backtoSetting}
        >

            {model === 1 ?
                <DMSDataCollectModel

                    open={open}
                    setOpen={setOpen}
                    datas={datas}
                    count={count}
                    setCount={setCount}
                /> : null}
            {dmsModel === 1 ?
                <DMSApprovalModel

                    open={dmsOpen}
                    setOpen={setDmsopen}
                    datas={datas}
                    count={count}
                    setCount={setCount}
                /> : null}

            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={tabledata}
                />


            </Box>

        </CardCloseOnly>
    )
}

export default memo(DmsApprovalTable)