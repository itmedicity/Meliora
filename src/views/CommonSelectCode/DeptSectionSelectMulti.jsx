import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import CustomeToolTip from '../Components/CustomeToolTip';
import { getDeptsection } from 'src/redux/actions/DeptSection.action';

const DeptSectionSelectMulti = ({ deptSec, SetDeptSec }) => {

    const dispatch = useDispatch();
    /**getDepartemployee -state update function of reducer 
 *  departempList- initial state of reducer function
 *deptwiseemp is used to list select box items by using map
 */
    const deptsectiondata = useSelector((state) => {
        return state.getDeptsection.deptsectionList || 0
    })
    // getDepartemployee function is used to update data in  deptwiseemp redux
    useEffect(() => {
        dispatch(getDeptsection());
    }, [dispatch])
    const handleChange = (e) => {
        const {
            target: { value }
        } = e;
        SetDeptSec(
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
                        value={deptSec}
                        onChange={handleChange}
                        variant='outlined'
                        sx={{ height: 30, p: 0, m: 0, lineHeight: 1.200 }}
                    >
                        <MenuItem value={0} disabled >Select Department Section</MenuItem>
                        {
                            deptsectiondata && deptsectiondata.map((name) => {
                                return (
                                    <MenuItem
                                        key={name.sec_id}
                                        value={name.sec_id}
                                    >
                                        {name.sec_name}
                                    </MenuItem>
                                );
                            })}
                    </Select>
                </FormControl>
            </CustomeToolTip>
        </Box >
    )
}

export default memo(DeptSectionSelectMulti)