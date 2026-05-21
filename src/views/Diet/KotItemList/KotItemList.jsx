import { Box } from '@mui/joy'
import React, { } from 'react'
import DietTextComponent from '../DietComponent/DietTextComponent'

const KotItemList = ({ FoodItemDetail, bgcolor }) => {
    const {
        item_name,
        meal_type,
        qty,
        production_date,
        kitchen_item_status
    } = FoodItemDetail;


    return (
        <Box
            sx={{
                width: '100%',
                px: 1.5,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                bgcolor: bgcolor?.bg || '#fff',
                boxShadow: 'sm',
                gap: 1,
                flexWrap: 'nowrap'
            }}
        >
            {/* Item Name + Info */}
            <Box
                sx={{
                    width: '45%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    cursor: 'pointer'
                }}>
                {/* Name row */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, }}>
                    <DietTextComponent size={13} value={item_name?.toUpperCase()} />
                </Box>
            </Box>

            <Box sx={{ width: '25%' }}>
                <DietTextComponent size={13} value={meal_type} />
            </Box>
            <Box sx={{ width: '25%' }}>
                <DietTextComponent size={13} value={production_date} />
            </Box>
            <Box sx={{ width: '25%' }}>
                <DietTextComponent size={13} value={kitchen_item_status} />
            </Box>


            <Box sx={{ width: '10%' }}>
                <DietTextComponent size={13} value={qty} />
            </Box>
        </Box >
    )
}

export default KotItemList
