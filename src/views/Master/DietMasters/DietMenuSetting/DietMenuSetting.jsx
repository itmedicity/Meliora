import React, { useCallback, useState } from 'react'
import { Box, Grid } from '@mui/material'
import { useHistory } from 'react-router-dom';
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox'
import SelectDiet from 'src/views/CommonSelectCode/SelectDiet';
import DietMenuSettingTable from './DietMenuSettingTable';
import Test from 'src/views/CommonSelectCode/Test';
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import SelectItemmaster from 'src/views/CommonSelectCode/SelectItemmaster';
const DietMenuSetting = () => {
    const history = useHistory();
    // const [count, setCount] = useState(0);
    const [value, setValue] = useState(0);
    const [dietmenu, setDietmenu] = useState({
        order_req: false,
        status: false,
        qty: '',
        unit: '',
        rate_hos: '',
        rate_cant: ''
    })
    //destructuring
    const { order_req, status, qty, unit, rate_hos, rate_cant } = dietmenu
    const updateDietmenu = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setDietmenu({ ...dietmenu, [e.target.name]: value })
    }, [dietmenu])
    //Close function
    const backToSettings = useCallback(() => {
        history.push(`/Home/Settings`)
    }, [history])
    return (
        <CardMaster
            title="Diet Menu Setting"
            close={backToSettings}
        >
            <Box sx={{ pl: 2, pt: 2, pb: 1, pr: 1 }}>
                <Grid container spacing={1}>
                    <Grid item xl={3} lg={3}>
                        <Grid container spacing={1}>
                            <Grid item xl={12} lg={12}>
                                <SelectDiet value={value} setValue={setValue} />
                            </Grid>
                            <Grid item xl={12} lg={12} >
                                <Test />
                            </Grid>
                            <Grid item xl={12} lg={12} >
                                <SelectItemmaster value={value} setValue={setValue} />
                            </Grid>
                            <Grid item xl={12} lg={12} >
                                <Test />
                            </Grid>
                            {/* <Grid item xl={12} lg={12} >
                                <Test />
                            </Grid> */}
                            <Grid item xl={12} lg={12}>
                                <Box sx={{}} >
                                    <FormControl fullWidth size="small"  >
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            size="small"
                                            fullWidth
                                            variant='outlined'
                                            sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                                        >
                                            <MenuItem value={0} disabled  >Select Days</MenuItem>
                                            <MenuItem value={1}  >Sunday</MenuItem>
                                            <MenuItem value={2}  >Monday</MenuItem>
                                            <MenuItem value={3}  >Tuesday</MenuItem>
                                            <MenuItem value={4}  >Wednesday</MenuItem>
                                            <MenuItem value={5}  >Thursday</MenuItem>
                                            <MenuItem value={6}  >Friday</MenuItem>
                                            <MenuItem value={7}  >Saturday</MenuItem>
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
                        <DietMenuSettingTable />
                    </Grid>
                </Grid>
            </Box>

        </CardMaster>
    )
}

export default DietMenuSetting