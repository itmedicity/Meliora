import React, { useCallback, useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ComplistAgGridcmp from '../../Components/ComplistAgGridcmp';
import CardCloseOnly from '../../Components/CardCloseOnly';
import { getHiccomplaintsall } from 'src/redux/actions/HicComplaintList.action';
import { Box } from '@mui/material';

const HicComplaintList = () => {
    const history = useHistory()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getHiccomplaintsall())
    }, [dispatch])

    const compall = useSelector((state) => {
        return state.setHICComplaintLists.HiccomplaintsLists
    })

    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno", minWidth: 90 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 300 },
        { headerName: "Request Department", field: "sec_name", filter: "true", wrapText: true, autoHeight: true, minWidth: 200 },
        { headerName: "Location", field: "location", minWidth: 200, autoHeight: true, wrapText: true },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true", minWidth: 180 },
        { headerName: "Complaint Department", field: "complaint_dept_name", filter: "true", minWidth: 200 },
        { headerName: "Request Date", field: "compalint_date", minWidth: 180 },
    ])

    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])


    return (
        <CardCloseOnly
            title="HIC Complaint List"
            close={backtoSetting}>

            <Box sx={{ p: 1 }}>
                <ComplistAgGridcmp
                    columnDefs={column}
                    tableData={compall}
                    rowHeight={30}
                />
            </Box>
        </CardCloseOnly>
    )
}

export default memo(HicComplaintList)