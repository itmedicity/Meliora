import { Grid } from '@mui/material'
import React, { useMemo, useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import CardMaster from 'src/views/Components/CardMaster'
import { Box } from '@mui/system'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import ModuleGroupTable from './ModuleGroupTable'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'

const ModuleGroupMast = () => {
    const history = useHistory()
    const [count, setCount] = useState(0)
    const [value, setvalue] = useState(0)
    /*** Initializing */
    const [moduleGroup, setModuleGroup] = useState({
        modulegrp_name: '',
        complaintManagement: false,
        requestmanag: false,
        assetmanag: false,
        wework: false,
        diet: false,
        feedback: false,
        nabh: false,
        sfanfa: false,
        mod_grp_slno: 0
    })

    /*** Destructuring */
    const { modulegrp_name, complaintManagement, requestmanag, assetmanag, wework,
        diet, feedback, nabh, sfanfa, mod_grp_slno } = moduleGroup

    /***Get values from the component */
    const updateModuleGroup = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setModuleGroup({ ...moduleGroup, [e.target.name]: value })
    }, [moduleGroup])

    /*** data for insert to module_group_mast table */
    const postdata = useMemo(() => {
        return {
            mod_grp_name: modulegrp_name,
            module_slno: {
                module_home: 1,
                module_complaint: complaintManagement === true ? 2 : 0,
                module_request: requestmanag === true ? 3 : 0,
                module_asset: assetmanag === true ? 4 : 0,
                module_wework: wework === true ? 5 : 0,
                module_diet: diet === true ? 6 : 0,
                module_feedback: feedback === true ? 7 : 0,
                module_nabh: nabh === true ? 8 : 0,
                module_sfanfa: sfanfa === true ? 9 : 0,
            }
        }
    }, [modulegrp_name, complaintManagement, requestmanag, assetmanag, wework, diet, feedback, nabh, sfanfa])

    /*** data for  update to module_group_mast table */
    const patchdata = useMemo(() => {
        return {
            mod_grp_name: modulegrp_name,
            module_slno: {
                module_home: 1,
                module_complaint: complaintManagement === true ? 2 : 0,
                module_request: requestmanag === true ? 3 : 0,
                module_asset: assetmanag === true ? 4 : 0,
                module_wework: wework === true ? 5 : 0,
                module_diet: diet === true ? 6 : 0,
                module_feedback: feedback === true ? 7 : 0,
                module_nabh: nabh === true ? 8 : 0,
                module_sfanfa: sfanfa === true ? 9 : 0,
            },
            mod_grp_slno: mod_grp_slno
        }
    }, [modulegrp_name, complaintManagement, requestmanag, assetmanag, wework, diet, feedback, nabh, sfanfa, mod_grp_slno])

    //Data set for edit
    const geteditdata = async (data) => {
        setvalue(1)
        const { mod_grp_slno, mod_grp_name, module_slno } = data
        const module_status = JSON.parse(module_slno);
        const formdata = {
            modulegrp_name: mod_grp_name,
            complaintManagement: module_status.module_complaint === 0 ? false : true,
            requestmanag: module_status.module_request === 0 ? false : true,
            assetmanag: module_status.module_asset === 0 ? false : true,
            wework: module_status.module_wework === 0 ? false : true,
            diet: module_status.module_diet === 0 ? false : true,
            feedback: module_status.module_feedback === 0 ? false : true,
            nabh: module_status.module_nabh === 0 ? false : true,
            sfanfa: module_status.module_sfanfa === 0 ? false : true,
            mod_grp_slno: mod_grp_slno
        }
        setModuleGroup(formdata)
    }

    /*** usecallback function for form submitting */
    const submitModuleGroup = useCallback((e) => {
        e.preventDefault();
        /*** form reset after insert or update */
        const formreset = {
            modulegrp_name: '',
            complaintManagement: false,
            requestmanag: false,
            assetmanag: false,
            wework: false,
            diet: false,
            feedback: false,
            nabh: false,
            sfanfa: false
        }
        /***     * insert function for use call back     */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/modulegroup', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setModuleGroup(formreset);
                setvalue(0)
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            } else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/modulegroup', patchdata)
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                setModuleGroup(formreset);
                setvalue(0)
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
    }, [postdata, patchdata, value, count])

    //back to home
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        < CardMaster
            title="Module Group Master"
            submit={submitModuleGroup}
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}  >
                    <Grid item xl={4} lg={4}  >
                        <TextFieldCustom
                            placeholder="Module Group Name"
                            type="text"
                            size="sm"
                            name="modulegrp_name"
                            value={modulegrp_name}
                            onchange={updateModuleGroup}
                        />
                        <Box sx={{ p: 1 }}>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Complaint Management"
                                    color="primary"
                                    size="md"
                                    name="complaintManagement"
                                    variant="outlined"
                                    value={complaintManagement}
                                    checked={complaintManagement}
                                    onCheked={updateModuleGroup}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Central Request Management"
                                    color="primary"
                                    size="md"
                                    name="requestmanag"
                                    variant="outlined"
                                    value={requestmanag}
                                    checked={requestmanag}
                                    onCheked={updateModuleGroup}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Asset Management"
                                    color="primary"
                                    size="md"
                                    name="assetmanag"
                                    variant="outlined"
                                    value={assetmanag}
                                    checked={assetmanag}
                                    onCheked={updateModuleGroup}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="We Work"
                                    color="primary"
                                    size="md"
                                    name="wework"
                                    variant="outlined"
                                    value={wework}
                                    checked={wework}
                                    onCheked={updateModuleGroup}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Diet"
                                    color="primary"
                                    size="md"
                                    name="diet"
                                    variant="outlined"
                                    value={diet}
                                    checked={diet}
                                    onCheked={updateModuleGroup}
                                />
                            </Grid>  <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Feed Back"
                                    color="primary"
                                    size="md"
                                    name="feedback"
                                    variant="outlined"
                                    value={feedback}
                                    checked={feedback}
                                    onCheked={updateModuleGroup}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="NABH"
                                    color="primary"
                                    size="md"
                                    name="nabh"
                                    variant="outlined"
                                    value={nabh}
                                    checked={nabh}
                                    onCheked={updateModuleGroup}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="SFANFA"
                                    color="primary"
                                    size="md"
                                    name="sfanfa"
                                    variant="outlined"
                                    value={sfanfa}
                                    checked={sfanfa}
                                    onCheked={updateModuleGroup}
                                />
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid item xl={8} lg={8}  >
                        <ModuleGroupTable count={count} geteditdata={geteditdata} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster >
    )
}

export default ModuleGroupMast