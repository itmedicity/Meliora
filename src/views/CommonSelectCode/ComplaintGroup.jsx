import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartemployee } from 'src/redux/actions/DeptwiseEmp.action'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import CustomeToolTip from '../Components/CustomeToolTip';

const ComplaintGroup = ({ value, setValue }) => {


    return (

        <Box >
            <CustomeToolTip title="Select Employee">
                <FormControl fullWidth >
                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        size="small"
                        multiple
                        value={value}
                        // onChange={handleChange}
                        variant='outlined'
                        sx={{ height: 30, p: 0, m: 0, lineHeight: 1.200 }}
                    >
                        <MenuItem value={0} disabled >Select Department Section</MenuItem>
                        {/* {
                            deptwiseemp && deptwiseemp.map((name) => {
                                return (
                                    <MenuItem
                                        key={name.em_id}
                                        value={name.em_id}
                                    >
                                        {name.em_name}
                                    </MenuItem>
                                );
                            })} */}
                    </Select>
                </FormControl>
            </CustomeToolTip>
        </Box >
    )
}

export default ComplaintGroup