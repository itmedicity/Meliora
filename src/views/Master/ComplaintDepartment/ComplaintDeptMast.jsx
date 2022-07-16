import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import ComplaintDeptMastTable from './ComplaintDeptMastTable';
import { Box } from '@mui/system'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { Grid } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode';
const ComplaintDeptMast = () => {
    //for routing to settings
    const history = useHistory();
    //state for table render
    const [count, setCount] = useState(0);
    //state for edit
    const [edit, setEdit] = useState(0);
    //data setting when clicken on row table
    const [editData, setEditdata] = useState([]);
    //for setting id from each row and get data by id
    const [compslno, setCompslno] = useState([]);
    //intializing
    const [complaint, setComplaint] = useState({
        complaint_dept_name: '',
        complaint_dept_status: false,
        complaint_dept_slno: ''
    })
    //Destructuring
    const { complaint_dept_name, complaint_dept_status, complaint_dept_slno } = complaint
    const updateDepartment = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setComplaint({ ...complaint, [e.target.name]: value })
    }, [complaint])
    //data set for edit
    const geteditdata = async (event) => {
        setEdit(1)
        setEditdata(event.api.getSelectedRows());
    }
    //For get slno from selected row  
    useEffect(() => {
        if (editData.length !== 0) {
            const slno = editData && editData.map((val, index) => {
                return val.complaint_dept_slno
            })
            setCompslno(slno)
        }
    }, [editData])
    /*** get data from complaintdept_master where selected slno for edit and also data set to corresponding fields*/
    useEffect(() => {
        if (compslno.length !== 0) {
            const getCompdept = async () => {
                const result = await axioslogin.post('/complaintdept/byid', compslno)
                const { success, data } = result.data
                if (success === 1) {
                    const { complaint_dept_name, complaint_dept_status, complaint_dept_slno } = data[0];
                    const frmdata = {
                        complaint_dept_name: complaint_dept_name,
                        complaint_dept_status: complaint_dept_status === 1 ? true : false,
                        complaint_dept_slno: complaint_dept_slno
                    }
                    setComplaint(frmdata)
                }
                else {
                    warningNotify("Error occured please contact EDP")
                }
            }
            getCompdept();
        }
    }, [compslno])
    //data for insert
    const postdata = useMemo(() => {
        return {
            complaint_dept_name: complaint_dept_name,
            complaint_dept_status: complaint_dept_status === true ? 1 : 0
        }
    }, [complaint_dept_name, complaint_dept_status])
    //data for update
    const patchdata = useMemo(() => {
        return {
            complaint_dept_name: complaint_dept_name,
            complaint_dept_status: complaint_dept_status === true ? 1 : 0,
            complaint_dept_slno: complaint_dept_slno
        }
    }, [complaint_dept_name, complaint_dept_status, complaint_dept_slno])
    /*** usecallback function for form submitting */
    const submitComplaintdept = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            complaint_dept_name: '',
            complaint_dept_status: false,
            complaint_dept_slno: ''
        }
        /***     * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/complaintdept', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setComplaint(formreset);
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/complaintdept', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setEdit(0)
                setComplaint(formreset);
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            }
            else {
                infoNotify(message)
            }
        }
        /*** edit=0 insert api call work else update call
    * value initialy '0' when edit button click value changes to '1'
    */
        if (edit === 0) {
            InsertFun(postdata)
        } else {
            updateFun(patchdata)
        }
    }, [edit, postdata, patchdata, count])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title='Complaint Department Master'
            close={backtoSetting}
            submit={submitComplaintdept}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder=" Complaint Department Name"
                                    type="text"
                                    size="sm"
                                    name="complaint_dept_name"
                                    value={complaint_dept_name}
                                    onchange={updateDepartment}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="complaint_dept_status"
                                    value={complaint_dept_status}
                                    checked={complaint_dept_status}
                                    onCheked={updateDepartment}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <ComplaintDeptMastTable count={count} geteditdata={geteditdata} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}

export default ComplaintDeptMast