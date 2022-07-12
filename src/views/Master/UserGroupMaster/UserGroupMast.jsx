import { Grid } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import UserGroupTable from './UserGroupTable'
import { Box } from '@mui/system'

const UserGroupMast = () => {
    const [count, setCount] = useState(0)
    const [value, setvalue] = useState(0)
    const history = useHistory()
    //Initializing
    const [usergrp, setUsergrp] = useState({
        usergrp_name: '',
        usergrp_status: false,
        user_grp_slno: ''
    })

    //Destructuring
    const { usergrp_name, usergrp_status, user_grp_slno } = usergrp;
    const updateUsergrp = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUsergrp({ ...usergrp, [e.target.name]: value })
    }, [usergrp])

    //data for insert
    const postdata = useMemo(() => {
        return {
            user_grp_name: usergrp_name,
            user_grp_status: usergrp_status === true ? 1 : 0
        }
    }, [usergrp_name, usergrp_status])

    //data for update
    const patchdata = useMemo(() => {
        return {
            user_grp_name: usergrp_name,
            user_grp_status: usergrp_status === true ? 1 : 0,
            user_grp_slno: user_grp_slno
        }
    }, [usergrp_name, usergrp_status, user_grp_slno])

    const [gropslno, setGrpslno] = useState([])
    const [editData, SetEditdata] = useState([])

    /***get row data from agGrid when edit button click
     * value set 1 for edit     */
    const geteditdata = (event) => {
        setvalue(1)
        SetEditdata(event.api.getSelectedRows())
    }
    //For get slno from selected row  
    useEffect(() => {
        const slno = editData && editData.map((val, index) => {
            return val.user_grp_slno
        })
        setGrpslno(slno)
    }, [editData])

    /*** get data from user_group_mast where selected slno for edit and also data set to corresponding feilds*/
    useEffect(() => {
        if (gropslno.length !== 0) {
            const getdataaa = async () => {
                const result = await axioslogin.post('/usergroup/getById', gropslno)
                const { success, data } = result.data;
                if (success === 1) {
                    const { user_grp_name, user_grp_status, user_grp_slno } = data[0]
                    const frmdata = {
                        usergrp_name: user_grp_name,
                        usergrp_status: user_grp_status === 1 ? true : false,
                        user_grp_slno: user_grp_slno
                    }
                    setUsergrp(frmdata)
                }
                else {
                    warningNotify("Error occured please contact EDP")
                }
            }
            getdataaa()
        }
    }, [gropslno])

    /*** usecallback function for form submitting */
    const submitUserGroup = useCallback((e) => {
        e.preventDefault();
        /*** reset from */
        const formreset = {
            usergrp_name: '',
            usergrp_status: false,
            user_grp_slno: ''
        }
        /***     * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/usergroup', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setUsergrp(formreset);
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            } else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/usergroup', patchdata)
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setUsergrp(formreset);
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            } else {
                infoNotify(message)
            }
        }
        /*** value=0 insert api call work else update call
          * value initialy '0' when edit button click value changes to '1'
          */
        if (value === 0) {
            InsertFun(postdata)
        }
        else {
            updateFun(patchdata)
        }
    }, [value, postdata, patchdata, count])

    //back to home
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="User Group Master"
            submit={submitUserGroup}
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}  >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12}  >
                                <TextFieldCustom
                                    placeholder="User Group Name"
                                    type="text"
                                    size="sm"
                                    name="usergrp_name"
                                    value={usergrp_name}
                                    onchange={updateUsergrp}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2} >
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="usergrp_status"
                                    variant="outlined"
                                    value={usergrp_status}
                                    checked={usergrp_status}
                                    onCheked={updateUsergrp} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <UserGroupTable count={count} geteditdata={geteditdata} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster >
    )
}

export default UserGroupMast