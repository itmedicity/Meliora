import { Box, Typography } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { memo, } from 'react'
import CrfComplaintdepcommon from './CrfComplaintdepcommon'
import CrfComplaintdepMain from './CrfComplaintdepMain'
import CrfComplaintdepIt from './CrfComplaintdepIt'
import CrfComplaintdepHouse from './CrfComplaintdepHouse'
import CrfComplaintdepOpe from './CrfComplaintdepOpe'
import CrfcommonItm from './CrfcommonItm'
import CrfMainItm from './CrfMainItm'
import CrfItItm from './CrfItItm'
import CrfHouseitm from './CrfHouseitm'
import CrfOperItm from './CrfOperItm'


const CommonCmpltType = ({ deptbio, setCrfDeptbio, deptbiotype, setCrfDeptbiotype,
    deptMain, setCrfDeptMain, deptMaintype, setCrfDeptMaintype, deptIt, setCrfDeptIt,
    deptItType, setCrfDeptItType, deptHouse, setCrfDeptHouse, deptHouseitm,
    setCrfDeptHouseitm, deptOpe, setCrfDeptope, deptOpeitm, setCrfDeptopeitm, }) => {



    return (
        <Box sx={{ mt: 1 }}>
            <Paper variant="outlined" sx={{ width: '100%', pl: 0.5, bgcolor: '#f0f3f5' }}>
                <Typography level="body1" sx={{ fontWeight: 500, color: '#4f5d73' }}>CRF Complaint Item Type</Typography>
            </Paper>
            <Box sx={{ mt: 1, backgroundColor: '#f9f9f9', borderRadius: 2 }}>


                {/* Bio Section */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>

                        <CrfComplaintdepcommon value={deptbio} setValue={setCrfDeptbio} />

                        {/* <CrfComplaintdepcommon value={deptbio} setValue={setCrfDeptbio} /> */}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <CrfcommonItm value={deptbiotype} setValue={setCrfDeptbiotype} codept={deptbio} />
                    </Box>
                </Box>

                {/* Main Section */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <CrfComplaintdepMain value={deptMain} setValue={setCrfDeptMain} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <CrfMainItm value={deptMaintype} setValue={setCrfDeptMaintype} codept={deptMain} />
                    </Box>
                </Box>

                {/* IT Section */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <CrfComplaintdepIt value={deptIt} setValue={setCrfDeptIt} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <CrfItItm value={deptItType} setValue={setCrfDeptItType} codept={deptIt} />
                    </Box>
                </Box>

                {/* House Section */}
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <CrfComplaintdepHouse value={deptHouse} setValue={setCrfDeptHouse} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <CrfHouseitm value={deptHouseitm} setValue={setCrfDeptHouseitm} codept={deptHouse} />
                    </Box>
                </Box>

                {/* Operations Section */}
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ flex: 1 }}>
                        <CrfComplaintdepOpe value={deptOpe} setValue={setCrfDeptope} />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <CrfOperItm value={deptOpeitm} setValue={setCrfDeptopeitm} codept={deptOpe} />
                    </Box>
                </Box>
            </Box>

        </Box>
    )
}

export default memo(CommonCmpltType)