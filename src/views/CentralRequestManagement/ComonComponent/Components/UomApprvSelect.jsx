import { CssVarsProvider, Option, Select } from '@mui/joy'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'

const UomApprvSelect = ({ uom, setUOM }) => {
    const assetUom = useSelector((state) => state.getUOM.uomList)
    return (
        <CssVarsProvider>
            <Select
                defaultValue="0"

                sx={{ fontSize: 13, width: '100%', height: 29 }}
                slotProps={{
                    listbox: { placement: 'bottom-start' },
                }}
                placeholder="Select UOM"
                value={uom}
                onChange={(e, newValue) => setUOM(newValue)}
            >
                {assetUom?.map((val) => (
                    <Option key={val.uom_slno} value={val.uom_slno} label={val.uom_name}>
                        {val.uom_name}
                    </Option>
                ))}
            </Select>
        </CssVarsProvider>
    )
}

export default memo(UomApprvSelect)