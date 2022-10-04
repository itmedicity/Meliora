import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartemployee } from 'src/redux/actions/DeptwiseEmp.action'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
const DeptWiseEmpSelect = ({ value, setValue, empdeptwise }) => {
    const dispatch = useDispatch();
    /**getDepartemployee -state update function of reducer 
 *  departempList- initial state of reducer function
 *deptwiseemp is used to list select box items by using map
 */
    const deptwiseemp = useSelector((state) => {
        return state.getDepartemployee.departempList || 0
    })
    // getDepartemployee function is used to update data in  deptwiseemp redux
    useEffect(() => {
        dispatch(getDepartemployee(empdeptwise))
    }, [dispatch, empdeptwise])
    return (
        <Box >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 30, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Employee</MenuItem>
                    {
                        deptwiseemp && deptwiseemp.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(DeptWiseEmpSelect)