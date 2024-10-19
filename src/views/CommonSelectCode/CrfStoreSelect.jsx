import React, { memo, useEffect, useState } from 'react'
import { axioslogin } from '../Axios/Axios';
import { Box, FormControl, MenuItem, Select } from '@mui/material';

const CrfStoreSelect = ({ storeSlno, setStoreSlno, setStoreCode, setStoreName, setsubStoreSlno }) => {
    const [storeList, setStoreList] = useState([])

    useEffect(() => {
        const getCRSStore = async () => {
            const result = await axioslogin.get('/newCRFPurchase/crsStores');
            const { success, data } = result.data
            if (success === 2) {
                setStoreList(data);
            }
            else {
                setStoreList([])
            }
        }
        getCRSStore()
    }, [])
    return (
        <Box>
            <FormControl fullWidth size="small">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={storeSlno}
                    onChange={(e, { props }) => {
                        setStoreSlno(e.target.value);
                        setStoreCode(props.stcode)
                        setStoreName(props.name)
                        setsubStoreSlno(0)
                    }}

                    size="small"
                    fullWidth
                    variant="outlined"
                    sx={{ height: 27, p: 0, m: 0, lineHeight: 1.2, borderRadius: 1.5, fontSize: 14 }}
                >
                    <MenuItem value={0} disabled>
                        Select CRS Store
                    </MenuItem>
                    {storeList && storeList.map((val, index) => {
                        return (
                            <MenuItem key={index} value={val.main_store_slno} stcode={val.crs_store_code} name={val.main_store}>
                                {val.main_store}
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default memo(CrfStoreSelect)