import React, { memo, useEffect } from 'react'
import { Box, Typography, Paper } from '@mui/material'
import TextFieldCustom from 'src/views/Components/TextFieldCustom'
import { useState } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';


const OwnerShipDetailsComp = ({ detailArry, assetSpare }) => {
    const { am_item_map_slno, am_spare_item_map_slno } = detailArry
    const [primary, setPrimary] = useState('')
    const [secondary, setSecondary] = useState('')

    useEffect(() => {
        const getDeptsecbsdcustodian = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/getdeptsecBsedonCustdept/${am_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { prim_cus, second_cus } = data[0]
                setPrimary(prim_cus.toLocaleUpperCase())
                setSecondary(second_cus.toLocaleUpperCase())
            }
        }

        const getDeptsecbsdcustodianSpare = async (am_spare_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/getdeptsecBsedonCustdeptSpare/${am_spare_item_map_slno}`);
            const { success, data } = result.data
            if (success === 1) {
                const { prim_cus, second_cus } = data[0]
                setPrimary(prim_cus.toLocaleUpperCase())
                setSecondary(second_cus.toLocaleUpperCase())
            }
        }
        if (assetSpare === 1) {
            getDeptsecbsdcustodian(am_item_map_slno)
        } else {
            getDeptsecbsdcustodianSpare(am_spare_item_map_slno)
        }
    }, [assetSpare, am_item_map_slno, am_spare_item_map_slno])

    return (
        <Paper sx={{ overflow: 'auto', border: 1, mb: 1 }}>
            <Box sx={{
                display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            }} >
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Primary Custodian</Typography>
                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="primary"
                            value={primary}
                            disabled={true}
                        ></TextFieldCustom>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', width: '20%', p: 0.5, flexDirection: 'column' }} >
                    <Typography sx={{ fontSize: 13, fontFamily: 'sans-serif', fontWeight: 550 }} >Secondary Custodian</Typography>
                    <Box>
                        <TextFieldCustom
                            type="text"
                            size="sm"
                            name="secondary"
                            value={secondary}
                            disabled={true}
                        ></TextFieldCustom>
                    </Box>
                </Box>
            </Box>
        </Paper>
    )
}

export default memo(OwnerShipDetailsComp)