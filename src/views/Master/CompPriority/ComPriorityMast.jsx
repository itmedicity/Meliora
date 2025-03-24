import React, { useCallback, useMemo, useState, memo } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/system'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import { useSelector } from 'react-redux'
import ComProirityMastTable from './ComProirityMastTable'

const ComPriorityMast = () => {

    const history = useHistory();
    //state for table rendering
    const [count, setCount] = useState(0);
    //state for edit
    const [edit, setEdit] = useState(0)
    //intializing
    const [priority, setpriority] = useState({
        cm_priority_desc: '',
        cm_priority_status: false,
        cm_priority_slno: '',
        escalation_max: '',
        escalation_min: ''

    })
    //destructuring
    const { cm_priority_desc, cm_priority_status, escalation_max, escalation_min, cm_priority_slno } = priority
    const updatepriority = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setpriority({ ...priority, [e.target.name]: value })
    }, [priority])
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    //data for insert
    const postdata = useMemo(() => {
        return {
            cm_priority_desc: cm_priority_desc,
            cm_priority_status: cm_priority_status === true ? 1 : 0,
            escalation_max: escalation_max,
            escalation_min: escalation_min,
            create_user: id
        }
    }, [cm_priority_desc, escalation_max, escalation_min, cm_priority_status, id])
    //data set for edit  
    const rowSelect = useCallback((params) => {
        setEdit(1);
        const data = params.api.getSelectedRows()
        const { cm_priority_desc, status, escalation_min, escalation_max, cm_priority_slno } = data[0]
        const frmdata = {
            cm_priority_desc: cm_priority_desc,
            cm_priority_status: status === 'Yes' ? true : false,
            escalation_max: escalation_max === null ? '' : escalation_max,
            escalation_min: escalation_min === null ? '' : escalation_min,
            cm_priority_slno: cm_priority_slno,
        }
        setpriority(frmdata)
    }, [])
    //data for edit
    const patchdata = useMemo(() => {
        return {
            cm_priority_desc: cm_priority_desc,
            cm_priority_status: cm_priority_status === true ? 1 : 0,
            escalation_max: escalation_max,
            escalation_min: escalation_min,
            edit_user: id,
            cm_priority_slno: cm_priority_slno
        }

    }, [cm_priority_desc, cm_priority_status, cm_priority_slno, escalation_min, escalation_max, id])
    /*** usecallback function for form submitting */
    const submitHicpolicy = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            cm_priority_desc: '',
            cm_priority_status: false,
            cm_priority_slno: '',
            escalation_max: '',
            escalation_min: ''
        }
        /*** * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/compriority', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setpriority(formreset);
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/compriority', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setEdit(0)
                setpriority(formreset);
            } else if (success === 0) {
                infoNotify(message);
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
    //refresh func
    const refreshWindow = useCallback(() => {
        const formreset = {
            cm_priority_desc: '',
            cm_priority_status: false,
            escalation_min: '',
            escalation_max: '',
            cm_priority_slno: ''
        }
        setpriority(formreset);
        setEdit(0)
    }, [setpriority])

    return (
        <CardMaster
            title="Complaint Priority Master"
            close={backtoSetting}
            submit={submitHicpolicy}
            refresh={refreshWindow}
        >
            <Box sx={{ flex: 1, display: 'flex' }}>

                <Box sx={{ flex: 1, }}>
                    <TextFieldCustom
                        placeholder="Priority Name"
                        type="text"
                        size="sm"
                        name="cm_priority_desc"
                        value={cm_priority_desc}
                        onchange={updatepriority}
                    />
                    <Box sx={{ display: 'flex', pt: 1, pl: .5 }}>
                        <Box sx={{
                            width: 125,
                            pt: .5
                        }}>
                            Escalation Min
                        </Box>
                        <Box sx={{
                            width: 125,
                        }}>
                            <TextFieldCustom
                                placeholder=" Escalation Min"
                                type="text"
                                size="sm"
                                name="escalation_min"
                                value={escalation_min}
                                onchange={updatepriority}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', pt: .5, pl: .5 }}>
                        <Box sx={{
                            width: 125,
                            pt: .5
                        }}>
                            Escalation Max
                        </Box>
                        <Box sx={{
                            width: 125,
                        }}>
                            <TextFieldCustom
                                placeholder="Escalation Max"
                                type="text"
                                size="sm"
                                name="escalation_max"
                                value={escalation_max}
                                onchange={updatepriority}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ m: .5, }}>
                        <CusCheckBox

                            label="Status"
                            color="primary"
                            size="md"
                            name="cm_priority_status"
                            value={cm_priority_status}
                            checked={cm_priority_status}
                            onCheked={updatepriority}
                        />
                    </Box>
                </Box>
                <Box sx={{ flex: 2, pl: 1 }}>
                    <ComProirityMastTable count={count} rowSelect={rowSelect} />
                </Box>
            </Box>
        </CardMaster>
    )
}

export default memo(ComPriorityMast)