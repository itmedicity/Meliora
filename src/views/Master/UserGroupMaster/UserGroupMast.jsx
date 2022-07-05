import { Grid } from '@mui/material'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
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
    const updateUsergrp = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUsergrp({ ...usergrp, [e.target.name]: value })
    }

    //submitt data
    const postdata = {
        user_grp_name: usergrp_name,
        user_grp_status: usergrp_status === true ? 1 : 0
    }

    //submitt update data
    const patchdata = {
        user_grp_name: usergrp_name,
        user_grp_status: usergrp_status === true ? 1 : 0,
        user_grp_slno: user_grp_slno
    }
    //reset from
    const formreset = {
        usergrp_name: '',
        usergrp_status: false,
        user_grp_slno: ''
    }

    //Data set for edit
    const geteditdata = async (dataa) => {
        setvalue(1)
        const { user_grp_slno } = dataa
        const result = await axioslogin.get(`/usergroup/${user_grp_slno}`)
        const { success, data } = result.data
        if (success === 1) {
            const { user_grp_name, user_grp_status, user_grp_slno } = data[0]
            const frmdata = {
                usergrp_name: user_grp_name,
                usergrp_status: user_grp_status === 1 ? true : false,
                user_grp_slno: user_grp_slno
            }
            setUsergrp(frmdata)
        }
    }
    //Form Submitting
    const submitUserGroup = async (e) => {
        e.preventDefault();
        if (value === 0) {
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
        else {
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
    }

    //back to home
    const backtoSetting = () => {
        history.push('/Home/Settings')
    }

    return (

        <CardMaster
            title="User Group Master"
            submit={submitUserGroup}
            close={backtoSetting}
        >
            <Box>
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