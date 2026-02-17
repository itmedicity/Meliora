import { Box, Tooltip } from '@mui/joy'
import React, { useState } from 'react'
import DietTextComponent from '../DietComponent/DietTextComponent'
import DietButton from '../DietComponent/DietButton'
import ConfirmationNumberTwoToneIcon from '@mui/icons-material/ConfirmationNumberTwoTone'
import RecommendIcon from '@mui/icons-material/Recommend';

const KotItemList = ({ FoodItemDetail, bgcolor, onConfirm, foundmatch }) => {
    const {
        Item_name,
        Count,
        unit,
        processed_date,
        description,
        nutrition,
    } = FoodItemDetail

    const [showInfo, setShowInfo] = useState(false)

    return (
        <Box
            sx={{
                width: '100%',
                px: 1.5,
                // py: 1,
                display: 'flex',
                // alignItems: 'flex-start',
                bgcolor: bgcolor.bg,
                boxShadow: 'sm',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            {/* Item Name + Info */}
            <Box
                onDoubleClick={(e) => {
                    e.stopPropagation()
                    setShowInfo(prev => !prev)
                }}
                sx={{
                    width: '45%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    cursor: 'pointer'
                }}>
                {/* Name row */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, }}>
                    <DietTextComponent size={13} value={Item_name?.toUpperCase()} />
                </Box>

                {/* Description + Nutrition (below name) */}
                {showInfo && (
                    <Box sx={{
                        mt: 0.5, pl: 0.5,
                        width: '100%',
                    }}>
                        <DietTextComponent
                            size={12}
                            value={description}

                        />

                        <DietTextComponent
                            size={12}
                            value={`Calories: ${nutrition?.calories}`}

                        />

                        <DietTextComponent
                            size={12}
                            value={`Benifits: ${nutrition?.benefits}`}
                        />
                    </Box>
                )}
            </Box>


            {/* Type */}
            {/* <Box sx={{ width: '25%' }}>
                <DietTextComponent value={Type} />
            </Box> */}

            {/* Processed Date */}
            <Box sx={{ width: '25%' }}>
                <DietTextComponent size={13} value={processed_date} />
            </Box>

            {/* Count */}
            <Box sx={{ width: '10%' }}>
                <DietTextComponent size={13} value={Count} />
            </Box>
            <Box sx={{ width: '10%' }}>
                <DietTextComponent size={13} value={unit} />
            </Box>
            {/* Action Button */}
            <Tooltip size='sm' title={foundmatch ? "Selected" : "Add Item to List"} placement="top" >
                <Box sx={{ width: '10%', display: 'flex', justifyContent: 'center' }}>
                    <DietButton
                        width={30}
                        onClick={() => onConfirm(FoodItemDetail)}
                        name={''}
                        icon={foundmatch ? RecommendIcon : ConfirmationNumberTwoToneIcon}
                    />
                </Box>
            </Tooltip>
        </Box>
    )
}

export default KotItemList
