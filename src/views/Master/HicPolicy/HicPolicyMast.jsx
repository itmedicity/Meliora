import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import HicPolicyTable from './HicPolicyTable'
const HicPolicyMast = () => {
    const history = useHistory();
    //state for table rendering
    const [count, setCount] = useState(0);
    //state for edit
    const [edit, setEdit] = useState(0)
    //data setting when clicken on row table
    const [editData, setEditdata] = useState([]);
    //for setting id from each row and get data by id
    const [hicslno, setHicslno] = useState([]);
    //intializing
    const [hic, setHic] = useState({
        hic_policy_name: '',
        hic_policy_status: false,
        hic_policy_slno: ''
    })
    //destructuring
    const { hic_policy_name, hic_policy_status, hic_policy_slno } = hic
    const updatehicPolicy = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setHic({ ...hic, [e.target.name]: value })
    }, [hic])
    //data set for edit
    const geteditdata = async (event) => {
        setEdit(1);
        setEditdata(event.api.getSelectedRows());
    }
    //For get slno from selected row  
    useEffect(() => {
        if (editData.length !== 0) {
            const slno = editData && editData.map((val, index) => {
                return val.hic_policy_slno
            })
            setHicslno(slno)
        }
    }, [editData])
    /*** get data from hicpolicy_master where selected slno for edit and also data set to corresponding fields*/
    useEffect(() => {
        if (hicslno.length !== 0) {
            const getHic = async () => {
                const result = await axioslogin.post('/hicpolicy/byid', hicslno)
                const { success, data } = result.data
                if (success === 1) {
                    const { hic_policy_name, hic_policy_status, hic_policy_slno } = data[0];
                    const frmdata = {
                        hic_policy_name: hic_policy_name,
                        hic_policy_status: hic_policy_status === 1 ? true : false,
                        hic_policy_slno: hic_policy_slno
                    }
                    setHic(frmdata)
                }
                else {
                    warningNotify("Error occured please contact EDP")
                }
            }
            getHic();
        }
    }, [hicslno])
    //data for insert
    const postdata = useMemo(() => {
        return {
            hic_policy_name: hic_policy_name,
            hic_policy_status: hic_policy_status === true ? 1 : 0
        }
    }, [hic_policy_name, hic_policy_status])
    //data for edit
    const patchdata = useMemo(() => {
        return {
            hic_policy_name: hic_policy_name,
            hic_policy_status: hic_policy_status === true ? 1 : 0,
            hic_policy_slno: hic_policy_slno
        }
    }, [hic_policy_name, hic_policy_status, hic_policy_slno])
    /*** usecallback function for form submitting */
    const submitHicpolicy = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            hic_policy_name: '',
            hic_policy_status: false,
            hic_policy_slno: ''
        }
        /*** * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/hicpolicy', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setHic(formreset);
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/hicpolicy', patchdata);
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setEdit(0)
                setHic(formreset);
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
            title="Hic Policy Master"
            close={backtoSetting}
            submit={submitHicpolicy}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Hic Ploicy Name"
                                    type="text"
                                    size="sm"
                                    name="hic_policy_name"
                                    value={hic_policy_name}
                                    onchange={updatehicPolicy}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="hic_policy_status"
                                    value={hic_policy_status}
                                    checked={hic_policy_status}
                                    onCheked={updatehicPolicy}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <HicPolicyTable geteditdata={geteditdata} count={count} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default HicPolicyMast