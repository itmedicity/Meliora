import { Box } from '@mui/joy'
import React from 'react'
import { taskColor } from 'src/color/Color'
import CusIconButton from 'src/views/Components/CusIconButton'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import RefreshIcon from '@mui/icons-material/Refresh'
import CloseIcon from '@mui/icons-material/Close'

const CardSave = ({ close, submit, refresh, }) => {
    return (
        <Box sx={{ flex: 1, display: 'flex', bgcolor: taskColor.lightpurple, height: 45, mt: .5, gap: 1, p: 1 }}>
            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={submit} >
                <LibraryAddIcon fontSize="small" />
            </CusIconButton>
            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={refresh}>
                <RefreshIcon fontSize="small" />
            </CusIconButton>
            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={close}>
                <CloseIcon fontSize="small" />
            </CusIconButton>
        </Box>
    )
}

export default CardSave