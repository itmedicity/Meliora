import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getDiet } from 'src/redux/actions/Diet.action'
import { useRef } from 'react';
import { useState } from 'react';
const SelectDiet = ({ value, setValue, setDietName }) => {
    const [selectName, setSelectName] = useState("");
    const dispatch = useDispatch();
    /**getDiet -state update function of reducer 
    *dietList- initial state of reducer function
    *dietdata is used to list select box items by using map
    */
    const dietdata = useSelector((state) => {
        return state.getDiet.dietList || 0
    })
    useEffect(() => {
        dispatch(getDiet());
    }, [dispatch])

    console.log(selectName)

    return (
        <Box   >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e, { props }) => {
                        setValue(e.target.value);
                        setSelectName(props.children)
                    }}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Diet</MenuItem>
                    {
                        dietdata && dietdata.map((val, index) => {
                            return <MenuItem key={index} value={val.diet_slno} >{val.diet_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(SelectDiet)