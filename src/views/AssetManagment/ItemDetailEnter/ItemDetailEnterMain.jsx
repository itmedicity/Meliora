import React, { memo, useCallback, useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import CardMasterClose from 'src/views/Components/CardMasterClose'
import { axioslogin } from 'src/views/Axios/Axios'
import GRNDeailtsComp from './GRNDeailtsComp'

const ItemDetailEnterMain = ({ detailArry, setDetailflag }) => {

    const { am_item_map_slno } = detailArry

    const [exist, setExist] = useState(0)
    useEffect(() => {
        const checkinsertOrNot = async (am_item_map_slno) => {
            const result = await axioslogin.get(`/ItemMapDetails/checkDetailInsertOrNot/${am_item_map_slno}`);
            const { success } = result.data
            if (success === 1) {
                setExist(1)
            }
            else {
                setExist(0)
            }
        }
        checkinsertOrNot(am_item_map_slno)
    }, [am_item_map_slno])


    const BackToPage = useCallback(() => {
        setDetailflag(0)
    }, [setDetailflag])

    return (
        <Box sx={{
            display: 'flex', flexGrow: 1, width: '100%', height: window.innerHeight - 85,
        }}>

            <CardMasterClose
                title="Item Details Add"
                close={BackToPage}
            >

                <Box sx={{
                    display: 'flex', flexDirection: 'column',
                }} >
                    {/* GRN Detail */}
                    <Typography sx={{ fontSize: 15, fontFamily: 'sans-serif', fontWeight: 520, ml: 2 }} >
                        GRN Details</Typography>
                    <GRNDeailtsComp detailArry={detailArry} exist={exist} />

                </Box>
            </CardMasterClose>
        </Box>

    )
}

export default memo(ItemDetailEnterMain)