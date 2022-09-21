import { Box, Paper, } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getComplaintDept } from 'src/redux/actions/ComplaintDept.action'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { getRequesttype } from 'src/redux/actions/RequestType.action';
import { getHicpolicy } from 'src/redux/actions/HicPolicy.action'

const ComplaintRegistrMast = () => {
    /*** Initializing */
    const history = useHistory();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHicpolicy());
        dispatch(getComplaintDept());
        dispatch(getRequesttype());
    }, [dispatch])

    const state = useSelector((state) => {
        return {
            complaintdeptdata: state.getComplaintDept.complaintdeptList || 0,
            requesttypedata: state.getRequesttype.requesttypeList || 0,
            complainttype: state.getComplainttype.complainttypeList || 0,
            hicpolicy: state.getHicpolicy.hicpolicyList || 0
        }

    })
    const { complaintdeptdata, requesttypedata } = state

    const [ReqType, setReqType] = useState({
        COMPLAINT: false,
        NEW_REQUIREMENT: false,
        MODIFICATION: false,

    })
    const { COMPLAINT, NEW_REQUIREMENT, MODIFICATION } = ReqType
    const getReqType = useCallback((e) => {
        const ob1 = {
            COMPLAINT: false,
            NEW_REQUIREMENT: false,
            MODIFICATION: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setReqType({ ...ob1, [e.target.name]: value })
    }, [])

    const [complaintdept, setComplaintDept] = useState({
        BIOMEDICAL: false,
        MAINTENANCE: false,
        IT: false,
        HOUSEKEEPING: false,
        COMMON: false
    })
    const { BIOMEDICAL, MAINTENANCE, IT, HOUSEKEEPING, COMMON } = complaintdept
    const getValue = useCallback((e) => {

        const ob1 = {
            BIOMEDICAL: false,
            MAINTENANCE: false,
            IT: false,
            HOUSEKEEPING: false,
            COMMON: false
        }
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setComplaintDept({ ...ob1, [e.target.name]: value })
    }, [])


    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])

    return (
        <CardMaster
            title="Complaint Registration"
            close={backtoSetting}

        >   <Box sx={{ width: "100%", pl: 2, pt: 1, pr: 2, pb: 2 }}>
                <Paper square elevation={3} sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    pl: 2, pt: 1, pr: 2, pb: 2,
                }}>
                    <Box sx={{
                        width: "100%",
                        // height: 1000,
                        pl: 1, pt: 1, pr: 1, pb: 1,
                        // background: "blue",
                        display: "flex",
                        //  flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                        flexDirection: { xl: "column", lg: "column", md: "column", sm: 'row', xs: "row" },
                        justifyContent: "space-between",

                    }}><Box
                        sx={{
                            display: "flex",
                            flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                        }}>
                            <Paper variant="outlined" square sx={{
                                width: "40%",
                                px: 2, pr: 2,
                                display: "flex",
                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                justifyContent: "space-between",

                            }}  >
                                {requesttypedata && requesttypedata.map((value, index) => {
                                    return <Box sx={{
                                        pt: 1, pb: 1,
                                        display: 'flex',
                                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                        justifyContent: 'space-evenly',
                                    }}
                                        key={value.req_type_slno}
                                    >
                                        <CusCheckBox
                                            variant="outlined"
                                            color="primary"
                                            size="md"
                                            name={value.req_type_name}
                                            label={value.req_type_name}
                                            value={value.cm_request_type}
                                            checked={
                                                value.req_type_name === 'COMPLAINT' ? COMPLAINT :
                                                    value.req_type_name === 'NEW REQUIREMENT' ? NEW_REQUIREMENT :
                                                        value.req_type_name === 'MODIFICATION' ? MODIFICATION : false
                                            }
                                            onCheked={getReqType}

                                        />
                                    </Box>
                                })
                                }
                            </Paper>


                            <Paper variant="outlined" square sx={{
                                width: "60%",
                                px: 2, pl: 1, pb: 0,
                                display: "flex",
                                flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                justifyContent: 'space-evenly',
                                //  background: "red"
                            }}  >
                                {complaintdeptdata && complaintdeptdata.map((val) => {
                                    return <Box sx={{
                                        pt: 1,
                                        display: 'flex',
                                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" },
                                        // justifyContent: 'space-evenly',
                                        py: 1
                                    }}
                                        key={val.complaint_dept_slno}
                                    >
                                        <CusCheckBox
                                            variant="outlined"
                                            color="primary"
                                            size="md"
                                            name={val.complaint_dept_name}
                                            label={val.complaint_dept_name}
                                            value={val.complaint_dept_slno}
                                            checked={val.complaint_dept_name === 'BIOMEDICAL' ? BIOMEDICAL :
                                                val.complaint_dept_name === 'MAINTENANCE' ? MAINTENANCE :
                                                    val.complaint_dept_name === 'IT' ? IT :
                                                        val.complaint_dept_name === 'HOUSEKEEPING' ? HOUSEKEEPING :
                                                            val.complaint_dept_name === 'COMMON' ? COMMON : false

                                            }

                                            // checked={val.complaint_dept_name === 'complainttype' ? complaintdeptdata : 
                                            onCheked={getValue}
                                        />
                                    </Box>
                                })
                                }
                            </Paper>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </CardMaster>

    )
}

export default ComplaintRegistrMast

