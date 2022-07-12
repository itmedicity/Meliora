import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setModuleGroup } from "src/redux/actions/ModuleGroup.action";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ModuleGroupSelect = ({ value, setValue }) => {
    const dispatch = useDispatch()
    /*** getEmployeeName -state update function of reducer 
     * employeeNameSelect- initial state of reducer function
     * empName is used to list select box items by using map
    */
    const moduleGroupName = useSelector((state) => {
        return state.getModuleGroup.moduleGroupSelect || 0
    })
    // getUserGroup function is used to update data in usergroup redux
    useEffect(() => {
        dispatch(setModuleGroup())
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
                    <MenuItem value={0} disabled >Select Employee Name</MenuItem>
                    {
                        moduleGroupName && moduleGroupName.map((val, index) => {
                            return <MenuItem key={index} value={val.mod_grp_slno}>{val.mod_grp_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(ModuleGroupSelect)