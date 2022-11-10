import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getDepartSecemployee } from 'src/redux/actions/EmpNameDeptSect.action'

const EmpNameDeptSecSelect = ({ value, setValue, deptsec }) => {

    const dispatch = useDispatch();
    /**getOraRoomByRoomType -state update function of reducer 
    *roomByRoomTypeList- initial state of reducer function
    *oraRoom is used to list select box items by using map
    */
    const empnameselect = useSelector((state) => {
        return state.getDepartSecemployee.departsecempList || 0
    })
    useEffect(() => {
        dispatch(getDepartSecemployee(deptsec));
    }, [dispatch, deptsec])

    return (
        <Box   >
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
                    <MenuItem value={0} disabled  >Select Employee</MenuItem>
                    {
                        empnameselect && empnameselect.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id} >{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(EmpNameDeptSecSelect)