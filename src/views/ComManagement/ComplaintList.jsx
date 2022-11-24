import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axioslogin } from '../Axios/Axios';
import { warningNotify } from '../Common/CommonCode';
import ComplistAgGridcmp from '../Components/ComplistAgGridcmp';
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import { Box, Paper } from '@mui/material';
import CusCheckBox from '../Components/CusCheckBox';
import CardCloseOnly from '../Components/CardCloseOnly';
const ComplaintList = (count) => {
    const history = useHistory()
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    const [total, settotal] = useState(false)
    const [assign, setassign] = useState(false)
    const [verify, setverify] = useState(false)
    const [rectify, setrectify] = useState(false)
    const [table, settable] = useState(0)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getComplaintDept())
    }, [dispatch])
    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno", width: 90 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Req.Department", field: "sec_name", filter: "true", wrapText: true, autoHeight: true, minWidth: 70 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Request Type", field: "req_type_name", filter: "true" },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true" },
        { headerName: "Comp.Department", field: "complaint_dept_name", filter: "true", width: 180 },
        { headerName: "Req.Date", field: "compalint_date" },
        { headerName: "Assigned Employee", field: "em_name", filter: "true", width: 180 },
        { headerName: "status", field: "compalint_status1", filter: "true" }
    ])
    const [assigned] = useState([
        { headerName: "SlNo", field: "complaint_slno", width: 90 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Req.Department", field: "sec_name", wrapText: true, filter: "true", autoHeight: true, width: 200 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Request Type", field: "req_type_name", filter: "true" },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true" },
        { headerName: "Comp.Department", field: "complaint_dept_name", filter: "true", wrapText: true, autoHeight: true, width: 150 },
        { headerName: "Employee", field: "em_name" },
        { headerName: "Req.Date", field: "compalint_date" },
        { headerName: "Assign.Date", field: "assigned_date" },
        { headerName: "status", field: "compalint_status1", filter: "true" }
    ])
    const [rectified] = useState([
        { headerName: "SlNo", field: "complaint_slno", width: 90 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Req.Department", field: "sec_name", wrapText: true, filter: "true", autoHeight: true, width: 200 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Request Type", field: "req_type_name", filter: "true" },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true" },
        { headerName: "Comp.Department", field: "complaint_dept_name", filter: "true", wrapText: true, autoHeight: true, width: 150 },
        { headerName: "Employee", field: "em_name" },
        { headerName: "Req.Date", field: "compalint_date" },
        { headerName: "Rectify.Date", field: "cm_rectify_time" },
        { headerName: "status", field: "compalint_status1", filter: "true" }
    ])
    const [verified] = useState([
        { headerName: "SlNo", field: "complaint_slno", width: 90 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, width: 250 },
        { headerName: "Req.Department", field: "sec_name", wrapText: true, filter: "true", autoHeight: true, width: 200 },
        { headerName: "Location", field: "location", width: 200, autoHeight: true, wrapText: true },
        { headerName: "Request Type", field: "req_type_name", filter: "true" },
        { headerName: "Complaint Type", field: "complaint_type_name", filter: "true" },
        { headerName: "Comp.Department", field: "complaint_dept_name", filter: "true", wrapText: true, autoHeight: true, width: 150 },
        { headerName: "Employee", field: "em_name" },
        { headerName: "Req.Date", field: "compalint_date" },
        { headerName: "Verify.Date", field: "cm_verfy_time" },
        { headerName: "Status", field: "compalint_status1", filter: "true" }
    ])
    const backtoSetting = useCallback(() => {
        history.push('/Home')
    }, [history])
    const [flag, setFlag] = useState(1)
    const totalcmp = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(1)
            settotal(true)
            setassign(false)
            setverify(false)
            setrectify(false)
        }
        else {
            setFlag(1)
            settotal(false)
            setassign(false)
            setverify(false)
            setrectify(false)
        }
    }, [])

    const assigncmp = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(2)
            settable(2)
            setassign(true)
            settotal(false)
            setverify(false)
            setrectify(false)
        }
        else {
            setFlag(1)
            settable(0)
            setassign(false)
            settotal(false)
            setverify(false)
            setrectify(false)
        }
    }, [])
    const rectifycmp = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(3)
            setrectify(true)
            setverify(false)
            setassign(false)
            settotal(false)
        }
        else {
            setFlag(1)
            setverify(false)
            setassign(false)
            settotal(false)
            setrectify(false)
        }
    }, [])
    const verifycmp = useCallback((e) => {
        if (e.target.checked === true) {
            setFlag(4)
            setverify(true)
            setassign(false)
            settotal(false)
            setrectify(false)
        }
        else {
            setFlag(1)
            setverify(false)
            setassign(false)
            settotal(false)
            setrectify(false)
        }
    }, [])
    useEffect(() => {
        const getcomplintlisttotal = async () => {
            const result = await axioslogin.get(`/complaintreg/complit`)
            const { success, data, message } = result.data
            if (success === 1) {
                setTabledata(data)
                settable(1)
            }
            else if (success === 2) {
                setTabledata([])
                warningNotify(message)
            }
            else {
                setTabledata(data)
            }
        }
        if (flag === 1) {
            getcomplintlisttotal();
        }
        const getcomplintassignList = async () => {
            const result = await axioslogin.get(`/complaintreg/assigncmpl`)
            const { success, data, message } = result.data
            if (success === 1) {
                setTabledata(data)
                settable(2)
            }
            else if (success === 2) {
                setTabledata([])
                warningNotify(message)
            }
            else {
                setTabledata(0)
            }
        }
        if (flag === 2) {
            getcomplintassignList()
        } else {
            setTabledata([])
        }
        const getcomplintlistverify = async () => {
            const result = await axioslogin.get(`/complaintreg/verified`)
            const { success, data, message } = result.data
            if (success === 1) {
                setTabledata(data)
                settable(4)
            }
            else if (success === 2) {
                setTabledata([])
                warningNotify(message)
            }
            else {
                setTabledata(data)
            }
        }
        if (flag === 4) {
            getcomplintlistverify()
        } else {
            setTabledata([])
        }
        const getcomplintlistrectify = async () => {
            const result = await axioslogin.get(`/complaintreg/getreccmp`)
            const { success, data, message } = result.data
            if (success === 1) {
                setTabledata(data)
                settable(3)
            }
            else if (success === 2) {
                setTabledata([])
                warningNotify(message)
            }
        }
        if (flag === 3) {
            getcomplintlistrectify()
        } else {
            setTabledata([])
        }
    }, [total, assign, verify, rectify, count, flag])

    return (
        <CardCloseOnly
            title="Complaint List"
            close={backtoSetting}>
            <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ p: 2 }}>
                    <CusCheckBox
                        variant="outlined"
                        color="danger"
                        size="md"
                        name="total"
                        label="Total complaint"
                        value={total}
                        onCheked={totalcmp}
                        checked={total}
                    />
                </Box>
                <Box sx={{ p: 2 }}>
                    <CusCheckBox
                        variant="outlined"
                        color="danger"
                        size="md"
                        name="total"
                        label="Assigned complaints"
                        value={assign}
                        onCheked={assigncmp}
                        checked={assign}
                    />
                </Box>
                <Box sx={{ p: 2 }}>
                    <CusCheckBox
                        variant="outlined"
                        color="danger"
                        size="md"
                        name="total"
                        label="Rectified complaints"
                        value={rectify}
                        onCheked={rectifycmp}
                        checked={rectify}
                    />
                </Box>
                <Box sx={{ p: 2 }}>
                    <CusCheckBox
                        variant="outlined"
                        color="danger"
                        size="md"
                        name="total"
                        label="Verified complaints"
                        value={verify}
                        onCheked={verifycmp}
                        checked={verify}
                    />
                </Box>
            </Box>
            <Paper sx={{ p: 1, height: 650 }}>
                {
                    table === 1 ?
                        <ComplistAgGridcmp
                            columnDefs={column}
                            tableData={tabledata}
                            rowHeight={30}
                        /> : null
                }
                {
                    table === 2 ? <ComplistAgGridcmp
                        columnDefs={assigned}
                        tableData={tabledata}
                        rowHeight={30}
                    /> : null
                }
                {
                    table === 3 ? <ComplistAgGridcmp
                        columnDefs={rectified}
                        tableData={tabledata}
                        rowHeight={30}
                    /> : null
                }
                {
                    table === 4 ? <ComplistAgGridcmp
                        columnDefs={verified}
                        tableData={tabledata}
                        rowHeight={30}
                    /> : null
                }
            </Paper>
        </CardCloseOnly>

    )
}
export default ComplaintList