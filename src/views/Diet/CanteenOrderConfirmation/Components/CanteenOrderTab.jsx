import { Box } from '@mui/joy'
import React from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import DietTextComponent from '../../DietComponent/DietTextComponent'

const CanteenOrderTab = ({
    canteenOrders,
    activeStatus,
    setActiveStatus,
    activeTab,
    setActiveTab
}) => {

    /* SAME LEFT TABS */
    const tabs = [
        { label: 'PENDING', value: 'PENDING' },
        { label: 'CANCELLED', value: 'CANCELLED' },
        { label: 'CONFIRMED', value: 'CONFIRMED' }
    ]

    /* STATUS COUNT (FIXED UPPERCASE FROM DB) */
    const statusCount = Array.isArray(canteenOrders) ? canteenOrders?.reduce((acc, item) => {
        const status = item.order_status?.toUpperCase()

        if (status === "CANCELLED") {
            acc.Cancelled += 1
        } else if (status === "CONFIRMED") {
            acc.Confirmed += 1
        } else {
            acc.Pending += 1
        }

        return acc
    }, {
        Pending: 0,
        Confirmed: 0,
        Cancelled: 0
    }) : { Pending: 0, Confirmed: 0, Cancelled: 0 }

    /* SAME STRUCTURE LIKE YOUR OLD */
    const canteenStatus = [
        {
            label: `${statusCount?.Pending}`,
            value: "Pending"
        },
        {
            label: `${statusCount?.Confirmed}`,
            value: "Confirmed"
        },
        {
            label: `${statusCount?.Cancelled}`,
            value: "Cancelled"
        }
    ]

    /* ICONS */
    const getIcon = (status) => {
        if (status === "Pending") return <PendingActionsIcon fontSize="small" />
        if (status === "Confirmed") return <CheckCircleIcon fontSize="small" />
        if (status === "Cancelled") return <CancelIcon fontSize="small" />
    }

    return (
        <Box
            sx={{
                width: '100%',
                height: 40,
                border: '1px solid #e9e5e56c',
                mt: 1,
                p: 1,
                bgcolor: '#f6f6f6d9',
                display: 'flex',
                alignItems: 'center',

                borderRight: '4px solid #7c51a1',
                borderLeft: '4px solid #7c51a1',
                borderRadius: 5,
                justifyContent: 'space-between'
            }}
        >

            {/*  LEFT SIDE (SAME AS OLD) */}
            <Box sx={{ display: 'flex', width: '50%', gap: 1 }}>
                {tabs?.map((val) => (
                    <Box
                        key={val.value}
                        onClick={() => setActiveTab(val.value)}
                        sx={{
                            display: "flex",
                            cursor: 'pointer',
                            bgcolor: "var(--royal-purple-400)",
                            borderRadius: 1,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            minWidth: '15%',
                            py: 0.5,
                            alignItems: 'center',
                            px: 1,

                            borderBottom:
                                activeTab === val.value
                                    ? '3px solid #000000'
                                    : '3px solid transparent',

                            transition: 'border-bottom 0.2s ease'
                        }}
                    >
                        <DietTextComponent
                            size={13}
                            value={val.label}
                            color="#ffffff"
                        />
                    </Box>
                ))}
            </Box>

            {/*  RIGHT SIDE (STATUS CARDS SAME DESIGN) */}
            <Box
                sx={{
                    display: 'flex',
                    width: '50%',
                    gap: 2,
                    justifyContent: 'end',
                    alignItems: 'center'
                }}
            >

                {canteenStatus?.map((val) => {
                    const isActive = activeStatus === val.value
                    return (
                        <Box
                            key={val.value}
                            onClick={() =>
                                setActiveStatus(prev =>
                                    prev === val.value ? null : val.value
                                )
                            }
                            sx={{
                                height: 30,
                                minWidth: 130,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                borderRadius: 3,
                                bgcolor: isActive ? '#5b3b7a' : '#ffffff',
                                color: isActive ? '#ffffff' : '#333',
                                px: 1,
                                boxShadow: isActive
                                    ? '0 4px 12px rgba(0,0,0,0.2)'
                                    : '0 2px 6px rgba(0,0,0,0.08)',

                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    transform: 'translateY(-3px)'
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {getIcon(val.value)}

                                <DietTextComponent
                                    size={13}
                                    value={val.value}
                                    color={isActive ? "#ffffff" : "#333"}
                                />

                                {Number(val.label) > 0 && (
                                    <DietTextComponent
                                        size={14}
                                        value={val.label}
                                        color={isActive ? "#ffffff" : "#5b3b7a"}
                                    />
                                )}
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default CanteenOrderTab