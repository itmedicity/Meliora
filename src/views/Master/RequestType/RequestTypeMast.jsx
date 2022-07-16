import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import RequestTypeMastTable from './RequestTypeMastTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
const RequestTypeMast = () => {
    //for routing
    const history = useHistory();
    //state for tavle render
    const [count, setCount] = useState(0);
    //state for edit
    const [edit, setEdit] = useState(0)
    //data setting when clicken on row table
    const [editData, setEditdata] = useState([]);
    //for setting id from each row and get data by id
    const [reqslno, setReqslno] = useState([])
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
    //data set for edit
    const geteditdata = async (event) => {
        setEdit(1);
        setEditdata(event.api.getSelectedRows());
    }
    //For get slno from selected row  
    useEffect(() => {
        if (editData.length !== 0) {
            const slno = editData && editData.map((val, index) => {
                return val.req_type_slno
            })
            setReqslno(slno)
        }
    }, [editData])
    /*** get data from requesttype_master where selected slno for edit and also data set to corresponding fields*/
    useEffect(() => {
        if (reqslno.length !== 0) {
            const getReq = async () => {
                const result = await axioslogin.post('/requesttype/byid', reqslno)
                const { success, data } = result.data
                if (success === 1) {
                    const { req_type_name, req_type_status, req_type_slno } = data[0];
                    const frmdata = {
                        req_type_name: req_type_name,
                        req_type_status: req_type_status === 1 ? true : false,
                        req_type_slno: req_type_slno
                    }
                    setRequest(frmdata)
                }
                else {
                    warningNotify("Error occured please contact EDP")
                }
            }
            getReq();
        }
    }, [reqslno])
    //data for insert
    const postdata = useMemo(() => {
        return {
            req_type_name: req_type_name,
            req_type_status: req_type_status === true ? 1 : 0
        }
    }, [req_type_name, req_type_status])
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
                infoNotify(message.sqlMessage);
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
    // close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Request Type Master"
            close={backtoSetting}
            submit={submitRequestType}
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
                        <RequestTypeMastTable geteditdata={geteditdata} count={count} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default RequestTypeMast