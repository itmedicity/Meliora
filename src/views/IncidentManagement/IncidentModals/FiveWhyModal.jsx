import { Box, Modal } from '@mui/joy'
import React, { memo } from 'react'
// import FiveWhyAnalysis from '../FiveWhyAnalysis';
import FishboneAnalysis from '../FishBoneAnalysis/FishboneAnalysis';

const FiveWhyModal = ({ open, handleClose, items }) => {
    return (
        <Modal
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            open={open}
            onClose={handleClose}>
            <Box sx={{
                width: '98vw',
                // height: '90vh',
                bgcolor: 'white',
                borderRadius: 10,
                p: 3

            }}>
                {/* <FiveWhyAnalysis /> */}
                <FishboneAnalysis items={items} />
            </Box>

        </Modal>
    )
}

export default memo(FiveWhyModal);







