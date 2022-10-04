import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { axioslogin } from '../Axios/Axios';
import { warningNotify } from '../Common/CommonCode';
import CardMaster from '../Components/CardMaster';
import ComplistAgGridcmp from '../Components/ComplistAgGridcmp';
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import { Box, Paper } from '@mui/material';
import ComplaintCheckBox from './ComplaintRegister/ComplaintCheckBox';

const ComplaintList = (count) => {


    const history = useHistory()
    //state for setting table data
    const [tabledata, setTabledata] = useState([])
    const [codept, setcodept] = useState(false)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getComplaintDept())
    }, [dispatch])

    const complaintdeptdata = useSelector((state) => {
        return state.getComplaintDept.complaintdeptList || 0
    })


    //column title setting
    const [column] = useState([
        { headerName: "SlNo", field: "complaint_slno", minWidth: 10 },
        { headerName: "Complaint Description", field: "complaint_desc", autoHeight: true, wrapText: true, minWidth: 250 },
        { headerName: "complaint Dept", field: "complaint_dept_name" },
        { headerName: "Request Type", field: "req_type_name" },
        { headerName: "Complaint Type", field: "complaint_type_name" },
        { headerName: "Hic Policy", field: "hic_policy_name" },
        { headerName: "Emp dept", field: "sec_name" },
        { headerName: "Date", field: "compalint_date" },
        { headerName: "status", field: "compalint_status" }

        // { headerName: 'Action', cellRenderer: EditButton },
    ])
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])



    useEffect(() => {
        const getcomplintlisttable = async () => {
            const result = await axioslogin.get(`/complaintreg/complit`)
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data)
            }
            else {
                setTabledata(data)
            }

        }
        const getcomplintlistdept = async (codept) => {
            const result = await axioslogin.get(`/complaintreg/compltbydept/${codept}`)
            const { success, data, message } = result.data
            if (success === 1 && data !== []) {
                setTabledata(data)
            }
            else if (success === 2) {
                setTabledata([])
                warningNotify(message)
            }
        }

        if (codept !== false && codept !== null) {

            getcomplintlistdept(codept)
        }
        else if (codept === null) {

            getcomplintlisttable()
        }
        else {
            warningNotify("Error occured contact EDP")
        }

    }, [count, codept])


    return (

        <CardMaster
            title="Complaint List"
            close={backtoSetting}
        >
            <Box sx={{ display: "flex", width: "100%" }}>

                {/* Second box start */}
                <Paper variant="outlined" square sx={{
                    width: "60%",
                    display: "flex",
                    flex: 1,
                    justifyContent: "center",
                    textTransform: 'capitalize',
                    p: 3
                }}
                >
                    {complaintdeptdata && complaintdeptdata.map((val) => {
                        return <Box
                            sx={{
                                display: "flex",
                                flex: 3,
                                pt: 1,
                                width: { xl: "70%", lg: "70%", md: "80%", sm: "100%", xs: "100%" },
                                // width: "100%",
                            }}
                            key={val.complaint_dept_slno}
                        >
                            <ComplaintCheckBox
                                label={val.complaint_dept_name}
                                name={val.complaint_dept_name}
                                value={val.complaint_dept_slno}
                                onChange={setcodept}
                                checkedValue={codept}


                            />
                        </Box>
                    })
                    }
                </Paper>
                {/* Second box end */}
            </Box>

            <ComplistAgGridcmp
                columnDefs={column}
                tableData={tabledata}
                rowHeight={30}
            />
        </CardMaster>
    )
}

export default ComplaintList