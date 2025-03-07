import FormControl from '@mui/material/FormControl'
import Box from '@mui/material/Box'
import React, { memo } from 'react'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useSelector } from 'react-redux'

const RackSelect = ({ value, setValue }) => {
    const rackList = useSelector((state) => state.getRackList?.AssetRackList)

    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // disabled={disabled}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
                >
                    <MenuItem value={0} disabled>
                        Select Rack
                    </MenuItem>
                    {rackList &&
                        rackList.map((val, index) => {
                            return (
                                <MenuItem key={index} value={val.am_rack_slno}>
                                    {val.am_rack_name}
                                </MenuItem>
                            )
                        })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(RackSelect)