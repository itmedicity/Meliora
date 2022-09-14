import React, { useCallback, useMemo, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useHistory } from 'react-router-dom';
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import SelectDiet from 'src/views/CommonSelectCode/SelectDiet';
import DietMenuSettingTable from './DietMenuSettingTable';
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SelectItemmaster from 'src/views/CommonSelectCode/SelectItemmaster';
import ItemgrpSelect from 'src/views/CommonSelectCode/ItemgrpSelect'
import SelectDietType from 'src/views/CommonSelectCode/SelectDietType';
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode';
import { axioslogin } from 'src/views/Axios/Axios';
import { useSelector } from 'react-redux'
const DietMenuSetting = () => {
    const history = useHistory();
    const [edit, setEdit] = useState(0)
    //state for select boxes 
    const [diet, setDiet] = useState(0);
    const [item, setItem] = useState(0);
    const [group, setGroup] = useState(0);
    const [type, setType] = useState(0);
    const [day, setDay] = useState(0);
    const [count, setCount] = useState(0);
    const [dietmenu, setDietmenu] = useState({
        order_req: false,
        status: false,
        qty: '',
        unit: '',
        rate_hos: '',
        rate_cant: '',
        dmenu_slno: ''
    })
    //destructuring
    const { order_req, status, qty, unit, rate_hos, rate_cant, dmenu_slno } = dietmenu
    const updateDietmenu = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDietmenu({ ...dietmenu, [e.target.name]: value })
    }, [dietmenu])
    // Get login user emp_id
    const id = useSelector((state) => {
        return state.LoginUserData.empid
    })
    //data for insert
    const postdata = useMemo(() => {
        return {
            diet_slno: diet,
            grp_slno: group,
            item_slno: item,
            type_slno: type,
            days: day,
            qty: qty,
            unit: unit,
            rate_hos: rate_hos,
            rate_cant: rate_cant,
            em_id: id,
            status: status === true ? 1 : 0,
            order_req: order_req === true ? 1 : 0
        }
    }, [diet, group, item, type, day, qty, unit, rate_hos, rate_cant, status, order_req, id])
    const rowSelect = useCallback((params) => {
        setEdit(1);
        const data = params.api.getSelectedRows();
        const { grp_slno, item_slno, type_slno, days, qty, unit, rate_hos, rate_cant, status, diet_slno, order_req, dmenu_slno } = data[0]
        const frmdata = {
            dmenu_slno: dmenu_slno,
            qty: qty,
            unit: unit,
            rate_hos: rate_hos,
            rate_cant: rate_cant,
            status: status === 1 ? true : false,
            order_req: order_req === 1 ? true : false
        }
        setDietmenu(frmdata)
        setGroup(grp_slno)
        setItem(item_slno)
        setType(type_slno)
        setDay(days)
        setDiet(diet_slno)
    }, [])
    const patchdata = useMemo(() => {
        return {
            diet_slno: diet,
            grp_slno: group,
            item_slno: item,
            type_slno: type,
            days: day,
            qty: qty,
            unit: unit,
            rate_hos: rate_hos,
            rate_cant: rate_cant,
            em_id: id,
            status: status === true ? 1 : 0,
            order_req: order_req === true ? 1 : 0,
            dmenu_slno: dmenu_slno
        }
    }, [diet, group, item, type, day, qty, unit, rate_hos, rate_cant, status, order_req, dmenu_slno, id])
    const reset = () => {
        setDiet(0);
        setItem(0);
        setGroup(0);
        setType(0);
        setDay(0)
    }
    /*** usecallback function for form submitting */
    const submitDiettype = useCallback((e) => {
        e.preventDefault();
        const formReset = {
            order_req: false,
            status: false,
            qty: '',
            unit: '',
            rate_hos: '',
            rate_cant: '',
            dmenu_slno: ''
        }
        /*** * insert function for use call back     */
        const InsertData = async (postdata) => {
            const result = await axioslogin.post(`/dietmenudtl`, postdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                setDietmenu(formReset)
                reset();
            } else if (success === 0) {
                infoNotify(message)
            }
            else {
                infoNotify(message)
            }
        }
        // /***  * update function for use call back     */
        const updateData = async (patchdata) => {
            const result = await axioslogin.patch('/dietmenudtl/update', patchdata)
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1)
                setEdit(0)
                setDietmenu(formReset);
                reset();
            } else if (success === 0) {
                infoNotify(message)
            } else {
                infoNotify(message)
            }
        }
        if (edit === 0) {
            InsertData(postdata)
        }
        else {
            updateData(patchdata)
        }
    }, [postdata, count, edit, patchdata])
    //Refresh function
    const refreshWindow = useCallback(() => {
        const formReset = {
            order_req: false,
            status: false,
            qty: '',
            unit: '',
            rate_hos: '',
            rate_cant: '',
            dmenu_slno: ''
        }
        setDietmenu(formReset)
        setEdit(0)
        reset()
    }, [])
    //Close function
    const backToSettings = useCallback(() => {
        history.push(`/Home/Settings`)
    }, [history])
    return (
        <CardMaster
            title="Diet Menu Setting"
            close={backToSettings}
            submit={submitDiettype}
            refresh={refreshWindow}
        >
            <Box sx={{ pl: 2, pt: 2, pb: 1, pr: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={3}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <SelectDiet value={diet} setValue={setDiet} />
                            </Grid>
                            <Grid item xl={12} lg={12} >
                                <SelectDietType value={type} setValue={setType} />
                            </Grid>
                            <Grid item xl={12} lg={12} >
                                <ItemgrpSelect value={group} setValue={setGroup} />
                            </Grid>
                            <Grid item xl={12} lg={12} >
                                <SelectItemmaster value={item} setValue={setItem} />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <Box sx={{}} >
                                    <FormControl fullWidth size="small"  >
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={day}
                                            onChange={(e) => setDay(e.target.value)}
                                            size="small"
                                            fullWidth
                                            variant='outlined'
                                            sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                                        >
                                            <MenuItem value={0} disabled  >Select Days</MenuItem>
                                            <MenuItem value={1}  >Monday</MenuItem>
                                            <MenuItem value={2}  >Tuesday</MenuItem>
                                            <MenuItem value={3}  >Wednesday</MenuItem>
                                            <MenuItem value={4}  >Thursday</MenuItem>
                                            <MenuItem value={5}  >Friday</MenuItem>
                                            <MenuItem value={6}  >Saturday</MenuItem>
                                            <MenuItem value={7}  >Sunday</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Box >
                            </Grid>
                            <Grid item xl={6} lg={6}>
                                <TextFieldCustom
                                    placeholder="Quantity"
                                    type="text"
                                    size="sm"
                                    name="qty"
                                    value={qty}
                                    onchange={updateDietmenu}
                                    style={{ mt: 0 }}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6}>
                                <TextFieldCustom
                                    placeholder="Unit"
                                    type="text"
                                    size="sm"
                                    name="unit"
                                    value={unit}
                                    onchange={updateDietmenu}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} >
                                <TextFieldCustom
                                    placeholder="Hospital rate"
                                    type="text"
                                    size="sm"
                                    name="rate_hos"
                                    value={rate_hos}
                                    onchange={updateDietmenu}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6}>
                                <TextFieldCustom
                                    placeholder="Canteen rate"
                                    type="text"
                                    size="sm"
                                    name="rate_cant"
                                    value={rate_cant}
                                    onchange={updateDietmenu}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Order request"
                                    color="primary"
                                    size="md"
                                    name="order_req"
                                    value={order_req}
                                    checked={order_req}
                                    onCheked={updateDietmenu}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    value={status}
                                    checked={status}
                                    onCheked={updateDietmenu}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xl={9} lg={9}>
                        <DietMenuSettingTable rowSelect={rowSelect} count={count} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default DietMenuSetting