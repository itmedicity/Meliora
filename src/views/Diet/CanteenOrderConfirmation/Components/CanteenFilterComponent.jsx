
import React, { memo, useEffect, useState } from 'react'
import { Box, Stack } from '@mui/joy'

import DietSearchComponent from '../../DietComponent/DietSearchComponent'
import { useCanteenFilter } from '../../DietReducer/contextprovider/CanteenFilterContext'
import ChooseCanteenActivePatient from 'src/views/CommonSelectCode/ChooseCanteenActivePatient'
import { useAllActiveNsPatient } from '../../CommonData/UseQuery'
import ChooseOrderType from 'src/views/CommonSelectCode/ChooseOrderType'
import ChooseNursingBed from 'src/views/CommonSelectCode/ChooseNursingBed'
import ChooseDIetType from 'src/views/CommonSelectCode/ChooseDIetType'
import ChooseDietName from 'src/views/CommonSelectCode/ChooseDietName'
import { addDays, format } from 'date-fns'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import CalendarDaysIcon from '@mui/icons-material/CalendarMonth'
import CalendarRangeIcon from '@mui/icons-material/DateRange'


const getLocalDate = (offset = 0) => {
    return format(addDays(new Date(), offset), 'yyyy-MM-dd')
}

const CanteenFilterComponent = ({
    selectedStations,
    showdietype = true,
    showordertype = true,
    showdiet = false,
    dietName,
    setDietName,
    onExpectedDateChange
}) => {

    const { state, dispatch } = useCanteenFilter()
    const { bed, patient, meal, type, search } = state

    const { data: ActiveNsPatient = [] } =
        useAllActiveNsPatient(selectedStations)

    const [dateFilter, setDateFilter] = useState('today')

    const dateOptions = [
        { label: 'Today', value: 'today', date: getLocalDate(0) },
        { label: 'Tomorrow', value: 'tomorrow', date: getLocalDate(1) },
        { label: 'All', value: 'all', date: null }
    ]

    useEffect(() => {
        onExpectedDateChange?.(getLocalDate(0))
    }, [])

    const handleDateChange = (option) => {
        setDateFilter(option.value)
        onExpectedDateChange?.(option.date)
    }

    return (
        <Box
            sx={{
                width: '100%',
                p: 1.5,
                bgcolor: '#f6f6f6d9',
                borderRadius: 5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5
            }}
        >
            {/* Existing Filters */}
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1
            }}>

                <ChooseNursingBed
                    value={bed}
                    code={selectedStations}
                    setValue={(val) =>
                        dispatch({ type: 'SET_BED', payload: val })
                    }
                />

                {showdietype && (
                    <ChooseDIetType
                        value={meal}
                        setValue={(val) =>
                            dispatch({ type: 'SET_MEAL_ID', payload: val })
                        }
                    />
                )}

                <ChooseCanteenActivePatient
                    PtDetail={ActiveNsPatient}
                    value={patient}
                    setValue={(value) =>
                        dispatch({ type: 'SET_PATIENT', payload: value })
                    }
                />

                {showordertype && (
                    <ChooseOrderType
                        value={type}
                        setValue={(value) =>
                            dispatch({ type: 'SET_TYPE', payload: value })
                        }
                    />
                )}

                {showdiet && (
                    <ChooseDietName
                        value={dietName}
                        setValue={setDietName}
                    />
                )}

                <DietSearchComponent
                    value={search}
                    onChange={(val) =>
                        dispatch({ type: 'SET_SEARCH', payload: val })
                    }
                />

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        borderBottom: '1px solid #e8e8e8',
                        width: 'fit-content',
                        pb: 0.8
                    }}
                >
                    {dateOptions?.map((option, index) => {
                        const active = dateFilter === option.value

                        const Icon = option.value === 'today'
                            ? CalendarTodayIcon
                            : option.value === 'tomorrow'
                                ? CalendarDaysIcon
                                : CalendarRangeIcon

                        return (
                            <Box
                                key={`${option.value}-${index}`}
                                onClick={() => handleDateChange(option)}
                                sx={{
                                    position: 'relative',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.8,
                                    cursor: 'pointer',
                                    px: 1,
                                    py: 0.8,
                                    color: active ? '#7627a8' : '#858585',
                                    transition: 'all 0.2s ease',

                                    '&:after': active ? {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: -9,
                                        left: 0,
                                        right: 0,
                                        height: 2.5,
                                        borderRadius: 5,
                                        bgcolor: '#7627a8'
                                    } : {}
                                }}
                            >
                                <Icon sx={{ fontSize: 16 }} />

                                <Box>
                                    <Box sx={{
                                        fontSize: 12,
                                        fontWeight: active ? 800 : 600,
                                        lineHeight: 1.2
                                    }}>
                                        {option.label}
                                    </Box>


                                </Box>
                            </Box>
                        )
                    })}
                </Stack>



            </Box>
        </Box>
    )
}

export default memo(CanteenFilterComponent)
