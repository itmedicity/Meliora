import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ComplaintDeptSelect from 'src/views/CommonSelectCode/ComplaintDeptSelect'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import ComplaintTypeTable from './ComplaintTypeTable'
const ComplaintTypeMast = () => {
    const history = useHistory();
    //for select box updation
    const [edit, setEdit] = useState(0);
    //state for table rendering
    const [count, setCount] = useState(0);
    //state for select box
    const [value, setValue] = useState(0)
    //data setting when clicked on edit button table
    const [editData, setEditdata] = useState([]);
    //for setting id from each row and get data by id
    const [comptypeslno, setComptypeslno] = useState([]);
    //intializing
    const [complainttype, SetType] = useState({
        complaint_type_name: '',
        complaint_dept_slno: '',
        complaint_type_status: false,
        complaint_type_slno: ''
    })
    //destructuring
    const { complaint_type_name, complaint_type_status, complaint_type_slno } = complainttype
    const updateComplaintType = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        SetType({ ...complainttype, [e.target.name]: value })
    }, [complainttype])
    //fun for edit table
    const geteditdata = async (event) => {
        setEdit(1);
        setEditdata(event.api.getSelectedRows())
    }
    //For get slno from selected row  
    useEffect(() => {
        if (editData.length !== 0) {
            const slno = editData && editData.map((val, index) => {
                return val.complaint_type_slno
            })
            setComptypeslno(slno)
        }
    }, [editData])
    /*** get data from complainttype_master where selected slno for edit and also data set to corresponding fields*/
    useEffect(() => {
        if (comptypeslno.length !== 0) {
            const getComplaint = async () => {
                const result = await axioslogin.post('/complainttype/byid', comptypeslno)
                const { success, data } = result.data
                if (success === 1) {
                    const { complaint_type_name, complaint_type_status, complaint_type_slno, complaint_dept_slno } = data[0];
                    const frmdata = {
                        complaint_type_name: complaint_type_name,
                        complaint_type_status: complaint_type_status === 1 ? true : false,
                        complaint_type_slno: complaint_type_slno
                    }
                    SetType(frmdata)
                    setValue(complaint_dept_slno)
                }
                else {
                    warningNotify("Error occured please contact EDP")
                }
            }
            getComplaint();
        }
    }, [comptypeslno])
    //data for insert 
    const postdata = useMemo(() => {
        return {
            complaint_type_name: complaint_type_name,
            complaint_dept_slno: value,
            complaint_type_status: complaint_type_status === true ? 1 : 0
        }
    }, [complaint_type_name, complaint_type_status, value])
    //data for update
    const patchdata = useMemo(() => {
        return {
            complaint_type_name: complaint_type_name,
            complaint_dept_slno: value,
            complaint_type_status: complaint_type_status === true ? 1 : 0,
            complaint_type_slno: complaint_type_slno
        }
    }, [complaint_type_name, complaint_type_status, value, complaint_type_slno])
    //reset select box
    const reset = async () => {
        setValue(0)
    }
    /*** usecallback function for form submitting */
    const submitComplaintType = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            complaint_type_name: '',
            complaint_type_status: false,
            complaint_type_slno: ''
        }
        /***  * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/complainttype', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                SetType(formreset);
                reset();
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/complainttype', patchdata)
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                SetType(formreset);
                reset();
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            }
            else {
                infoNotify(message)
            }
        }
        /*** edit=0 insert api call work else update call
             * edit initialy '0' when edit button click value changes to '1'
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
            title='Complaint Type Master'
            close={backtoSetting}
            submit={submitComplaintType}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder=" Complaint Type Name"
                                    type="text"
                                    size="sm"
                                    name="complaint_type_name"
                                    value={complaint_type_name}
                                    onchange={updateComplaintType}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <ComplaintDeptSelect value={value} setValue={setValue} />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="complaint_type_status"
                                    value={complaint_type_status}
                                    checked={complaint_type_status}
                                    onCheked={updateComplaintType}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <ComplaintTypeTable geteditdata={geteditdata} count={count} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default ComplaintTypeMast