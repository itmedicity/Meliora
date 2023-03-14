import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ComplistAgGridcmp from '../../Components/ComplistAgGridcmp';
import CardCloseOnly from '../../Components/CardCloseOnly';
import { getHiccomplaintsall } from 'src/redux/actions/HicComplaintList.action';

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
        // { headerName: "Assigned Employee", field: "em_name", filter: "true", minWidth: 180 },
        // { headerName: "Assign Date", field: "assigned_date", minWidth: 180 },
        // { headerName: "Rectify Date", field: "cm_rectify_time", minWidth: 180 },
        // { headerName: "Verify Date", field: "cm_verfy_time", minWidth: 180 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 180 }
    ])

    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])



    return (
        <CardCloseOnly
            title="Complaint List"
            close={backtoSetting}>

            <ComplistAgGridcmp
                // columnDefs={ }

                columnDefs={column}
                tableData={compall}
                rowHeight={30}
            />

        </CardCloseOnly>

    )
}

export default HicComplaintList