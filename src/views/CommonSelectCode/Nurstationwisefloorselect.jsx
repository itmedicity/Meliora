
import React, { useEffect } from 'react'
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from 'react-redux';
import { getnusrfloor } from 'src/redux/actions/NurseWiseFloor.action'
import MenuItem from "@mui/material/MenuItem";
import CustomeToolTip from '../Components/CustomeToolTip';


const Nurstationwisefloorselect = ({ value, setValue, floor }) => {
    const dispatch = useDispatch(0)

    const nurstaionfloor = useSelector((state) => {
        return state.getnursewisefloor.nursewisefloorList
    })

    useEffect(() => {
        dispatch(getnusrfloor(floor))
    }, [dispatch, floor])


    return (
        <Box >
            <CustomeToolTip title="Select nursing station">
                <FormControl fullWidth size="small"  >

                    <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        size="small"
                        multiple
                        fullWidth
                        variant='outlined'
                        sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                    >
                        <MenuItem value={[]} disabled >Select nursing station</MenuItem>
                        {
                            nurstaionfloor && nurstaionfloor.map((val, index) => {
                                return <MenuItem key={index} value={val.co_nurse_slno}>{val.co_nurse_desc}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
            </CustomeToolTip>
        </Box >
    )
}

export default Nurstationwisefloorselect