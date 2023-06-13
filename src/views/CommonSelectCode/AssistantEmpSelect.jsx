import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from 'react-redux';
import { getAssistantemployee } from 'src/redux/actions/AssistantEmp.action'
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
const AssistantEmpSelect = ({ postdata, value, setValue }) => {
    const dispatch = useDispatch();

    const assistantemp = useSelector((state) => {
        return state.getAssistantemployee.assistantempList || 0
    })
    useEffect(() => {
        dispatch(getAssistantemployee(postdata))
    }, [dispatch, postdata])

    const handleChange = (e) => {
        const {
            target: { value }
        } = e;
        setValue(
            // On autofill we get a the stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <Box >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                    multiple
                    variant='outlined'
                    sx={{ height: 30, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Employee</MenuItem>
                    {
                        assistantemp && assistantemp.map((val, index) => {
                            return <MenuItem key={index} value={val.em_id}>{val.em_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box>
    )
}
export default memo(AssistantEmpSelect)