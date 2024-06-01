import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect, useState, useMemo } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';


const SpareListSelect = ({ spare, setSpare, setSpareNo, item_custodian_dept }) => {

    const [tabledata, setTabledata] = useState([])



    const getSpareCondition = useMemo(() => {
        return {
            spare_custodian_dept: item_custodian_dept
        }
    }, [item_custodian_dept])


    useEffect(() => {
        const getModelNo = async (getSpareCondition) => {
            const result = await axioslogin.post('/ItemMapDetails/GetFreespareList', getSpareCondition);
            const { success, data } = result.data
            if (success === 1) {
                const datass = data.map((val, index) => {
                    const obj = {
                        am_spare_item_map_slno: val.am_spare_item_map_slno,
                        item_name: val.item_name,
                        assetno: val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0'),
                    }
                    return obj
                })
                setTabledata(datass);
            }
            else {
                setTabledata([])
            }
        }
        getModelNo(getSpareCondition)
    }, [getSpareCondition])

    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={spare}
                    onChange={(e, val) => {
                        setSpare(e.target.value);
                        setSpareNo(val.props.children.join(" "))
                    }}

                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
                >
                    <MenuItem value={0} disabled>
                        Select Spare
                    </MenuItem>
                    {tabledata && tabledata.map((val, index) => {
                        return (
                            <MenuItem key={index} value={val.am_spare_item_map_slno}>
                                {val.item_name}   ({val.assetno})
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(SpareListSelect)