import React, { memo, useState } from 'react';

import {
    Box,
    Avatar,
    Chip,
    Tooltip,
    IconButton,
    Drawer,
    Divider
} from '@mui/joy';

import {
    FaBed,
    FaUserInjured,
    FaUserDoctor
} from "react-icons/fa6";

import {
    MdMeetingRoom,
    MdDescription,
    MdLocalHospital
} from "react-icons/md";

import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import moment from 'moment';
import DietTextComponent from '../../DietComponent/DietTextComponent';
import { PatientstatusConfig } from '../../CommonData/Common';


const PatientCard = ({ patient, onClick }) => {

    const [openDrawer, setOpenDrawer] = useState(false);

    /*PATIENT STATUS */

    const patientStatus =
        patient?.fb_ipc_curstatus ||
        patient?.ipd_status ||
        '';

    const currentStatus = PatientstatusConfig[patientStatus] || {
        label: patientStatus || 'Unknown Status',
        shortLabel: patientStatus || '--',
        color: '#616161',
        bgColor: '#f5f5f5',
        borderColor: '#d0d0d0',
        icon: <MdDescription size={18} />,
        active: true
    };

    /*
    | ACTIVE DIET
    */

    const activeDiet = patient?.diet_history?.find(
        (diet) => diet?.diet_status === "ACTIVE"
    );

    const DietDetail = activeDiet?.diet_name;

    /*CARD CLICK */

    const handleCardClick = () => {

        // PCO PATIENTS ARE INACTIVE
        if (!currentStatus.active) {
            return;
        }

        onClick?.(patient);
    };

    /* RETURN*/

    return (
        <>

            <Box
                onClick={handleCardClick}
                sx={{
                    flex: '1 1 320px',
                    maxWidth: "400px",

                    borderRadius: 12,

                    bgcolor: currentStatus.active
                        ? 'white'
                        : '#f4f4f4',

                    border: `1px solid ${currentStatus.borderColor}`,

                    p: 1.5,

                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,

                    boxShadow: currentStatus.active
                        ? 'sm'
                        : 'none',

                    transition: '0.2s',

                    cursor: currentStatus.active
                        ? 'pointer'
                        : 'default',

                    opacity: currentStatus.active
                        ? 1
                        : 0.65,

                    filter: currentStatus.active
                        ? 'none'
                        : 'grayscale(0.35)',

                    position: 'relative',

                    '&:hover': currentStatus.active
                        ? {
                            transform: 'translateY(-2px)',
                            boxShadow: 'md'
                        }
                        : {}
                }}
            >

                {/* 
                    STATUS INDICATOR
                 */}

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 1,
                        mb: 0.3
                    }}
                >

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.7,

                            px: 0.9,
                            py: 0.45,

                            borderRadius: 6,

                            bgcolor: currentStatus.bgColor,

                            color: currentStatus.color,

                            border: `1px solid ${currentStatus.borderColor}`
                        }}
                    >

                        {currentStatus.icon}

                        <DietTextComponent
                            value={currentStatus.label}
                            size={10}
                            weight={700}
                            color={currentStatus.color}
                        />

                    </Box>

                    {/* SHORT STATUS CODE */}

                    <Chip
                        size="sm"
                        variant="soft"
                        sx={{
                            fontSize: 10,
                            fontWeight: 700,

                            color: currentStatus.color,

                            bgcolor: currentStatus.bgColor,

                            border: `1px solid ${currentStatus.borderColor}`
                        }}
                    >
                        {currentStatus.shortLabel}
                    </Chip>

                </Box>


                {/* 
                    HEADER
                 */}

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }}
                >

                    {/* PATIENT INFO */}

                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1.2
                        }}
                    >

                        <Avatar
                            size="md"
                            color={
                                patient.ptc_sex === "M"
                                    ? "primary"
                                    : "danger"
                            }
                            sx={{
                                opacity: currentStatus.active ? 1 : 0.6
                            }}
                        >
                            <FaUserInjured />
                        </Avatar>

                        <Box>

                            <DietTextComponent
                                value={patient.ptc_ptname}
                                size={15}
                                weight={700}
                                color={
                                    currentStatus.active
                                        ? undefined
                                        : '#777'
                                }
                            />

                            <DietTextComponent
                                value={`${patient.pt_no} | ${patient.ip_no}`}
                                size={11}
                                color="#6b6b6b"
                            />

                        </Box>

                    </Box>


                    {/* RIGHT SIDE */}

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >

                        {/* EXISTING IPD STATUS */}

                        {patient.ipd_status && (
                            <Chip
                                size="sm"
                                color={
                                    currentStatus.active
                                        ? 'success'
                                        : 'neutral'
                                }
                                variant="soft"
                            >
                                {patient.ipd_status}
                            </Chip>
                        )}


                        {/* OPEN DRAWER */}

                        {currentStatus.active && (
                            <IconButton
                                size="sm"
                                variant="plain"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenDrawer(true);
                                }}
                            >
                                <KeyboardArrowRightRoundedIcon />
                            </IconButton>
                        )}

                    </Box>

                </Box>


                {/* 
                    QUICK DETAILS
                 */}

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',

                        bgcolor: currentStatus.active
                            ? '#f7f7f7'
                            : '#e9e9e9',

                        borderRadius: 8,

                        p: 1
                    }}
                >

                    {/* BED */}

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.7,

                            color: currentStatus.active
                                ? '#333'
                                : '#888'
                        }}
                    >

                        <FaBed size={14} />

                        <DietTextComponent
                            value={patient.fb_bdc_no}
                            size={12}
                            weight={600}
                            color={
                                currentStatus.active
                                    ? undefined
                                    : '#888'
                            }
                        />

                    </Box>


                    {/* DIET */}

                    <DietTextComponent
                        value={DietDetail || 'Not Assigned'}
                        size={12}
                        weight={700}
                        color={
                            !currentStatus.active
                                ? '#888'
                                : DietDetail
                                    ? '#0b6bcb'
                                    : '#d32f2f'
                        }
                    />

                </Box>

            </Box>


            {/* 
                DRAWER
             */}

            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                anchor="right"
                size="md"
            >

                <Box
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        bgcolor: '#f8fafc'
                    }}
                >

                    {/* 
                        TOP HEADER
                     */}

                    <Box
                        sx={{
                            p: 2,

                            bgcolor: 'white',

                            borderBottom: '1px solid #e5e7eb',

                            display: 'flex',

                            justifyContent: 'space-between',

                            alignItems: 'center'
                        }}
                    >

                        <Box
                            sx={{
                                display: 'flex',
                                gap: 1.5,
                                alignItems: 'center'
                            }}
                        >

                            <Avatar
                                size="lg"
                                color={
                                    patient.ptc_sex === "M"
                                        ? "primary"
                                        : "danger"
                                }
                            >
                                <FaUserInjured />
                            </Avatar>

                            <Box>

                                <DietTextComponent
                                    value={patient.ptc_ptname}
                                    size={18}
                                    weight={700}
                                />

                                <DietTextComponent
                                    value={`${patient.pt_no} | ${patient.ip_no}`}
                                    size={12}
                                    color="#6b6b6b"
                                />

                            </Box>

                        </Box>


                        <IconButton
                            variant="soft"
                            color="danger"
                            onClick={() => setOpenDrawer(false)}
                        >
                            <CloseRoundedIcon />
                        </IconButton>

                    </Box>


                    {/* 
                        CONTENT
                     */}

                    <Box
                        sx={{
                            flex: 1,

                            overflowY: 'auto',

                            p: 2,

                            display: 'flex',

                            flexDirection: 'column',

                            gap: 2
                        }}
                    >

                        {/* 
                            STATUS
                         */}

                        <Box
                            sx={{
                                bgcolor: currentStatus.bgColor,

                                border: `1px solid ${currentStatus.borderColor}`,

                                borderRadius: 12,

                                p: 2,

                                display: 'flex',

                                alignItems: 'center',

                                gap: 1.2,

                                color: currentStatus.color
                            }}
                        >

                            {currentStatus.icon}

                            <Box>

                                <DietTextComponent
                                    value={currentStatus.label}
                                    size={14}
                                    weight={700}
                                    color={currentStatus.color}
                                />

                                <DietTextComponent
                                    value={`Status: ${currentStatus.shortLabel}`}
                                    size={11}
                                    color={currentStatus.color}
                                />

                            </Box>

                        </Box>


                        {/* 
                            BED
                         */}

                        <Box
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 12,
                                p: 2,
                                boxShadow: 'sm'
                            }}
                        >

                            <DietTextComponent
                                value="Room & Bed"
                                size={14}
                                weight={700}
                            />

                            <Divider sx={{ my: 1 }} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >

                                    <FaBed size={15} />

                                    <DietTextComponent
                                        value={patient.fb_bdc_no}
                                        size={13}
                                        weight={600}
                                    />

                                </Box>


                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >

                                    <MdMeetingRoom size={16} />

                                    <DietTextComponent
                                        value={patient.fb_rtc_desc}
                                        size={13}
                                    />

                                </Box>

                            </Box>

                        </Box>


                        {/* 
                            DOCTOR
                         */}

                        <Box
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 12,
                                p: 2,
                                boxShadow: 'sm'
                            }}
                        >

                            <DietTextComponent
                                value="Doctor"
                                size={14}
                                weight={700}
                            />

                            <Divider sx={{ my: 1 }} />

                            <Tooltip title={patient.doc_name}>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >

                                    <FaUserDoctor
                                        size={15}
                                        color="#7c51a1"
                                    />

                                    <DietTextComponent
                                        value={patient.doc_name}
                                        size={13}
                                    />

                                </Box>

                            </Tooltip>

                        </Box>


                        {/* 
                            NURSING STATION
                         */}

                        <Box
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 12,
                                p: 2,
                                boxShadow: 'sm'
                            }}
                        >

                            <DietTextComponent
                                value="Nursing Station"
                                size={14}
                                weight={700}
                            />

                            <Divider sx={{ my: 1 }} />

                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}
                            >

                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 1
                                    }}
                                >

                                    <MdLocalHospital
                                        size={16}
                                        color="#009688"
                                    />

                                    <DietTextComponent
                                        value={patient.fb_ns_name}
                                        size={13}
                                    />

                                </Box>

                                <DietTextComponent
                                    value={moment(patient.ipd_date).format(
                                        'DD MMM YYYY'
                                    )}
                                    size={12}
                                    color="#6b6b6b"
                                />

                            </Box>

                        </Box>


                        {/* 
                            DIET
                         */}

                        <Box
                            sx={{
                                bgcolor: 'white',
                                borderRadius: 12,
                                p: 2,
                                boxShadow: 'sm'
                            }}
                        >

                            <DietTextComponent
                                value="Active Diet"
                                size={14}
                                weight={700}
                            />

                            <Divider sx={{ my: 1 }} />

                            <DietTextComponent
                                value={DietDetail || 'Not Assigned'}
                                size={15}
                                weight={700}
                                color={
                                    DietDetail
                                        ? '#0b6bcb'
                                        : '#d32f2f'
                                }
                            />

                        </Box>

                    </Box>

                </Box>

            </Drawer>
        </>
    );
};

export default memo(PatientCard);