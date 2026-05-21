import React, { memo, useMemo } from 'react'
import { Box } from '@mui/joy'



import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import BlockIcon from '@mui/icons-material/Block'
import CancelIcon from '@mui/icons-material/Cancel'
import DietTextComponent from '../../DietComponent/DietTextComponent'

const InpatientDietTab = ({
    patientList = [],
    activeStatus,
    setActiveStatus
}) => {

    // STATUS COUNT
    const statusCount = useMemo(() => {

        return patientList.reduce((acc, pt) => {

            const dietHistory = pt?.diet_history || []

            const hasActiveOrPlanned = dietHistory.some(
                (val) =>
                    val?.diet_status &&
                    val?.diet_status !== 'STOPPED'
            )

            const hasStopped = dietHistory.some(
                (val) => val?.diet_status === 'STOPPED'
            )

            if (hasActiveOrPlanned) {
                acc.PLANNED += 1
            }
            else if (hasStopped) {
                acc.STOPPED += 1
            }
            else {
                acc.NOTPLANNED += 1
            }

            return acc

        }, {
            PLANNED: 0,
            NOTPLANNED: 0,
            STOPPED: 0
        })

    }, [patientList])

    const tabs = [
        {
            label: 'PLANNED',
            value: 'PLANNED',
            count: statusCount.PLANNED
        },
        {
            label: 'NOT PLANNED',
            value: 'NOTPLANNED',
            count: statusCount.NOTPLANNED
        },
        {
            label: 'STOPPED',
            value: 'STOPPED',
            count: statusCount.STOPPED
        }
    ]

    const getIcon = (status) => {

        switch (status) {

            case 'PLANNED':
                return <RestaurantMenuIcon fontSize="small" />

            case 'NOTPLANNED':
                return <BlockIcon fontSize="small" />

            case 'STOPPED':
                return <CancelIcon fontSize="small" />

            default:
                return <RestaurantMenuIcon fontSize="small" />
        }
    }

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: 60,
                border: '1px solid #ebeaea',
                mt: 1,
                p: 1.2,
                bgcolor: '#f8f8fb',
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                borderRadius: 4,
                flexWrap: 'wrap'
            }}
        >

            {tabs?.map((tab) => {

                const isActive =
                    activeStatus === tab.value

                return (

                    <Box
                        key={tab.value}
                        onClick={() =>
                            setActiveStatus(prev =>
                                prev === tab.value
                                    ? null
                                    : tab.value
                            )
                        }
                        sx={{
                            minWidth: 150,
                            height: 42,
                            px: 1.5,

                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',

                            gap: 1,

                            borderRadius: 3,
                            cursor: 'pointer',

                            bgcolor:
                                isActive
                                    ? '#5b3b7a'
                                    : '#ffffff',

                            color:
                                isActive
                                    ? '#ffffff'
                                    : '#333',

                            boxShadow:
                                isActive
                                    ? '0 4px 12px rgba(91,59,122,0.25)'
                                    : '0 2px 8px rgba(0,0,0,0.06)',

                            transition: 'all 0.25s ease',

                            '&:hover': {
                                transform: 'translateY(-2px)'
                            }
                        }}
                    >

                        {getIcon(tab.value)}

                        <DietTextComponent
                            size={13}
                            value={tab.label}
                            color={
                                isActive
                                    ? '#ffffff'
                                    : '#333'
                            }
                        />

                        <Box
                            sx={{
                                minWidth: 22,
                                height: 22,
                                px: 0.7,
                                borderRadius: 10,

                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',

                                bgcolor:
                                    isActive
                                        ? 'rgba(255,255,255,0.18)'
                                        : '#ede7f6'
                            }}
                        >
                            <DietTextComponent
                                size={12}
                                value={tab.count}
                                color={
                                    isActive
                                        ? '#ffffff'
                                        : '#5b3b7a'
                                }
                            />
                        </Box>

                    </Box>
                )
            })}
        </Box>
    )
}

export default memo(InpatientDietTab)