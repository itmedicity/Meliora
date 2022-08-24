import { Box, Grid } from '@mui/material'
import React, { useState, useCallback, useMemo } from 'react'
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import ItemgrpSelect from 'src/views/CommonSelectCode/ItemgrpSelect'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNotify, succesNotify } from 'src/views/Common/CommonCode'
import ItemMasterTable from './ItemMasterTable'

const ItemMaster = () => {
    const history = useHistory();
    //state for table render
    const [count, setCount] = useState(0);
    //state for edit
    const [value, setValue] = useState(0)
    const [grpslno, setgrpslno] = useState(0)
    //intilizing
    const [item, setItem] = useState({
        item_name: '',
        rate: '',
        rate_hosp: '',
        qty: '',
        unit: '',
        diet_item: false,
        status: false,
        em_id: '',
    })
    //Destructuring
    const { item_name, rate, rate_hosp, qty, unit, diet_item, status, em_id, item_slno } = item
    const updateitem = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setItem({ ...item, [e.target.name]: value })
    }, [item])
    //data for insert
    const postdata = useMemo(() => {
        return {
            item_name: item_name,
            grp_slno: grpslno,
            rate: rate,
            rate_hosp: rate_hosp,
            qty: qty,
            unit: unit,
            diet_item: diet_item === true ? 1 : 0,
            status: status === true ? 1 : 0,
            em_id: 1

        }
    }, [item_name, rate, rate_hosp, qty, unit, diet_item, status, grpslno,])

    //edit data setting on textfields
    const rowSelect = useCallback((params) => {
        setValue(1)
        const data = params.api.getSelectedRows()
        const { item_name, grp_slno, rate, rate_hosp, qty, unit, diet_item, status, em_id, item_slno } = data[0]
        const frmdata = {
            item_name: item_name,
            rate: rate,
            rate_hosp: rate_hosp,
            qty: qty,
            unit: unit,
            diet_item: diet_item === 1 ? true : false,
            status: status === 1 ? true : false,
            em_id: em_id,
            item_slno: item_slno
        }
        setItem(frmdata)
        setgrpslno(grp_slno)
    }, [])

    //data for update
    const patchdata = useMemo(() => {
        return {
            item_name: item_name,
            grp_slno: grpslno,
            rate: rate,
            rate_hosp: rate_hosp,
            qty: qty,
            unit: unit,
            diet_item: diet_item === true ? 1 : 0,
            status: status === true ? 1 : 0,
            em_id: em_id,
            item_slno: item_slno
        }
    }, [item_name, grpslno, rate, rate_hosp, qty, unit, diet_item, status, em_id, item_slno])

    /*** usecallback function for form submitting */
    const submititem = useCallback((e) => {
        e.preventDefault();
        const formreset = {
            item_name: '',
            grp_slno: '',
            group_name: '',
            rate: '',
            rate_hosp: '',
            qty: '',
            unit: '',
            diet_item: false,
            status: false,
            em_id: '',
            item_slno: ''
        }
        /***    * insert function for use call back     */
        const Insertitem = async (postdata) => {
            const result = await axioslogin.post('/kotitem/insert', postdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setItem(formreset);
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /***  * update function for use call back     */
        const updateitem = async (patchdata) => {
            const result = await axioslogin.patch('/kotitem/update/kotitem', patchdata);
            const { message, success } = result.data;
            if (success === 1) {
                succesNotify(message)
                setCount(count + 1);
                setValue(0)
                setItem(formreset);
            } else if (success === 0) {
                infoNotify(message);
            }
            else {
                infoNotify(message)
            }
        }
        /*** value=0 insert api call work else update call
        * value initialy '0' when edit button click value changes to '1'
        */
        if (value === 0) {
            Insertitem(postdata)
        } else {
            updateitem(patchdata)
        }
    }, [value, postdata, patchdata, count])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    //referesh func
    const refreshWindow = useCallback(() => {
        const formreset = {
            item_name: '',
            grp_slno: '',
            rate: '',
            rate_hosp: '',
            qty: '',
            unit: '',
            diet_item: false,
            status: false,
            item_slno: ''
        }
        setItem(formreset)
        setValue(0);
        setgrpslno(0)
    }, [setItem])

    return (
        <CardMaster
            title="Item Master"
            submit={submititem}
            close={backtoSetting}
            refresh={refreshWindow}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Item name"
                                    type="text"
                                    size="sm"
                                    name="item_name"
                                    value={item_name}
                                    onchange={updateitem}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}  >
                                <ItemgrpSelect value={grpslno} setValue={setgrpslno} />
                            </Grid>
                            <Grid item xl={6} lg={6} >
                                <TextFieldCustom
                                    placeholder="Cateen Rate"
                                    type="text"
                                    size="sm"
                                    name="rate"
                                    value={rate}
                                    onchange={updateitem}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} >
                                <TextFieldCustom
                                    placeholder="Hospital rate"
                                    type="text"
                                    size="sm"
                                    name="rate_hosp"
                                    value={rate_hosp}
                                    onchange={updateitem}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} >
                                <TextFieldCustom
                                    placeholder="Quantity"
                                    type="text"
                                    size="sm"
                                    name="qty"
                                    value={qty}
                                    onchange={updateitem}
                                />
                            </Grid>
                            <Grid item xl={6} lg={6} >
                                <TextFieldCustom
                                    placeholder="Unit"
                                    type="text"
                                    size="sm"
                                    name="unit"
                                    value={unit}
                                    onchange={updateitem}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12}>
                                <CusCheckBox
                                    label="Diet Item"
                                    color="primary"
                                    size="md"
                                    name="diet_item"
                                    value={diet_item}
                                    checked={diet_item}
                                    onCheked={updateitem}
                                />
                            </Grid>
                            <Grid item lg={2} xl={2}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    value={status}
                                    checked={status}
                                    onCheked={updateitem}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <ItemMasterTable count={count} rowSelect={rowSelect} />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}

export default ItemMaster