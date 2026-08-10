import { Box } from '@mui/joy'
import { Paper } from '@mui/material'
import React, { useCallback, useMemo, useState } from 'react'
import CusIconButton from 'src/views/Components/CusIconButton'
import TextComponent from 'src/views/Components/TextComponent'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'
import MedicalRepTable from './MedicalRepTable'
import RepSearch from './RepSearch'
import { getDefaultRepData } from 'src/api/CommonApiCRF'
import { useQuery } from '@tanstack/react-query'

const MedicalRep = () => {
    const history = useNavigate()
    const [searchName, setSearchName] = useState('')

    const backtoSetting = useCallback(() => {
        history('/Home')
    }, [history])

    const {
        data: RepData,
        isLoading: isCompLoading,
        error: compError
    } = useQuery({
        queryKey: 'getRepData',
        queryFn: () => getDefaultRepData(),
        staleTime: Infinity
    })

    const filteredRepData = useMemo(() => {
        const search = searchName.trim().toLowerCase()

        if (!search) return RepData

        return RepData.filter((item) =>
            item?.name?.toLowerCase().includes(search)
        )
    }, [RepData, searchName])

    if (isCompLoading) return <p>Loading...</p>
    if (compError) return <p>Error occurred.</p>
    return (
        <Paper sx={{ borderRadius: 0, width: '100%' }}>
            <Box sx={{ flex: 1, display: 'flex', borderBottom: 1, borderColor: '#D0D0D0' }}>
                <TextComponent
                    sx={{
                        color: '#5A676C',
                        fontWeight: 510,
                        flex: 1,
                        m: 0.5,
                        pl: 1,
                        fontFamily: 'Arial'
                    }}
                    text="Medical Representative Details"
                />
                <Box>
                    <CusIconButton size="sm" variant="outlined" color="primary" onClick={backtoSetting}>
                        <CloseIcon fontSize="small" />
                    </CusIconButton>
                </Box>
            </Box>
            <Box sx={{ mt: 1, width: "40%" }}>
                <RepSearch
                    searchName={searchName}
                    setSearchName={setSearchName} />
            </Box>

            <Box sx={{ mt: 1 }}>
                <MedicalRepTable GetRepData={filteredRepData} />
            </Box>
        </Paper>

    )
}

export default MedicalRep