import React, { useEffect, useState, memo, Fragment } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import { getReqRegistListByDept } from 'src/redux/actions/ReqRegisterListByDept.action'
import EditButton from 'src/views/Components/EditButton';

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
        { headerName: "Req.Slno", field: "req_slno" },
        { headerName: "Actual Requirement", field: "actual_requirement", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Location", field: "location", autoHeight: true, wrapText: true, width: 250, filter: "true" },
        { headerName: "Req. Date", field: "req_date" },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> },
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