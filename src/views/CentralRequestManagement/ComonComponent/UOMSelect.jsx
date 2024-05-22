import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React from 'react'
import { memo } from 'react'
import { useSelector } from 'react-redux'


const UOMSelect = ({ uom, setUOM, setName }) => {

    const assetUom = useSelector((state) => state.getUOM.uomList)


    return (
        <Box sx={{ pt: 0.5 }}>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={uom}
                    onChange={(e, { props }) => {
                        setUOM(e.target.value);
                        setName(props.name)
                    }}
                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
                >
                    <MenuItem value={0} disabled>
                        Select UOM
                    </MenuItem>
                    {assetUom && assetUom.map((val, index) => {
                        return (
                            <MenuItem key={index} value={val.uom_slno} name={val.uom_name}>
                                {val.uom_name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(UOMSelect)