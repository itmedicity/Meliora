import { Box } from '@mui/material'
import React, { useCallback, memo } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import CustomeToolTip from 'src/views/Components/CustomeToolTip';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Typography } from '@mui/joy';



const ApproveButtonsCompnt = ({ setApprovalFlag, setApprovalModal, setCancelFlag, setCancelModal,
    setApprovalData, setCancelData, val }) => {

    console.log(val);
    const { higher, crf_close } = val
    const Approvalfctn = useCallback(() => {
        setApprovalFlag(1)
        setApprovalModal(true)
        setApprovalData(val)
    }, [setApprovalFlag, setApprovalModal, val, setApprovalData])

    const CloseFnctn = useCallback(() => {
        setCancelFlag(1)
        setCancelModal(true)
        setCancelData(val)
    }, [setCancelFlag, setCancelModal])

    return (
        <Box sx={{
            height: 40, backgroundColor: "#f0f3f5", display: 'flex', width: "100%",
            flexDirection: "row", pt: 0.5, pb: 0.5
        }}>
            <Box>
                {
                    higher === 1 ?
                        <Box sx={{ pl: 2, }}>
                            <CusIconButton size="sm" variant="outlined"   >
                                <SaveAsIcon fontSize='small' />
                            </CusIconButton>
                        </Box>
                        :
                        // <CustomeToolTip title="Approval" placement="left" >
                        <Box sx={{ pl: 2, }}>
                            <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={Approvalfctn}  >
                                <SaveAsIcon fontSize='small' />
                                <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Approval</Typography>
                            </CusIconButton>
                        </Box>
                    // </CustomeToolTip>

                }
            </Box>
            <Box>
                <CustomeToolTip title="Close" placement="left" >
                    <Box sx={{ pl: 1.5 }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={CloseFnctn} >
                            <SubtitlesOffIcon fontSize='small' />
                            <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Close</Typography>
                        </CusIconButton>
                    </Box>
                </CustomeToolTip>
            </Box>
        </Box>
    )
}

export default memo(ApproveButtonsCompnt)