import { Box } from '@mui/material'
import React, { useCallback, memo } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Typography } from '@mui/joy';

const PurchaseApprovalButton = ({ val, setpuchaseFlag, setpuchaseModal, setpuchaseData }) => {

    const ModalOpenfctn = useCallback(() => {
        setpuchaseFlag(1)
        setpuchaseModal(true)
        setpuchaseData(val)
    }, [val, setpuchaseFlag, setpuchaseModal, setpuchaseData])
    return (
        <Box sx={{
            height: 40, backgroundColor: "#f0f3f5", display: 'flex', width: "100%",
            flexDirection: "row", pt: 0.5, pb: 0.5
        }}>

            <Box sx={{ pl: 2, }}>
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ModalOpenfctn}  >
                    <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
                    <SaveAsIcon fontSize='small' />
                    <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Procees</Typography>
                </CusIconButton>
            </Box>
        </Box>
    )
}

export default memo(PurchaseApprovalButton)