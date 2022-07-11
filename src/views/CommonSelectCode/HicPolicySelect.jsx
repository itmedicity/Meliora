import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getHicpolicy } from 'src/redux/actions/HicPolicy.action';
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
const HicPolicySelect = () => {
    const dispatch = useDispatch();
    /**getHicpolicy -state update function of reducer 
   * hicypolicyList- initial state of reducer function
   *hicpolicydata is used to list select box items by using map
   */
    const hicpolicydata = useSelector((state) => {
        return state.getHicpolicy.hicpolicyList
    })
    //getHicpolicy function is used to update data in hicpolicy redux
    useEffect(() => {
        dispatch(getHicpolicy());
    }, [dispatch]);
    return (
        <Box sx={{ mt: 1 }} >
            <FormControl fullWidth size="small"  >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={value}
                    // onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant='outlined'
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled  >Select Hicpolicy</MenuItem>
                    {
                        hicpolicydata.map((val, index) => {
                            return <MenuItem key={index} value={val.hic_policy_slno}>{val.hic_policy_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}
export default memo(HicPolicySelect)