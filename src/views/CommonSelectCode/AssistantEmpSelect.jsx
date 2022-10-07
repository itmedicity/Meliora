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
    return (
        <Box >
            {/* <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Employee</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    // value={personName}
                    // onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                //   MenuProps={MenuProps}
                >
                    {assistantemp.map((name) => {
                        return (
                            <MenuItem
                                key={name.em_id}
                            // value={name.em_id}
                            // style={getStyles(name, personName, theme)}
                            >
                                {name.em_name}
                            </MenuItem>
                        );
                    })}

                </Select>
            </FormControl> */}
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