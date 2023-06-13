import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartemployee } from 'src/redux/actions/DeptwiseEmp.action'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import CustomeToolTip from '../Components/CustomeToolTip';
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
            <CustomeToolTip title="Select Employee">
                <FormControl fullWidth >
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        multiple
                        value={personName}
                        onChange={handleChange}
                        variant='outlined'
                        sx={{ height: 30, p: 0, m: 0, lineHeight: 1.200 }}
                    >
                        <MenuItem value={0} disabled >Select Department Section</MenuItem>
                        {
                            deptwiseemp && deptwiseemp.map((name) => {
                                return (
                                    <MenuItem
                                        key={name.em_id}
                                        value={name.em_id}
                                    >
                                        {name.em_name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
            </CustomeToolTip>
        </Box >
    )
}
export default memo(DeptWiseEmpSelect)