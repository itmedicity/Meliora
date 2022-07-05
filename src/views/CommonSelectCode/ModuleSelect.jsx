import React, { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getmodule } from "src/redux/actions/Module.action";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ModuleSelect = () => {
    const [module, setModule] = useState('0');
    const dispatch = useDispatch()
    /*** getModuleName -state update function of reducer 
     * moduleNameSelect- initial state of reducer function
     * moduledata is used to list select box items by using map
    */
    const moduledata = useSelector((state) => {
        return state.getModuleName.moduleNameSelect
    })
    // getUserGroup function is used to update data in usergroup redux
    useEffect(() => {
        dispatch(getmodule())
    }, [dispatch])

    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{ height: 25, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled >Select Module</MenuItem>
                    {
                        moduledata && moduledata.map((val, index) => {
                            return <MenuItem key={index} value={val.module_slno}>{val.module_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(ModuleSelect)