import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartemployee } from 'src/redux/actions/DeptwiseEmp.action'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
const DeptWiseEmpSelect = ({ personName, setPersonName, empdeptwise }) => {
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
    const handleChange = (e) => {
        const {
            target: { value }
        } = e;
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <Box >
            <FormControl fullWidth >
                <InputLabel id="demo-multiple-name-label"
                    sx={{ height: 30, p: 0, m: 0, lineHeight: 1.200 }}
                >Select Employee</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    size="small"
                    // fullWidth
                    multiple
                    value={personName}
                    onChange={handleChange}
                    variant='outlined'
                // input={<OutlinedInput label="Name" />}
                // sx={{ height: 25, p: 0, m: 0, lineHeight: 1.200 }}
                //   MenuProps={MenuProps}
                >
                    <MenuItem value={[]} disabled  >Select Employee</MenuItem>
                    {
                        deptwiseemp && deptwiseemp.map((name) => {
                            return (
                                <MenuItem
                                    key={name.em_id}
                                    value={name.em_id}
                                // style={getStyles(name, personName, theme)}
                                >
                                    {name.em_name}
                                </MenuItem>
                            );
                        })}
                </Select>
            </FormControl>
        </Box >
    )
}
export default memo(DeptWiseEmpSelect)