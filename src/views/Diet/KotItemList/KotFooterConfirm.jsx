import React from 'react'
import { Box, Sheet } from '@mui/joy'
import DietTextComponent from '../DietComponent/DietTextComponent'
import DietButton from '../DietComponent/DietButton'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


const KotFooterConfirm = ({ confirmedItems, onConfirm, SendList }) => {

    if (!confirmedItems?.length) return null

    const totalItems = confirmedItems.length


    return (
        <Sheet
            variant="soft"
            sx={{
                position: 'fixed',
                bottom: 10,
                px: 2,
                py: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #e0e0e0da',
                boxShadow: 'lg',
                bgcolor: '#ffffff',
                zIndex: 1200,
                width: '80%'
            }}
        >
            {/* Left info */}
            <Box>
                <DietTextComponent
                    size={16}
                    value={`${totalItems} Batch${totalItems > 1 ? 's' : ''} Added`}
                />
            </Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
            }}>
                {/* Confirm Button */}
                <DietButton
                    width={150}
                    onClick={onConfirm}
                    name={"Remove all Item"}
                    icon={DeleteOutlinedIcon}
                />
                <DietButton
                    width={220}
                    onClick={SendList}
                    name={"Confirm List For Preparation"}
                    icon={AddCircleOutlineOutlinedIcon}
                />
            </Box>
        </Sheet>
    )
}

export default KotFooterConfirm
