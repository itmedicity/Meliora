import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import CardTwo from 'src/views/Components/CardTwo'
import CheckBox from 'src/views/Components/CheckBox'
import TextInput from 'src/views/Components/TextInput'
import UserGroupTable from './UserGroupTable'

const UserGroupMast = () => {
    const [count, setCount] = useState(0)
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

    //submitt data
    const postdata = {
        user_grp_name: usergrp_name,
        user_grp_status: usergrp_status === true ? 1 : 0
    }
    //reset from
    const formreset = {
        usergrp_name: '',
        usergrp_status: false
    }
    //Form Submitting
    const submitUserGroup = async (e) => {
        e.preventDefault();
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
                        <UserGroupTable count={count} />
                    </div>
                </div>
            </div>
        </CardTwo >
    )
}

export default UserGroupMast