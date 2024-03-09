import React, { useEffect, useState, memo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import { IconButton } from '@mui/material'
import { editicon } from 'src/color/Color'

const AuthorizationMastTable = ({ count, rowSelect }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([]);
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "authorization_slno" },
        { headerName: "Department Section", field: "auth_deptsec", filter: "true" },
        { headerName: "Authorization Post", field: "postauth", filter: "true" },
        { headerName: "Authorization Emp Deptsec", field: "emp_deptsec", filter: "true" },
        { headerName: "Incharge/HOD Name", field: "employee", filter: "true" },

        {
            headerName: 'Delete', width: 100, cellRenderer: params =>
                <IconButton onClick={() => rowSelect(params)}
                    sx={{ color: editicon, pt: 0 }} >
                    <CustomeToolTip title="Delete">
                        <DeleteIcon size={15} />
                    </CustomeToolTip>
                </IconButton>
        },

    ])
    //for table data
    useEffect(() => {
        const getComplaintType = async () => {
            const result = await axioslogin.get('/InchHODAuthorization')
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            } else {
                warningNotify("Error occured contact EDP")
            }
        }
        getComplaintType();
    }, [count])
    return (
        <CusAgGridMast
            columnDefs={column}
            tableData={tabledata}
            onClick={rowSelect}

        />
    )
}

export default memo(AuthorizationMastTable)