import { Box } from '@mui/material'
import React, { useCallback, memo } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import { Typography } from '@mui/joy';
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';

const ClosedButtonCompnt = ({ val, setCloseFlag, setCloseModal, setCloseData }) => {

    const ModalOpenfctn = useCallback(() => {
        setCloseFlag(1)
        setCloseModal(true)
        setCloseData(val)
    }, [val, setCloseFlag, setCloseModal, setCloseData])

    return (
        <Box sx={{
            height: 40, backgroundColor: "#f0f3f5", display: 'flex', width: "100%",
            flexDirection: "row", pt: 0.5, pb: 0.5
        }}>

            <Box sx={{ pl: 2, }}>
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ModalOpenfctn}  >
                    <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
                    <SubtitlesOffIcon fontSize='small' />
                    <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Close View</Typography>
                </CusIconButton>
            </Box>
        </Box>
    )
}

export default memo(ClosedButtonCompnt)