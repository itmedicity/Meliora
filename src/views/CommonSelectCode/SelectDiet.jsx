import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getDiet } from 'src/redux/actions/Diet.action'
import { useRef } from 'react';
const SelectDiet = ({ value, setValue, setDietName }) => {
    const dispatch = useDispatch();
    /**getDiet -state update function of reducer 
*   dietList- initial state of reducer function
*dietdata is used to list select box items by using map
*/
    const dietdata = useSelector((state) => {
        return state.getDiet.dietList || 0
    })
    useEffect(() => {
        dispatch(getDiet());
    }, [dispatch])

    const getNameSelct = (e) => {
        //    console.log(e);
        // const selectedDiet = e.nativeEvent.target.textContent
        // setDietName(selectedDiet)

    }

    const a = useRef()
    //   console.log(a);
    if (a.current !== undefined) {
        // console.log(a.current.textContent);
        // console.log(a.current.outerText);
        // console.log(a.current.innerText);
    }

    // const val = (a.current !== undefined) && (a.current !== 0) ? a.current.textContent : '';
    // console.log(val)
    return (
        <Box   >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    ref={a}
                    onChange={(e) => {
                        setValue(e.target.value)
                        getNameSelct(e)
                    }}

                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Diet</MenuItem>
                    {
                        dietdata && dietdata.map((val, index) => {
                            return <MenuItem key={index} value={val.diet_slno}>{val.diet_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(SelectDiet)