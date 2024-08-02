import { Box, FormControl, MenuItem, Select } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';

const PurchaseStoreSlect = ({ substoreSlno, setsubStoreSlno, setsubStoreName, setStoreName, setStoreCode }) => {

    const [tabledata, setTabledata] = useState([])

    useEffect(() => {
        const getSubStore = async () => {
            const result = await axioslogin.get('/newCRFPurchase/getSubstores');
            const { success, data } = result.data
            if (success === 1) {
                setTabledata(data);
            }
            else {
                setTabledata([])
            }
        }
        getSubStore()
    }, [])

    useEffect(() => {

        const getMainStore = async (substoreSlno) => {
            const result = await axioslogin.get(`/newCRFPurchase/getMainStore/${substoreSlno}`)
            const { success, data } = result.data
            if (success === 1) {
                const { main_store, crs_store_code } = data[0]
                setStoreName(main_store)
                setStoreCode(crs_store_code)
            }
            else {
                setStoreName('')
                setStoreCode('')
            }
        }
        if (substoreSlno !== 0) {
            getMainStore(substoreSlno)
        }
    }, [substoreSlno, setStoreName, setStoreCode])


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
                    sx={{ height: 24, p: 0, m: 0, lineHeight: 1.2 }}
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