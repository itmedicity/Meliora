import { Box, Modal, ModalClose } from '@mui/joy';
import React, { memo } from 'react'
import FishboneAnalysis from '../FishBoneAnalysis/FishboneAnalysis';
import FishboneSkeleton from '../SkeletonComponent/FishboneSkeleton';

const FishBoneModal = ({
    open,
    handleClose,
    items,
    loading,
    apiData
}) => {


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
                height: '90vh',
                bgcolor: 'white',
                borderRadius: 10,
                p: 1,
                overflowY: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                },
                position: 'relative'
            }}>
                <ModalClose />
                {
                    loading ?
                        <FishboneSkeleton />
                        :
                        <FishboneAnalysis items={items} apiData={apiData} />
                }
            </Box>
        </Modal>
    )
}

export default memo(FishBoneModal);