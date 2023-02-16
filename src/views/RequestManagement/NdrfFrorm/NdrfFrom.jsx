import { Box } from '@mui/material'
import React, { useCallback, memo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import CusAgGridForMain from 'src/views/Components/CusAgGridForMain'
import CardCloseOnly from 'src/views/Components/CardCloseOnly'
import { getNdrfList } from 'src/redux/actions/NdrfList.action'

const NdrfFrom = () => {
    /*** Initializing */
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getNdrfList())
    }, [dispatch])

    const tabledata = useSelector((state) => {
        return state.setNdrfList.NdrfListdata
    })


    //column title setting
    const [column] = useState([
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

    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])

    return (
        <CardCloseOnly
            title="NDRF Form"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <CusAgGridForMain
                    columnDefs={column}
                    tableData={tabledata}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(NdrfFrom)