import { Box } from '@mui/material'
import React, { useCallback, memo } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { Typography } from '@mui/joy';


const DataCollectionSave = ({ setDataEnterFlag, setDataEnterModal, setDataEnterData, val, flag,
    setDataEnterViewFlag, setDataEnterViewModal, setDataEnterViewData }) => {

    const ActionFctn = useCallback(() => {
        setDataEnterFlag(1)
        setDataEnterModal(true)
        setDataEnterData(val)
    }, [setDataEnterFlag, setDataEnterModal, setDataEnterData, val])


    const ViewFctn = useCallback(() => {
        setDataEnterViewFlag(1)
        setDataEnterViewModal(true)
        setDataEnterViewData(val)
    }, [setDataEnterViewFlag, setDataEnterViewModal, setDataEnterViewData, val])


    return (
        <Box sx={{
            height: 40, backgroundColor: "#f0f3f5", display: 'flex', width: "100%",
            flexDirection: "row", pt: 0.5, pb: 0.5
        }}>

            {
                flag === 1 ?
                    <Box sx={{ pl: 2, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ActionFctn}  >
                            <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
                            <SaveAsIcon fontSize='small' />
                            <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>Action</Typography>
                        </CusIconButton>
                    </Box> : <Box sx={{ pl: 2, }}>
                        <CusIconButton size="sm" variant="outlined" color="primary" clickable="true" onClick={ViewFctn}  >
                            <Typography color="primary" sx={{ fontSize: 15, pl: 1 }}></Typography>
                            <SaveAsIcon fontSize='small' />
                            <Typography color="primary" sx={{ fontSize: 15, pl: 2, pr: 2 }}>View</Typography>
                        </CusIconButton>
                    </Box>

            }


        </Box>
    )
}

export default memo(DataCollectionSave)