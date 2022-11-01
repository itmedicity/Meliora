import React, { Fragment, useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import EditButton from 'src/views/Components/EditButton'
const DirectComplaintTable = ({ count, rowSelect }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        { headerName: "No", field: "complaint_slno", autoHeight: true, wrapText: true, width: 330 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, width: 300 },
        { headerName: "Request Type", field: "req_type_name", width: 250 },
        { headerName: "Complaint Type", field: "complaint_type_name", width: 280, autoHeight: true, wrapText: true },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Priority", field: "priority" },
        { headerName: "Hic Policy", field: "hic_policy_name", width: 250 },
        { headerName: 'Action', cellRenderer: params => <EditButton onClick={() => rowSelect(params)} /> }
    ])
    //for getting login user id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    //dispaly data in table against the login user
    useEffect(() => {
        const getDirectcomplaint = async () => {
            const result = await axioslogin.get(`/directcmreg/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("Error occured contact EDP")
            }
        }
        getDirectcomplaint();
    }, [id, count])
    return (
        <Fragment>
            <CusAgGridMast
                columnDefs={column}
                tableData={tabledata}
            />
        </Fragment>
    )
}
export default memo(DirectComplaintTable);