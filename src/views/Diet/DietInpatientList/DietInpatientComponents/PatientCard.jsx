import React, { memo } from 'react';
import {
    Box,
    Avatar,
    Chip,
    Tooltip
} from '@mui/joy';
import {
    FaBed,
    FaUserInjured,
    FaUserDoctor
} from "react-icons/fa6";
import {
    MdMeetingRoom,
    MdLocalHospital
} from "react-icons/md";

import moment from 'moment';
import DietTextComponent from '../../DietComponent/DietTextComponent'

const PatientCard = ({ patient, onClick }) => {

    const statusColor = {
        R: 'success',
        E: 'danger'
    }

    const activeDiet = patient?.diet_history?.find(
        (diet) => diet?.diet_status === "ACTIVE"
    );

    const DietDetail = activeDiet?.diet_name;

    return (
        <Box
            onClick={() => onClick(patient)}
            sx={{
                flex: '1 1 320px',
                minHeight: 170,
                borderRadius: 12,
                bgcolor: 'white',
                border: '1px solid #e4e4e4',
                p: 1.5,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                boxShadow: 'sm',
                transition: '0.2s',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 'md'
                },
                cursor: "pointer"
            }}
        >

            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        gap: 1.2
                    }}
                >
                    <Avatar
                        size='md'
                        color={patient.ptc_sex === "M" ? "primary" : "danger"}
                    >
                        <FaUserInjured />
                    </Avatar>

                    <Box>
                        <DietTextComponent
                            value={patient.ptc_ptname}
                            size={15}
                            weight={700}
                        />

                        <DietTextComponent
                            value={`${patient.pt_no} | ${patient.ip_no}`}
                            size={11}
                            color='#6b6b6b'
                        />
                    </Box>
                </Box>

                {
                    patient.ipd_status &&
                    <Chip
                        size='sm'
                        color={statusColor[patient.ipd_status] || 'neutral'}
                        variant='soft'
                    >
                        {patient.ipd_status}
                    </Chip>
                }
            </Box>

            {/* Bed & Room */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    bgcolor: '#f7f7f7',
                    borderRadius: 8,
                    p: 1
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.7
                    }}
                >
                    <FaBed size={14} />

                    <DietTextComponent
                        value={patient.fb_bdc_no}
                        size={12}
                        weight={600}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.7
                    }}
                >
                    <MdMeetingRoom size={15} />

                    <DietTextComponent
                        value={patient.fb_rtc_desc}
                        size={11}
                    />
                </Box>

            </Box>

            {/* Doctor */}
            <Tooltip title={patient.doc_name}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1
                    }}
                >
                    <FaUserDoctor
                        size={14}
                        color='#7c51a1'
                    />

                    <DietTextComponent
                        value={patient.doc_name}
                        size={12}
                    />
                </Box>
            </Tooltip>

            {/* Ward */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >

                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.7
                    }}
                >
                    <MdLocalHospital
                        size={15}
                        color='#009688'
                    />

                    <DietTextComponent
                        value={patient.fb_ns_name}
                        size={12}
                    />
                </Box>

                <DietTextComponent
                    value={moment(patient.ipd_date).format('DD MMM YYYY')}
                    size={11}
                    color='#6b6b6b'
                />
            </Box>

            {/* Diet */}
            <Box
                sx={{
                    mt: 'auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    pt: 1,
                    borderTop: '1px dashed #dcdcdc'
                }}
            >

                <Box>
                    <DietTextComponent
                        value={'Diet'}
                        size={10}
                        color='#888'
                    />

                    <DietTextComponent
                        value={DietDetail || 'Not Assigned'}
                        size={12}
                        weight={700}
                        color={DietDetail ? '#0b6bcb' : '#d32f2f'}
                    />
                </Box>

                <Chip
                    size='sm'
                    variant='soft'
                    color={patient.ptc_sex === "M" ? "primary" : "danger"}
                >
                    {patient.ptc_sex}
                </Chip>

            </Box>
        </Box>
    )
}

export default memo(PatientCard)