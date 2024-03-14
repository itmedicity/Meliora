import { Box } from '@mui/material'
import React, { useCallback, memo, } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Typography } from '@mui/joy';

const CrfDashBoardAppButton = ({ setApprovalFlag, setApprovalModal, setCancelFlag, setCancelModal,
    setApprovalData, setCancelData, val, PurchseFlag, setpuchaseFlag, setpuchaseModal, setpuchaseData }) => {

    const { ed_approve, md_approve, emergency_flag } = val

    const Approvalfctn = useCallback(() => {
        setApprovalFlag(1)
        setApprovalModal(true)
        setApprovalData(val)
    }, [setApprovalFlag, setApprovalModal, val, setApprovalData])

    const CloseFnctn = useCallback(() => {
        setCancelFlag(1)
        setCancelModal(true)
        setCancelData(val)
    }, [setCancelFlag, setCancelModal, setCancelData, val])

    const ModalOpenfctn = useCallback(() => {
        setpuchaseFlag(1)
        setpuchaseModal(true)
        setpuchaseData(val)
    }, [val, setpuchaseFlag, setpuchaseModal, setpuchaseData])


    return (
        <Box sx={{
            height: 40, backgroundColor:
                emergency_flag === 1 && md_approve !== 1 && ed_approve !== 1 ? "#edd8e0" :
                    md_approve === 1 && ed_approve === 1 ? "#e6edd8" :
                        "#f0f3f5",
            display: 'flex', width: "100%",
            flexDirection: "row", pt: 0.5, pb: 0.5, justifyContent: 'space-between'
        }}>

            {PurchseFlag !== 0 ? <Box>
                <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ModalOpenfctn}  >
                    <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
                    <SaveAsIcon fontSize='small' />
                    <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Procees</Typography>
                </CusIconButton>
            </Box> :
                < Box sx={{ display: 'flex', }} >

                    <Box sx={{ pl: 2, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={Approvalfctn}  >
                            <SaveAsIcon fontSize='small' sx={{ ml: 1 }} />
                            <Typography color="primary" sx={{ fontSize: 15, pl: 1, pr: 2 }}>Approval</Typography>
                        </CusIconButton>
                    </Box>
                    <Box sx={{ pl: 1.5 }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={CloseFnctn} >
                            <SubtitlesOffIcon fontSize='small' sx={{ ml: 1 }} />
                            <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Close</Typography>
                        </CusIconButton>
                    </Box>

                </Box>
            }

        </Box>

    )
}

export default memo(CrfDashBoardAppButton)