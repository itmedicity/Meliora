import React, { Fragment, useEffect, useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNotify } from 'src/views/Common/CommonCode'
import CusAgGridMast from 'src/views/Components/CusAgGridMast'
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { editicon } from 'src/color/Color';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
const DirectComplaintTable = ({ count, rowSelect }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //column title setting
    const [column] = useState([
        {
            headerName: 'Edit', minWidth: 80,
            cellRenderer: params => {
                if (params.data.compalint_status === 1 || params.data.compalint_status === 2 || params.data.compalint_status === 3
                    || params.data.cm_rectify_status === "Z"
                ) {
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
        { headerName: "No", field: "complaint_slno", autoHeight: true, wrapText: true, width: 80 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, width: 200 },
        { headerName: "Request Type", field: "req_type_name", width: 250 },
        { headerName: "Complaint Type", field: "complaint_type_name", width: 280, autoHeight: true, wrapText: true },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Priority", field: "priority" },
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
                warningNotify("No Complaint")
            }
        }
        getDirectcomplaint();
    }, [id, count])

    const getRowStyle = params => {
        if (params.data.compalint_priority === 1) {
            return { background: '#ff7043' };
        }
    };

    return (
        <Fragment>
            <CusAgGridMast
                columnDefs={column}
                tableData={tabledata}
                getRowStyle={getRowStyle}
            />
        </Fragment>
    )
}
export default memo(DirectComplaintTable);