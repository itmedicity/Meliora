import React from 'react'
import { Box, Sheet } from '@mui/joy'
import DietTextComponent from '../DietComponent/DietTextComponent'
import DietButton from '../DietComponent/DietButton'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const KotFooterConfirm = ({ confirmedItems, onConfirm, pdf }) => {

    if (!confirmedItems?.length) return null

    const totalItems = confirmedItems.length
    const totalQty = confirmedItems.reduce(
        (sum, item) => sum + Number(item.Count || 0),
        0
    );

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
                    value={`${totalItems} item${totalItems > 1 ? 's' : ''} added`}
                />
                <DietTextComponent
                    size={15}
                    value={`Total Quantity: ${totalQty}`}
                    color="#6f10b4"
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
                    onClick={onConfirm}
                    name={"Remove all Item"}
                    icon={DeleteOutlinedIcon}
                />
                <DietButton
                    onClick={onConfirm}
                    name={"Confirm List For Preparation"}
                    icon={AddCircleOutlineOutlinedIcon}
                />

                <DietButton
                    onClick={pdf}
                    name={"Download Pdf"}
                    icon={PictureAsPdfIcon}
                />
            </Box>



        </Sheet>
    )
}

export default KotFooterConfirm
