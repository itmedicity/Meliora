import { Box } from '@mui/joy'
import React, { memo } from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DietTextComponent from '../DietComponent/DietTextComponent'
import DietButton from '../DietComponent/DietButton'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CountertopsIcon from '@mui/icons-material/Countertops';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CancelIcon from '@mui/icons-material/Cancel';


const KitchenStatusTab = ({
    kitchenOrders = [],
    activeTab,
    setActiveTab,
    onClick
}) => {

    /* TABS */
    const tabs = [
        {
            label: 'ALL',
            value: 'ALL',
            icon: <MenuBookIcon fontSize="small" />
        },
        {
            label: 'PENDING',
            value: 'PENDING',
            icon: <PendingActionsIcon fontSize="small" />
        },
        {
            label: 'SENT TO KITCHEN',
            value: 'SENT_TO_KITCHEN',
            icon: <CountertopsIcon fontSize="small" />
        },
        {
            label: 'COMPLETED',
            value: 'COMPLETED',
            icon: <CheckCircleIcon fontSize="small" />
        },
        {
            label: 'CANCELLED',
            value: 'CANCELLED',
            icon: <CancelIcon fontSize="small" />
        }
    ];

    /* COUNT */
    const statusCount = kitchenOrders.reduce((acc, item) => {
        const status = item?.kitchen_status?.toUpperCase();
        switch (status) {
            case 'COMPLETED':
                acc.COMPLETED += 1;
                break;
            case 'SENT_TO_KITCHEN':
                acc.SENT_TO_KITCHEN += 1;
                break;
            case 'CANCELLED':
                acc.CANCELLED += 1;
                break;
            default:
                acc.PENDING += 1;
                break;
        }
        // TOTAL
        acc.ALL += 1;
        return acc;
    }, {
        ALL: 0,
        PENDING: 0,
        SENT_TO_KITCHEN: 0,
        CANCELLED: 0,
        COMPLETED: 0
    });

    return (

        <Box
            sx={{
                width: '95%',
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
                justifyContent: 'space-between',
                gap: 2
            }}
        >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
            }}>
                {
                    tabs?.map(tab => {

                        const isActive =
                            activeTab === tab.value

                        return (

                            <Box
                                key={tab.value}
                                onClick={() =>
                                    setActiveTab(tab.value)
                                }
                                sx={{
                                    height: 32,
                                    minWidth: 160,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
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

                                    px: 2,

                                    boxShadow: isActive
                                        ? '0 4px 12px rgba(0,0,0,0.2)'
                                        : '0 2px 6px rgba(0,0,0,0.08)',

                                    transition: 'all 0.2s ease',

                                    '&:hover': {
                                        transform: 'translateY(-3px)'
                                    }
                                }}
                            >

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >

                                    {tab.icon}

                                    <DietTextComponent
                                        size={13}
                                        value={tab.label}
                                        color={
                                            isActive
                                                ? '#ffffff'
                                                : '#333'
                                        }
                                    />

                                    {
                                        statusCount[
                                        tab.value
                                        ] !== 0 &&

                                        <DietTextComponent
                                            size={14}
                                            value={
                                                statusCount[
                                                tab.value
                                                ]
                                            }
                                            color={
                                                isActive
                                                    ? '#ffffff'
                                                    : '#5b3b7a'
                                            }
                                        />}

                                </Box>

                            </Box>
                        )
                    })
                }

            </Box>

            <DietButton
                width={150}
                onClick={onClick}
                name={"Download Pdf"}
                icon={PictureAsPdfIcon}
            />


        </Box>
    )
}

export default memo(KitchenStatusTab)