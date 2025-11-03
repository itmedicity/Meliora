import { Grid } from '@mui/material'
import React, { useCallback, useMemo, useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify, warningNotify } from 'src/views/Common/CommonCode'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import IncidentCategoryTable from './IncidentCategoryTable'
import { Box } from '@mui/system'
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query'
import { getAllIncidentCategory } from '../CommonCode/IncidentCommonCode'

const IncidentCategoryMaster = () => {

    const [value, setvalue] = useState(0)
    const history = useNavigate();

    //Initializing
    const [incicategory, setInciCategory] = useState({
        incicat_name: '',
        incicat_status: false,
        incident_category_slno: 0
    })
    //Destructuring
    const { incicat_name, incicat_status, incident_category_slno } = incicategory;


    const updateInciCategory = useCallback(e => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        setInciCategory({ ...incicategory, [e.target.name]: value })
    }, [incicategory]);

    // Get login user emp_id
    const id = useSelector(state => {
        return state.LoginUserData.empid
    })
    //data for insert
    const postdata = useMemo(() => {
        return {
            incident_category_name: incicat_name,
            incident_category_status: incicat_status === true ? 1 : 0,
            create_user: id
        }
    }, [incicat_name, incicat_status, id])


    //data set for edit
    const rowSelect = useCallback(params => {
        setvalue(1)
        const data = params.api.getSelectedRows();
        const { inc_category_name, inc_category_slno, inc_category_status } = data[0]
        const frmdata = {
            incicat_name: inc_category_name,
            incicat_status: inc_category_status === 1 ? true : false,
            incident_category_slno: inc_category_slno
        }
        setInciCategory(frmdata)
    }, []);

    //data for update
    const patchdata = useMemo(() => {
        return {
            incident_category_name: incicat_name,
            incident_category_status: incicat_status === true ? 1 : 0,
            edit_user: id,
            incident_category_slno: incident_category_slno
        }
    }, [incicat_name, incicat_status, id, incident_category_slno]);


    const {
        data: incidentcategory,
        refetch: FetchAllCategory
    } = useQuery({
        queryKey: 'getincidentcategory',
        queryFn: () => getAllIncidentCategory(),
        staleTime: Infinity
    })

    /*** usecallback function for form submitting */
    const submitUserGroup = useCallback(
        e => {
            e.preventDefault()
            /*** reset from */
            const formreset = {
                incicat_name: '',
                incicat_status: false,
                incident_category_slno: 0
            }
            /***     * insert function for use call back     */


            if (incicat_name === "") return warningNotify("Please enter the Category");

            const InsertFun = async postdata => {
                const result = await axioslogin.post('/incidentMaster/incidentcategoryinsert', postdata)
                const { message, success } = result.data
                if (success === 1) {
                    succesNotify(message)
                    FetchAllCategory()
                    setInciCategory(formreset)
                } else if (success === 0) {
                    infoNotify(message)
                } else {
                    infoNotify(message)
                }
            }
            /***  * update function for use call back     */
            const updateFun = async patchdata => {
                const result = await axioslogin.patch('/incidentMaster/incidentcategoryupdate', patchdata)
                const { message, success } = result.data
                if (success === 2) {
                    succesNotify(message)
                    FetchAllCategory()
                    setInciCategory(formreset)
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
            incicat_name: '',
            incicat_status: false,
            incident_category_slno: 0
        }
        setInciCategory(formreset)
        setvalue(0)
    }, [setInciCategory]);


    return (
        <CardMaster
            title="Incident Category Master"
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
                                    name="incicat_name"
                                    value={incicat_name}
                                    onchange={updateInciCategory}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="incicat_status"
                                    variant="outlined"
                                    value={incicat_status}
                                    checked={incicat_status}
                                    onCheked={updateInciCategory}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8}>
                        <IncidentCategoryTable tableData={incidentcategory} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>


        </CardMaster>
    )
}
export default memo(IncidentCategoryMaster)
