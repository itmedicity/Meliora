import { Box, Grid } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import EmpNameSelect from 'src/views/CommonSelectCode/EmpNameSelect'
import CardMaster from 'src/views/Components/CardMaster'
import { useHistory } from 'react-router-dom'
import ModuleGroupSelect from 'src/views/CommonSelectCode/ModuleGroupSelect'
import UserGroupSelect from 'src/views/CommonSelectCode/UserGroupSelect'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import ModuleGroupRightTable from './ModuleGroupRightTable'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import { axioslogin } from 'src/views/Axios/Axios'

const ModuleUserRight = () => {
    const history = useHistory();
    //Initializing
    const [empname, setEmpname] = useState(0)
    const [modulegroup, setmodulegroup] = useState(0)
    const [usergroup, setUsergroup] = useState(0)
    const [ModRightStatus, setModRightStatus] = useState({
        status: false,
        mod_grp_user_slno: 0
    })
    const [value, setValue] = useState(0)
    const [count, setCount] = useState(0)
    //Destructuring
    const { status, mod_grp_user_slno } = ModRightStatus
    const updateModule = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setModRightStatus({ ...ModRightStatus, [e.target.name]: value })
    }, [ModRightStatus])

    // data for insert
    const postdata = useMemo(() => {
        return {
            emp_slno: empname,
            mod_grp_slno: modulegroup,
            user_group_slno: usergroup,
            mod_grp_user_status: status === true ? 1 : 0
        }
    }, [empname, modulegroup, usergroup, status])

    // data for updaate
    const patchdata = useMemo(() => {
        return {
            emp_slno: empname,
            mod_grp_slno: modulegroup,
            user_group_slno: usergroup,
            mod_grp_user_status: status === true ? 1 : 0,
            mod_grp_user_slno: mod_grp_user_slno
        }
    }, [empname, modulegroup, usergroup, status, mod_grp_user_slno])

    //Reset Function 
    const reset = () => {
        setEmpname(0)
        setmodulegroup(0)
        setUsergroup(0)
        setValue(0)
    }

    const [moduleGrpslno, setModuleGrpslno] = useState([])
    const [editData, SetEditdata] = useState([])
    /***get row data from agGrid when edit button click
     * value set 1 for edit     */
    const geteditdata = (event) => {
        setValue(1)
        SetEditdata(event.api.getSelectedRows())
    }
    //For get slno from selected row  
    useEffect(() => {
        const slno = editData && editData.map((val, index) => {
            return val.mod_grp_user_slno
        })
        setModuleGrpslno(slno)
    }, [editData])

    /*** get data from module_master where selected slno for edit and also data set to corresponding feilds*/
    useEffect(() => {
        if (moduleGrpslno.length !== 0) {
            const getdataaa = async () => {
                const result = await axioslogin.post('/modulegroupright/getById', moduleGrpslno)
                const { success, data } = result.data;
                if (success === 1) {
                    const { emp_slno, mod_grp_slno, user_group_slno, mod_grp_user_status, mod_grp_user_slno } = data[0]
                    const frmdata = {
                        status: mod_grp_user_status === 1 ? true : false,
                        mod_grp_user_slno: mod_grp_user_slno
                    }
                    setModRightStatus(frmdata)
                    setEmpname(emp_slno)
                    setmodulegroup(mod_grp_slno)
                    setUsergroup(user_group_slno)
                }
                else {
                    warningNotify("Error occured please contact EDP")
                }
            }
            getdataaa()
        }
    }, [moduleGrpslno])

    /*** usecallback function for form submitting form */
    const submitModuleUserGroupRight = useCallback((e) => {
        e.preventDefault();
        /*** Reset fromdata */
        const resetfrm = {
            status: false,
            mod_grp_user_slno: 0
        }
        /*** Insert Function */
        const InsertFun = async (postdata) => {
            const result = await axioslogin.post('/modulegroupright', postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                reset()
                setModRightStatus(resetfrm)
            } else if (success === 0) {
                infoNotify(message.sqlMessage);
            } else {
                infoNotify(message)
            }
        }
        const updateFun = async (patchdata) => {
            const result = await axioslogin.patch('/modulegroupright', patchdata)
            const { message, success } = result.data;
            if (success === 2) {
                succesNotify(message)
                setCount(count + 1);
                reset()
                setModRightStatus(resetfrm)
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

    }, [postdata, count, patchdata, value])

    //back to home
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])


    return (
        <CardMaster
            title="User Group Master"
            submit={submitModuleUserGroupRight}
            close={backtoSetting}
        >
            <Box sx={{ pl: 2, pt: 2, pb: 1, pr: 1 }}>
                <Grid container spacing={1}  >
                    <Grid item xl={3} lg={3}  >
                        <Grid container spacing={1} sx={{ pb: 1 }}>
                            <Grid item xl={12} lg={12}  >
                                <EmpNameSelect value={empname} setValue={setEmpname} />
                            </Grid>
                            <Grid item xl={12} lg={12}  >
                                <ModuleGroupSelect value={modulegroup} setValue={setmodulegroup} />
                            </Grid>
                            <Grid item xl={12} lg={12}  >
                                <UserGroupSelect value={usergroup} setValue={setUsergroup} />
                            </Grid>
                            <Grid item lg={2} xl={2} >
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    variant="outlined"
                                    value={status}
                                    checked={status}
                                    onCheked={updateModule}
                                />
                            </Grid>
                        </Grid>

                    </Grid>
                    <Grid item xl={9} lg={9}  >
                        <ModuleGroupRightTable count={count} geteditdata={geteditdata} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}

export default ModuleUserRight