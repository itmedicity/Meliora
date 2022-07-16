
import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserGroup } from "src/redux/actions/UserGroup.action";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const UserGroupSelect = ({ value, setValue }) => {
    const dispatch = useDispatch();
    /*** getUserGroup -state update function of reducer 
     * userGroupnameList- initial state of reducer function
     * usergroup is used to list select box items by using map
    */
    const usergroup = useSelector((state) => {
        return state.getUserGroup.userGroupnameList || 0
    })
    // getUserGroup function is used to update data in usergroup redux
    useEffect(() => {
        dispatch(getUserGroup())
    }, [dispatch])
    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{ height: 25, p: 0, m: 0, lineHeight: 1.200 }}
                >
                    <MenuItem value={0} disabled >Select User Group</MenuItem>
                    {
                        usergroup && usergroup.map((val, index) => {
                            return <MenuItem key={index} value={val.user_grp_slno}>{val.user_grp_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}
export default memo(UserGroupSelect)