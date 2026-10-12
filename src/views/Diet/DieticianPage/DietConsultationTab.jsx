import React, { memo } from 'react'
import { Box } from '@mui/joy'

import PendingActionsIcon from '@mui/icons-material/PendingActions'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import VerifiedIcon from '@mui/icons-material/Verified'
import DietTextComponent from '../DietComponent/DietTextComponent'
import { PrintDietStatusPdf } from '../CommonData/CommonFun'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DietButton from '../DietComponent/DietButton'

const DietConsultationTab = ({
    dietPlans = [],
    activeStatus,
    setActiveStatus,
    activeTab,
    setActiveTab,
    currentDietitianId,
    pdfdata
}) => {


    const tabs = [
        {
            label: 'CONSULTATION REQUESTS',
            value: 'REQUESTS'
        },
        {
            label: 'MY CONSULTATIONS',
            value: 'MY_CONSULTATIONS'
        }
    ]


    const assignedCount =
        dietPlans?.filter(
            item =>
                item?.is_consultation === 1 &&
                Number(item?.dietitian_id) === Number(currentDietitianId) &&
                item?.assignment_status === "ASSIGNED"
        )?.length || 0;

    const approvedCount =
        dietPlans?.filter(
            item =>
                item?.is_consultation === 1 &&
                Number(item?.dietitian_id) === Number(currentDietitianId) &&
                item?.assignment_status === "APPROVED"
        )?.length || 0;

    const inProgressCount =
        dietPlans?.filter(
            item =>
                item?.is_consultation === 1 &&
                Number(item?.dietitian_id) === Number(currentDietitianId) &&
                item?.assignment_status === "IN_PROGRESS"
        )?.length || 0;

    const completedCount =
        dietPlans?.filter(
            item =>
                item?.is_consultation === 1 &&
                Number(item?.dietitian_id) === Number(currentDietitianId) &&
                item?.assignment_status === "COMPLETED"
        )?.length || 0;

    const reassignedCount =
        dietPlans?.filter(
            item =>
                item?.is_consultation === 1 &&
                Number(item?.dietitian_id) === Number(currentDietitianId) &&
                item?.assignment_status === "REASSIGNED"
        )?.length || 0;

    const consultationStatus = [
        {
            label: `${assignedCount}`,
            value: "ASSIGNED"
        },
        {
            label: `${approvedCount}`,
            value: "APPROVED"
        },
        {
            label: `${inProgressCount}`,
            value: "IN_PROGRESS"
        },
        {
            label: `${completedCount}`,
            value: "COMPLETED"
        },
        {
            label: `${reassignedCount}`,
            value: "REASSIGNED"
        }
    ];

    const getIcon = (status) => {
        switch (status) {
            case "ASSIGNED":
                return <AssignmentIndIcon fontSize="small" />;

            case "APPROVED":
                return <VerifiedIcon fontSize="small" />;

            case "IN_PROGRESS":
                return <PendingActionsIcon fontSize="small" />;

            case "COMPLETED":
                return <VerifiedIcon fontSize="small" />;

            case "REASSIGNED":
                return <AssignmentIndIcon fontSize="small" />;

            default:
                return null;
        }
    };

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
            }}>

            <Box
                sx={{
                    display: 'flex',
                    width: '50%',
                    gap: 1
                }}
            >
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
                            minWidth: '20%',
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


            <Box
                sx={{
                    display: 'flex',
                    width: '50%',
                    gap: 2,
                    justifyContent: 'end',
                    alignItems: 'center'
                }}
            >
                {activeTab === "MY_CONSULTATIONS" &&
                    consultationStatus?.map((val) => {
                        const isActive =
                            activeStatus === val.value;

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
                                    height: 30,
                                    minWidth: 140,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    borderRadius: 3,
                                    bgcolor: isActive
                                        ? '#5b3b7a'
                                        : '#ffffff',
                                    color: isActive
                                        ? '#ffffff'
                                        : '#333',
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5
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

                                    {Number(val.label) > 0 && (
                                        <DietTextComponent
                                            size={14}
                                            value={val.label}
                                            color={
                                                isActive
                                                    ? "#ffffff"
                                                    : "#5b3b7a"
                                            }
                                        />
                                    )}
                                </Box>
                            </Box>
                        );
                    })

                }

                {activeTab === "MY_CONSULTATIONS" &&

                    <DietButton
                        width='100%'
                        name="Pdf"
                        icon={PictureAsPdfIcon}
                        // disabled={!dietecian}
                        onClick={() => PrintDietStatusPdf(pdfdata)}
                    />}

            </Box>
        </Box>
    )
}

export default memo(DietConsultationTab);