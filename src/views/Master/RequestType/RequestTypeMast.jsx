import React, { useCallback, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import RequestTypeMastTable from './RequestTypeMastTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
const RequestTypeMast = () => {
    //for routing
    const history = useHistory();
    //state for table render
    const [count, setCount] = useState(0);
    //state for edit
    const [edit, setEdit] = useState(0)
    //intializing
    const [request, setRequest] = useState({
        req_type_name: '',
        req_type_status: false,
        req_type_slno: ''
    })
    //destructuring
    const { req_type_name, req_type_status, req_type_slno } = request
    const updateRequesttype = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setRequest({ ...request, [e.target.name]: value })
    }, [request])
    //data for insert
    const postdata = useMemo(() => {
        return {
            req_type_name: req_type_name,
            req_type_status: req_type_status === true ? 1 : 0
        }
    }, [req_type_name, req_type_status])
    //data set for edit 
    const rowSelect = useCallback((params) => {
        setEdit(1);
        const data = params.api.getSelectedRows();
        const { req_type_name, status, req_type_slno } = data[0]
        const frmdata = {
            req_type_name: req_type_name,
            req_type_status: status === 'Yes' ? true : false,
            req_type_slno: req_type_slno
        }
        setRequest(frmdata);
    }, [])
    //data for update
    const patchdata = useMemo(() => {
        return {
            req_type_name: req_type_name,
            req_type_status: req_type_status === true ? 1 : 0,
            req_type_slno: req_type_slno
        }
    }, [req_type_name, req_type_status, req_type_slno])
    /*** usecallback function for form submitting */
    const submitRequestType = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            req_type_name: '',
            req_type_status: false,
            req_type_slno: ''
        }
        /***  * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/requesttype', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setRequest(formreset);
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/requesttype', patchdata)
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setRequest(formreset);
                setEdit(0);
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
    // close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    //refresh 
    const refreshWindow = useCallback(() => {
        const formreset = {
            req_type_name: '',
            req_type_status: false,
            req_type_slno: ''
        }
        setRequest(formreset)
        setEdit(0);
    }, [setRequest])
    return (
        <CardMaster
            title="Request Type Master"
            close={backtoSetting}
            submit={submitRequestType}
            refresh={refreshWindow}
        >
            <Box sx={{ p: 1 }} >
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Request Type Name"
                                    type="text"
                                    size="sm"
                                    name="req_type_name"
                                    value={req_type_name}
                                    onchange={updateRequesttype}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="req_type_status"
                                    value={req_type_status}
                                    checked={req_type_status}
                                    onCheked={updateRequesttype}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <RequestTypeMastTable count={count} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default RequestTypeMast