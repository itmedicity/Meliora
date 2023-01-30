import React, { useEffect, useState, memo, Fragment } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { getReqRegistListByDept } from 'src/redux/actions/ReqRegisterListByDept.action'
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';

const ReqRegisterTable = ({ count, rowSelect }) => {
    const dispatch = useDispatch();
    //redux for geting login emp secid
    const empsecid = useSelector((state) => {
        return state.LoginUserData.empsecid
    })

    useEffect(() => {
        dispatch(getReqRegistListByDept(empsecid))

    }, [dispatch, empsecid, count])
    /**reducer function for total Request */
    const total = useSelector((state) => {
        return state.setRequestListByDeptSec.RequestListall
    })

    //column title setting
    const [column] = useState([
        {
            headerName: 'Edit', minWidth: 80,
            cellRenderer: params => {
                if (params.data.manag_operation_approv !== null) {
                    return <IconButton disabled
                        sx={{ color: editicon, paddingY: 0.5 }}>
                        <EditOutlinedIcon />
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }}
                        onClick={() => rowSelect(params)}>
                        <CustomeToolTip title="Edit">
                            <EditOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                }
            }
        },
        { headerName: "Req.Slno", field: "req_slno", minWidth: 120 },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, minWidth: 250, filter: "true" },
        { headerName: "Req. Date", field: "req_date", minWidth: 200 },
        { headerName: "Inch.Status", field: "approve_incharge", autoHeight: true, wrapText: true, minWidth: 150, filter: "true" },
        { headerName: "Hod.Status", field: "approve_hod", minWidth: 150, wrapText: true, },
        { headerName: "OM Status", field: "manag_operation_approvs", minWidth: 150, wrapText: true, },
        { headerName: "SMO Status", field: "senior_manage_approvs", minWidth: 150, wrapText: true, },
        { headerName: "CAO/COO/MD Status", field: "cao_approves", minWidth: 180, wrapText: true, },
        { headerName: "ED/MD  Status", field: "ed_approves", minWidth: 150, wrapText: true, },
    ])

    return (
        <Fragment>
            <Box sx={{ pt: 1 }}>
                <CusAgGridMast
                    columnDefs={column}
                    tableData={total}
                />
            </Box>
        </Fragment>
    )
}

export default memo(ReqRegisterTable)