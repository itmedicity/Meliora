
import { Grid } from '@mui/material'
import React, { useCallback, useMemo, useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux';
import { useInidentNatuer } from 'src/views/IncidentManagement/CommonComponent/useQuery'
import IncidentNatureTable from './IncidentNatureTable'

const IncidentNature = () => {

    const [value, setvalue] = useState(0)
    const history = useNavigate();
    const {
        data: NatureofIncident = [],
        refetch: FetchAllNatureofIncident
    } = useInidentNatuer();

    //Initializing
    const [incidentNature, setIncidentNature] = useState({
        inc_nature_name: '',
        inc_nature_status: false,
        inc_nature_slno: 0
    })
    //Destructuring
    const { inc_nature_name, inc_nature_status, inc_nature_slno } = incidentNature;


    const updateInciCategory = useCallback(e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setIncidentNature({ ...incidentNature, [e.target.name]: value })
    }, [incidentNature]);

    // Get login user emp_id
    const id = useSelector(state => {
        return state.LoginUserData.empid
    })
    //data for insert
    const postdata = useMemo(() => {
        return {
            inc_nature_name: inc_nature_name,
            inc_nature_status: inc_nature_status === true ? 1 : 0,
            create_user: id
        }
    }, [inc_nature_name, inc_nature_status, id])


    //data set for edit
    const rowSelect = useCallback((row) => {
        if (!row) return;

        setvalue(1);

        const {
            inc_nature_name,
            inc_nature_status,
            inc_nature_slno
        } = row;

        setIncidentNature({
            inc_nature_name,
            inc_nature_status: inc_nature_status === 1 ? true : false,
            inc_nature_slno
        });
    }, []);



    //data for update
    const patchdata = useMemo(() => {
        return {
            inc_nature_name: inc_nature_name,
            inc_nature_status: inc_nature_status === true ? 1 : 0,
            edit_user: id,
            inc_nature_slno: inc_nature_slno
        }
    }, [inc_nature_name, inc_nature_status, id, inc_nature_slno]);



    /*** usecallback function for form submitting */
    const submitUserGroup = useCallback(
        e => {
            e.preventDefault()
            /*** reset from */
            const formreset = {
                inc_nature_name: '',
                inc_nature_status: false,
                inc_nature_slno: 0
            }
            /***     * insert function for use call back     */


            if (inc_nature_name === "") return warningNotify("Please enter the Nature of Incident");

            const InsertFun = async postdata => {
                const result = await axioslogin.post('/incidentMaster/insertNature', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    FetchAllNatureofIncident()
                    setIncidentNature(formreset)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            /***  * update function for use call back     */
            const updateFun = async patchdata => {
                const result = await axioslogin.patch('/incidentMaster/updateNature', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    FetchAllNatureofIncident()
                    setIncidentNature(formreset)
                    setvalue(0)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }

            /*** value=0 insert api call work else update call
             * value initialy '0' when edit button click value changes to '1'
             */
            if (value === 0) {
                InsertFun(postdata)
            } else {
                updateFun(patchdata)
            }
        },
        [value, postdata, patchdata]
    )
    //back to home
    const backtoSetting = useCallback(() => {
        history('/Home/Settings')
    }, [history])
    //refresh
    const refreshWindow = useCallback(() => {
        const formreset = {
            inc_nature_name: '',
            inc_nature_status: false,
            inc_nature_slno: 0
        }
        setIncidentNature(formreset)
        setvalue(0)
    }, [setIncidentNature]);


    return (
        <CardMaster
            title="Nature of Incident Master"
            submit={submitUserGroup}
            close={backtoSetting}
            refresh={refreshWindow}>

            <Box sx={{ p: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={4} lg={4}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Incident Category Name"
                                    type="text"
                                    size="sm"
                                    name="inc_nature_name"
                                    value={inc_nature_name}
                                    onchange={updateInciCategory}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="inc_nature_status"
                                    variant="outlined"
                                    value={inc_nature_status}
                                    checked={inc_nature_status}
                                    onCheked={updateInciCategory}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8}>
                        <IncidentNatureTable tableData={NatureofIncident} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>


        </CardMaster>
    )
}
export default memo(IncidentNature)
