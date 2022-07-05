import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import ModuleTable from './ModuleTable'
import { Box } from '@mui/system'
import { Grid } from '@mui/material'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'

const ModuleMaster = () => {
    const [value, setvalue] = useState(0)
    const [count, setCount] = useState(0)
    const history = useHistory()

    //Initializing
    const [module, setModule] = useState({
        module_name: '',
        module_status: false,
        module_slno: ''
    })

    //Destructuring
    const { module_name, module_status, module_slno } = module;
    const updateModule = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setModule({ ...module, [e.target.name]: value })
    }

    //Insert data
    const postdata = {
        module_name: module_name,
        module_status: module_status === true ? 1 : 0
    }
    //Update data
    const patchdata = {
        module_name: module_name,
        module_status: module_status === true ? 1 : 0,
        module_slno: module_slno
    }
    //reset from
    const formreset = {
        module_name: '',
        module_status: false,
        module_slno: ''
    }

    //Data set for edit
    const geteditdata = async (dataa) => {
        setvalue(1)
        const { module_slno } = dataa
        const result = await axioslogin.get(`/modulemaster/${module_slno}`)
        const { success, data } = result.data
        if (success === 1) {
            const { module_name, module_status, module_slno } = data[0]
            const frmdata = {
                module_name: module_name,
                module_status: module_status === 1 ? true : false,
                module_slno: module_slno
            }
            setModule(frmdata)
        }
    }

    //Form Submitting
    const submitModule = async (e) => {
        e.preventDefault();
        if (value === 0) {
            const result = await axioslogin.post('/modulemaster', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setModule(formreset);
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            } else {
                infoNotify(message)
            }
        }
        else {
            const result = await axioslogin.patch('/modulemaster', patchdata)
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1)
                setModule(formreset);
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
            title="Module Master"
            submit={submitModule}
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
                                    name="module_name"
                                    value={module_name}
                                    onchange={updateModule}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2} >
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="module_status"
                                    variant="outlined"
                                    value={module_status}
                                    checked={module_status}
                                    onCheked={updateModule} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <ModuleTable count={count} geteditdata={geteditdata} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster >
    )
}

export default ModuleMaster