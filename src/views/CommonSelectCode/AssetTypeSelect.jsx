import React, { useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAssetType } from 'src/redux/actions/AssetType.action'
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
const AssetTypeSelect = () => {

    const dispatch = useDispatch();
    /**getAssetType -state update function of reducer 
   * assettypeList- initial state of reducer function
   *complaintdeptdata is used to list select box items by using map
   */
    const assettypedata = useSelector((state) => {
        return state.getAssetType.assettypeList || 0
    })
    // getAssetType function is used to update data in  assettype redux
    useEffect(() => {
        dispatch(getAssetType())
    }, [dispatch])
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
                    <MenuItem value={0} disabled  >Select Assettype</MenuItem>
                    {
                        assettypedata && assettypedata.map((val, index) => {
                            return <MenuItem key={index} value={val.asset_type_slno}>{val.asset_type_name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box >
    )
}

export default memo(AssetTypeSelect);