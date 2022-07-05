
import React, { useEffect, useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserGroup } from "src/redux/actions/UserGroup.action";
import Box from "@mui/material/Box";
import { FormControl, MenuItem, Select } from '@material-ui/core'

const UserGroupSelect = () => {
    const [userGroup, setUsergroup] = useState('0');
    const dispatch = useDispatch()

    const usergroup = useSelector((state) => {
        return state.getUserGroup.userGroupnameList
    })

    useEffect(() => {
        dispatch(getUserGroup())
    }, [dispatch])

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userGroup}
                    onChange={(e) => setUsergroup(e.target.value)}
                    size="small"
                    fullWidth
                    variant="outlined"

                    style={{ minHeight: 9, maxHeight: 25, paddingTop: 0, paddingBottom: 4 }}
                >
                    <MenuItem value='0' disabled >Select User Group</MenuItem>
                    {
                        usergroup.map((val, index) => {
                            return <MenuItem key={index} value={val.user_grp_slno}>{val.user_grp_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(UserGroupSelect)