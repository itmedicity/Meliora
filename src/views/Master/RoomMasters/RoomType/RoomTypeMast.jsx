import { FormControl, Grid, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CardMaster from 'src/views/Components/CardMaster'
import CusCheckBox from 'src/views/Components/CusCheckBox';
import TextFieldCustom from 'src/views/Components/TextFieldCustom';
import RoomTypeTable from './RoomTypeTable';
const RoomTypeMast = () => {
    const history = useHistory();
    //intializing
    const [ab, setAb] = useState(0)
    const [room, setRoom] = useState({
        description: '',
        shortname: "",
        roommobile: '',
        status: false,
        icu: false,
        cmoccupy: false,
        adroom: false
    })
    //destructuring
    const { description, shortname, roommobile, status, icu, cmoccupy, adroom } = room
    const updateRoomtype = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setRoom({ ...room, [e.target.name]: value })
    }, [room])
    //close button function
    const backtoSetting = useCallback(() => {
        history.push('/Home/Settings')
    }, [history])
    return (
        <CardMaster
            title="Room Type"
            close={backtoSetting}
        >
            <Box sx={{ p: 1 }}>
                <Grid container spacing={1} >
                    <Grid item xl={4} lg={4}  >
                        <Grid container spacing={1} >
                            <Grid item xl={12} lg={12} >
                                <TextFieldCustom
                                    placeholder="Description"
                                    type="text"
                                    size="sm"
                                    name="description"
                                    value={description}
                                    onchange={updateRoomtype}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Short Name"
                                    type="text"
                                    size="sm"
                                    name="shortname"
                                    value={shortname}
                                    onchange={updateRoomtype}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12} sx={{ mt: 1 }}>
                                < FormControl fullWidth size="small" >
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size="small"
                                        fullWidth
                                        variant='outlined'
                                        label="select"
                                        value={ab}
                                        sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                                        onChange={(e) => setAb(e.target.value)}
                                    >
                                        <MenuItem value={0} label="Room Category" disabled>Room Category</MenuItem>
                                        <MenuItem>Ac</MenuItem>
                                        <MenuItem>Delexue Room</MenuItem>
                                        <MenuItem>Normal Room</MenuItem>
                                        <MenuItem>Bed</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xl={12} lg={4} sx={{ mt: 1 }}>
                                < FormControl fullWidth size="small" >
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size="small"
                                        fullWidth
                                        variant='outlined'
                                        label="select"
                                        value={ab}
                                        sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                                    >
                                        <MenuItem value={0} disabled> Colour</MenuItem>
                                        <MenuItem>Red</MenuItem>
                                        <MenuItem>Orange</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xl={12} lg={12} sx={{ mt: 1 }}>
                                < FormControl fullWidth size="small" >
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size="small"
                                        fullWidth
                                        variant='outlined'
                                        label="Age"
                                        value={ab}
                                        sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                                    >
                                        <MenuItem value={0} disabled> Bed Release From	</MenuItem>
                                        <MenuItem>Inpatient</MenuItem>
                                        <MenuItem>Nursing Station</MenuItem>
                                        <MenuItem>House Keeping</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={12} xl={12}>
                                <CusCheckBox
                                    label="Icu"
                                    color="primary"
                                    size="md"
                                    name="icu"
                                    value={icu}
                                    checked={icu}
                                    onCheked={updateRoomtype}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12}>
                                <CusCheckBox
                                    label="Common Occupy"
                                    color="primary"
                                    size="md"
                                    name="cmoccupy"
                                    value={cmoccupy}
                                    checked={cmoccupy}
                                    onCheked={updateRoomtype}
                                />
                            </Grid>
                            <Grid item lg={12} xl={12}>
                                <CusCheckBox
                                    label="Admitted Room Category Wise Rate Required"
                                    color="primary"
                                    size="md"
                                    name="adroom"
                                    value={adroom}
                                    checked={adroom}
                                    onCheked={updateRoomtype}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12}>
                                <TextFieldCustom
                                    placeholder="Room Incharge Mobile"
                                    type="text"
                                    size="sm"
                                    name="roommobile"
                                    value={roommobile}
                                    onchange={updateRoomtype}
                                />
                            </Grid>
                            <Grid item xl={12} lg={12} sx={{ mt: 1 }}>
                                < FormControl fullWidth size="small" >
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        size="small"
                                        fullWidth
                                        variant='outlined'
                                        label="Shared Room Type For Shared Bed"
                                        value={ab}

                                        sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                                    >
                                        <MenuItem value={0} disabled> Shared Room Type For Shared Bed	</MenuItem>
                                        <MenuItem>A/C room</MenuItem>
                                        <MenuItem> A/C delexue</MenuItem>
                                        <MenuItem>Covid Ward</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item lg={12} xl={12} sx={{ mt: 1 }}>
                                <CusCheckBox
                                    label="Status"
                                    color="primary"
                                    size="md"
                                    name="status"
                                    value={status}
                                    checked={status}
                                    onCheked={updateRoomtype}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={8} xl={8} >
                        <RoomTypeTable />
                    </Grid>
                </Grid>
            </Box>
        </CardMaster>
    )
}
export default RoomTypeMast