import React, { useEffect, useState } from 'react'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import CardTwo from 'src/views/Components/CardTwo'
import CheckBox from 'src/views/Components/CheckBox'
import TextInput from 'src/views/Components/TextInput'
import { useHistory, useParams } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import UserGroupTable from './UserGroupTable';


const UserGroupEdit = () => {
    const { id } = useParams()
    const history = useHistory()

    //Initializing
    const [usergrp, setUsergrp] = useState({
        usergrp_name: '',
        usergrp_status: false
    })

    //Destructuring
    const { usergrp_name, usergrp_status } = usergrp;
    const updateUsergrp = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setUsergrp({ ...usergrp, [e.target.name]: value })
    }

    //Get data by id
    useEffect(() => {
        const getgroup = async () => {
            const result = await axioslogin.get(`/usergroup/${id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { user_grp_name, user_grp_status } = data[0]
                const frmdata = {
                    usergrp_name: user_grp_name,
                    usergrp_status: user_grp_status === 1 ? true : false
                }
                setUsergrp(frmdata)
            }
        }
        getgroup()
    }, [id])

    //submitt update data
    const postdata = {
        user_grp_name: usergrp_name,
        user_grp_status: usergrp_status === true ? 1 : 0,
        user_grp_slno: id
    }
    //reset from
    const formreset = {
        usergrp_name: '',
        usergrp_status: false
    }
    //Form Submitting
    const submitUserGroup = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/usergroup', postdata)
        const { message, success } = result.data;
        if (success === 2) {
            succesNotify(message)
            setUsergrp(formreset);
            history.push('/Home/Group')
        } else if (success === 0) {
            infoNotify(message.sqlMessage);
        } else {
            infoNotify(message)
        }
    }
    //Back to home
    const backtoSetting = () => {
        history.push('/Home/Settings')
    }

    return (
        <CardTwo
            heading="User Group Master"
            submit={submitUserGroup}
            close={backtoSetting}
        >
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-3">
                        <div className="col-md-12">
                            <TextInput
                                type="text"
                                classname="form-control form-control-sm"
                                Placeholder="User Group Name"
                                aria-label=".form-control-sm"
                                fullWidth
                                name="usergrp_name"
                                value={usergrp_name}
                                autoComplete="off"
                                changeTextValue={(e) => updateUsergrp(e)}
                            />
                        </div>
                        <div className="col-md-12">
                            <CheckBox
                                name="usergrp_status"
                                color="primary"
                                label="Status"
                                value={usergrp_status}
                                checked={usergrp_status}
                                onchange={(e) => updateUsergrp(e)}
                            />
                        </div>
                    </div>
                    <div className="col-md-9">
                        <UserGroupTable />
                    </div>
                </div>
            </div>
        </CardTwo >
    )
}

export default UserGroupEdit