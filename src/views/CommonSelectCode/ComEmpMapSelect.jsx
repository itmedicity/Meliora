import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getComEmpMap } from 'src/redux/actions/ComEmpMapp.action';

const ComEmpMapSelect = ({ value, setValue }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComEmpMap());
    }, [dispatch])

    const CoEmpMap = useSelector((state) => {
        return state.setComEmpMap.comEmpMapList || 0
    })
    return (
        <Box sx={{ mt: 1 }} >
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
                    <MenuItem value={0} disabled  >Select Complainttype</MenuItem>
                    {
                        CoEmpMap && CoEmpMap.map((val, index) => {
                            return <MenuItem key={index} value={val.emp_map_slno}>{val.map_section_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(ComEmpMapSelect)