import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect, useState, useMemo } from 'react'
import { getSparesInstock } from 'src/api/AssetApis';
import { axioslogin } from 'src/views/Axios/Axios';


const SpareListSelect = ({ spare, setSpare, setSpareNo, item_custodian_dept }) => {

    const [tabledata, setTabledata] = useState([])

    const { data: spareData, isLoading } = useQuery({
        queryKey: ['getSparesinstock', postData],
        queryFn: () => getSparesInstock(postData),
    });

    const spareInstock = useMemo(() => spareData, [spareData]);

    useEffect(() => {
        if (spareInstock && spareInstock.length > 0) {
            const formattedSpareInstock = spareInstock.map((val, index) => {
                return {
                    am_spare_item_map_slno: val.am_spare_item_map_slno,
                    item_name: val.item_name,
                    assetno: val.spare_asset_no + '/' + val.spare_asset_no_only.toString().padStart(6, '0'),
                };
            });
            setTabledata(formattedSpareInstock);
        } else {
            setTabledata([]);
        }
    }, [spareInstock]);

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