import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setNurseStationMeli } from "src/redux/actions/NuseStationMeli.action";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const NursingStationMeliSelect = ({ value, setValue }) => {
    const dispatch = useDispatch()
    /*** getNusringStation -state update function of reducer 
     * nusreStationList- initial state of reducer function
     * nursestationdata is used to list select box items by using map
    */
    const nursestationdata = useSelector((state) => {
        return state.getNusringStationMeli.nusreStationList || 0
    })
    // setNurseStationMeli function is used to update data in usergroup redux
    useEffect(() => {
        dispatch(setNurseStationMeli())
    }, [dispatch])

    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{ height: 25, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled >Select Nursing Station</MenuItem>
                    {
                        nursestationdata && nursestationdata.map((val, index) => {
                            return <MenuItem key={index} value={val.co_ora_nurse}>{val.co_nurse_desc}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(NursingStationMeliSelect)