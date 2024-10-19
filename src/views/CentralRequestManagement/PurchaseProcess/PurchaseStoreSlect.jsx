import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';

const PurchaseStoreSlect = ({ substoreSlno, setsubStoreSlno, storeSlno, setsubStoreName }) => {

    const [tabledata, setTabledata] = useState([])

    useEffect(() => {
        const getSubStore = async () => {
            const result = await axioslogin.get(`/newCRFPurchase/getSubstores/${storeSlno}`);
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data);
            }
            else {
                setTabledata([])
            }
        }
        getSubStore()
    }, [storeSlno])

    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={substoreSlno}
                    onChange={(e, { props }) => {
                        setsubStoreSlno(e.target.value);
                        setsubStoreName(props.children)
                    }}

                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{ height: 27, p: 0, m: 0, lineHeight: 1.2 }}
                >
                    <MenuItem value={0} disabled>
                        Select Store
                    </MenuItem>
                    {tabledata && tabledata.map((val, index) => {
                        return (
                            <MenuItem key={index} value={val.crm_store_master_slno}>
                                {val.sub_store_name}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(PurchaseStoreSlect)