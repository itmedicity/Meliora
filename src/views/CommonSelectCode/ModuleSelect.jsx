import React, { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getmodule } from "src/redux/actions/Module.action";
import Box from "@mui/material/Box";
import { FormControl, MenuItem, Select } from '@material-ui/core'

const ModuleSelect = () => {
    const [module, setModule] = useState('0');
    const dispatch = useDispatch()
    //Redux state
    const moduledata = useSelector((state) => {
        return state.getModuleName.moduleNameSelect
    })

    useEffect(() => {
        dispatch(getmodule())
    }, [dispatch])

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={module}
                    onChange={(e) => setModule(e.target.value)}
                    size="small"
                    fullWidth
                    variant="outlined"
                    defaultValue={0}
                    style={{ minHeight: 9, maxHeight: 25, paddingTop: 0, paddingBottom: 4 }}
                >
                    <MenuItem value={0} disabled >Select module</MenuItem>
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