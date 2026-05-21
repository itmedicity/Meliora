import { Box } from '@mui/joy'
import React, { useMemo } from 'react'

import DietTextComponent from '../DietComponent/DietTextComponent'

import PendingActionsIcon from '@mui/icons-material/PendingActions'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import LocalShippingIcon from '@mui/icons-material/LocalShipping'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import CancelIcon from '@mui/icons-material/Cancel'

const CustomeTab = ({
    FilteredPatientDetail = [],
    setActiveStatus,
    activeStatus,
    activeTab,
    setActiveTab
}) => {

    // TOP TABS
    const tabs = [
        { label: 'PREPARATION', value: '1' },
        { label: 'DELIVERY', value: '2' }
    ]

    // STATUS COUNT
    const statusCount = useMemo(() => {

        return FilteredPatientDetail?.reduce((acc, pt) => {

            const status =
                pt.ItemStatus ||
                pt.AssignyStatus ||
                'PENDING'

            switch (status) {

                case 'ASSIGNED':
                    acc.ASSIGNED += 1
                    break

                case 'PICKEDUP':
                    acc.PICKEDUP += 1
                    break

                case 'INPROGRESS':
                    acc.INPROGRESS += 1
                    break

                case 'DELIVERED':
                    acc.DELIVERED += 1
                    break

                case 'RETURNED':
                    acc.RETURNED += 1
                    break

                case 'UNDELIVERED':
                    acc.UNDELIVERED += 1
                    break

                case 'CANCELLED':
                    acc.CANCELLED += 1
                    break

                default:
                    acc.PENDING += 1
                    break
            }

            return acc

        }, {
            PENDING: 0,
            ASSIGNED: 0,
            PICKEDUP: 0,
            INPROGRESS: 0,
            DELIVERED: 0,
            RETURNED: 0,
            UNDELIVERED: 0,
            CANCELLED: 0
        })

    }, [FilteredPatientDetail])


    const paitentfoodStatus = [

        {
            label: `${statusCount?.PENDING}`,
            value: "PENDING"
        },

        {
            label: `${statusCount?.ASSIGNED}`,
            value: "ASSIGNED"
        },

        {
            label: `${statusCount?.PICKEDUP}`,
            value: "PICKEDUP"
        },

        {
            label: `${statusCount?.INPROGRESS}`,
            value: "INPROGRESS"
        },

        {
            label: `${statusCount?.DELIVERED}`,
            value: "DELIVERED"
        },

        {
            label: `${statusCount?.RETURNED}`,
            value: "RETURNED"
        },

        {
            label: `${statusCount?.UNDELIVERED}`,
            value: "UNDELIVERED"
        },

        {
            label: `${statusCount?.CANCELLED}`,
            value: "CANCELLED"
        }
    ]

    // STATUS ICONS
    const getIcon = (status) => {

        switch (status) {

            case "PENDING":
                return <PendingActionsIcon fontSize="small" />

            case "ASSIGNED":
                return <AssignmentIndIcon fontSize="small" />

            case "PICKEDUP":
                return <LocalShippingIcon fontSize="small" />

            case "INPROGRESS":
                return <DeliveryDiningIcon fontSize="small" />

            case "DELIVERED":
                return <CheckCircleIcon fontSize="small" />

            case "RETURNED":
                return <KeyboardReturnIcon fontSize="small" />

            case "UNDELIVERED":
                return <CancelIcon fontSize="small" />

            case "CANCELLED":
                return <CancelIcon fontSize="small" />

            default:
                return <PendingActionsIcon fontSize="small" />
        }
    }

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: 45,
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


            <Box
                sx={{
                    display: 'flex',
                    width: '35%',
                    gap: 1
                }}
            >

                {tabs.map((val) => (

                    <Box
                        key={val.value}
                        onClick={() => {
                            setActiveTab(val.value)
                            setActiveStatus(null)
                        }}
                        sx={{
                            display: "flex",
                            cursor: 'pointer',
                            bgcolor:
                                activeTab === val.value
                                    ? '#5b3b7a'
                                    : 'var(--royal-purple-400)',

                            borderRadius: 1,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            minWidth: '20%',
                            py: 0.6,
                            alignItems: 'center',
                            justifyContent: 'center',
                            px: 1,

                            borderBottom:
                                activeTab === val.value
                                    ? '3px solid #000000'
                                    : '3px solid transparent',

                            transition: 'all 0.2s ease'
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


            {
                activeTab === '2' &&
                <Box
                    sx={{
                        display: 'flex',
                        width: '65%',
                        gap: 1,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        flexWrap: 'wrap'
                    }}
                >
                    {paitentfoodStatus?.map((val) => {
                        const isActive =
                            activeStatus === val.value
                        return (

                            <Box
                                key={val.value}
                                onClick={() =>
                                    setActiveStatus(prev =>
                                        prev === val.value
                                            ? null
                                            : val.value
                                    )
                                }
                                sx={{
                                    height: 32,
                                    minWidth: 120,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    borderRadius: 3,

                                    bgcolor:
                                        isActive
                                            ? '#5b3b7a'
                                            : '#ffffff',

                                    color:
                                        isActive
                                            ? '#ffffff'
                                            : '#333',

                                    px: 1.5,

                                    boxShadow:
                                        isActive
                                            ? '0 4px 12px rgba(0,0,0,0.2)'
                                            : '0 2px 6px rgba(0,0,0,0.08)',

                                    transition: 'all 0.2s ease',

                                    '&:hover': {
                                        transform: 'translateY(-2px)'
                                    }
                                }}
                            >

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.7
                                    }}
                                >

                                    {getIcon(val.value)}

                                    <DietTextComponent
                                        size={12}
                                        value={val.value}
                                        color={
                                            isActive
                                                ? "#ffffff"
                                                : "#333"
                                        }
                                    />

                                    <DietTextComponent
                                        size={13}
                                        value={val.label}
                                        color={
                                            isActive
                                                ? "#ffffff"
                                                : "#5b3b7a"
                                        }
                                    />

                                </Box>

                            </Box>
                        )
                    })}

                </Box>
            }
        </Box>
    )
}

export default CustomeTab