import { Box } from '@mui/joy'
import React from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import DietTextComponent from '../../DietComponent/DietTextComponent'

const PosOrderTab = ({
    posOrders,
    activeStatus,
    setActiveStatus,
    activeTab,
    setActiveTab
}) => {

    /* LEFT TABS */
    const tabs = [
        { label: 'PENDING', value: 'PENDING' },
        { label: 'BILLED', value: 'BILLED' }
    ]

    /* STATUS COUNT */
    const statusCount = Array.isArray(posOrders)
        ? posOrders.reduce(
            (acc, item) => {
                const status = item.bill_status?.toUpperCase()

                if (status === 'BILLED') {
                    acc.Billed += 1
                } else {
                    acc.Pending += 1
                }

                return acc
            },
            {
                Pending: 0,
                Billed: 0
            }
        )
        : {
            Pending: 0,
            Billed: 0
        }

    const posStatus = [
        {
            label: `${statusCount.Pending}`,
            value: 'Pending'
        },
        {
            label: `${statusCount.Billed}`,
            value: 'Billed'
        }
    ]

    const getIcon = (status) => {
        if (status === 'Pending') return <PendingActionsIcon fontSize="small" />
        if (status === 'Billed') return <ReceiptLongIcon fontSize="small" />
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
                justifyContent: 'space-between',
                borderRight: '4px solid #7c51a1',
                borderLeft: '4px solid #7c51a1',
                borderRadius: 5
            }}
        >

            {/* LEFT TABS */}
            <Box sx={{ display: 'flex', width: '50%', gap: 1 }}>
                {tabs.map(tab => (
                    <Box
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        sx={{
                            display: 'flex',
                            cursor: 'pointer',
                            bgcolor: 'var(--royal-purple-400)',
                            borderRadius: 1,
                            borderTopLeftRadius: 5,
                            borderTopRightRadius: 5,
                            minWidth: '15%',
                            py: 0.5,
                            px: 1,
                            alignItems: 'center',
                            borderBottom:
                                activeTab === tab.value
                                    ? '3px solid #000'
                                    : '3px solid transparent',
                            transition: 'border-bottom .2s'
                        }}
                    >
                        <DietTextComponent
                            size={13}
                            value={tab.label}
                            color="#fff"
                        />
                    </Box>
                ))}
            </Box>

            {/* RIGHT STATUS */}
            <Box
                sx={{
                    display: 'flex',
                    width: '50%',
                    gap: 2,
                    justifyContent: 'end',
                    alignItems: 'center'
                }}
            >
                {posStatus.map(status => {
                    const isActive = activeStatus === status.value

                    return (
                        <Box
                            key={status.value}
                            onClick={() =>
                                setActiveStatus(prev =>
                                    prev === status.value ? null : status.value
                                )
                            }
                            sx={{
                                height: 30,
                                minWidth: 130,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 0.5,
                                cursor: 'pointer',
                                borderRadius: 3,
                                bgcolor: isActive ? '#5b3b7a' : '#fff',
                                color: isActive ? '#fff' : '#333',
                                px: 1,
                                boxShadow: isActive
                                    ? '0 4px 12px rgba(0,0,0,.2)'
                                    : '0 2px 6px rgba(0,0,0,.08)',
                                transition: '.2s',
                                '&:hover': {
                                    transform: 'translateY(-3px)'
                                }
                            }}
                        >
                            {getIcon(status.value)}

                            <DietTextComponent
                                size={13}
                                value={status.value}
                                color={isActive ? '#fff' : '#333'}
                            />

                            {Number(status.label) > 0 && (
                                <DietTextComponent
                                    size={14}
                                    value={status.label}
                                    color={isActive ? '#fff' : '#5b3b7a'}
                                />
                            )}
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default PosOrderTab