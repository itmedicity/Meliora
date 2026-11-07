import React, { memo, useMemo, useState } from 'react'
import {
    Box,
    Typography,
    Divider,
    Checkbox
} from '@mui/joy'
import CloseIcon from '@mui/icons-material/Close'
// import DietSearchComponent from '../../DietComponent/DietSearchComponent'
// import DietTextComponent from '../../DietComponent/DietTextComponent'
import { useNursingStationMaster } from '../CommonData/UseQuery'
import DietTextComponent from '../DietComponent/DietTextComponent'
import DietSearchComponent from '../DietComponent/DietSearchComponent'
// import { useNursingStationMaster } from '../../CommonData/UseQuery'

const CanteenContextDrawer = ({
    open,
    onClose,
    width = 280,
    selectedStations,
    setSelectedStations
}) => {

    const [search, setSearch] = useState('')
    const { data: NURSING_STATIONS = [] } = useNursingStationMaster()

    /*  FILTER */
    const filteredStations = useMemo(() => {
        return NURSING_STATIONS?.filter(ns =>
            ns.fb_ns_name?.toLowerCase().includes(search.toLowerCase())
        )
    }, [NURSING_STATIONS, search])

    /*  TOGGLE SELECT */
    const handleToggle = (code) => {
        setSelectedStations(prev =>
            prev.includes(code)
                ? prev.filter(id => id !== code)
                : [...prev, code]
        )
    }

    return (
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width,
                bgcolor: '#f6f6f6d9',
                boxShadow: 'lg',
                transform: open ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease',
                zIndex: 15,
                display: 'flex',
                flexDirection: 'column',
            }}>

            {/* HEADER */}
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 5,
                    bgcolor: '#f6f6f6d9',
                    p: 2,
                }}>

                <CloseIcon
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8, right: 8, fontSize: 18, cursor: 'pointer'
                    }} />

                <DietTextComponent
                    size={16}
                    value={"NURSING STATION"}
                />

                <Divider sx={{ my: 1 }} />

                <DietSearchComponent
                    value={search}
                    onChange={setSearch}
                    placeholder="Search Nursing Station"
                />
            </Box>


            {/* BODY */}
            <Box
                sx={{
                    flex: 1,
                    px: 2,
                    pb: 2,
                    overflowY: 'auto',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                }}
            >
                {filteredStations?.map((station) => (
                    <Box key={station.fb_ns_code} mt={2}>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <Checkbox
                                size="sm"
                                checked={selectedStations.includes(station.fb_ns_code)}
                                onChange={() => handleToggle(station.fb_ns_code)}
                            />
                            <DietTextComponent
                                size={13}
                                value={station.fb_ns_name}
                            />
                        </Box>
                    </Box>
                ))}

                {/* EMPTY */}
                {filteredStations.length === 0 && (
                    <Typography level="body-xs" textAlign="center" mt={2}>
                        No nursing stations found
                    </Typography>
                )}
            </Box>
        </Box>
    )
}

export default memo(CanteenContextDrawer)