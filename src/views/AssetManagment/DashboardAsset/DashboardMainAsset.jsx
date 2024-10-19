
import React from 'react'
import { Box } from '@mui/joy'
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';






const DashboardMainAsset = () => {
    return (
        <Box sx={{
            height: '100%',
            borderRadius: 1, boxShadow: 2,
        }}>
            <Box sx={{ display: 'flex', borderBottom: .1, borderColor: '#C5C5C5', p: 1, gap: 1 }}>
                <Box ><DashboardOutlinedIcon fontSize='medium' sx={{ color: '#262065' }} /></Box>
                <Box sx={{ color: '#262065', pt: .3 }}>DashBoard</Box>
            </Box>
            <Box sx={{ flex: 1, }}>


                <Box>

                </Box>
            </Box>
        </Box>

    )
}

export default DashboardMainAsset
