import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axioslogin } from '../Axios/Axios';
import { warningNotify } from '../Common/CommonCode';
import CardMaster from '../Components/CardMaster';
import ComplistAgGridcmp from '../Components/ComplistAgGridcmp';
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import { Box } from '@mui/material';
import CusCheckBox from '../Components/CusCheckBox';

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
        { headerName: "SlNo", field: "complaint_slno", minWidth: 10 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "Department", field: "complaint_dept_name", wrapText: true, autoHeight: true, minWidth: 70 },
        { headerName: "Request Type", field: "req_type_name" },
        { headerName: "Complaint Type", field: "complaint_type_name" },
        { headerName: "Hic Policy", field: "hic_policy_name" },
        // { headerName: "Emp dept", field: "complaint_dept_name" },
        { headerName: "Date", field: "compalint_date" },
        { headerName: "status", field: "compalint_status1" }

        // { headerName: 'Action', cellRenderer: EditButton },
    ])
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    const totalcmp = useCallback((e) => {
        if (e.target.checked === true) {
            settotal(true)
            setassign(false)
            setverify(false)
            setrectify(false)
        }
        else {
            settotal(false)
            setassign(false)
            setverify(false)
            setrectify(false)


        }
    }, [])

    const assigncmp = useCallback((e) => {
        if (e.target.checked === true) {
            setassign(true)
            settotal(false)
            setverify(false)
            setrectify(false)
        }
        else {
            setassign(false)
            settotal(false)
            setverify(false)
            setrectify(false)
        }
    }, [])
    const verifycmp = useCallback((e) => {
        if (e.target.checked === true) {
            setverify(true)
            setassign(false)
            settotal(false)
            setrectify(false)
        }
        else {
            setverify(false)
            setassign(false)
            settotal(false)
            setrectify(false)
        }
    }, [])

    const rectifycmp = useCallback((e) => {
        if (e.target.checked === true) {
            setrectify(true)
            setverify(false)
            setassign(false)
            settotal(false)
        }
        else {
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
        getcomplintlisttotal();
        const getcomplintassignList = async () => {
            const result = await axioslogin.get(`/complaintreg/assigncmpl`)
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
                setTabledata(0)
            }
        }
        const getcomplintlistverify = async () => {
            const result = await axioslogin.get(`/complaintreg/verified`)
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
        const getcomplintlistrectify = async () => {
            const result = await axioslogin.get(`/complaintreg/getreccmp`)
            const { success, data, message } = result.data
            if (success === 1) {
                setTabledata(data)
                settable(1)
            }
            else if (success === 2) {
                setTabledata([])
                warningNotify(message)
            }
            // else {
            //     setTabledata(data)
            // }

        }

        if (total === true && assign === false && verify === false && rectify === false) {
            getcomplintlisttotal()
        }
        else if (total === false && assign === true && verify === false && rectify === false) {
            getcomplintassignList()
        }
        else if (total === false && assign === false && verify === true && rectify === false) {
            getcomplintlistverify()
        }
        else if (total === false && assign === false && verify === false && rectify === true) {
            getcomplintlistrectify()
        }
        else {
            warningNotify()
        }

    }, [total, assign, verify, rectify, count])


    const refreshWindow = useCallback(() => {

        settotal(true)
        setassign(false)
        setverify(false)
        setrectify(false)
    }, [])


    return (

        <CardMaster
            title="Complaint List"
            close={backtoSetting}
            refreshWindow={refreshWindow}

        >
            <Box sx={{ display: "flex", width: "100%" }}>
                <Box sx={{ p: 2 }}>
                    <CusCheckBox
                        variant="outlined"
                        color="primary"
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
                        color="primary"
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
                        color="primary"
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
                        color="primary"
                        size="md"
                        name="total"
                        label="Verified complaints"
                        value={verify}
                        onCheked={verifycmp}
                        checked={verify}
                    />
                </Box>
            </Box>
            <Box sx={{ p: 1 }}>
                {
                    table === 1 ?
                        <ComplistAgGridcmp
                            columnDefs={column}
                            tableData={tabledata}
                            rowHeight={30}
                        /> : null
                }
            </Box>
        </CardMaster>
    )
}

export default ComplaintList