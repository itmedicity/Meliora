import React, { useEffect, memo } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getComEmpMap } from 'src/redux/actions/ComEmpMapp.action';
import ListSubheader from '@mui/material/ListSubheader';


const ComEmpMapSelect = ({ value, setValue, dept }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComEmpMap(dept));
    }, [dispatch, dept])

    const CoEmpMap = useSelector((state) => {
        return state.setComEmpMap.comEmpMapList || 0
    })


    console.log(CoEmpMap);
    return (
        <Box   >
            <FormControl fullWidth size="small"  >
                <Select
                    label="Grouping"
                    id="grouped-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Employee Group</MenuItem>


                    {
                        CoEmpMap && CoEmpMap.map((val, index) => {
                            return <ListSubheader key={val.emp_map_slno}>{val.map_section_name}
                                {
                                    <MenuItem key={val.co_emp_empid}>{val.co_emp_empid}</MenuItem>
                                }







                                {/* {
                                    val.co_emp_empid.map((value) => {
                                        return <MenuItem key={value}>
                                            {value}

                                        </MenuItem>

                                    })
                                } */}


                            </ListSubheader>


                        })
                    }
                    {/* <MenuItem value={0} disabled  >Select Employee Group</MenuItem>
                    {
                        CoEmpMap && CoEmpMap.map((val, index) => {
                            return <MenuItem key={index} value={val.co_emp_empid} >{val.co_emp_empid}

                                {


                                }





                            </MenuItem>
                        })
                    } */}
                    {/* <option value="">Select Employee Group</option>
                    {

                        CoEmpMap.map(val => (
                            <optgroup label={val.map_section_name} key={val.emp_map_slno}>
                                {
                                    val.co_emp_empid.map(co_emp_empid => (
                                        <option value={co_emp_empid} key={co_emp_empid}>
                                            {co_emp_empid}
                                        </option>
                                    ))

                                }


                            </optgroup>


                        ))

                    } */}


                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(ComEmpMapSelect)