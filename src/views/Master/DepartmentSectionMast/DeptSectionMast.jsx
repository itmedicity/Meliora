import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import CardMaster from 'src/views/Components/CardMaster'
import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import DeptSectionMastTable from './DeptSectionMastTable'
import DepartmentSelect from 'src/views/CommonSelectCode/DepartmentSelect'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'

const DeptSectionMast = () => {
    const history = useHistory();
    //state for table rendering
    const [count, setCount] = useState(0);
    //state for edit
    const [edit, setEdit] = useState(0);
    //state for select box
    const [value, setValue] = useState(0)
    //data setting when clicken on row table
    const [editData, setEditdata] = useState([]);
    //for getting id from each row and get data by id
    const [deptsecslno, setDeptsecSlno] = useState([]);
    //intializing
    const [deptsection, setDeptsection] = useState({
        sec_name: '',
        dept_slno: '',
        sec_status: false,
        sec_slno: ''
    })
    //Destructuring
    const { sec_name, sec_status, sec_slno } = deptsection

    const updateDeptsection = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDeptsection({ ...deptsection, [e.target.name]: value })
    }, [deptsection])
    //Data set for edit
    const geteditdata = async (event) => {
        setEdit(1);
        setEditdata(event.api.getSelectedRows())
    }
    //For get slno from selected row  
    useEffect(() => {
        const slno = editData && editData.map((val, index) => {
            return val.sec_slno
        })
        setDeptsecSlno(slno)
    }, [editData])

    /*** get data from deptsec_master where selected slno for edit and also data set to corresponding fields*/
    useEffect(() => {
        if (deptsecslno.length !== 0) {
            const getDeptsec = async () => {
                const result = await axioslogin.post('/deptsecmaster/byid', deptsecslno)
                const { success, data } = result.data
                if (success === 1) {
                    const { sec_name, dept_slno, sec_status, sec_slno } = data[0];
                    const frmdata = {
                        sec_name: sec_name,
                        sec_status: sec_status === 1 ? true : false,
                        sec_slno: sec_slno
                    }
                    setDeptsection(frmdata)
                    setValue(dept_slno)
                }
                else {
                    warningNotify("Error occured please contact EDP")
                }
            }
            getDeptsec();
        }
    }, [deptsecslno])
    //data for insert
    const postdata = useMemo(() => {
        return {
            sec_name: sec_name,
            dept_slno: value,
            sec_status: sec_status === true ? 1 : 0
        }
    }, [sec_name, value, sec_status])
    //data for update
    const patchdata = useMemo(() => {
        return {
            sec_name: sec_name,
            dept_slno: value,
            sec_status: sec_status === true ? 1 : 0,
            sec_slno: sec_slno
        }
    }, [sec_name, sec_status, value, sec_slno])
    //reseting selectbox
    const reset = async () => {
        setValue(0)
    }
    /*** usecallback function for form submitting */
    const submitDepartsection = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            sec_name: '',
            dept_slno: '',
            sec_status: false,
            sec_slno: '',
        }
        /*** * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/deptsecmaster', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setDeptsection(formreset);
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
            const result = await axioslogin.patch('/deptsecmaster', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setEdit(0)
                reset();
                setDeptsection(formreset);
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
            title="Department Section Master"
            close={backtoSetting}
            submit={submitDepartsection}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Department Section Name"
                                    type="text"
                                    size="sm"
                                    name="sec_name"
                                    value={sec_name}
                                    onchange={updateDeptsection}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}  >
                                <DepartmentSelect value={value} setValue={setValue} />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="sec_status"
                                    value={sec_status}
                                    checked={sec_status}
                                    onCheked={updateDeptsection}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <DeptSectionMastTable geteditdata={geteditdata} count={count} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default DeptSectionMast