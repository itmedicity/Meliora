import React, { useEffect, useState, memo, useCallback, Fragment } from 'react'
import CusAgGridMast from 'src/views/Components/CusAgGridMast';
import { warningNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { editicon } from 'src/color/Color';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import VerifyModal from './VerifyModal';
import { Box } from '@mui/system'
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import CusCheckBox from 'src/views/Components/CusCheckBox'

const ComplaintRegTable = ({ rowSelect, sec, setCount, count }) => {
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    //state for modal open
    const [open, setOpen] = useState(false);
    //state for modal render
    const [mdopen, setMdopen] = useState(0);
    //state for passing data to modal
    const [mddata, setMddata] = useState({})
    //checkboxes for table data selection
    const [pending, setPending] = useState(false)
    const [onhold, setOnhold] = useState(false)
    const [verify, setVerify] = useState(false)
    const [selectbase, setSelect] = useState(0);

    const updatePending = useCallback((e) => {
        if (e.target.checked === true) {
            setSelect(1)
            setPending(true)
            setVerify(false)
            setOnhold(false)
        }
        else {
            setSelect(0)
            setPending(false)
            setVerify(false)
            setOnhold(false)
        }
    }, [])

    const updateOnhold = useCallback((e) => {
        if (e.target.checked === true) {
            setSelect(2)
            setOnhold(true)
            setPending(false)
            setVerify(false)
        }
        else {
            setSelect(0)
            setPending(false)
            setVerify(false)
            setOnhold(false)
        }
    }, [])

    const updateVerify = useCallback((e) => {
        if (e.target.checked === true) {
            setSelect(3)
            setVerify(true)
            setPending(false)
            setOnhold(false)
        }
        else {
            setSelect(0)
            setPending(false)
            setVerify(false)
            setOnhold(false)
        }
    }, [])




    //column title setting for pending
    const [columnpending] = useState([
        { headerName: "Slno", field: "complaint_slno", autoHeight: true, wrapText: true, minWidth: 80 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Request Type", field: "req_type_name", width: 250, autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Complaint Type", field: "complaint_type_name", width: 280, autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 100 },
        { headerName: "Rectifystatus", field: "cm_rectify_status1", filter: "true", minWidth: 100 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", minWidth: 180, autoHeight: true, wrapText: true },
    ])

    const [columnonhold] = useState([
        { headerName: "No", field: "complaint_slno", autoHeight: true, wrapText: true, minWidth: 80 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Request Type", field: "req_type_name", width: 250, autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Complaint Type", field: "complaint_type_name", width: 280, autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 100 },
        { headerName: "Rectifystatus", field: "cm_rectify_status1", filter: "true", minWidth: 100 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", minWidth: 180, autoHeight: true, wrapText: true },
    ])

    const [columnVerify] = useState([
        {
            headerName: 'Verify', minWidth: 80, cellRenderer: params => {
                if ((params.data.compalint_status === 2) && (params.data.cm_rectify_status === 'R')) {
                    return <IconButton onClick={() => Verify(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Verify">
                            <VerifiedUserOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <VerifiedUserOutlinedIcon />
                    </IconButton>
                }
            }
        },
        { headerName: "No", field: "complaint_slno", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 200 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 150 },
        { headerName: "Rectifystatus", field: "cm_rectify_status1", filter: "true", minWidth: 150 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", minWidth: 180, autoHeight: true, wrapText: true },

    ])

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
        {
            headerName: 'Verify', minWidth: 80, cellRenderer: params => {
                if ((params.data.compalint_status === 2) && (params.data.cm_rectify_status === 'R')) {
                    return <IconButton onClick={() => Verify(params)}
                        sx={{ color: editicon, paddingY: 0.5 }} >
                        <CustomeToolTip title="Verify">
                            <VerifiedUserOutlinedIcon />
                        </CustomeToolTip>
                    </IconButton>
                } else {
                    return <IconButton sx={{ color: editicon, paddingY: 0.5 }} disabled>
                        <VerifiedUserOutlinedIcon />
                    </IconButton>
                }
            }
        },
        { headerName: "Slno", field: "complaint_slno", autoHeight: true, wrapText: true, minWidth: 100 },
        { headerName: "Date", field: "compalint_date", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Department", field: "complaint_dept_name", filter: "true", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Request Type", field: "req_type_name", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Complaint Type", field: "complaint_type_name", autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true, minWidth: 150 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Status", field: "compalint_status1", filter: "true", minWidth: 100 },
        { headerName: "Rectifystatus", field: "cm_rectify_status1", filter: "true", minWidth: 150 },
        { headerName: "Reason", field: "rectify_pending_hold_remarks1", filter: "true", autoHeight: true, wrapText: true, minWidth: 180 },

    ])
    //dispalying complaints against the users deptsection
    useEffect(() => {
        const getcomplinttable = async () => {
            const result = await axioslogin.get(`/complaintreg/loginbysec/${sec}`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                warningNotify("Error occured contact EDP")
            }
        }
        if (sec !== 0) {
            getcomplinttable();
        }
    }, [count, sec])

    const forVerify = tabledata.filter((val) => {
        return val.compalint_status === 2
    })

    const pendingList = tabledata.filter((val) => {
        return val.cm_rectify_status === 'P'
    })

    const onholdList = tabledata.filter((val) => {
        return val.cm_rectify_status === 'O'

    })

    //when user clicks on verify icon this function will work
    const Verify = useCallback((params) => {
        const data = params.data
        setMddata(data)
        setOpen(true)
        setMdopen(1)
    }, [])
    const getRowStyle = params => {
        if (params.data.compalint_priority === 1) {
            return { background: '#f44336' };
        }
    };
    return (
        <Fragment>

            <Box sx={{
                width: "100%",
                pl: 1, pt: 0.5, pr: 1, pb: 0.5, flex: 1,
                display: "flex",
                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },

            }}>
                <Box sx={{ width: "13%", pr: 1, mt: 1 }}>
                    <CusCheckBox
                        label="Pending"
                        color="danger"
                        size="md"
                        name="pending"
                        value={pending}
                        checked={pending}
                        onCheked={updatePending}
                    />
                </Box>
                <Box sx={{ width: "13%", mt: 1 }}>
                    <CusCheckBox
                        label="On-Hold"
                        color="danger"
                        size="md"
                        name="onhold"
                        value={onhold}
                        checked={onhold}
                        onCheked={updateOnhold}
                    />
                </Box>
                <Box sx={{ width: "13%", mt: 1 }}>
                    <CusCheckBox
                        label="For Verify"
                        color="danger"
                        size="md"
                        name="verify"
                        value={verify}
                        checked={verify}
                        onCheked={updateVerify}
                    />
                </Box>
            </Box>
            {
                selectbase === 1 ?
                    <CusAgGridMast
                        columnDefs={columnpending}
                        tableData={pendingList}
                        onClick={rowSelect}
                        getRowStyle={getRowStyle}
                    /> :
                    selectbase === 2 ?
                        <CusAgGridMast
                            columnDefs={columnonhold}
                            tableData={onholdList}
                            onClick={rowSelect}
                            getRowStyle={getRowStyle}
                        /> :
                        selectbase === 3 ?
                            <CusAgGridMast
                                columnDefs={columnVerify}
                                tableData={forVerify}
                                onClick={rowSelect}
                                getRowStyle={getRowStyle}
                            /> :

                            <CusAgGridMast
                                columnDefs={column}
                                tableData={tabledata}
                                onClick={rowSelect}
                                getRowStyle={getRowStyle}
                            />
            }

            {
                mdopen === 1 ? <VerifyModal open={open} setOpen={setOpen} mddata={mddata} count={count} setCount={setCount} /> : null
            }
        </Fragment>
    )
}
export default memo(ComplaintRegTable)